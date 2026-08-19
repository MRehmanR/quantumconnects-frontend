# RetellAI and n8n Live Call Integration Design

**Date:** 2026-08-19

**Status:** Approved in chat for specification

## Objective

Deliver a production-shaped, multi-tenant inbound call system for the Quantum Connects SaaS application. Every registered business must be resolved dynamically from the number that the caller dialed, receive its own Retell agent/instructions/knowledge/configuration, perform tenant-scoped appointment operations during the call, and see only its own resulting call and appointment data in the existing dashboard.

The Hampton Travel RetellAI number ending `6408` is the first real-call acceptance tenant. It is not a hard-coded product path, default tenant, or special case. The same code and workflow definitions must serve all registered businesses by data-driven number-to-tenant resolution.

## Current State

- The Hampton Travel number is imported into Retell and bound to the `Hampton Travel` Retell LLM agent.
- The agent has an existing business prompt of approximately 7,000 characters. That prompt is authoritative business content and must be preserved.
- The agent has only the built-in `end_call` tool.
- The phone number has no Retell inbound webhook.
- The agent has no Retell call-event webhook.
- The backend already has user, number, calls, appointments, knowledge base, usage, automation event, and workflow execution models.
- The backend already exposes partial automation and appointment APIs, but its Retell event parsing and signature verification do not match Retell's current payload/signature contract.
- n8n Cloud is reachable. The supplied workflow files contain inconsistent local/ngrok backend fallbacks and Workflow 11 drops nested booking, reschedule, cancellation, and real Retell call fields.
- The frontend already renders call logs and appointments. Appointments poll every 15 seconds; Overview and Call Logs do not consistently poll.
- The local backend database contains no Hampton Travel tenant. A real call test therefore requires an explicit tenant fixture or synchronized user-to-number-to-agent record in the test database; production routing still uses ordinary registered-business records.

## Architectural Decision

Use a multi-tenant backend-first, n8n-assisted architecture.

The backend is the synchronous security and data boundary for Retell. n8n performs asynchronous orchestration and notifications. Retell and n8n never write directly to the application database.

This decision is preferred over putting n8n directly in the synchronous voice path because it gives the inbound call a smaller latency/failure surface, allows correct raw-body Retell signature verification, keeps tenant authorization in one place, and preserves the backend database as the sole source of truth.

### Rejected Alternatives

1. **Retell directly to n8n for all live operations.** This adds a network hop to every spoken action, makes raw-body signature verification harder, and lets workflow configuration drift become a call-routing risk.
2. **Static per-agent configuration with post-call n8n only.** This is simpler but does not satisfy the requirement to resolve a business by the called number or perform real-time booking and information lookup.

## System Boundaries

### Backend

Repository: `../quantumconnectsio_backend`

Responsibilities:

- Verify Retell requests using the raw request body, `X-Retell-Signature`, timestamp freshness, and `RETELL_API_KEY`.
- Normalize E.164 phone numbers and resolve a tenant by exact inbound number.
- Enforce tenant status, receptionist state/schedule, plan usage, concurrency, and feature toggles.
- Dispatch signed Retell custom-function calls to tenant-scoped services.
- Store calls, contacts, appointments, usage, automation events, and idempotency outcomes.
- Trigger n8n notification/orchestration webhooks after durable database writes.
- Provide authenticated dashboard data.

### n8n

Versioned source location after integration: `../quantumconnectsio_backend/automation/n8n`

Test runtime: a local n8n process started from the repository-pinned command. n8n Cloud is the deployment target only after local workflow and end-to-end validation passes.

Responsibilities:

- Usage threshold alerts.
- Appointment status and confirmation notifications.
- Daily business summaries.
- Google review automation.
- Waitlist response handling.
- Workflow execution telemetry and operational retries.

n8n must call backend APIs with `x-automation-key`. It must not contain a database credential or write SQL.

Every workflow execution must receive or resolve an explicit tenant identity. Static tenant arrays, a default tenant email, and hard-coded business numbers are prohibited.

The canonical backend-to-n8n job envelope is:

```json
{
  "jobType": "appointment.booked",
  "jobId": "stable-idempotency-key",
  "tenant": {
    "id": "database-user-id",
    "email": "business-account-email",
    "inboundNumber": "normalized-business-number",
    "timezone": "IANA-timezone"
  },
  "occurredAt": "ISO-8601-timestamp",
  "payload": {}
}
```

n8n treats the tenant object as routing context and sends it back to protected backend operations. Backend endpoints still re-resolve and authorize the tenant rather than trusting workflow input alone.

### Frontend

Repository: current `quantumconnects-frontend` workspace.

Responsibilities:

- Continue reading calls and appointments only from authenticated backend APIs.
- Refresh live operational pages on a bounded interval and when the window regains focus.
- Show loading and recoverable refresh failures without clearing previously loaded data.

### RetellAI

Responsibilities:

- Receive the phone call and provide speech/LLM execution.
- Call the backend inbound webhook before connecting the call.
- Use each resolved tenant's business-specific prompt plus shared backend tools; preserve the existing Hampton Travel prompt during the canary.
- Send signed custom-function and call-event requests to the backend.

## SaaS Provisioning and Tenant Lifecycle

The live-call integration is part of normal account provisioning, not a manual operation performed for each business.

1. A registered business purchases/imports a unique inbound number and provisions a Retell agent through the existing onboarding APIs.
2. The backend stores the unique normalized inbound number and Retell agent ID on that business's user record.
3. The provisioning service configures the phone's inbound webhook, the agent's event webhook, and the Retell LLM tool definitions from `PUBLIC_API_BASE_URL`.
4. The agent prompt remains business-specific, while tool definitions and backend routes remain shared across all tenants.
5. Updating business settings, booking rules, or knowledge changes backend data used by tools; it does not require cloning workflows.
6. Re-provisioning is idempotent and updates only the selected business's Retell resources.
7. Suspending a tenant causes inbound preflight to apply that tenant's configured reject/fallback behavior without affecting other businesses.

An admin-only reconciliation command audits existing business records against Retell phone/agent configuration and can backfill missing webhooks/tools. It supports a dry-run mode and a single-tenant filter. The first execution targets Hampton Travel; later executions can safely cover all registered businesses.

## End-to-End Call Flow

1. A caller dials any business number provisioned by Quantum Connects. The first acceptance run uses the Hampton Travel number ending `6408`.
2. Retell sends `call_inbound` to `POST /api/automation/retell/inbound`.
3. The backend verifies the Retell signature against the exact raw body.
4. The backend extracts `call_inbound.to_number` and `call_inbound.from_number`, normalizes both, and resolves the tenant by the exact inbound number.
5. The backend runs an idempotent call preflight reservation. Retell retries use the signature timestamp plus from/to numbers as the reservation identity, preventing duplicate usage increments.
6. If the tenant is valid and allowed, the backend returns data from that tenant record:

   - `override_agent_id` for the resolved business's Retell agent;
   - string-only dynamic variables for business name, tenant identifier, caller number, owner/escalation number, timezone, greeting, and active booking rules;
   - metadata containing non-secret tenant and preflight identifiers.

7. If the tenant is inactive or over limit, the response rejects the AI path or selects that tenant's configured fallback behavior. A bound agent may remain Retell's availability fallback if the inbound webhook itself is temporarily unavailable, but no tenant may fall back to another business's agent.
8. During the conversation, the agent follows its existing prompt and calls backend tools whenever live data or a write is required.
9. The backend commits appointment/call changes first, then triggers the relevant n8n webhook.
10. Retell sends `call_started`, `call_ended`, and `call_analyzed` events to `POST /api/automation/retell/events`.
11. The backend upserts one call record per Retell `call_id`, enriches it when analysis arrives, releases the concurrency reservation once, and stores the transcript/contact/analysis fields.
12. The frontend observes the new call and appointment through polling or focus refresh without reading Retell or n8n directly.

## Retell Custom-Function Contract

Retell sends its standard wrapper `{ name, call, args }`. The backend derives the tenant from the signed `call` object and metadata; it never trusts a caller-supplied tenant email or number in `args`.

### `get_business_information`

Input: `query: string`

Behavior: Search only the resolved tenant's active knowledge-base entries and configured receptionist/business details. Return a concise answer and source title. Do not expose owner-only settings, credentials, or another tenant's records.

### `find_upcoming_appointments`

Input: `customer_phone: string`

Behavior: Return the resolved tenant's future Pending/Confirmed appointments matching the normalized caller/customer phone. This supplies appointment IDs needed for reschedule and cancellation.

### `check_appointment_availability`

Input: `date: YYYY-MM-DD`, optional `requested_time: HH:mm`

Behavior: Apply the tenant's timezone, receptionist schedule, booking duration/rules, and existing bookings. Return whether the requested time is available plus at most five alternatives.

### `book_appointment`

Input: customer name, customer phone, optional email, date, time, and service.

Behavior: Recheck availability transactionally, create the appointment and contact for the resolved tenant, and return the appointment ID/status. Repeated tool calls with the same Retell call ID and arguments return the original result.

### `reschedule_appointment`

Input: appointment ID, new date, and new time.

Behavior: Verify the appointment belongs to the resolved tenant and caller, reject occupied/past slots, update it, and return the new details.

### `cancel_appointment`

Input: appointment ID and optional reason.

Behavior: Verify ownership, mark the appointment Cancelled idempotently, then trigger appointment notification and waitlist processing.

The existing `end_call` tool remains. Transfer/escalation uses Retell's built-in transfer tool with the owner number injected as a trusted dynamic variable.

## Retell Event Contract

The backend accepts current Retell event envelopes with `event` and nested `call`.

- `call_started`: record/confirm the active call reservation; do not increment usage a second time.
- `call_ended`: store end time, duration, disconnection reason, status, and the latest transcript; release concurrency once.
- `call_analyzed`: enrich the same call with final transcript, summary, sentiment, success/outcome, and extracted caller fields.

Deduplication key: `retell:<event>:<call_id>`. Call storage uses `call_id` as the stable external identity so ended/analyzed events update rather than duplicate the dashboard row.

## n8n Workflow Integration

The supplied workflows and Postman assets will be copied into the active backend repository and corrected there. The corrected files are first imported into local n8n, tested against the local backend/database, and exported from local n8n as the cloud-import artifacts.

- **Workflow 11:** converted from an unsafe pseudo-Retell synchronous router into a canonical regression/fallback orchestrator that calls the same backend action contracts. It will understand real nested Retell/test payloads, but production live calls will use the signed backend ingress.
- **Workflow 12:** receives usage threshold jobs emitted idempotently by backend preflight.
- **Workflow 13:** receives durable appointment booked/rescheduled/cancelled/status-updated jobs.
- **Workflow 14:** obtains eligible tenants from a protected backend endpoint and generates daily summaries per explicit tenant and timezone. It does not use a static tenant list.
- **Workflow 15:** receives eligible completed-appointment review jobs.
- **Workflow 16:** handles waitlist replies and writes results through the backend.

All workflow URLs must derive from `QC_BACKEND_BASE_URL`. Local tests set it to the local backend origin; cloud import sets it to the production HTTPS backend origin. Hard-coded localhost fallbacks, tenant identifiers, phone numbers, and expired ngrok defaults are removed. Required credentials remain n8n credentials/variables, never committed JSON values.

The Postman collection will test backend auth, inbound business resolution, booking, duplicate booking, reschedule, cancel, information lookup, unknown tenant, invalid signature, and n8n callback behavior. Dates will be generated at runtime so tests never expire.

Local n8n is the mandatory workflow test gate. The repository's existing n8n launcher is used with a task-owned local data directory so tests do not alter unrelated n8n state. After local tests pass, the validated JSON is imported and activated in n8n Cloud by an operator. Cloud variables/credentials are configured separately, and a cloud smoke test must pass before Retell production webhooks are switched.

## Dashboard Synchronization

- Overview refetches every 15 seconds while visible and on window focus.
- Call Logs refetch every 10 seconds while visible and on window focus; search/filter requests are debounced to avoid request storms.
- Appointments retains its 15-second refresh and also refreshes on focus.
- Background refresh errors keep the last successful rows visible and display a non-blocking stale-data warning.
- The frontend does not receive automation credentials and does not call Retell or n8n.

## Security and Data Integrity

- Retell signature verification uses `RETELL_API_KEY`, the raw body plus signature timestamp, a five-minute replay window, and timing-safe digest comparison.
- `RETELL_WEBHOOK_SECRET` is not used as a substitute for Retell's documented signature scheme.
- n8n uses `AUTOMATION_SHARED_KEY` through the `x-automation-key` header.
- Tenant identity comes from an exact normalized inbound number or signed call metadata; tenant email from arbitrary tool arguments is ignored. There is no default or first-user fallback for automation operations.
- Knowledge base, appointments, calls, and contacts are tenant-scoped in every automation operation.
- Side-effecting operations are idempotent because Retell and n8n can retry.
- Secrets, full credentials, and real phone numbers are not committed to workflow JSON, Postman environments, logs, or frontend code.
- Existing uncommitted user changes in both repositories must be preserved. Integration commits stage only task-owned files.

## Configuration

Backend configuration adds or standardizes:

- `PUBLIC_API_BASE_URL`: public HTTPS backend origin used for Retell registration/tool URLs.
- `RETELL_API_KEY`: API access and webhook signature verification.
- `AUTOMATION_SHARED_KEY`: backend-to-n8n shared authentication.
- `N8N_USAGE_THRESHOLD_WEBHOOK_URL`.
- `N8N_MANUAL_APPOINTMENT_WEBHOOK_URL`.
- `N8N_GOOGLE_REVIEW_WEBHOOK_URL`.
- `N8N_WAITLIST_WEBHOOK_URL`.
- `N8N_WORKFLOW_EXECUTION_WEBHOOK_URL` when telemetry is pushed to a dedicated workflow.

Test-only Hampton Travel identifiers are supplied via environment variables or database fixtures, not hard-coded application constants. The test fixture goes through the same resolution path as every other tenant.

Local n8n configuration uses task-owned values for:

- `N8N_USER_FOLDER`: isolated local n8n state under a task-specific directory.
- `QC_BACKEND_BASE_URL`: local backend origin.
- `QC_AUTOMATION_KEY`: the local backend automation key.
- `WEBHOOK_URL`: local/tunnel origin only when Retell must reach local n8n during a real-call test.

Cloud import replaces environment-specific URLs and credentials through n8n Cloud variables/credentials; workflow JSON remains environment-neutral.

## Error Handling

- Invalid Retell signatures return `401` and perform no work.
- Unknown numbers return a controlled reject response and an audit event without revealing tenant data.
- Inactive/out-of-usage tenants follow the configured fallback/reject response.
- Tool validation errors return short, speakable messages plus machine-readable codes.
- Availability conflicts return alternative slots rather than creating a duplicate booking.
- n8n failures never roll back an already committed appointment; they create a failed automation event for retry/support visibility.
- Duplicate webhooks return the original successful result where available.
- Call finalization is safe when `call_ended` is retried or arrives before/after analysis.

## Testing Strategy

### Automated backend tests

- Signature parser, timestamp expiry, and HMAC verification.
- Retell inbound payload normalization.
- Exact number-to-tenant isolation.
- Concurrent calls for two tenant fixtures with no cross-tenant calls, knowledge, appointments, or workflow jobs.
- Idempotent preflight and finalization.
- Tenant-scoped information lookup.
- Availability, booking, duplicate booking, reschedule, and cancellation.
- Ended/analyzed call upsert behavior.
- n8n dispatch after commit and failure recording.

### Frontend tests

- Calls/appointments remain visible during background refresh.
- New backend rows appear after the polling interval.
- Search requests are debounced.
- Refresh errors show stale-state messaging without destroying data.

### Local n8n, workflow, and live tests

1. Validate all workflow JSON with `jq` and import validation.
2. Start local n8n with isolated task-owned state and import all corrected workflows.
3. Run the corrected Postman collection against a non-production database and local n8n webhook endpoints.
4. Run the same action set for at least two tenant fixtures and prove their results remain isolated.
5. Confirm the Hampton Travel fixture maps to the selected Retell number and agent through the generic resolver.
6. Expose the local backend through a temporary HTTPS tunnel for Retell; n8n stays local unless a workflow must receive a Retell-reachable callback during this test.
7. Register the temporary backend inbound and event webhook URLs and add the Retell tools while preserving the prompt.
8. Call the Hampton Travel number from a real phone.
9. Ask a known Hampton Travel business-information question.
10. Ask for availability and book a future appointment.
11. End the call and wait for `call_analyzed`.
12. Confirm one call log, one appointment, correct tenant ownership, transcript/analysis, usage update, and local n8n notification execution.
13. Repeat the same delivery payload synthetically and confirm no duplicate rows or notifications.
14. Export the validated local workflows, import them into n8n Cloud, configure cloud credentials/variables, and run synthetic cloud smoke tests.
15. Replace temporary Retell webhook/tool URLs with the production backend HTTPS URLs only after the cloud smoke tests pass.

## Acceptance Criteria

- Calling any configured business number resolves its own tenant and agent through data, with no application-code change per business.
- Calling the selected Hampton Travel number connects to the Hampton Travel agent and not another tenant's agent.
- The agent answers from Hampton Travel's preserved prompt and tenant-scoped knowledge.
- The caller can check availability and create a future booking during the same live call.
- Reschedule and cancellation work for a matched Hampton Travel appointment.
- A booking appears in the Hampton Travel dashboard within 15 seconds of the backend commit.
- The completed call appears in Call Logs within 15 seconds of Retell's event delivery and is enriched after analysis without duplication.
- Usage is incremented once and concurrency is released once per call.
- Local n8n receives and passes all applicable notification/orchestration tests before the workflows are imported into n8n Cloud.
- n8n receives an explicit tenant context on every execution and never uses a static/default business.
- Invalid signatures, unknown numbers, cross-tenant appointment IDs, and replayed side effects are rejected safely.
- No existing Hampton Travel prompt content or unrelated repository changes are lost.

## Rollout and Rollback

The implementation is multi-tenant from its first commit, but external rollout is canary-based. Keep a redacted backup of the current Retell phone, agent, and LLM configuration before mutation. After automated, two-tenant isolation, local n8n, and synthetic tests pass, update the Hampton Travel phone inbound webhook, agent event webhook, and LLM tools as the first canary. Do not update the other six current numbers until the Hampton real-call test and n8n Cloud smoke tests pass. Subsequent businesses use the same provisioning/synchronization path without source-code changes.

Rollback restores the saved Retell phone/agent/LLM configuration, disables the new webhook routes from Retell, and deactivates the corrected n8n workflows. Database migrations must be additive; stored call and appointment records remain readable by the previous dashboard.
