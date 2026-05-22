# Webhooks

> Webhook events and handling for the MERIDIAN platform.

---

## Overview

Webhooks allow external services to receive real-time notifications when events occur in the MERIDIAN platform. Webhooks are delivered via HTTP POST to a configured endpoint URL.

---

## Setup

Webhook endpoints can be configured in **Settings → Integrations → Webhooks**.

### Configuration

| Field | Description |
|---|---|
| **URL** | HTTPS endpoint that receives webhook payloads |
| **Events** | One or more events to subscribe to |
| **Secret** | Shared secret for payload signature verification |
| **Active** | Enable/disable the webhook |

---

## Event Delivery

### Retry Policy

| Attempt | Delay |
|---|---|
| 1st | Immediate |
| 2nd | 10 seconds |
| 3rd | 60 seconds |
| 4th | 300 seconds |
| 5th | 1800 seconds |

Webhooks are disabled after 5 consecutive failures. Manual re-enablement required.

### Headers

Every webhook request includes:

| Header | Description |
|---|---|
| `X-MERIDIAN-Event` | Event type (e.g., `order.created`) |
| `X-MERIDIAN-Delivery` | Unique delivery ID |
| `X-MERIDIAN-Signature` | HMAC-SHA256 signature |
| `X-MERIDIAN-Timestamp` | Unix timestamp of event |

### Signature Verification

```ts
import { createHmac, timingSafeEqual } from 'crypto';

function verifySignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expected = createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}
```

---

## Events

### Catalog Events

| Event | Description | Payload |
|---|---|---|
| `catalog.created` | New product created | `{ id, sku, name, category }` |
| `catalog.updated` | Product updated | `{ id, sku, changes }` |
| `catalog.deleted` | Product deleted | `{ id, sku }` |

### Vendor Events

| Event | Description | Payload |
|---|---|---|
| `vendor.created` | New vendor added | `{ id, name, tier }` |
| `vendor.updated` | Vendor updated | `{ id, changes }` |
| `vendor.rated` | Vendor performance rated | `{ id, score }` |

### Inventory Events

| Event | Description | Payload |
|---|---|---|
| `inventory.updated` | Stock level changed | `{ sku, previous, current }` |
| `inventory.low-stock` | Below threshold | `{ sku, remaining, threshold }` |
| `inventory.out-of-stock` | Stock depleted | `{ sku }` |

### Order Events

| Event | Description | Payload |
|---|---|---|
| `order.created` | New order placed | `{ id, vendor, amount }` |
| `order.fulfilled` | Order fulfilled | `{ id, fulfilled_at }` |
| `order.shipped` | Order shipped | `{ id, tracking }` |
| `order.cancelled` | Order cancelled | `{ id, reason }` |

### Procurement Events

| Event | Description | Payload |
|---|---|---|
| `procurement.created` | Purchase request created | `{ id, requester, amount }` |
| `procurement.approved` | Request approved | `{ id, approver }` |
| `procurement.rejected` | Request rejected | `{ id, reason }` |

### Billing Events

| Event | Description | Payload |
|---|---|---|
| `billing.invoice.created` | Invoice generated | `{ id, amount, due_date }` |
| `billing.invoice.paid` | Invoice paid | `{ id, paid_at }` |
| `billing.invoice.overdue` | Invoice overdue | `{ id, days_overdue }` |

---

## Example Payload

```json
{
  "event": "order.created",
  "id": "evt_abc123",
  "created_at": "2026-05-22T14:23:01.000Z",
  "data": {
    "order_id": "ORD-0042",
    "vendor_id": "ven_xyz789",
    "vendor_name": "Acme Supply Co.",
    "amount": 12450.00,
    "items": [
      {
        "sku": "SKU-001",
        "name": "Steel Brackets",
        "quantity": 100,
        "unit_price": 124.50
      }
    ],
    "status": "pending"
  }
}
```

---

## Best Practices

1. **Respond quickly** — Acknowledge with `200 OK` within 5 seconds
2. **Process asynchronously** — Queue work for background processing
3. **Idempotency** — Use `X-MERIDIAN-Delivery` to deduplicate events
4. **Verify signatures** — Always verify the HMAC signature
5. **Log deliveries** — Track webhook events for debugging
6. **Monitor failures** — Set up alerts for webhook delivery failures

### Response Format

```json
{
  "status": "received",
  "delivery_id": "del_abc123"
}
```
