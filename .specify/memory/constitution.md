<!--
  ============================================================================
  SYNC IMPACT REPORT
  ============================================================================
  Version Change: 0.0.0 → 1.0.0 (MAJOR - Initial constitution establishment)

  Added Sections:
  - 1. Development Philosophy (NON-NEGOTIABLE)
  - 2. Phase Discipline
  - 3. Technology Stack Constraints
  - 4. Spec-Kit Plus as Source of Truth
  - 5. Agent Behavior Rules
  - 6. Testing & Quality Standards
  - 7. Documentation Requirements
  - 8. Error Handling & Recovery
  - 9. Hackathon Compliance
  - 10. Final Rule

  Removed Sections: None (initial creation)

  Templates Requiring Updates:
  ✅ plan-template.md - Constitution Check section aligns
  ✅ spec-template.md - User stories and requirements structure compatible
  ✅ tasks-template.md - Phase structure aligns with constitution phases

  Follow-up TODOs: None
  ============================================================================
-->

# Evolution of Todo Constitution

**Hackathon II: Spec-Driven Development & Cloud-Native AI**

## Purpose

This constitution defines the non-negotiable rules, principles, and constraints governing the entire "Evolution of Todo" project across all phases (Phase I-V). All agents, tools, and implementations MUST comply with this constitution. If any conflict arises, this constitution takes precedence over all other artifacts.

---

## 1. Development Philosophy (NON-NEGOTIABLE)

### 1.1 Spec-Driven Development Is Mandatory

All development MUST follow the Spec-Driven Development lifecycle:

**Specify → Plan → Tasks → Implement**

No code may be written, generated, or modified unless:
- A specification exists
- A plan exists
- Tasks exist
- The implementation explicitly maps to those tasks

**"No task = no code."**

### 1.2 No Manual Coding

Humans are strictly prohibited from manually writing or editing code. All implementation must be performed via Claude Code using approved specs and tasks.

### 1.3 Agentic Dev Stack Enforcement

This project uses:
- **AGENTS.md** as the behavioral brain
- **Spec-Kit Plus** as the specification architect
- **Claude Code** as the executor

Agents may not bypass Spec-Kit Plus or invent behavior outside the defined workflow.

---

## 2. Phase Discipline

### 2.1 Phases Are Sequential and Mandatory

Phases MUST be completed in order:
- **Phase I**: In-Memory Python Console App
- **Phase II**: Full-Stack Web Application
- **Phase III**: AI Chatbot with MCP
- **Phase IV**: Local Kubernetes Deployment
- **Phase V**: Advanced Cloud Deployment

Skipping or partially implementing a phase is forbidden.

### 2.2 Phase Scope Isolation

Each phase may ONLY introduce:
- Features
- Technologies
- Architecture

explicitly defined for that phase.

Future-phase technologies are forbidden in earlier phases.

---

## 3. Technology Stack Constraints

### 3.1 Phase I (Console App)

| Constraint | Requirement |
|------------|-------------|
| Language | Python 3.13+ |
| Package Manager | UV |
| Data Storage | In-memory only |
| Interface | Command-line interface only |
| Databases | FORBIDDEN |
| Web Frameworks | FORBIDDEN |
| AI/ML | FORBIDDEN |

### 3.2 Phase II (Full-Stack Web)

| Component | Technology |
|-----------|------------|
| Frontend | Next.js (App Router) |
| Backend | Python FastAPI |
| ORM | SQLModel |
| Database | Neon Serverless PostgreSQL |
| Authentication | Better Auth with JWT |
| API Style | RESTful API only |

### 3.3 Phase III (AI Chatbot)

| Component | Technology |
|-----------|------------|
| Chat Frontend | OpenAI ChatKit |
| Agent Framework | OpenAI Agents SDK |
| Tool Protocol | Official MCP SDK |
| Backend | Stateless FastAPI server |
| State Management | Conversation state persisted in database |
| Data Modification | MCP tools as the ONLY way AI modifies data |

### 3.4 Phase IV (Local Cloud-Native)

| Component | Technology |
|-----------|------------|
| Containerization | Docker (Docker Desktop) |
| Local Cluster | Minikube |
| Orchestration | Kubernetes |
| Package Management | Helm Charts |
| AI Tooling | kubectl-ai and/or kagent |
| Optional | Gordon (Docker AI) when available |

### 3.5 Phase V (Advanced Cloud)

| Component | Technology |
|-----------|------------|
| Kubernetes | AKS / GKE / OKE |
| Event Streaming | Kafka (Redpanda / Confluent / Strimzi) |
| Microservices | Dapr (Pub/Sub, State, Bindings, Secrets, Service Invocation) |
| CI/CD | GitHub Actions |
| Observability | Monitoring and logging |

**Stack substitutions are NOT allowed unless explicitly permitted by the hackathon rules.**

---

## 4. Spec-Kit Plus as Source of Truth

### 4.1 Specification Authority

All requirements, architecture, APIs, schemas, UI contracts, and MCP tools MUST be defined in Spec-Kit Plus specs under `/specs`.

### 4.2 No Spec Bypass

Agents are forbidden from:
- Inventing requirements
- Adding endpoints
- Adding fields
- Adding tools

unless the spec is updated first.

### 4.3 Specification Hierarchy

When conflicts arise:

**Constitution > Spec > Plan > Tasks > Implementation**

---

## 5. Agent Behavior Rules

### 5.1 Agent Obedience

All agents MUST:
- Read AGENTS.md before acting
- Use Spec-Kit Plus commands
- Respect task boundaries
- Stop and request clarification if underspecified

### 5.2 Sub-Agent Discipline

Agents may invoke other agents as sub-agents, but responsibility remains with the caller. No agent may silently bypass the workflow.

### 5.3 No Vibe Coding

Creative or speculative implementations are forbidden. All behavior MUST be justified by specs and tasks.

---

## 6. Testing & Quality Standards

### 6.1 Test Requirements

- All features MUST have testable acceptance criteria
- Tests MUST be defined before implementation begins
- Test coverage MUST align with spec requirements

### 6.2 Quality Gates

Before phase transitions:
- All acceptance criteria MUST pass
- All defined tests MUST pass
- No unresolved blockers

---

## 7. Documentation Requirements

### 7.1 Mandatory Documentation

Each phase MUST produce:
- Feature specifications in `/specs`
- Implementation plans
- Task breakdowns
- PHRs (Prompt History Records)

### 7.2 ADR Requirements

Architecturally significant decisions MUST be documented in ADRs when:
- Multiple valid approaches exist
- The decision has long-term consequences
- The decision affects cross-cutting concerns

---

## 8. Error Handling & Recovery

### 8.1 Blocker Protocol

When implementation is blocked:
1. Document the blocker clearly
2. Identify the source (spec gap, ambiguity, dependency)
3. Escalate to appropriate resolution channel
4. Do NOT proceed with assumptions

### 8.2 Rollback Policy

If implementation deviates from spec:
1. Stop immediately
2. Document the deviation
3. Revert to last known good state
4. Update spec if deviation is intentional

---

## 9. Hackathon Compliance

### 9.1 Deliverables Per Phase

Each phase MUST include:
- Working implementation
- Specs for all features
- Plan documents
- Task lists
- For completed phases:
  - CLAUDE.md
  - AGENTS.md
  - README with setup instructions

### 9.2 Transparency

Judges will evaluate:
- Specs
- Prompts
- Iterations
- Agent usage

not just final output.

---

## 10. Final Rule

**If a decision is not explicitly allowed by this constitution, it is forbidden until the constitution or specs are updated.**

This constitution is binding for all phases of the "Evolution of Todo" project.

---

## Governance

### Amendment Procedure

1. Propose amendment with rationale
2. Document impact on existing specs/plans/tasks
3. Update all affected artifacts
4. Increment version appropriately

### Versioning Policy

- **MAJOR**: Backward incompatible governance/principle removals or redefinitions
- **MINOR**: New principle/section added or materially expanded guidance
- **PATCH**: Clarifications, wording, typo fixes, non-semantic refinements

### Compliance Review

All PRs, reviews, and implementations MUST verify compliance with this constitution. Non-compliance MUST be flagged and resolved before proceeding.

---

**Version**: 1.0.0 | **Ratified**: 2026-01-01 | **Last Amended**: 2026-01-01
