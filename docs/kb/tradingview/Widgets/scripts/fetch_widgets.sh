#!/bin/bash
# TradingView Widgets Documentation Scraper
# Uses curl for fetching and z-ai CLI for image analysis

BASE_DIR="/home/z/my-project/download/KB_grabbing/docs/TradingView_KB/Widgets"
IMAGES_DIR="$BASE_DIR/images"

# Create directories
mkdir -p "$IMAGES_DIR"
mkdir -p "$BASE_DIR/charts"
mkdir -p "$BASE_DIR/tickers"
mkdir -p "$BASE_DIR/heatmaps"
mkdir -p "$BASE_DIR/screeners"
mkdir -p "$BASE_DIR/watchlists"
mkdir -p "$BASE_DIR/symbol-details"
mkdir -p "$BASE_DIR/news"
mkdir -p "$BASE_DIR/calendars"
mkdir -p "$BASE_DIR/economics"
mkdir -p "$BASE_DIR/tutorials/web-components"
mkdir -p "$BASE_DIR/tutorials/iframe/build-page"

# Function to fetch page and create markdown
fetch_page() {
    local url="$1"
    local output_file="$2"
    local output_path="$BASE_DIR/$output_file"
    
    echo "Fetching: $url"
    
    # Fetch page HTML
    local html=$(curl -sL -A "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36" \
        -H "Accept: text/html,application/xhtml+xml" \
        -H "Accept-Language: en-US,en;q=0.9" \
        "$url" 2>/dev/null)
    
    if [ -z "$html" ]; then
        echo "  ✗ Failed to fetch $url"
        return 1
    fi
    
    # Extract title
    local title=$(echo "$html" | grep -oP '<title[^>]*>\K[^<]+' | head -1 | sed 's/|.*//;s/^[[:space:]]*//;s/[[:space:]]*$//')
    [ -z "$title" ] && title="TradingView Widget Documentation"
    
    # Create markdown file
    cat > "$output_path" << EOF
# ${title}

**Source:** ${url}

---

EOF

    # Extract main content
    local content=$(echo "$html" | sed -n '/<main[^>]*>/,/<\/main>/p' 2>/dev/null)
    [ -z "$content" ] && content=$(echo "$html" | sed -n '/<article[^>]*>/,/<\/article>/p' 2>/dev/null)
    [ -z "$content" ] && content=$(echo "$html" | sed -n '/<div[^>]*class="[^"]*content[^"]*"[^>]*>/,/<\/div>/p' 2>/dev/null | head -200)
    
    # Convert to text
    local text=$(echo "$content" | \
        sed 's/<script[^>]*>.*<\/script>//gi' | \
        sed 's/<style[^>]*>.*<\/style>//gi' | \
        sed 's/<h1[^>]*>/\n# /gi; s/<\/h1>/\n/gi' | \
        sed 's/<h2[^>]*>/\n## /gi; s/<\/h2>/\n/gi' | \
        sed 's/<h3[^>]*>/\n### /gi; s/<\/h3>/\n/gi' | \
        sed 's/<h4[^>]*>/\n#### /gi; s/<\/h4>/\n/gi' | \
        sed 's/<p[^>]*>/\n/gi; s/<\/p>/\n\n/gi' | \
        sed 's/<li[^>]*>/- /gi; s/<\/li>/\n/gi' | \
        sed 's/<strong[^>]*>\|<b[^>]*>/**/gi; s/<\/strong>\|<\/b>/**/gi' | \
        sed 's/<em[^>]*>\|<i[^>]*>/*/gi; s/<\/em>\|<\/i>/*/gi' | \
        sed 's/<code[^>]*>/`/gi; s/<\/code>/`/gi' | \
        sed 's/<br\s*\/\?>/\n/gi' | \
        sed 's/<a[^>]*href="\([^"]*\)"[^>]*>/[/; s/<\/a>/](\1)/gi' | \
        sed 's/<[^>]*>//g' | \
        sed 's/&nbsp;/ /g; s/&amp;/\&/g; s/&lt;/</g; s/&gt;/>/g; s/&quot;/"/g' | \
        sed 's/\n\s*\n\s*\n/\n\n/g' | \
        sed 's/^[[:space:]]*//;s/[[:space:]]*$//' \
    )
    
    echo "$text" >> "$output_path"
    
    # Extract images
    local img_count=0
    local images=$(echo "$content" | grep -oP '<img[^>]+src="\K[^"]+' | head -3)
    
    if [ -n "$images" ]; then
        echo "" >> "$output_path"
        echo "## Widget Preview Images" >> "$output_path"
        echo "" >> "$output_path"
        
        while IFS= read -r img_url; do
            # Handle relative URLs
            if [[ "$img_url" == //* ]]; then
                img_url="https:$img_url"
            elif [[ "$img_url" == /* ]]; then
                img_url="https://www.tradingview.com$img_url"
            fi
            
            # Download image
            local img_name=$(basename "$output_file" .md)_img$((img_count+1)).png
            local img_path="$IMAGES_DIR/$img_name"
            
            echo "  Downloading image: $img_url"
            curl -sL "$img_url" -o "$img_path" 2>/dev/null
            
            if [ -f "$img_path" ] && [ -s "$img_path" ]; then
                # Analyze image with VLM
                echo "  Analyzing image with VLM..."
                local analysis=$(z-ai vision -p "Analyze this TradingView widget documentation image. Describe: 1. What type of widget is shown 2. Key UI elements 3. Configuration options visible 4. Implementation details. Be technical for developers." -i "$img_path" 2>/dev/null)
                
                echo "### Image $((img_count+1))" >> "$output_path"
                echo "" >> "$output_path"
                echo "![Widget Preview](images/$img_name)" >> "$output_path"
                echo "" >> "$output_path"
                echo "**AI Analysis:**" >> "$output_path"
                echo "$analysis" >> "$output_path"
                echo "" >> "$output_path"
                echo "---" >> "$output_path"
                echo "" >> "$output_path"
                
                ((img_count++))
            fi
        done <<< "$images"
    fi
    
    # Extract code blocks
    local code_blocks=$(echo "$content" | grep -oP '<pre[^>]*><code[^>]*>\K.*?(?=</code></pre>)' | head -5)
    
    if [ -n "$code_blocks" ]; then
        echo "" >> "$output_path"
        echo "## Code Examples" >> "$output_path"
        echo "" >> "$output_path"
        
        local block_num=0
        while IFS= read -r code; do
            code=$(echo "$code" | sed 's/&lt;/</g; s/&gt;/>/g; s/&amp;/\&/g; s/&quot;/"/g')
            echo '```html' >> "$output_path"
            echo "$code" >> "$output_path"
            echo '```' >> "$output_path"
            echo "" >> "$output_path"
            ((block_num++))
        done <<< "$code_blocks"
    fi
    
    # Add AI Agent notes
    cat >> "$output_path" << EOF

---

## AI Agent Usage Notes

- This document contains TradingView Widget documentation
- Use this information to understand widget configuration options
- Code examples should be adapted to your specific implementation needs
- Images have been analyzed by AI with technical descriptions
- Original URL: ${url}
EOF
    
    echo "  ✓ Saved: $output_file"
    
    # Delay to avoid rate limiting
    sleep 1
}

# URLs to fetch
echo "🚀 TradingView Widgets Documentation Scraper"
echo "============================================"

# Main pages
fetch_page "https://www.tradingview.com/widget-docs/getting-started/" "getting-started.md"
fetch_page "https://www.tradingview.com/widget-docs/widget-formats/" "widget-formats.md"
fetch_page "https://www.tradingview.com/widget-docs/theme-builder/" "theme-builder.md"
fetch_page "https://www.tradingview.com/widget-docs/markets/" "markets.md"
fetch_page "https://www.tradingview.com/widget-docs/solutions/" "solutions.md"
fetch_page "https://www.tradingview.com/widget-docs/tutorials/" "tutorials.md"
fetch_page "https://www.tradingview.com/widget-docs/accessibility/" "accessibility.md"

# Widgets overview
fetch_page "https://www.tradingview.com/widget-docs/widgets/" "widgets.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/charts/" "widgets-charts.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/watchlists/" "widgets-watchlists.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/tickers/" "widgets-tickers.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/heatmaps/" "widgets-heatmaps.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/screeners/" "widgets-screeners.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/symbol-details/" "widgets-symbol-details.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/news/" "widgets-news.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/calendars/" "widgets-calendars.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/economics/" "widgets-economics.md"

# FAQ
fetch_page "https://www.tradingview.com/widget-docs/faq/general/" "faq-general.md"
fetch_page "https://www.tradingview.com/widget-docs/faq/data/" "faq-data.md"
fetch_page "https://www.tradingview.com/widget-docs/faq/languages/" "faq-languages.md"
fetch_page "https://www.tradingview.com/widget-docs/faq/many-widgets/" "faq-many-widgets.md"

# Charts widgets
fetch_page "https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/" "charts/advanced-chart.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/charts/mini-chart/" "charts/mini-chart.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/charts/symbol-overview/" "charts/symbol-overview.md"

# Tickers widgets
fetch_page "https://www.tradingview.com/widget-docs/widgets/tickers/ticker/" "tickers/ticker.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/tickers/ticker-tape/" "tickers/ticker-tape.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/tickers/single-ticker/" "tickers/single-ticker.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/tickers/ticker-tag/" "tickers/ticker-tag.md"

# Heatmaps
fetch_page "https://www.tradingview.com/widget-docs/widgets/heatmaps/crypto-heatmap/" "heatmaps/crypto-heatmap.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/heatmaps/stock-heatmap/" "heatmaps/stock-heatmap.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/heatmaps/etf-heatmap/" "heatmaps/etf-heatmap.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/heatmaps/forex-heatmap/" "heatmaps/forex-heatmap.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/heatmaps/forex-cross-rates/" "heatmaps/forex-cross-rates.md"

# Screeners
fetch_page "https://www.tradingview.com/widget-docs/widgets/screeners/screener/" "screeners/screener.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/screeners/crypto-mkt-screener/" "screeners/crypto-mkt-screener.md"

# Watchlists
fetch_page "https://www.tradingview.com/widget-docs/widgets/watchlists/market-overview/" "watchlists/market-overview.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/watchlists/market-quotes/" "watchlists/market-quotes.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/watchlists/market-summary/" "watchlists/market-summary.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/watchlists/stock-market/" "watchlists/stock-market.md"

# Symbol Details
fetch_page "https://www.tradingview.com/widget-docs/widgets/symbol-details/symbol-info/" "symbol-details/symbol-info.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/symbol-details/company-profile/" "symbol-details/company-profile.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/symbol-details/fundamental-data/" "symbol-details/fundamental-data.md"
fetch_page "https://www.tradingview.com/widget-docs/widgets/symbol-details/technical-analysis/" "symbol-details/technical-analysis.md"

# News
fetch_page "https://www.tradingview.com/widget-docs/widgets/news/top-stories/" "news/top-stories.md"

# Calendars
fetch_page "https://www.tradingview.com/widget-docs/widgets/calendars/economic-calendar/" "calendars/economic-calendar.md"

# Economics
fetch_page "https://www.tradingview.com/widget-docs/widgets/economics/economic-map/" "economics/economic-map.md"

# Tutorials
fetch_page "https://www.tradingview.com/widget-docs/tutorials/web-components/layout-and-sizing/" "tutorials/web-components/layout-and-sizing.md"
fetch_page "https://www.tradingview.com/widget-docs/tutorials/web-components/styling-and-themes/" "tutorials/web-components/styling-and-themes.md"
fetch_page "https://www.tradingview.com/widget-docs/tutorials/web-components/configuring/" "tutorials/web-components/configuring.md"
fetch_page "https://www.tradingview.com/widget-docs/tutorials/iframe/set-widget-size/" "tutorials/iframe/set-widget-size.md"
fetch_page "https://www.tradingview.com/widget-docs/tutorials/iframe/lazy-loading/" "tutorials/iframe/lazy-loading.md"
fetch_page "https://www.tradingview.com/widget-docs/tutorials/iframe/build-page/" "tutorials/iframe/build-page.md"
fetch_page "https://www.tradingview.com/widget-docs/tutorials/iframe/build-page/getting-started/" "tutorials/iframe/build-page/getting-started.md"
fetch_page "https://www.tradingview.com/widget-docs/tutorials/iframe/build-page/widget-integration/" "tutorials/iframe/build-page/widget-integration.md"
fetch_page "https://www.tradingview.com/widget-docs/tutorials/iframe/build-page/navigation/" "tutorials/iframe/build-page/navigation.md"
fetch_page "https://www.tradingview.com/widget-docs/tutorials/iframe/build-page/dynamic-symbols/" "tutorials/iframe/build-page/dynamic-symbols.md"
fetch_page "https://www.tradingview.com/widget-docs/tutorials/iframe/build-page/conclusion/" "tutorials/iframe/build-page/conclusion.md"

echo ""
echo "✨ Done!"
echo ""
echo "Images analyzed: $(ls -1 "$IMAGES_DIR" 2>/dev/null | wc -l)"
echo "Files created: $(find "$BASE_DIR" -name "*.md" -type f 2>/dev/null | wc -l)"
