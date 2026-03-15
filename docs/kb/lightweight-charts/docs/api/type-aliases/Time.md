# Type Alias: Time

**Source:** https://tradingview.github.io/lightweight-charts/docs/api/type-aliases/Time

The time type used for chart data points.

---

## Type Declaration

```typescript
type Time = UTCTimestamp | BusinessDay | string;
```

---

## Remarks

The `Time` type represents time in one of the following formats:

1. **UTCTimestamp** - Unix timestamp in seconds
2. **BusinessDay** - Object representing a business day
3. **string** - ISO 8601 date string

---

## Examples

### Using UTCTimestamp

```javascript
const data = [
    { time: 1609459200, value: 100 }, // 2021-01-01 00:00:00 UTC
    { time: 1609545600, value: 105 }, // 2021-01-02 00:00:00 UTC
];
```

### Using BusinessDay Object

```javascript
const data = [
    { time: { year: 2024, month: 1, day: 1 }, value: 100 },
    { time: { year: 2024, month: 1, day: 2 }, value: 105 },
];
```

### Using ISO 8601 String

```javascript
const data = [
    { time: '2024-01-01', value: 100 },
    { time: '2024-01-02', value: 105 },
    { time: '2024-01-03T00:00:00Z', value: 102 },
];
```

---

## See Also

- [UTCTimestamp](./UTCTimestamp.md)
- [BusinessDay](../interfaces/BusinessDay.md)
- [isUTCTimestamp](../functions/isUTCTimestamp.md)
- [isBusinessDay](../functions/isBusinessDay.md)
