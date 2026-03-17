# CITARION Contributing Guide

> **Last Updated:** March 2025  
> **Target Audience:** All Developers

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Workflow](#development-workflow)
3. [Code Style](#code-style)
4. [Git Workflow](#git-workflow)
5. [Pull Request Process](#pull-request-process)
6. [Testing Requirements](#testing-requirements)
7. [Documentation](#documentation)

---

## Getting Started

### Prerequisites

- **Node.js 20+** or **Bun** (recommended)
- **Python 3.11+** (for ML services)
- **Git**
- **VS Code** (recommended) with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - Prisma

### Initial Setup

```bash
# Clone repository
git clone https://github.com/nix0283/CITARION-2-2.git
cd CITARION-2-2

# Install dependencies
bun install

# Setup environment
cp .env.example .env
# Edit .env with your values

# Setup database
bun run db:push

# Start development server
bun run dev
```

### Verify Setup

```bash
# Run linter
bun run lint

# Run tests
bun run test

# Check types
bun run type-check
```

---

## Development Workflow

### Branch Naming

```
feature/<description>    # New feature
fix/<description>        # Bug fix
refactor/<description>   # Code refactoring
docs/<description>       # Documentation only
test/<description>       # Adding tests
chore/<description>      # Maintenance tasks
```

**Examples:**
- `feature/add-kucoin-exchange`
- `fix/grid-bot-trailing-stop`
- `docs/api-endpoints`

### Commit Workflow

```bash
# 1. Create branch
git checkout -b feature/my-feature

# 2. Make changes and commit
git add .
git commit -m "feat: add my feature"

# 3. Push and create PR
git push origin feature/my-feature
```

### Daily Workflow

```bash
# Start of day
git checkout main
git pull origin main

# Create/continue feature branch
git checkout -b feature/my-feature
# or
git checkout feature/my-feature
git merge main

# Run tests before committing
bun run test

# Run linter
bun run lint --fix
```

---

## Code Style

### TypeScript

```typescript
// ✅ Good
interface Position {
  id: string;
  symbol: string;
  direction: 'LONG' | 'SHORT';
  amount: number;
}

function calculatePnL(position: Position, currentPrice: number): number {
  const multiplier = position.direction === 'LONG' ? 1 : -1;
  return (currentPrice - position.entryPrice) * position.amount * multiplier;
}

// ❌ Bad
function calculatePnl(pos: any, price: any): any {
  return pos.dir === 'LONG' 
    ? (price - pos.entry) * pos.amt 
    : (pos.entry - price) * pos.amt;
}
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `PositionCard.tsx` |
| Hooks | camelCase with `use` prefix | `usePositions.ts` |
| Functions | camelCase | `calculatePnL()` |
| Constants | UPPER_SNAKE_CASE | `MAX_LEVERAGE` |
| Types/Interfaces | PascalCase | `Position`, `BotConfig` |
| Files | kebab-case | `grid-bot.ts` |
| Folders | kebab-case | `grid-bot/` |

### React Components

```tsx
// ✅ Good - Functional component with proper typing
interface PositionCardProps {
  position: Position;
  onClose?: () => void;
  className?: string;
}

export function PositionCard({ 
  position, 
  onClose,
  className 
}: PositionCardProps) {
  const { symbol, direction, unrealizedPnl } = position;
  
  return (
    <Card className={cn('p-4', className)}>
      <div className="flex justify-between">
        <span>{symbol}</span>
        <span className={direction === 'LONG' ? 'text-green-500' : 'text-red-500'}>
          {direction}
        </span>
      </div>
      {onClose && (
        <Button variant="destructive" onClick={onClose}>
          Close
        </Button>
      )}
    </Card>
  );
}

// ❌ Bad - Any types, inline styles
export function PositionCard(props: any) {
  return (
    <div style={{ padding: '16px' }}>
      {props.position.symbol}
    </div>
  );
}
```

### API Routes

```typescript
// ✅ Good - Proper validation and error handling
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { openPositionSchema } from '@/lib/validators';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validated = openPositionSchema.parse(body);

    const result = await openPosition(session.user.id, validated);

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: { code: 'VALIDATION_ERROR', details: error.errors } },
        { status: 400 }
      );
    }
    
    console.error('[POST /api/trade]', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } },
      { status: 500 }
    );
  }
}

// ❌ Bad - No validation, no error handling
export async function POST(request: Request) {
  const body = await request.json();
  const result = await openPosition(body); // No validation
  return Response.json(result); // No error handling
}
```

### ESLint Configuration

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "prefer-const": "error",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
```

---

## Git Workflow

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

#### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation |
| `style` | Code style (formatting, etc.) |
| `refactor` | Code refactoring |
| `test` | Adding/updating tests |
| `chore` | Maintenance tasks |
| `perf` | Performance improvement |

#### Examples

```bash
# Feature
feat(grid-bot): add trailing grid support

# Bug fix
fix(trade): correct PnL calculation for SHORT positions

# Breaking change
feat(api)!: change position response format

BREAKING CHANGE: Position response now includes funding data
```

### Commit Message Template

```bash
# .gitmessage
# <type>(<scope>): <description>
# |<----  Using a Maximum Of 50 Characters  ---->|

# Explain why this change is being made
# |<----   Try To Limit Each Line to a Maximum Of 72 Characters   ---->|

# Provide links or keys to any relevant tickets, articles or other resources
# Example: Fixes #123
```

### Branch Strategy

```
main (protected)
  │
  ├── develop
  │     │
  │     ├── feature/new-exchange
  │     ├── feature/dca-improvements
  │     └── fix/position-sync
  │
  └── hotfix/critical-bug
```

---

## Pull Request Process

### Before Creating PR

- [ ] Code compiles without errors
- [ ] All tests pass
- [ ] Linter passes with no errors
- [ ] New code has tests
- [ ] Documentation updated
- [ ] No sensitive data in code

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to change)
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing performed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings introduced

## Screenshots (if applicable)

## Related Issues
Fixes #(issue)
```

### Review Process

1. **Automated Checks**
   - Linter
   - Tests
   - Build
   - Type check

2. **Code Review**
   - At least 1 approval required
   - All conversations resolved
   - No requested changes

3. **Merge**
   - Squash and merge to main
   - Delete feature branch

### Review Checklist

```markdown
## Code Review Checklist

### Functionality
- [ ] Code does what it's supposed to do
- [ ] Edge cases are handled
- [ ] Error handling is appropriate

### Code Quality
- [ ] Code is readable and maintainable
- [ ] No code duplication
- [ ] Functions are not too long
- [ ] Naming is clear and consistent

### Performance
- [ ] No N+1 queries
- [ ] Appropriate data structures
- [ ] No memory leaks

### Security
- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] Proper authentication/authorization

### Testing
- [ ] Tests are meaningful
- [ ] Test coverage is adequate
- [ ] Tests are not flaky
```

---

## Testing Requirements

### Minimum Coverage

| Category | Required Coverage |
|----------|-------------------|
| Core Trading Logic | 90% |
| Indicators | 85% |
| Exchange Clients | 80% |
| API Routes | 75% |
| Components | 70% |

### Running Tests

```bash
# All tests
bun run test

# Watch mode
bun run test:watch

# Coverage
bun run test:coverage

# Specific file
bun test path/to/file.test.ts
```

### Writing Tests

```typescript
// Unit test structure
describe('calculatePnL', () => {
  describe('LONG positions', () => {
    it('should return positive PnL when price increases', () => {
      // Arrange
      const position = { direction: 'LONG', entryPrice: 100, amount: 1 };
      
      // Act
      const pnl = calculatePnL(position, 110);
      
      // Assert
      expect(pnl).toBe(10);
    });

    it('should return negative PnL when price decreases', () => {
      // ...
    });
  });

  describe('SHORT positions', () => {
    // ...
  });

  describe('edge cases', () => {
    it('should handle zero amount', () => {
      // ...
    });

    it('should handle negative prices', () => {
      // ...
    });
  });
});
```

---

## Documentation

### Code Documentation

```typescript
/**
 * Calculates the position size based on Kelly Criterion
 * 
 * @param capital - Total trading capital
 * @param winRate - Historical win rate (0-1)
 * @param avgWin - Average winning trade amount
 * @param avgLoss - Average losing trade amount (positive number)
 * @returns Fraction of capital to risk (0-0.25)
 * 
 * @example
 * ```ts
 * const fraction = calculateKellyFraction(10000, 0.6, 200, 100);
 * // Returns ~0.20 (20% of capital)
 * ```
 */
export function calculateKellyFraction(
  capital: number,
  winRate: number,
  avgWin: number,
  avgLoss: number
): number {
  // Implementation
}
```

### README Updates

When adding new features:

1. Update main README.md
2. Update relevant docs in `/docs`
3. Add inline code comments
4. Update API documentation

### API Documentation

```typescript
/**
 * @api {post} /api/trade Open Position
 * @apiName OpenPosition
 * @apiGroup Trading
 * 
 * @apiHeader {String} Authorization Bearer token
 * 
 * @apiBody {String} symbol Trading pair (e.g., BTCUSDT)
 * @apiBody {String="LONG","SHORT"} direction Position direction
 * @apiBody {Number} amount Position size in base currency
 * @apiBody {Number} [leverage=1] Leverage multiplier
 * @apiBody {Number} [stopLoss] Stop loss price
 * @apiBody {Array} [takeProfits] Take profit targets
 * 
 * @apiSuccess {Boolean} success Request success status
 * @apiSuccess {Object} data Position data
 * 
 * @apiError (401) UNAUTHORIZED Authentication required
 * @apiError (400) VALIDATION_ERROR Invalid parameters
 */
```

---

## Getting Help

- **Documentation:** `/docs` folder
- **Issues:** GitHub Issues
- **Discussions:** GitHub Discussions
- **Code Review:** Tag maintainers in PR

---

## Recognition

Contributors are recognized in:
- README.md contributors section
- Release notes for significant contributions
- GitHub contributors page

Thank you for contributing to CITARION!
