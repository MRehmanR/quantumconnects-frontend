# RetellAI and n8n Live Call Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Connect every SaaS tenant's Retell inbound number to the existing backend, appointment engine, n8n workflows, and dashboard, with Hampton Travel as the first real-call canary.

**Architecture:** Retell sends signed inbound, custom-function, and call-event requests to a small backend integration service. That service resolves the tenant from the exact called number, reuses existing usage and appointment services, commits application data, and then dispatches tenant-explicit jobs to local n8n. The frontend continues to read only authenticated backend APIs and gains bounded background refresh.

**Tech Stack:** Node.js 24, Express 4, Sequelize 6, SQLite/PostgreSQL, Node test runner, RetellAI REST/webhooks, n8n, Postman, React 18, TypeScript, Vitest.

**Spec:** `docs/superpowers/specs/2026-08-19-retell-n8n-live-call-integration-design.md`

## Global Constraints

- The backend is already substantially implemented; reuse its user, usage, appointment, knowledge-base, automation, and dashboard services.
- The integration is multi-tenant from the first commit. Hampton Travel is a canary fixture, never a code branch or default tenant.
- Resolve automation tenants by exact normalized inbound number or signed Retell call metadata; never fall back to the first user/default tenant.
- Preserve every existing business prompt, especially the current Hampton Travel prompt.
- Core database writes complete before n8n dispatch; n8n never writes SQL.
- Test workflows in isolated local n8n before importing them into n8n Cloud.
- Do not commit secrets, complete real phone numbers, real credentials, local n8n state, or Retell configuration backups.
- Preserve all pre-existing uncommitted changes in both repositories; stage only task-owned files for each commit.
- Do not mutate Retell resources until backend, frontend, Postman, and local n8n tests pass.

---

## File Map

### Backend (`../quantumconnectsio_backend`)

- `src/services/retell-integration.service.js`: Retell signature verification, payload normalization, tenant resolution, inbound response, tool dispatch, and call-event persistence.
- `src/services/n8n-dispatch.service.js`: environment-neutral tenant job envelope and best-effort n8n delivery.
- `src/controllers/automation.controller.js`: thin HTTP adapters for Retell inbound/functions/events and tenant listing.
- `src/routes/automation.routes.js`: new Retell routes plus backward-compatible event alias.
- `src/services/automation.service.js`: reuse preflight/finalize and expose only the narrow tenant/summary operations required by n8n.
- `src/services/dashboard-data.service.js`: add tenant-explicit information/appointment lookup helpers and reuse existing create/availability/reschedule/cancel functions.
- `src/services/provisioning.service.js`: configure shared tool definitions and per-tenant Retell webhook URLs without replacing prompts.
- `src/models/call-log.model.js`: add nullable unique Retell call identifier.
- `src/config/db.js`: additive production schema guard for the call identifier.
- `src/config/env.js`, `.env.example`: public API and n8n webhook configuration names.
- `src/scripts/reconcile-retell-integrations.js`: dry-run/apply reconciliation for already provisioned tenants.
- `test/*.test.js`: focused Node tests using isolated SQLite and mocked provider calls.
- `automation/n8n/**`: corrected import-ready workflows and local run guide.
- `automation/postman/**`: corrected multi-tenant collection/environment.

### Frontend (current repository)

- `src/hooks/use-polling-refresh.ts`: visibility/focus-aware reusable polling hook.
- `src/pages/dashboard/Overview.tsx`: preserve last data and poll every 15 seconds.
- `src/pages/dashboard/CallLogs.tsx`: debounce filters, preserve last data, and poll every 10 seconds.
- `src/pages/dashboard/Appointments.tsx`: reuse polling hook and refresh on focus.
- `src/hooks/use-polling-refresh.test.tsx`, `src/pages/dashboard/CallLogs.test.tsx`: refresh/debounce behavior.

---

### Task 1: Retell Contract Helpers and Test Harness

**Files:**
- Modify: `../quantumconnectsio_backend/package.json`
- Create: `../quantumconnectsio_backend/src/services/retell-integration.service.js`
- Create: `../quantumconnectsio_backend/test/retell-contract.test.js`

**Interfaces:**
- Produces: `parseRetellSignature(signature) -> { timestamp: number, digest: string } | null`
- Produces: `verifyRetellRequest({ rawBody, signature, apiKey, nowMs? }) -> boolean`
- Produces: `normalizeInboundRequest(body) -> { event, fromNumber, toNumber, agentId }`
- Produces: `normalizeFunctionRequest(body) -> { name, call, args, callId, fromNumber, toNumber }`
- Produces: `normalizeCallEvent(body) -> { event, callId, fromNumber, toNumber, ... }`

- [ ] **Step 1: Add the backend test command**

Add this script without changing existing runtime dependencies:

```json
{
  "scripts": {
    "test": "node --test --test-concurrency=1 test/*.test.js"
  }
}
```

- [ ] **Step 2: Write failing signature tests**

Create `test/retell-contract.test.js` with deterministic signature generation:

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');

const {
  parseRetellSignature,
  verifyRetellRequest,
  normalizeInboundRequest,
  normalizeFunctionRequest,
  normalizeCallEvent
} = require('../src/services/retell-integration.service');

const apiKey = 'retell-test-key';
const nowMs = 1_800_000_000_000;
const rawBody = JSON.stringify({ event: 'call_inbound', call_inbound: { from_number: '+447700900001', to_number: '+447700900002' } });
const digest = crypto.createHmac('sha256', apiKey).update(`${rawBody}${nowMs}`).digest('hex');
const signature = `v=${nowMs},d=${digest}`;

test('verifies a fresh Retell signature against the exact raw body', () => {
  assert.deepEqual(parseRetellSignature(signature), { timestamp: nowMs, digest });
  assert.equal(verifyRetellRequest({ rawBody, signature, apiKey, nowMs }), true);
});

test('rejects stale, malformed, or body-mismatched signatures', () => {
  assert.equal(verifyRetellRequest({ rawBody, signature, apiKey, nowMs: nowMs + 300_001 }), false);
  assert.equal(verifyRetellRequest({ rawBody, signature: 'bad', apiKey, nowMs }), false);
  assert.equal(verifyRetellRequest({ rawBody: `${rawBody} `, signature, apiKey, nowMs }), false);
});
```

- [ ] **Step 3: Write failing payload normalization tests**

Append tests proving the real Retell nesting is retained:

```js
test('normalizes inbound call routing fields', () => {
  assert.deepEqual(normalizeInboundRequest(JSON.parse(rawBody)), {
    event: 'call_inbound',
    fromNumber: '+447700900001',
    toNumber: '+447700900002',
    agentId: ''
  });
});

test('normalizes custom functions without trusting args for tenant identity', () => {
  const result = normalizeFunctionRequest({
    name: 'book_appointment',
    call: { call_id: 'call_1', from_number: '+447700900001', to_number: '+447700900002', metadata: { tenantId: '4' } },
    args: { tenantEmail: 'attacker@example.com', date: '2026-09-01', time: '10:00' }
  });
  assert.equal(result.callId, 'call_1');
  assert.equal(result.toNumber, '+447700900002');
  assert.equal(result.args.tenantEmail, 'attacker@example.com');
});

test('normalizes call analyzed payload and nested analysis', () => {
  const result = normalizeCallEvent({
    event: 'call_analyzed',
    call: {
      call_id: 'call_1', from_number: '+447700900001', to_number: '+447700900002',
      start_timestamp: 1000, end_timestamp: 61000, transcript: 'Hello',
      call_analysis: { user_sentiment: 'Positive', call_summary: 'Booked a trip.' }
    }
  });
  assert.equal(result.durationSeconds, 60);
  assert.equal(result.sentiment, 'Positive');
  assert.equal(result.summary, 'Booked a trip.');
});
```

- [ ] **Step 4: Run tests and verify failure**

Run: `npm test -- --test-name-pattern="Retell|normalizes"`

Expected: FAIL because `retell-integration.service.js` or its exports do not exist.

- [ ] **Step 5: Implement the pure contract helpers**

Start `retell-integration.service.js` with no database side effects:

```js
const crypto = require('node:crypto');

const parseRetellSignature = (signature) => {
  const match = String(signature || '').match(/^v=(\d+),d=([a-f0-9]+)$/i);
  return match ? { timestamp: Number(match[1]), digest: match[2].toLowerCase() } : null;
};

const safeEqual = (left, right) => {
  const a = Buffer.from(String(left || ''), 'utf8');
  const b = Buffer.from(String(right || ''), 'utf8');
  return a.length === b.length && a.length > 0 && crypto.timingSafeEqual(a, b);
};

const verifyRetellRequest = ({ rawBody, signature, apiKey, nowMs = Date.now() }) => {
  const parsed = parseRetellSignature(signature);
  if (!parsed || !rawBody || !apiKey || Math.abs(nowMs - parsed.timestamp) > 300_000) return false;
  const expected = crypto.createHmac('sha256', apiKey).update(`${rawBody}${parsed.timestamp}`).digest('hex');
  return safeEqual(expected, parsed.digest);
};

const normalizeInboundRequest = (body = {}) => {
  const inbound = body.call_inbound || {};
  return {
    event: String(body.event || ''),
    fromNumber: String(inbound.from_number || ''),
    toNumber: String(inbound.to_number || ''),
    agentId: String(inbound.agent_id || '')
  };
};

const normalizeFunctionRequest = (body = {}) => {
  const call = body.call || {};
  return {
    name: String(body.name || ''), call, args: body.args || {},
    callId: String(call.call_id || ''),
    fromNumber: String(call.from_number || ''),
    toNumber: String(call.to_number || ''),
    metadata: call.metadata || {}
  };
};

const normalizeCallEvent = (body = {}) => {
  const call = body.call || {};
  const analysis = call.call_analysis || {};
  const start = Number(call.start_timestamp || 0);
  const end = Number(call.end_timestamp || 0);
  return {
    event: String(body.event || ''), callId: String(call.call_id || ''),
    fromNumber: String(call.from_number || ''), toNumber: String(call.to_number || ''),
    startedAt: start ? new Date(start).toISOString() : null,
    endedAt: end ? new Date(end).toISOString() : null,
    durationSeconds: start && end ? Math.max(Math.floor((end - start) / 1000), 0) : 0,
    transcript: String(call.transcript || ''),
    sentiment: String(analysis.user_sentiment || 'Neutral'),
    summary: String(analysis.call_summary || ''),
    successful: Boolean(analysis.call_successful),
    disconnectionReason: String(call.disconnection_reason || ''),
    metadata: call.metadata || {}, rawCall: call
  };
};

module.exports = { parseRetellSignature, verifyRetellRequest, normalizeInboundRequest, normalizeFunctionRequest, normalizeCallEvent };
```

- [ ] **Step 6: Run the contract tests**

Run: `npm test -- --test-name-pattern="verifies|rejects|normalizes"`

Expected: PASS.

- [ ] **Step 7: Commit Task 1 in the backend repository**

```bash
git add package.json src/services/retell-integration.service.js test/retell-contract.test.js
git commit -m "test: define Retell webhook contracts"
```

### Task 2: Idempotent Retell Call Event Persistence

**Files:**
- Modify: `../quantumconnectsio_backend/src/models/call-log.model.js`
- Modify: `../quantumconnectsio_backend/src/config/db.js`
- Modify: `../quantumconnectsio_backend/src/services/retell-integration.service.js`
- Create: `../quantumconnectsio_backend/src/database/migrations/003-add-retell-call-id.js`
- Create: `../quantumconnectsio_backend/test/retell-call-events.test.js`

**Interfaces:**
- Produces: `persistCallEvent(normalizedEvent) -> { callLogId, created, finalized }`
- Consumes: `normalizeCallEvent(body)` from Task 1.

- [ ] **Step 1: Write failing event-upsert tests**

Use a task-owned SQLite file, create two user fixtures, then assert:

```js
test('call_ended creates one tenant-owned call and call_analyzed enriches it', async () => {
  const ended = normalizeCallEvent(retellEvent('call_ended', tenantA));
  const analyzed = normalizeCallEvent(retellEvent('call_analyzed', tenantA, { transcript: 'Final transcript' }));
  await persistCallEvent(ended);
  await persistCallEvent(analyzed);
  assert.equal(await CallLog.count({ where: { retellCallId: 'call_a' } }), 1);
  const row = await CallLog.findOne({ where: { retellCallId: 'call_a' } });
  assert.equal(row.userId, tenantA.id);
  assert.equal(row.transcript, 'Final transcript');
});

test('same call id cannot move between tenants', async () => {
  await persistCallEvent(normalizeCallEvent(retellEvent('call_ended', tenantA)));
  await assert.rejects(
    persistCallEvent(normalizeCallEvent(retellEvent('call_analyzed', tenantB))),
    /tenant mismatch/i
  );
});
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `npm test -- --test-name-pattern="call_ended|same call id"`

Expected: FAIL because `retellCallId` and `persistCallEvent` do not exist.

- [ ] **Step 3: Add the minimal call-log field**

Add to the model:

```js
retellCallId: {
  type: DataTypes.STRING,
  allowNull: true,
  unique: true,
  defaultValue: null
}
```

Add migration `003-add-retell-call-id.js` with `up` adding the nullable unique field and `down` removing it. Add the same guarded column in `ensureSchemaColumns()` because this backend currently performs production compatibility checks there.

- [ ] **Step 4: Implement call upsert by external call ID**

`persistCallEvent` must:

1. reject missing call ID or invalid/unmatched `toNumber`;
2. resolve the exact user by normalized `inboundNumber`;
3. find/create `CallLog` by `retellCallId`;
4. reject if an existing row belongs to another user;
5. update transcript/duration/sentiment/status only with non-empty newer data;
6. `findOrCreate` the related `CallContact` and update its phone;
7. never decrement concurrency here—event finalization calls the existing idempotent finalizer once through the event key in Task 4.

- [ ] **Step 5: Run event tests**

Run: `npm test -- --test-name-pattern="call_ended|same call id"`

Expected: PASS with exactly one call row.

- [ ] **Step 6: Commit Task 2**

```bash
git add src/models/call-log.model.js src/config/db.js src/database/migrations/003-add-retell-call-id.js src/services/retell-integration.service.js test/retell-call-events.test.js
git commit -m "feat: upsert Retell call events"
```

### Task 3: Multi-Tenant Inbound Routing and Live Tools

**Files:**
- Modify: `../quantumconnectsio_backend/src/services/retell-integration.service.js`
- Modify: `../quantumconnectsio_backend/src/services/dashboard-data.service.js`
- Create: `../quantumconnectsio_backend/test/retell-tools.test.js`

**Interfaces:**
- Produces: `handleInboundCall(normalizedInbound, { preflightKey }) -> Retell call_inbound response`
- Produces: `executeRetellTool(normalizedFunction) -> { ok, code, message, data }`
- Produces: `findUpcomingAppointmentsForTenant({ tenant, customerPhone })`
- Produces: `queryKnowledgeForTenant({ tenant, query })`
- Reuses: `preflightInboundCall`, `getAppointmentAvailability`, `createAppointment`, `rescheduleAppointment`, `cancelAppointment`.

- [ ] **Step 1: Write two-tenant routing tests**

Create tenant A/B with different inbound numbers, agent IDs, greetings, knowledge entries, and appointments. Assert exact routing and no default fallback:

```js
test('inbound number selects the matching tenant agent and variables', async () => {
  const result = await handleInboundCall({ event: 'call_inbound', fromNumber: caller, toNumber: tenantA.inboundNumber }, { preflightKey: 'inbound_a' });
  assert.equal(result.call_inbound.override_agent_id, tenantA.retellAgentId);
  assert.equal(result.call_inbound.dynamic_variables.business_name, tenantA.businessName);
});

test('unknown inbound number is rejected instead of selecting the first user', async () => {
  const result = await handleInboundCall({ event: 'call_inbound', fromNumber: caller, toNumber: '+447700900003' }, { preflightKey: 'unknown' });
  assert.deepEqual(result, { call_inbound: { reject: true } });
});
```

- [ ] **Step 2: Write tenant-isolated tool tests**

Cover all six tools and the attack cases:

```js
test('business query only searches the resolved tenant knowledge', async () => {
  const result = await executeRetellTool(toolCall('get_business_information', tenantA, { query: 'opening hours' }));
  assert.match(result.message, /tenant a answer/i);
  assert.doesNotMatch(result.message, /tenant b secret/i);
});

test('cross-tenant appointment id cannot be cancelled', async () => {
  const result = await executeRetellTool(toolCall('cancel_appointment', tenantA, { appointment_id: tenantBAppointment.id }));
  assert.equal(result.code, 'APPOINTMENT_NOT_FOUND');
});
```

- [ ] **Step 3: Run tests and verify failure**

Run: `npm test -- --test-name-pattern="inbound number|unknown inbound|business query|cross-tenant"`

Expected: FAIL because handlers do not exist.

- [ ] **Step 4: Add tenant-explicit dashboard helpers**

Add two narrowly scoped exports to `dashboard-data.service.js`:

```js
const findUpcomingAppointmentsForTenant = async ({ tenant, customerPhone }) => {
  const phone = normalizePhone(customerPhone, { referenceE164: tenant.inboundNumber });
  if (!phone.ok || !phone.e164) return [];
  const contacts = await AppointmentContact.findAll({ where: { phone: phone.e164 } });
  const appointmentIds = contacts.map((contact) => contact.appointmentId);
  if (appointmentIds.length === 0) return [];
  return Appointment.findAll({
    where: {
      id: { [Op.in]: appointmentIds },
      userId: tenant.id,
      status: { [Op.in]: ['Pending', 'Confirmed'] },
      appointmentDate: { [Op.gte]: new Date().toISOString().slice(0, 10) }
    },
    order: [['appointmentDate', 'ASC'], ['appointmentTime', 'ASC']]
  });
};

const queryKnowledgeForTenant = async ({ tenant, query }) => {
  const tokens = String(query || '').toLowerCase().split(/\s+/).filter((token) => token.length > 2);
  const entries = await KnowledgeBaseEntry.findAll({ where: { userId: tenant.id } });
  const ranked = entries
    .map((entry) => {
      const text = `${entry.title} ${entry.content}`.toLowerCase();
      return { entry, score: tokens.reduce((sum, token) => sum + (text.includes(token) ? 1 : 0), 0) };
    })
    .sort((left, right) => right.score - left.score);
  const match = ranked.find((item) => item.score > 0)?.entry || null;
  return match ? { answer: match.content, sourceTitle: match.title } : null;
};
```

Do not change authenticated dashboard behavior. Do not call the existing unscoped `getKnowledgeBaseEntries()` without an actor.

- [ ] **Step 5: Implement inbound response**

Normalize the called number with `normalizePhone()`, query `User.findOne({ where: { inboundNumber: e164 } })`, and return only string dynamic variables:

```js
{
  call_inbound: {
    override_agent_id: tenant.retellAgentId,
    dynamic_variables: {
      tenant_id: String(tenant.id),
      business_name: String(tenant.businessName || ''),
      caller_number: String(fromNumber || ''),
      owner_number: String(tenant.ownerPhone || ''),
      business_timezone: String(tenant.timezone || 'UTC'),
      receptionist_name: String(tenant.receptionistName || 'Aria'),
      custom_greeting: String(tenant.receptionistCustomGreeting || '')
    },
    metadata: { tenantId: String(tenant.id), inboundNumber: tenant.inboundNumber, preflightKey }
  }
}
```

Return `{ call_inbound: { reject: true } }` for unknown, inactive, unprovisioned, or rejected tenants; record a safe audit event without returning tenant details.

- [ ] **Step 6: Implement the tool switch by trusted call context**

Dispatch exactly:

- `get_business_information`
- `find_upcoming_appointments`
- `check_appointment_availability`
- `book_appointment`
- `reschedule_appointment`
- `cancel_appointment`

Resolve tenant from `call.to_number` first, then verify `metadata.tenantId` matches when present. Ignore `args.tenantEmail`, `args.tenantId`, and `args.dialedNumber`. Pass the resolved tenant email/number into existing appointment methods. Set AI-created bookings to `Confirmed`. Use `retell_tool:<callId>:<name>:<sha256(args)>` automation keys and return the stored result for retries.

- [ ] **Step 7: Run all tool tests**

Run: `npm test -- --test-name-pattern="inbound|tenant|appointment|business query"`

Expected: PASS for both fixtures and cross-tenant rejection.

- [ ] **Step 8: Commit Task 3**

```bash
git add src/services/retell-integration.service.js src/services/dashboard-data.service.js test/retell-tools.test.js
git commit -m "feat: route Retell tools by tenant number"
```

### Task 4: HTTP Routes, Correct Signature Gate, and Event Finalization

**Files:**
- Modify: `../quantumconnectsio_backend/src/controllers/automation.controller.js`
- Modify: `../quantumconnectsio_backend/src/routes/automation.routes.js`
- Modify: `../quantumconnectsio_backend/src/services/automation.service.js`
- Create: `../quantumconnectsio_backend/test/retell-http.test.js`

**Interfaces:**
- Produces: `POST /api/automation/retell/inbound`
- Produces: `POST /api/automation/retell/functions`
- Produces: `POST /api/automation/retell/events`
- Maintains: `POST /api/automation/retell/webhook` as an alias to events.

- [ ] **Step 1: Write failing HTTP/controller tests**

Use mocked request/response objects or a local ephemeral server to assert:

- missing/invalid signatures return 401 and zero rows;
- inbound returns Retell's required `{ call_inbound: ... }` envelope;
- function errors return a speakable JSON object, not an Express HTML error;
- `call_ended` finalizes once even when retried;
- `call_analyzed` updates the same call row.

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test -- --test-name-pattern="signature|inbound endpoint|finalizes once"`

Expected: FAIL because routes/controllers are missing and current verification uses the obsolete secret/body-only HMAC.

- [ ] **Step 3: Add one shared Retell verification adapter**

In the controller:

```js
const verifyRetell = (req, res) => {
  const valid = retellIntegrationService.verifyRetellRequest({
    rawBody: req.rawBody,
    signature: req.headers['x-retell-signature'],
    apiKey: RETELL_API_KEY
  });
  if (!valid) res.status(401).json({ success: false, message: 'Invalid Retell signature' });
  return valid;
};
```

All three endpoints call this before parsing or writing. Remove production reliance on `RETELL_WEBHOOK_SECRET` but keep the env read backward-compatible until deployment cleanup.

- [ ] **Step 4: Add thin endpoints and alias**

Routes:

```js
router.post('/retell/inbound', automationController.handleRetellInbound);
router.post('/retell/functions', automationController.handleRetellFunction);
router.post('/retell/events', automationController.handleRetellEvent);
router.post('/retell/webhook', automationController.handleRetellEvent);
```

Controllers normalize input, call the Task 2/3 services, and return 2xx quickly. `call_ended` creates an idempotent `retell:call_ended:<callId>` event and invokes existing `finalizeInboundCall` once; `call_analyzed` only enriches the row.

- [ ] **Step 5: Run the HTTP tests**

Run: `npm test -- --test-name-pattern="signature|inbound endpoint|finalizes once"`

Expected: PASS.

- [ ] **Step 6: Commit Task 4**

```bash
git add src/controllers/automation.controller.js src/routes/automation.routes.js src/services/automation.service.js test/retell-http.test.js
git commit -m "feat: expose signed Retell integration routes"
```

### Task 5: Retell Provisioning Synchronization for Every Tenant

**Files:**
- Modify: `../quantumconnectsio_backend/src/config/env.js`
- Modify: `../quantumconnectsio_backend/.env.example`
- Modify: `../quantumconnectsio_backend/src/services/provisioning.service.js`
- Create: `../quantumconnectsio_backend/src/scripts/reconcile-retell-integrations.js`
- Create: `../quantumconnectsio_backend/test/retell-provisioning.test.js`

**Interfaces:**
- Produces: `buildRetellToolDefinitions(publicApiBaseUrl) -> Retell general_tools[]`
- Produces: `syncRetellIntegrationForUser(user, { dryRun? }) -> change summary`
- Consumes: `PUBLIC_API_BASE_URL`.

- [ ] **Step 1: Write failing tool-definition tests**

Assert the six custom tools plus existing `end_call`, HTTPS URLs ending `/api/automation/retell/functions`, Retell wrapper payload mode, exact schemas, and no prompt field in the update payload.

- [ ] **Step 2: Write failing provider-sync tests**

Inject/mock `requestJson` and prove sync issues only these PATCH operations:

1. `/update-phone-number/{number}` with `inbound_webhook_url`;
2. `/update-agent/{agentId}` with `webhook_url` and `webhook_events`;
3. `/update-retell-llm/{llmId}` with merged `general_tools`.

Assert the existing `general_prompt` is never sent or replaced.

- [ ] **Step 3: Run tests and verify failure**

Run: `npm test -- --test-name-pattern="tool definitions|provider sync|prompt"`

Expected: FAIL because synchronization helpers do not exist.

- [ ] **Step 4: Add public URL configuration**

Add:

```env
PUBLIC_API_BASE_URL=https://api.example.com
```

Normalize it by removing a trailing slash and require HTTPS outside local development.

- [ ] **Step 5: Build shared Retell tools**

Each custom tool uses the same signed endpoint and a specific JSON schema. Preserve existing non-conflicting tools by name; replace only the six managed names. Do not embed `AUTOMATION_SHARED_KEY` because Retell authenticates with `X-Retell-Signature`.

- [ ] **Step 6: Call synchronization from existing provisioning**

After a number is bound and agent ID persisted in both `provisionForUser` and `provisionRetellAgentForUser`, call `syncRetellIntegrationForUser`. A sync failure updates `provisioningStatus/provisioningError` for that tenant only and never mutates another user.

- [ ] **Step 7: Add reconciliation command**

Support:

```bash
node src/scripts/reconcile-retell-integrations.js --dry-run
node src/scripts/reconcile-retell-integrations.js --user-id 42
node src/scripts/reconcile-retell-integrations.js --apply --user-id 42
```

Default is dry-run. Reject `--apply` without `PUBLIC_API_BASE_URL`. Print masked numbers/IDs and change categories only.

- [ ] **Step 8: Run provisioning tests**

Run: `npm test -- --test-name-pattern="tool definitions|provider sync|prompt"`

Expected: PASS and prompt-preservation assertion passes.

- [ ] **Step 9: Commit Task 5**

```bash
git add .env.example src/config/env.js src/services/provisioning.service.js src/scripts/reconcile-retell-integrations.js test/retell-provisioning.test.js
git commit -m "feat: sync Retell integrations during provisioning"
```

### Task 6: Tenant-Explicit n8n Dispatch and Daily Tenant Listing

**Files:**
- Create: `../quantumconnectsio_backend/src/services/n8n-dispatch.service.js`
- Modify: `../quantumconnectsio_backend/src/config/env.js`
- Modify: `../quantumconnectsio_backend/.env.example`
- Modify: `../quantumconnectsio_backend/src/services/automation.service.js`
- Modify: `../quantumconnectsio_backend/src/controllers/automation.controller.js`
- Modify: `../quantumconnectsio_backend/src/routes/automation.routes.js`
- Modify: `../quantumconnectsio_backend/src/services/dashboard-data.service.js`
- Create: `../quantumconnectsio_backend/test/n8n-dispatch.test.js`

**Interfaces:**
- Produces: `buildN8nJob({ jobType, jobId, tenant, payload, occurredAt? })`
- Produces: `dispatchN8nJob(job) -> { attempted, ok, status, message }`
- Produces: `GET /api/automation/tenants/daily-summary` guarded by `x-automation-key`.

- [ ] **Step 1: Write failing job-envelope tests**

```js
test('builds an explicit tenant job envelope', () => {
  assert.deepEqual(buildN8nJob({ jobType: 'appointment.booked', jobId: 'job_1', tenant, payload: { appointmentId: 7 }, occurredAt }), {
    jobType: 'appointment.booked', jobId: 'job_1',
    tenant: { id: String(tenant.id), email: tenant.email, inboundNumber: tenant.inboundNumber, timezone: tenant.timezone },
    occurredAt, payload: { appointmentId: 7 }
  });
});
```

Test that a missing tenant ID/number rejects dispatch and that provider failure returns `{ attempted: true, ok: false }` without rolling back an appointment.

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test -- --test-name-pattern="tenant job envelope|provider failure"`

Expected: FAIL because the dispatch service does not exist.

- [ ] **Step 3: Add n8n URL configuration**

Add exact variables:

```env
N8N_USAGE_THRESHOLD_WEBHOOK_URL=
N8N_MANUAL_APPOINTMENT_WEBHOOK_URL=
N8N_GOOGLE_REVIEW_WEBHOOK_URL=
N8N_WAITLIST_WEBHOOK_URL=
```

Map job types to URL configuration in one service. Send `x-automation-key` and `Content-Type: application/json`.

- [ ] **Step 4: Dispatch after existing durable operations**

- usage threshold event -> workflow 12;
- appointment booked/rescheduled/cancelled/status updated -> workflow 13;
- completed appointment -> workflow 15;
- waitlist batch/reply -> workflow 16 where applicable.

Record failed delivery as `AutomationEvent` with `status: 'failed'`; never throw after the core transaction is committed.

- [ ] **Step 5: Add protected tenant listing for Workflow 14**

Return only active role=`user` tenants with non-empty inbound number and timezone:

```json
{ "success": true, "data": [{ "id": "42", "email": "tenant@example.com", "inboundNumber": "+44…", "timezone": "Europe/London" }] }
```

The endpoint requires the automation key and never returns owner phone, prompt, credentials, or billing data.

- [ ] **Step 6: Run n8n dispatch tests**

Run: `npm test -- --test-name-pattern="tenant job envelope|provider failure|daily-summary tenants"`

Expected: PASS.

- [ ] **Step 7: Commit Task 6**

```bash
git add .env.example src/config/env.js src/services/n8n-dispatch.service.js src/services/automation.service.js src/controllers/automation.controller.js src/routes/automation.routes.js src/services/dashboard-data.service.js test/n8n-dispatch.test.js
git commit -m "feat: dispatch tenant-scoped n8n jobs"
```

### Task 7: Correct and Validate n8n/Postman Assets Locally

**Files:**
- Create: `../quantumconnectsio_backend/automation/n8n/README.md`
- Create: `../quantumconnectsio_backend/automation/n8n/CREDENTIALS.md`
- Create/Modify: `../quantumconnectsio_backend/automation/n8n/workflows/11-inbound-call-validation-and-conversation.json`
- Create/Modify: `../quantumconnectsio_backend/automation/n8n/workflows/12-usage-threshold-alerts.json`
- Create/Modify: `../quantumconnectsio_backend/automation/n8n/workflows/13-manual-appointment-status-notifications.json`
- Create/Modify: `../quantumconnectsio_backend/automation/n8n/workflows/14-daily-business-summary.json`
- Create/Modify: `../quantumconnectsio_backend/automation/n8n/workflows/15-google-review-automation.json`
- Create/Modify: `../quantumconnectsio_backend/automation/n8n/workflows/16-waitlist-response-handler.json`
- Create/Modify: `../quantumconnectsio_backend/automation/postman/QC-Automation-Workflow-Tests.postman_collection.json`
- Create/Modify: `../quantumconnectsio_backend/automation/postman/QC-Automation-Workflow-Tests.postman_environment.json`
- Create: `../quantumconnectsio_backend/automation/scripts/validate-assets.mjs`

**Interfaces:**
- Consumes: backend routes/tasks 3–6.
- Produces: environment-neutral n8n JSON and a dynamic-date, two-tenant Postman suite.

- [ ] **Step 1: Copy supplied assets into the active backend repository**

Copy from `../quantumconnectsio/project-root/automation` without copying `.DS_Store`, secrets, or local n8n state. Treat the copied files as task-owned thereafter.

- [ ] **Step 2: Write the failing asset validator**

`validate-assets.mjs` must parse every JSON file and fail on:

```js
const forbidden = [
  /unvaccinated-tragicomically-lera\.ngrok-free\.dev/i,
  /admin@example\.com/i,
  /\+15559990000/,
  /QC_DAILY_SUMMARY_TENANTS/,
  /http:\/\/localhost:3000/
];
```

It must also assert every backend HTTP node uses `$vars.QC_BACKEND_BASE_URL`, every protected node references the `QC Automation Key` credential, and every webhook path begins `qc-v2-`.

- [ ] **Step 3: Run validator and confirm current assets fail**

Run: `node automation/scripts/validate-assets.mjs`

Expected: FAIL on hard-coded ngrok/local URLs, static tenant data, and expired Postman dates.

- [ ] **Step 4: Correct Workflow 11 as a regression/fallback orchestrator**

Normalize both Postman and Retell-shaped input, including:

```js
const requestedSlot = body.requestedSlot || {};
const newSlot = body.newSlot || {};
return [{
  callId: body.callId || body.call_id || body.call?.call_id || '',
  dialedNumber: body.dialedNumber || body.to_number || body.to || body.call?.to_number || '',
  callerNumber: body.callerNumber || body.from_number || body.from || body.call?.from_number || '',
  appointmentId: body.appointmentId || body.args?.appointment_id || '',
  requestedDate: body.requestedDate || requestedSlot.date || body.args?.date || '',
  requestedTime: body.requestedTime || requestedSlot.time || body.args?.time || '',
  newDate: body.newDate || newSlot.date || body.args?.new_date || '',
  newTime: body.newTime || newSlot.time || body.args?.new_time || ''
}];
```

Remove live Retell signature responsibility from n8n. It calls protected backend routes with the automation credential and passes an explicit tenant job envelope.

- [ ] **Step 5: Make Workflows 12–16 tenant-explicit**

- Workflow 12 reads `tenant` + `payload.usage` from the canonical job.
- Workflow 13 reads appointment/customer data from the canonical job and never authenticates by checking whether a header merely exists.
- Workflow 14 calls `/api/automation/tenants/daily-summary`, splits returned tenants, and calls `/api/automation/summaries/daily` per tenant/timezone.
- Workflow 15 uses the job tenant and customer payload.
- Workflow 16 sends tenant identity back to protected waitlist response endpoint.

- [ ] **Step 6: Make Postman dates and tenants dynamic**

The collection pre-request script must generate dates relative to now:

```js
const future = new Date(Date.now() + 7 * 86400000);
const later = new Date(Date.now() + 8 * 86400000);
pm.collectionVariables.set('bookingDate', future.toISOString().slice(0, 10));
pm.collectionVariables.set('rescheduleDate', later.toISOString().slice(0, 10));
pm.collectionVariables.set('runId', `${Date.now()}_${Math.random().toString(16).slice(2)}`);
```

Use `tenantANumber`, `tenantBNumber`, `tenantAEmail`, and `tenantBEmail` environment variables; do not ship real values.

- [ ] **Step 7: Run static validation**

Run: `node automation/scripts/validate-assets.mjs`

Expected: PASS for every n8n/Postman JSON.

- [ ] **Step 8: Start isolated local n8n and import workflows**

Use a task-specific directory, not the user's default n8n state:

```bash
N8N_USER_FOLDER="$PWD/.local-n8n-retell-test" npm exec --yes n8n@1.98.2 -- start
```

Import/activate the six workflows, create the `QC Automation Key` credential, and configure `QC_BACKEND_BASE_URL` for the local backend. Add `.local-n8n-retell-test/` to backend `.gitignore`.

In a second shell, import the workflow directory into that same isolated state:

```bash
N8N_USER_FOLDER="$PWD/.local-n8n-retell-test" npm exec --yes n8n@1.98.2 -- import:workflow --separate --input=automation/n8n/workflows
```

Then use the local n8n UI at `http://127.0.0.1:5678` to create the header-auth credential named exactly `QC Automation Key`, set the instance variable `QC_BACKEND_BASE_URL`, open each imported workflow, and activate it. Credential values remain local and must not be exported.

- [ ] **Step 9: Run the Postman collection against local backend/n8n**

Use Newman if available; otherwise use Postman's CLI or equivalent curl fixtures. Expected: auth, tenant A/B isolation, booking, duplicate booking, reschedule, cancel, information lookup, unknown tenant, and fallback all pass.

- [ ] **Step 10: Export cloud-import JSON and re-run validation**

Export the locally validated workflows back to `automation/n8n/workflows`, remove local IDs/credential secrets while keeping credential names, and rerun `validate-assets.mjs`.

- [ ] **Step 11: Commit Task 7**

```bash
git add .gitignore automation/n8n automation/postman automation/scripts
git commit -m "feat: add validated multi-tenant n8n workflows"
```

### Task 8: Frontend Live Refresh Without Data Flicker

**Files:**
- Create: `src/hooks/use-polling-refresh.ts`
- Create: `src/hooks/use-polling-refresh.test.tsx`
- Modify: `src/pages/dashboard/Overview.tsx`
- Modify: `src/pages/dashboard/CallLogs.tsx`
- Modify: `src/pages/dashboard/Appointments.tsx`
- Create: `src/pages/dashboard/CallLogs.test.tsx`

**Interfaces:**
- Produces: `usePollingRefresh(callback, intervalMs, dependencies?)`
- Consumes: existing `dashboardApi`, `callsApi`, and `appointmentsApi`.

- [ ] **Step 1: Write failing hook tests**

Use fake timers to assert initial run, interval run only while visible, focus refresh, and cleanup:

```tsx
it('refreshes on interval and window focus without overlapping requests', async () => {
  const refresh = vi.fn().mockResolvedValue(undefined);
  renderHook(() => usePollingRefresh(refresh, 10_000));
  await act(() => vi.advanceTimersByTimeAsync(10_000));
  expect(refresh).toHaveBeenCalledTimes(2);
  fireEvent.focus(window);
  expect(refresh).toHaveBeenCalledTimes(3);
});
```

- [ ] **Step 2: Write failing Call Logs debounce/stale-data tests**

Assert typing three characters quickly calls `callsApi.getAll` once after 300 ms, and a failed background refresh leaves the previous calls rendered with a warning.

- [ ] **Step 3: Run tests and verify failure**

Run: `npm test -- src/hooks/use-polling-refresh.test.tsx src/pages/dashboard/CallLogs.test.tsx`

Expected: FAIL because hook/polling behavior does not exist.

- [ ] **Step 4: Implement polling hook**

Use a ref guard to prevent overlap, run once on mount, pause when `document.hidden`, refresh on `focus` and `visibilitychange`, and clear listeners/timer on unmount.

- [ ] **Step 5: Update dashboard pages minimally**

- Overview: background fetch must not set `overview` to `null`; poll 15 seconds.
- Call Logs: debounce search 300 ms, poll 10 seconds, keep last rows on failure, show non-blocking stale warning.
- Appointments: replace manual interval with the hook at 15 seconds and retain current refresh/error UI.

Do not restyle pages or change API contracts.

- [ ] **Step 6: Run frontend tests, build, and lint**

Run:

```bash
npm test -- src/hooks/use-polling-refresh.test.tsx src/pages/dashboard/CallLogs.test.tsx
npm run build
npm run lint
```

Expected: tests/build PASS; lint has no new errors in task-owned files.

- [ ] **Step 7: Commit Task 8 in the frontend repository**

```bash
git add src/hooks/use-polling-refresh.ts src/hooks/use-polling-refresh.test.tsx src/pages/dashboard/Overview.tsx src/pages/dashboard/CallLogs.tsx src/pages/dashboard/CallLogs.test.tsx src/pages/dashboard/Appointments.tsx
git commit -m "feat: refresh live call dashboard data"
```

### Task 9: End-to-End Local Verification and Hampton Canary Preparation

**Files:**
- Modify: `../quantumconnectsio_backend/automation/n8n/README.md`
- Create: `../quantumconnectsio_backend/automation/test-results/.gitkeep` only if the directory is needed; never commit logs containing PII.

**Interfaces:**
- Consumes: all previous tasks.
- Produces: verified local system and a safe Retell canary change set.

- [ ] **Step 1: Run complete backend verification**

Run:

```bash
npm test
npm run migrate
```

Expected: all backend tests pass and additive schema initialization succeeds on isolated SQLite.

- [ ] **Step 2: Run complete frontend verification**

Run:

```bash
npm test
npm run build
npm run lint
```

Expected: tests/build pass and no new lint errors are introduced.

- [ ] **Step 3: Run two-tenant local n8n/Postman suite**

Keep backend and isolated n8n running, execute the full collection, and query the database to prove each call/appointment/knowledge event belongs to its expected `userId`.

- [ ] **Step 4: Create a redacted Retell backup**

Fetch the selected Hampton phone, agent, and LLM configuration through read-only Retell APIs. Save the full backup outside both repositories in a task-owned temporary directory and report only masked IDs/number plus backup path. Do not commit it.

- [ ] **Step 5: Dry-run Hampton reconciliation**

Run the reconciliation script with the Hampton database user ID and verify it proposes only:

- phone inbound webhook URL;
- agent event webhook URL/events;
- six managed tools merged with `end_call`.

It must report no prompt replacement.

- [ ] **Step 6: Expose the local backend over temporary HTTPS**

Use an available tunnel, set `PUBLIC_API_BASE_URL` to that temporary origin, restart backend, and rerun signed synthetic Retell payload tests through the tunnel before any provider mutation.

- [ ] **Step 7: Apply Hampton reconciliation only**

Run `--apply --user-id "$RETELL_CANARY_USER_ID"`, where `RETELL_CANARY_USER_ID` is the Hampton fixture/user ID returned by the verified database setup. Immediately re-fetch Retell phone/agent/LLM configuration and verify webhook URLs, event list, tools, bound agent, and unchanged prompt hash.

- [ ] **Step 8: Request the real phone call checkpoint**

Ask the user to call Hampton Travel and perform this script:

1. Ask a known business-information question.
2. Ask for available times seven or more days in the future.
3. Book one slot with a test name/phone/email.
4. End the call normally.

While the user calls, monitor backend logs, local n8n executions, the call/appointment database rows, and dashboard refresh.

- [ ] **Step 9: Validate live acceptance evidence**

Confirm one tenant-owned call, one appointment, final transcript/sentiment, one usage increment, zero active concurrency, and successful n8n notification execution. Redact PII from the report.

- [ ] **Step 10: Prepare n8n Cloud import handoff**

Document exact import order, credential/variable names, webhook paths, activation order, and smoke-test requests. Do not switch other business numbers until cloud smoke tests and the Hampton canary pass.

- [ ] **Step 11: Commit final runbook update**

```bash
git add automation/n8n/README.md
git commit -m "docs: add Retell n8n rollout runbook"
```

---

## Execution Checkpoints

1. After Task 4: signed backend endpoints and two-tenant tool isolation pass.
2. After Task 7: all workflows pass isolated local n8n/Postman validation.
3. After Task 8: frontend tests/build pass and live rows refresh without flicker.
4. Before Task 9 Step 7: show the masked Retell dry-run and prompt hash; no provider mutation happens earlier.
5. Task 9 Step 8: user performs the physical real-time call while the system is monitored.
