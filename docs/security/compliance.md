# Compliance

> Regulatory compliance for the MERIDIAN platform — GDPR and SOC 2.

---

## GDPR Compliance

### Data Collected

| Field | Purpose | Required |
|---|---|---|
| Email | Authentication, notifications | Yes |
| Name | Display, personalization | Yes |
| Role | Authorization | Yes |
| Organization | Multi-tenant isolation | Yes |
| IP address | Audit logging, security | System |

### User Rights

| Right | Implementation |
|---|---|
| **Right to Access** | Profile page exports user data as JSON |
| **Right to Rectification** | Users can edit profile information |
| **Right to Erasure** | Account deletion endpoint purges all user data |
| **Right to Data Portability** | Full data export in JSON format |
| **Right to Object** | Opt-out of analytics tracking |
| **Right to Restrict** | Account suspension available |

### Data Retention

| Data Type | Retention Period |
|---|---|
| User profiles | Until account deletion + 30 days |
| Order history | 7 years (legal requirement) |
| Session logs | 90 days |
| Analytics events | 12 months |
| Audit logs | 3 years |

### Data Processing Agreement (DPA)

Available upon request for enterprise customers. Covers:

- Data processing purposes
- Sub-processor list
- Security measures
- Data breach notification procedures

---

## SOC 2 Compliance (Target)

### Security

| Control | Implementation |
|---|---|
| Access control | RBAC with least privilege |
| Logical access | Per-organization data isolation |
| Change management | Git-based CI/CD with branch protection |
| Vulnerability management | Regular dependency scanning |
| Incident response | Documented IR plan with 24h SLA |
| Encryption | TLS 1.3 in transit, encryption at rest |
| Audit logging | All access and mutations logged |

### Availability

| Control | Implementation |
|---|---|
| Uptime monitoring | External health check every 5 minutes |
| Disaster recovery | Daily encrypted backups |
| Incident response | PagerDuty escalation for Sev-1 |
| Capacity planning | Performance monitoring with threshold alerts |

### Processing Integrity

| Control | Implementation |
|---|---|
| Data validation | Zod schemas on all inputs |
| Error handling | Structured errors, no data leakage |
| Reconciliation | Three-way matching for procurement |
| Audit trail | Immutable log of all state changes |

### Confidentiality

| Control | Implementation |
|---|---|
| Data classification | All user data treated as confidential |
| Access logging | Every read/write operation logged |
| Data masking | PII masked in logs and exports |
| Non-disclosure | Covered in employment contracts |

---

## Cookie Compliance

| Cookie | Type | Purpose | Duration |
|---|---|---|---|
| `meridian_session` | Essential | Authentication | Session + 7 days |
| `ph_*` | Analytics | PostHog tracking | 12 months |
| `theme` | Preference | UI theme selection | 12 months |

- Essential cookies require no consent
- Analytics cookies require explicit opt-in
- Cookie consent banner displayed on first visit

---

## Data Processing Sub-processors

| Sub-processor | Service | Location |
|---|---|---|
| Vercel Inc. | Hosting | United States |
| PostHog Inc. | Analytics | United States |
| Sentry.io | Error tracking | United States |
| Redis Labs | Caching | United States |

---

## Breach Notification

In the event of a data breach:

1. **Detection**: Within 1 hour
2. **Containment**: Within 4 hours
3. **Notification**: Within 24 hours to affected parties
4. **Regulatory**: Within 72 hours to supervisory authority (GDPR)
5. **Remediation**: Root cause analysis within 7 days

---

## Compliance Contact

- **DPO**: dpo@meridian-platform.com
- **Security**: security@meridian-platform.com
- **GDPR requests**: privacy@meridian-platform.com
