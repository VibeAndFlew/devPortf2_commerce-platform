# API Reference

> REST API endpoints and usage for the MERIDIAN platform.

---

## Base URL

```
https://your-domain.com/api
```

## Authentication

All API requests require a valid session cookie or Bearer token:

```
Authorization: Bearer <token>
Cookie: meridian_session=<session-token>
```

---

## Endpoints

### Catalogs

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/catalogs` | List all catalogs |
| `GET` | `/api/catalogs/:id` | Get catalog details |
| `POST` | `/api/catalogs` | Create new catalog entry |
| `PUT` | `/api/catalogs/:id` | Update catalog entry |
| `DELETE` | `/api/catalogs/:id` | Delete catalog entry |

**GET /api/catalogs**

Query parameters:
| Param | Type | Description |
|---|---|---|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 20, max: 100) |
| `search` | string | Search by name or SKU |
| `category` | string | Filter by category |
| `sort` | string | Sort field (name, created_at, price) |
| `order` | `asc` \| `desc` | Sort direction |

Response:
```json
{
  "data": [
    {
      "id": "cat_abc123",
      "sku": "SKU-001",
      "name": "Product Name",
      "category": "Electronics",
      "price": 29.99,
      "stock": 150,
      "created_at": "2026-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "total_pages": 8
  }
}
```

---

### Vendors

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/vendors` | List all vendors |
| `GET` | `/api/vendors/:id` | Get vendor details |
| `POST` | `/api/vendors` | Create new vendor |
| `PUT` | `/api/vendors/:id` | Update vendor |
| `DELETE` | `/api/vendors/:id` | Delete vendor |

---

### Inventory

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/inventory` | List inventory items |
| `GET` | `/api/inventory/:sku` | Get item by SKU |
| `PUT` | `/api/inventory/:sku` | Update stock level |
| `GET` | `/api/inventory/alerts` | Get low-stock alerts |

---

### Orders

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/orders` | List orders |
| `GET` | `/api/orders/:id` | Get order details |
| `POST` | `/api/orders` | Create new order |
| `PUT` | `/api/orders/:id` | Update order |
| `PUT` | `/api/orders/:id/status` | Update order status |

---

### Procurement

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/procurement` | List purchase requests |
| `GET` | `/api/procurement/:id` | Get request details |
| `POST` | `/api/procurement` | Create purchase request |
| `PUT` | `/api/procurement/:id/approve` | Approve request |
| `PUT` | `/api/procurement/:id/reject` | Reject request |

---

### Warehouses

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/warehouses` | List warehouses |
| `GET` | `/api/warehouses/:id` | Get warehouse details |
| `POST` | `/api/warehouses` | Create warehouse |
| `PUT` | `/api/warehouses/:id` | Update warehouse |

---

### Billing

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/billing/invoices` | List invoices |
| `GET` | `/api/billing/invoices/:id` | Get invoice details |
| `GET` | `/api/billing/payments` | List payments |
| `POST` | `/api/billing/payments` | Record payment |

---

## Error Responses

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found",
    "details": {
      "id": "cat_abc123"
    }
  }
}
```

### HTTP Status Codes

| Code | Description |
|---|---|
| `200` | Success |
| `201` | Created |
| `400` | Bad request (validation error) |
| `401` | Unauthorized (no session) |
| `403` | Forbidden (insufficient role) |
| `404` | Not found |
| `429` | Rate limited |
| `500` | Internal server error |

---

## Pagination

All list endpoints support cursor-based or offset pagination:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "total_pages": 8,
    "has_next": true,
    "has_prev": false
  }
}
```

## Rate Limiting

| Limit | Window |
|---|---|
| 1000 requests | per minute |
| Burst: 100 requests | per second |

Rate limit headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 987
X-RateLimit-Reset: 1684724400
```
