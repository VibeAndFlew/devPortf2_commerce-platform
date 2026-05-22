# Security Model

> Authentication, authorization, and data protection for the MERIDIAN platform.

---

## Authentication

### Session-Based Auth

MERIDIAN uses HTTP-only session cookies for authentication:

```
Cookie: meridian_session=<encrypted-token>
```

### Auth Flow

1. User submits credentials (email/password or OAuth)
2. Server validates credentials against database
3. Server creates an encrypted session token
4. Token stored in HTTP-only, secure, SameSite cookie
5. Subsequent requests include the cookie automatically
6. Middleware validates the session on protected routes

### Session Configuration

| Setting | Value |
|---|---|
| Cookie name | `meridian_session` |
| HTTP-only | `true` |
| Secure | `true` (production) |
| SameSite | `Lax` |
| Max age | 7 days |
| Rotation | On privilege escalation |

---

## Authorization

### Role-Based Access Control (RBAC)

| Role | Permissions |
|---|---|
| **Admin** | Full system access, user management, billing |
| **Manager** | Create/Edit orders, manage vendors, view analytics |
| **Viewer** | Read-only access to all modules |

### Route Protection

Next.js middleware checks session + role on every protected route:

```ts
// src/middleware.ts
export function middleware(request: NextRequest) {
  const session = request.cookies.get('meridian_session');
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}
```

### API Protection

All API routes verify:

1. Valid session token
2. Required role for the operation
3. Organization ID matches request data

---

## Data Protection

### In Transit

| Measure | Implementation |
|---|---|
| TLS | All traffic over TLS 1.3 |
| HSTS | `max-age=63072000; includeSubDomains; preload` |
| CSP | Restricted script/style sources |
| Security headers | X-Content-Type-Options, X-Frame-Options, X-XSS-Protection |

### At Rest

| Data Type | Protection |
|---|---|
| Passwords | Hashed with bcrypt (cost 12) |
| Sessions | Encrypted with `AUTH_SECRET` |
| API keys | Environment variables, never logged |
| Database | Connection string via env, not hardcoded |

---

## Input Validation

All user input is validated with Zod schemas:

- **Client side**: Form validation before submission
- **Server side**: Re-validated in Server Actions and API routes
- **Sanitization**: No HTML allowed in text fields (escaped by React)

---

## Rate Limiting

Rate limiting protects API routes from abuse (requires Redis):

| Endpoint | Limit | Window |
|---|---|---|
| `/api/auth/login` | 5 requests | 15 minutes |
| `/api/orders` | 100 requests | 1 minute |
| General API | 1000 requests | 1 minute |

---

## CSRF Protection

- SameSite cookie attribute prevents cross-site request forgery
- Double-submit cookie pattern for additional protection
- No CSRF token needed for server actions (origin checked)

---

## Security Headers

All responses include:

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: default-src 'self'; script-src 'self' ...
```

---

## Dependency Security

- `npm audit` runs in CI pipeline
- Dependabot configured for automated dependency updates
- Critical vulnerabilities patched within 48 hours
- Regular review of dependency licenses
