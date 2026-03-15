# 📈 Chart Components

**Version:** 2.0 | **Last Updated:** March 2026

---

## 📋 Обзор

Раздел Chart содержит компоненты для визуализации финансовых данных в реальном времени. Все компоненты построены на библиотеке [lightweight-charts](../frameworks/lightweight-charts.md) от TradingView.

### Компоненты раздела

| Компонент | Файл | Описание |
|-----------|------|----------|
| **Price Chart** | `chart/price-chart.tsx` | Основной свечной график с индикаторами |
| **Mini Chart** | `chart/mini-chart.tsx` | Компактный график для виджетов |
| **Multi Chart Panel** | `chart/multi-chart-panel.tsx` | Мульти-графиковая панель с grid layout |
| **Order Markers** | `chart/order-markers.tsx` | Маркеры ордеров на графике |
| **One Click Trading** | `chart/one-click-trading.tsx` | Быстрая торговля кликом по графику |
| **Chart Indicators** | `indicators/indicators-panel.tsx` | Панель управления индикаторами |

### Покрытие раздела

- **Компонентов:** 6
- **Документировано:** 100%
- **Типы:** Полностью типизировано (TypeScript)

---

## 1. Price Chart

Основной компонент свечного графика с поддержкой индикаторов, real-time обновлений и торговой функциональности.

### Расположение

```
src/components/chart/price-chart.tsx
```

### Возможности

- Свечной график (Candlestick)
- Real-time обновления через WebSocket
- Множественные таймфреймы (1m, 5m, 15m, 1H, 4H, 1D)
- Наложение индикаторов (overlay)
- Осцилляторы в отдельной панели (pane)
- Объём с цветовой дифференциацией
- Маркеры ордеров на графике
- One-click торговля
- Горячие клавиши (hotkeys)
- Кроссхейр с тултипом

### Props интерфейсы

```typescript
// Внутренние типы данных
interface ChartCandle {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Конфигурация индикатора
interface IndicatorConfig {
  id: string;
  indicator: BuiltInIndicator;
  inputs: Record<string, number | string | boolean>;
  visible: boolean;
}

// Данные тултипа
interface TooltipData {
  time: Time | null;
  open: number | null;
  high: number | null;
  low: number | null;
  close: number | null;
  volume: number | null;
  indicators: Array<{ name: string; value: number | null; color: string }>;
}
```

### Константы

```typescript
// Доступные таймфреймы
const TIMEFRAMES = [
  { id: "1m", label: "1m", seconds: 60 },
  { id: "5m", label: "5m", seconds: 300 },
  { id: "15m", label: "15m", seconds: 900 },
  { id: "1h", label: "1H", seconds: 3600 },
  { id: "4h", label: "4H", seconds: 14400 },
  { id: "1d", label: "1D", seconds: 86400 },
];

// Популярные символы
const SYMBOLS = [
  "BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "XRPUSDT",
  "DOGEUSDT", "ADAUSDT", "AVAXUSDT", "DOTUSDT", "LINKUSDT",
];
```

### Использование

```tsx
import { PriceChart } from "@/components/chart/price-chart";

// Базовое использование
<PriceChart />
```

### Интеграция с PriceProvider

Компонент использует существующее WebSocket соединение через `PriceProvider`:

```typescript
const { prices, connectionStatus } = usePriceContext();

// Real-time обновления
useEffect(() => {
  const priceData = prices[symbol];
  if (!priceData || !isRealtimeConnected) return;
  
  // Обновление последней свечи
  candleSeriesRef.current?.update(updatedCandle);
}, [prices, symbol]);
```

### Обработка данных

```typescript
// Валидация свечи
function isValidCandle(d: ChartCandle): boolean {
  return (
    typeof d.time === 'number' &&
    typeof d.open === 'number' && !isNaN(d.open) &&
    typeof d.high === 'number' && !isNaN(d.high) &&
    typeof d.low === 'number' && !isNaN(d.low) &&
    typeof d.close === 'number' && !isNaN(d.close) &&
    d.high >= d.low &&
    d.high >= Math.max(d.open, d.close) &&
    d.low <= Math.min(d.open, d.close)
  );
}

// Конвертация в данные объёма
function toVolumeData(data: ChartCandle[]): HistogramData<Time>[] {
  return data.filter(isValidCandle).map((d) => ({
    time: d.time,
    value: d.volume,
    color: d.close >= d.open 
      ? "rgba(38, 166, 154, 0.5)" 
      : "rgba(239, 83, 80, 0.5)",
  }));
}
```

### События

| Событие | Описание |
|---------|----------|
| `subscribeCrosshairMove` | Отслеживание позиции курсора для тултипа |
| `subscribeClick` | Клик по графику (для one-click trading) |
| `onSymbolChange` | Смена символа |
| `onTimeframeChange` | Смена таймфрейма |
| `onRefresh` | Принудительное обновление данных |

### Горячие клавиши

```typescript
// Хук useTradingHotkeys
useTradingHotkeys({
  onBuy: () => { /* Открыть диалог покупки */ },
  onSell: () => { /* Открыть диалог продажи */ },
  onRefresh: () => handleRefresh(),
  config: { enabled: true },
});

// Справка по горячим клавишам
const HOTKEYS_HELP = [
  { key: 'B', description: 'Быстрая покупка' },
  { key: 'S', description: 'Быстрая продажа' },
  { key: 'R', description: 'Обновить график' },
  { key: '?', description: 'Справка по клавишам' },
];
```

---

## 2. Mini Chart

Компактный график для использования в виджетах, карточках и dashboard.

### Расположение

```
src/components/chart/mini-chart.tsx
```

### Props интерфейс

```typescript
interface MiniChartProps {
  /** ID биржи (по умолчанию: "binance") */
  exchangeId?: string;
  
  /** Торговая пара (по умолчанию: "BTCUSDT") */
  symbol?: string;
  
  /** Таймфрейм (по умолчанию: "1h") */
  timeframe?: string;
  
  /** Уникальный ID графика */
  chartId?: string;
}
```

### Использование

```tsx
import { MiniChart } from "@/components/chart/mini-chart";

// В виджете дашборда
<div className="h-32 w-full">
  <MiniChart 
    symbol="BTCUSDT" 
    timeframe="1h" 
  />
</div>

// В карточке бота
<BotCard>
  <MiniChart 
    symbol={bot.symbol}
    exchangeId={bot.exchangeId}
  />
</BotCard>
```

### Особенности

- **Без интерактивности:** Отключены масштабирование и прокрутка
- **Скрытый crosshair:** Режим `mode: 0`
- **Скрытая шкала времени:** `visible: false`
- **Оптимизирован для размера:** Загружает 100 свечей (вместо 500)

### Конфигурация графика

```typescript
const chart = createChart(container, {
  layout: {
    background: { type: ColorType.Solid, color: "#0a0a0b" },
    textColor: "#4c525e",
  },
  grid: {
    vertLines: { color: "#1a1a1d" },
    horzLines: { color: "#1a1a1d" },
  },
  rightPriceScale: {
    borderColor: "#1a1a1d",
    borderVisible: false,
  },
  timeScale: {
    borderColor: "#1a1a1d",
    borderVisible: false,
    visible: false,  // Скрыть временную шкалу
  },
  handleScale: false,  // Отключить масштабирование
  handleScroll: false, // Отключить прокрутку
  crosshair: {
    mode: 0, // Скрыть crosshair
  },
});
```

---

## 3. Multi Chart Panel

Панель для отображения нескольких графиков с drag-and-drop grid layout.

### Расположение

```
src/components/chart/multi-chart-panel.tsx
```

### Props интерфейсы

```typescript
interface ChartLayout {
  i: string;           // Уникальный ID
  x: number;           // Позиция X в grid
  y: number;           // Позиция Y в grid
  w: number;           // Ширина в колонках
  h: number;           // Высота в строках
  minW?: number;       // Мин. ширина
  minH?: number;       // Мин. высота
  maxW?: number;       // Макс. ширина
  maxH?: number;       // Макс. высота
  symbol: string;      // Торговая пара
  timeframe: string;   // Таймфрейм
}

interface MultiChartConfig {
  cols: number;              // Кол-во колонок (по умолчанию: 12)
  rowHeight: number;         // Высота строки в px (по умолчанию: 100)
  margin: [number, number];  // Отступы [x, y]
  containerPadding: [number, number];
  verticalCompact: boolean;
  preventCollision: boolean;
}

interface MultiChartPanelProps {
  /** Функция рендеринга графика */
  renderChart: (symbol: string, timeframe: string, chartId: string) => React.ReactNode;
  
  /** Начальный layout */
  initialLayouts?: ChartLayout[];
  
  /** Callback при изменении layout */
  onLayoutChange?: (layouts: ChartLayout[]) => void;
  
  /** Конфигурация grid */
  config?: Partial<MultiChartConfig>;
  
  /** CSS класс */
  className?: string;
  
  /** Ширина контейнера */
  containerWidth?: number;
}
```

### Пресеты Layout

```typescript
const LAYOUT_PRESETS: Record<string, ChartLayout[]> = {
  "2-horizontal": [
    { i: "chart-1", x: 0, y: 0, w: 6, h: 4, symbol: "BTCUSDT", timeframe: "1h" },
    { i: "chart-2", x: 6, y: 0, w: 6, h: 4, symbol: "ETHUSDT", timeframe: "1h" },
  ],
  "2-vertical": [
    { i: "chart-1", x: 0, y: 0, w: 12, h: 2, symbol: "BTCUSDT", timeframe: "1h" },
    { i: "chart-2", x: 0, y: 2, w: 12, h: 2, symbol: "ETHUSDT", timeframe: "1h" },
  ],
  "3-mixed": [
    { i: "chart-1", x: 0, y: 0, w: 8, h: 3, symbol: "BTCUSDT", timeframe: "1h" },
    { i: "chart-2", x: 8, y: 0, w: 4, h: 3, symbol: "ETHUSDT", timeframe: "1h" },
    { i: "chart-3", x: 8, y: 3, w: 4, h: 3, symbol: "SOLUSDT", timeframe: "1h" },
  ],
  "4-grid": [
    { i: "chart-1", x: 0, y: 0, w: 6, h: 3, symbol: "BTCUSDT", timeframe: "1h" },
    { i: "chart-2", x: 6, y: 0, w: 6, h: 3, symbol: "ETHUSDT", timeframe: "1h" },
    { i: "chart-3", x: 0, y: 3, w: 6, h: 3, symbol: "SOLUSDT", timeframe: "1h" },
    { i: "chart-4", x: 6, y: 3, w: 6, h: 3, symbol: "BNBUSDT", timeframe: "1h" },
  ],
  "6-grid": [
    { i: "chart-1", x: 0, y: 0, w: 4, h: 2, symbol: "BTCUSDT", timeframe: "1h" },
    { i: "chart-2", x: 4, y: 0, w: 4, h: 2, symbol: "ETHUSDT", timeframe: "1h" },
    { i: "chart-3", x: 8, y: 0, w: 4, h: 2, symbol: "SOLUSDT", timeframe: "1h" },
    { i: "chart-4", x: 0, y: 2, w: 4, h: 2, symbol: "BNBUSDT", timeframe: "1h" },
    { i: "chart-5", x: 4, y: 2, w: 4, h: 2, symbol: "XRPUSDT", timeframe: "1h" },
    { i: "chart-6", x: 8, y: 2, w: 4, h: 2, symbol: "DOGEUSDT", timeframe: "1h" },
  ],
};
```

### Использование

```tsx
import { MultiChartPanel, LAYOUT_PRESETS } from "@/components/chart/multi-chart-panel";
import { MiniChart } from "@/components/chart/mini-chart";

function TradingView() {
  const handleLayoutChange = (layouts: ChartLayout[]) => {
    // Сохранить layout в localStorage или state
    console.log("Layout changed:", layouts);
  };

  return (
    <MultiChartPanel
      renderChart={(symbol, timeframe, chartId) => (
        <MiniChart 
          key={chartId}
          symbol={symbol} 
          timeframe={timeframe} 
          chartId={chartId} 
        />
      )}
      initialLayouts={LAYOUT_PRESETS["4-grid"]}
      onLayoutChange={handleLayoutChange}
      containerWidth={1200}
    />
  );
}
```

### Возможности

| Функция | Описание |
|---------|----------|
| **Drag & Drop** | Перетаскивание графиков в режиме редактирования |
| **Resize** | Изменение размера графиков |
| **Add Chart** | Добавление новых графиков (до 9) |
| **Remove Chart** | Удаление графиков (минимум 1) |
| **Presets** | Быстрое переключение между пресетами |
| **Symbol/TF Select** | Смена символа и таймфрейма для каждого графика |

---

## 4. Order Markers

Система отображения ордеров на графике в виде маркеров.

### Расположение

```
src/components/chart/order-markers.tsx
```

### Props интерфейсы

```typescript
interface OrderMarker {
  id: string;
  time: number;              // Unix timestamp (секунды)
  price: number;
  side: "BUY" | "SELL";
  type: "MARKET" | "LIMIT" | "STOP" | "STOP_LIMIT";
  status: "PENDING" | "FILLED" | "CANCELLED" | "REJECTED";
  quantity: number;
  filledQuantity?: number;
  avgPrice?: number;
  symbol: string;
  createdAt: number;
  updatedAt?: number;
  stopPrice?: number;
  reduceOnly?: boolean;
}

interface OrderMarkerConfig {
  showPending: boolean;      // Показывать pending ордера
  showFilled: boolean;       // Показывать filled ордера
  showCancelled: boolean;    // Показывать cancelled ордера
  showStopOrders: boolean;   // Показывать stop ордера
  markerSize: number;        // Размер маркера (по умолчанию: 8)
}

interface ProcessedMarker {
  time: Time;
  position: "aboveBar" | "belowBar";
  color: string;
  shape: "arrowUp" | "arrowDown" | "circle" | "square";
  text: string;
  size: number;
  orderId: string;
  order: OrderMarker;
}
```

### Хук useOrderMarkers

```typescript
function useOrderMarkers(
  orders: OrderMarker[],
  config: Partial<OrderMarkerConfig> = {}
): ProcessedMarker[]
```

### Использование

```tsx
import { useOrderMarkers, OrderMarker } from "@/components/chart/order-markers";

function PriceChartWithMarkers() {
  const [orders, setOrders] = useState<OrderMarker[]>([]);
  
  const config = { showPending: true, showFilled: true };
  const markers = useOrderMarkers(orders, config);

  // Применение маркеров к серии
  useEffect(() => {
    if (candleSeriesRef.current && markers.length > 0) {
      candleSeriesRef.current.setMarkers(
        markers.map(m => ({
          time: m.time,
          position: m.position,
          color: m.color,
          shape: m.shape,
          text: m.text,
        }))
      );
    }
  }, [markers]);
}
```

### Цветовая кодировка

| Статус | Buy | Sell |
|--------|-----|------|
| **PENDING** | `#4caf50` (светло-зелёный) | `#f44336` (светло-красный) |
| **FILLED** | `#26a69a` (зелёный) | `#ef5350` (красный) |
| **CANCELLED** | `#6b7280` (серый) | `#6b7280` (серый) |
| **Stop Price** | `#ff9800` (оранжевый) | `#ff9800` (оранжевый) |

### Формы маркеров

| Тип ордера | Форма |
|------------|-------|
| **MARKET** | `arrowUp` / `arrowDown` |
| **LIMIT** | `circle` |
| **STOP / STOP_LIMIT** | `square` |

### Вспомогательные функции

```typescript
// Создание маркера из сделки
function createOrderMarkerFromTrade(trade: {
  id: string;
  symbol: string;
  side: "BUY" | "SELL";
  price: number;
  quantity: number;
  type: "MARKET" | "LIMIT";
  timestamp: number;
}): OrderMarker

// Получение статистики ордеров
function getOrderMarkerStats(orders: OrderMarker[]): {
  total: number;
  pending: number;
  filled: number;
  cancelled: number;
  buyOrders: number;
  sellOrders: number;
  totalVolume: number;
  averageFillPrice: number;
}
```

---

## 5. One Click Trading

Компонент для быстрой торговли путём клика по графику.

### Расположение

```
src/components/chart/one-click-trading.tsx
```

### Props интерфейсы

```typescript
interface OneClickTradeParams {
  symbol: string;
  side: "BUY" | "SELL";
  price: number;
  quantity: number;
  type: "MARKET" | "LIMIT";
  stopLoss?: number;
  takeProfit?: number;
  reduceOnly?: boolean;
}

interface OneClickTradingConfig {
  enabled: boolean;              // Включена ли функция
  defaultQuantity: number;       // Кол-во по умолчанию
  defaultType: "MARKET" | "LIMIT";
  slippageTolerance: number;     // Допуск проскальзывания (%)
  showConfirmation: boolean;     // Показывать диалог подтверждения
  quickSizes: number[];          // Быстрые размеры (% от баланса)
  defaultStopLossPercent?: number;
  defaultTakeProfitPercent?: number;
}

interface OneClickTradingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  params: OneClickTradeParams | null;
  onConfirm: (params: OneClickTradeParams) => Promise<void>;
  currentPrice: number;
  balance: number;
  config?: Partial<OneClickTradingConfig>;
}
```

### Конфигурация по умолчанию

```typescript
const DEFAULT_CONFIG: OneClickTradingConfig = {
  enabled: false,        // Отключено по умолчанию для безопасности
  defaultQuantity: 0.001,
  defaultType: "MARKET",
  slippageTolerance: 0.5,
  showConfirmation: true,
  quickSizes: [1, 5, 10, 25, 50, 100],
  defaultStopLossPercent: 2,
  defaultTakeProfitPercent: 4,
};
```

### Использование

```tsx
import { 
  OneClickTradingDialog, 
  useOneClickTrading,
  OneClickTradingConfig 
} from "@/components/chart/one-click-trading";

function PriceChart() {
  const [oneClickEnabled, setOneClickEnabled] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tradeParams, setTradeParams] = useState<OneClickTradeParams | null>(null);

  const config: OneClickTradingConfig = {
    enabled: oneClickEnabled,
    defaultQuantity: 0.001,
    defaultType: "MARKET",
    slippageTolerance: 0.5,
    showConfirmation: true,
    quickSizes: [1, 5, 10, 25, 50, 100],
  };

  // Подписка на клики по графику
  const { dialogOpen, tradeParams } = useOneClickTrading(
    chartRef.current,
    candleSeriesRef.current,
    config
  );

  const handleConfirm = async (params: OneClickTradeParams) => {
    // Отправить ордер на биржу
    await submitOrder(params);
  };

  return (
    <>
      {/* Кнопка включения */}
      <Button
        variant={oneClickEnabled ? "default" : "outline"}
        onClick={() => setOneClickEnabled(!oneClickEnabled)}
      >
        <MousePointer2 className="h-3 w-3 mr-1" />
        1-Click
      </Button>

      {/* Диалог подтверждения */}
      <OneClickTradingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        params={tradeParams}
        onConfirm={handleConfirm}
        currentPrice={currentPrice}
        balance={balance}
        config={config}
      />
    </>
  );
}
```

### Возможности диалога

| Функция | Описание |
|---------|----------|
| **Quick Size** | Быстрый выбор размера (% от баланса) |
| **Order Type** | Переключение Market / Limit |
| **Limit Price** | Установка цены для limit ордера |
| **Stop Loss** | Автоматический SL с предлагаемым значением |
| **Take Profit** | Автоматический TP с предлагаемым значением |
| **Reduce Only** | Опция закрытия позиции |
| **Summary** | Расчёт стоимости и баланса после сделки |

### Интеграция с графиком

```typescript
// Подписка на клики
useEffect(() => {
  if (!chart || !candleSeries || !config.enabled) return;

  const handleClick = (param: MouseEventParams) => {
    if (!param.point || !param.time) return;

    const price = param.point.y;
    
    // Определение стороны по позиции клика
    const suggestedSide: "BUY" | "SELL" = 
      price < currentPrice ? "BUY" : "SELL";

    setTradeParams({
      symbol: "BTCUSDT",
      side: suggestedSide,
      price: price,
      quantity: config.defaultQuantity,
      type: config.defaultType,
    });
    setDialogOpen(true);
  };

  chart.subscribeClick(handleClick);

  return () => {
    chart.unsubscribeClick(handleClick);
  };
}, [chart, candleSeries, config]);
```

---

## 6. Chart Indicators

Панель управления индикаторами для добавления на график.

### Расположение

```
src/components/indicators/indicators-panel.tsx
```

### Props интерфейс

```typescript
interface IndicatorConfig {
  id: string;
  indicator: BuiltInIndicator;
  inputs: Record<string, number | string | boolean>;
  visible: boolean;
}

interface IndicatorsPanelProps {
  /** Callback при изменении списка индикаторов */
  onIndicatorsChange?: (indicators: IndicatorConfig[]) => void;
}
```

### Использование

```tsx
import { IndicatorsPanel } from "@/components/indicators/indicators-panel";

function PriceChart() {
  const [activeIndicators, setActiveIndicators] = useState<IndicatorConfig[]>([]);

  return (
    <div className="flex">
      <div className="w-64 border-r">
        <IndicatorsPanel onIndicatorsChange={setActiveIndicators} />
      </div>
      <div className="flex-1">
        {/* Рендеринг графика с индикаторами */}
      </div>
    </div>
  );
}
```

### Категории индикаторов

| Категория | Индикаторы |
|-----------|------------|
| **Moving Average** | SMA, EMA, WMA, VWMA |
| **Oscillator** | RSI, MACD, Stochastic, CCI |
| **Volatility** | Bollinger Bands, ATR, Keltner |
| **Volume** | OBV, Volume MA, VWAP |
| **Trend** | ADX, Ichimoku, Parabolic SAR |
| **Pivot** | Pivot Points, Fibonacci |

### Возможности панели

- Добавление/удаление индикаторов
- Переключение видимости (toggle)
- Настройка параметров (inputs)
- Фильтрация по категориям
- Сворачиваемый интерфейс

### Интеграция с PriceChart

```typescript
// В PriceChart
const handleIndicatorsChange = useCallback((indicators: IndicatorConfig[]) => {
  setActiveIndicators(indicators);
}, []);

// Разделение на overlay и pane индикаторы
const { overlayIndicators, paneIndicators } = useMemo(() => {
  const overlay: IndicatorConfig[] = [];
  const pane: IndicatorConfig[] = [];
  
  activeIndicators.filter(i => i.visible).forEach(config => {
    if (config.indicator.overlay) {
      overlay.push(config);
    } else {
      pane.push(config);
    }
  });
  
  return { overlayIndicators: overlay, paneIndicators: pane };
}, [activeIndicators]);

// Рендеринг overlay индикаторов
useEffect(() => {
  overlayIndicators.forEach(config => {
    const result = calculateIndicator(config.indicator, candles, config.inputs);
    
    result.lines.forEach(line => {
      const lineSeries = chart.addSeries(LineSeries, {
        color: line.color,
        lineWidth: 1,
      });
      lineSeries.setData(line.data);
    });
  });
}, [candles, overlayIndicators]);
```

---

## 🔗 Интеграция с Lightweight Charts

Все компоненты используют библиотеку [lightweight-charts](../frameworks/lightweight-charts.md) от TradingView.

### Основные импорты

```typescript
import {
  createChart,
  IChartApi,
  ISeriesApi,
  ColorType,
  CrosshairMode,
  Time,
  LineStyle,
  CandlestickSeries,
  HistogramSeries,
  LineSeries,
} from "lightweight-charts";
import type { 
  CandlestickData, 
  HistogramData, 
  LineData 
} from "lightweight-charts";
```

### Создание графика

```typescript
const chart = createChart(container, {
  width,
  height,
  layout: {
    background: { type: ColorType.Solid, color: "#131722" },
    textColor: "#4c525e",
  },
  grid: {
    vertLines: { color: "#1e222d" },
    horzLines: { color: "#1e222d" },
  },
  crosshair: {
    mode: CrosshairMode.Normal,
    vertLine: {
      color: '#758696',
      width: 1,
      style: LineStyle.Dashed,
    },
    horzLine: {
      color: '#758696',
      width: 1,
      style: LineStyle.Dashed,
    },
  },
  rightPriceScale: {
    borderColor: "#2a2e39",
  },
  timeScale: {
    borderColor: "#2a2e39",
    timeVisible: true,
  },
  panes: [
    { height: 0.7 },  // Основной график
    { height: 0.3 },  // Осцилляторы
  ],
});
```

### Серии

```typescript
// Свечи
const candleSeries = chart.addSeries(CandlestickSeries, {
  upColor: "#26a69a",
  downColor: "#ef5350",
  borderDownColor: "#ef5350",
  borderUpColor: "#26a69a",
  wickDownColor: "#ef5350",
  wickUpColor: "#26a69a",
});

// Объём
const volumeSeries = chart.addSeries(HistogramSeries, {
  priceFormat: { type: "volume" },
  priceScaleId: "volume-scale",
});

// Линия индикатора
const lineSeries = chart.addSeries(LineSeries, {
  color: "#2962FF",
  lineWidth: 1,
  priceLineVisible: false,
  lastValueVisible: false,
});
```

### Множественные панели

```typescript
// Создание графика с панелями
const chart = createChart(container, {
  // ...
  panes: [
    { height: 0.7 },  // 70% - цена
    { height: 0.3 },  // 30% - RSI
  ],
  paneSeparator: {
    color: "#2a2e39",
    hoverColor: "#4c525e",
    width: 2,
  },
});

// Добавление серии в конкретную панель
const rsiSeries = chart.addSeries(LineSeries, options, 1); // pane index = 1
```

---

## 📊 События и интерактивность

### Crosshair Move

```typescript
chart.subscribeCrosshairMove((param) => {
  if (!param.time || !param.point) {
    setShowTooltip(false);
    return;
  }

  const candleData = param.seriesData.get(candleSeriesRef.current!);
  const volumeData = param.seriesData.get(volumeSeriesRef.current!);

  if (candleData && 'open' in candleData) {
    setTooltip({
      time: param.time,
      open: candleData.open,
      high: candleData.high,
      low: candleData.low,
      close: candleData.close,
      volume: volumeData && 'value' in volumeData ? volumeData.value : null,
    });
    setShowTooltip(true);
  }
});
```

### Click

```typescript
chart.subscribeClick((param) => {
  if (!param.point || !param.time) return;
  
  const price = param.point.y;
  console.log('Clicked at price:', price);
});
```

### Visible Range Change

```typescript
chart.timeScale().subscribeVisibleTimeRangeChange((range) => {
  if (!range) return;
  console.log('Visible range:', range.from, 'to', range.to);
});
```

---

## 🎨 Стилизация

### CSS переменные

```css
/* Тёмная тема */
.chart-dark {
  --chart-bg: #131722;
  --chart-text: #4c525e;
  --chart-grid: #1e222d;
  --chart-border: #2a2e39;
  --chart-crosshair: #758696;
  --chart-up: #26a69a;
  --chart-down: #ef5350;
}
```

### Применение темы

```typescript
const chartOptions = {
  layout: {
    background: { type: ColorType.Solid, color: "var(--chart-bg)" },
    textColor: "var(--chart-text)",
  },
  grid: {
    vertLines: { color: "var(--chart-grid)" },
    horzLines: { color: "var(--chart-grid)" },
  },
};
```

---

## 🚀 Примеры использования

### Базовый график

```tsx
import { PriceChart } from "@/components/chart/price-chart";

export function TradingPage() {
  return (
    <div className="h-[600px]">
      <PriceChart />
    </div>
  );
}
```

### Мульти-графиковая панель

```tsx
import { MultiChartPanel } from "@/components/chart/multi-chart-panel";
import { MiniChart } from "@/components/chart/mini-chart";

export function MultiChartView() {
  return (
    <div className="h-[800px]">
      <MultiChartPanel
        renderChart={(symbol, tf, id) => (
          <MiniChart symbol={symbol} timeframe={tf} chartId={id} />
        )}
      />
    </div>
  );
}
```

### График с маркерами ордеров

```tsx
import { PriceChart } from "@/components/chart/price-chart";
import { useOrderMarkers, OrderMarker } from "@/components/chart/order-markers";

function ChartWithOrders() {
  const [orders, setOrders] = useState<OrderMarker[]>([]);
  const markers = useOrderMarkers(orders, { showFilled: true });

  // orders обновляются автоматически в PriceChart через setOrders

  return <PriceChart />;
}
```

---

## 📚 Связанные документы

- [lightweight-charts.md](../frameworks/lightweight-charts.md) - Документация библиотеки
- [INDICATORS_CLASSIFICATION.md](../INDICATORS_CLASSIFICATION.md) - Классификация индикаторов
- [OHLCV-SYSTEM.md](../OHLCV-SYSTEM.md) - Система получения данных
- [PRICE_SERVICE.md](../microservices/price-service.md) - Микросервис цен
- [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) - Дизайн-система

---

## ⚠️ Best Practices

### 1. Очистка ресурсов

```typescript
useEffect(() => {
  const chart = createChart(container, options);
  
  return () => {
    chart.remove(); // Важно!
  };
}, []);
```

### 2. Валидация данных

```typescript
// Всегда фильтруйте данные перед установкой
const validData = candles.filter(isValidCandle);
candleSeries.setData(validData);
```

### 3. Throttling real-time обновлений

```typescript
// Ограничение частоты обновлений (250ms)
const now = Date.now();
if (now - lastUpdateRef.current < 250) return;
```

### 4. Использование useRef

```typescript
// ✅ Правильно
const chartRef = useRef<IChartApi | null>(null);

// ❌ Неправильно
let chart: IChartApi | null = null;
```

### 5. ResizeObserver

```typescript
useEffect(() => {
  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(container);
  
  return () => resizeObserver.disconnect();
}, []);
```

---

*Last updated: March 2026 | CITARION Documentation Team*
