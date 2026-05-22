# Analytics

> Product analytics and event tracking for the MERIDIAN platform.

---

## PostHog Integration

PostHog provides product analytics, feature flags, and session recording.

### Setup

1. Create a PostHog project
2. Add the API key to environment variables:
   ```
   NEXT_PUBLIC_POSTHOG_KEY=phc_your-key
   NEXT_PUBLIC_ENABLE_ANALYTICS=true
   ```
3. The PostHog provider is configured in `src/providers/`.

### Tracked Events

#### Page Views

| Event | Properties |
|---|---|
| `Page Viewed` | `path`, `route`, `referrer` |
| `Dashboard Viewed` | `kpis_visible`, `time_range` |

#### Business Events

| Event | Properties |
|---|---|
| `Catalog Created` | `product_name`, `sku`, `category` |
| `Vendor Added` | `vendor_name`, `tier` |
| `Order Created` | `order_id`, `amount`, `vendor` |
| `Order Fulfilled` | `order_id`, `fulfillment_time` |
| `Inventory Alert` | `sku`, `remaining`, `threshold` |
| `Invoice Generated` | `invoice_id`, `amount` |

#### User Events

| Event | Properties |
|---|---|
| `User Signed In` | `method` (oauth, email) |
| `Settings Updated` | `section` |
| `Profile Updated` | `fields_changed` |

---

## Feature Flags

PostHog feature flags enable gradual rollouts:

| Flag | Description | Default |
|---|---|---|
| `realtime-inventory` | Real-time inventory updates | `true` (100%) |
| `billing-v2` | New billing interface | `false` (beta) |
| `dark-mode` | Dark mode toggle | `false` (5%) |

---

## Privacy & Compliance

- Analytics are opt-out via user settings
- No personally identifiable information (PII) in event properties
- IP anonymization enabled
- Data retention: 12 months
- Cookie-less tracking option available

---

## Dashboards

### Executive Dashboard

- Daily active users
- Revenue trends
- Order volume
- Top vendors by spend

### Engineering Dashboard

- Error rates by route
- API response times
- Client-side rendering performance
- Feature flag adoption

### Product Dashboard

- Feature adoption rates
- User flow analysis
- Conversion funnels (catalog → order → fulfillment)
- Session recordings for UX improvement

---

## Custom Events

```ts
import { usePostHog } from '@/providers/PostHogProvider';

function TrackButton() {
  const posthog = usePostHog();

  return (
    <button onClick={() => {
      posthog.capture('Custom Event', { property: 'value' });
    }}>
      Track
    </button>
  );
}
```
