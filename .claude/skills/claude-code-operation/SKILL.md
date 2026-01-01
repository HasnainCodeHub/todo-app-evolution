# Skill: claude-code-operation

## Purpose
Enables the effective use of Claude Code as the primary implementation mechanism for Phase I development. This skill governs how decomposed tasks are executed through Claude Code, ensuring consistent, traceable, and specification-aligned implementation without manual coding.

## When to Use
- When executing implementation tasks through Claude Code
- When translating decomposed tasks into Claude Code instructions
- When verifying implementation outputs against acceptance criteria
- When managing iterative implementation cycles
- When ensuring implementations align with architectural plans
- When coordinating multi-task implementation sequences

## When NOT to Use
- When specifications have not been validated (use spec-validation first)
- When tasks have not been decomposed (use task-decomposition first)
- When architecture has not been defined (use python-console-architecture first)
- When manual coding is being considered (prohibited in Phase I)
- When working outside Phase I scope boundaries

## Responsibilities
- Translate decomposed tasks into clear Claude Code execution instructions
- Ensure each execution cycle addresses a single atomic task
- Verify implementation outputs against task acceptance criteria
- Maintain traceability from implementations to source tasks and specifications
- Coordinate sequential execution respecting task dependencies
- Capture implementation decisions and rationale for governance records
- Identify implementation blockers requiring clarification or refinement
- Ensure all implementations remain within Phase I constraints

## Inputs
- Decomposed task list (tasks.md) with acceptance criteria
- Architectural plan (plan.md) defining structure and patterns
- Validated specification (spec.md) for requirement alignment
- Constitution and governing principles
- Constraint definitions from constraint-enforcement
- Current implementation state and progress

## Outputs
- Implemented components aligned with specifications
- Execution records documenting what was implemented
- Verification results against acceptance criteria
- Implementation decision log for governance traceability
- Blocker reports when tasks cannot be completed as specified
- Progress status for multi-task implementation sequences

## Constraints
- Never implement without validated specifications and decomposed tasks
- Never bypass Claude Code for manual implementation
- Never implement tasks out of dependency sequence
- Never accept implementations that fail acceptance criteria
- Never implement beyond Phase I scope (Python console, in-memory only)
- Always execute one atomic task per implementation cycle
- Always verify outputs against acceptance criteria before proceeding
- Always maintain traceability from implementation to source specification

## Interaction With Other Skills
- **task-decomposition:** Consumes decomposed tasks as execution inputs
- **python-console-architecture:** Follows architectural patterns during implementation
- **spec-validation:** Ensures implementations align with validated specifications
- **constraint-enforcement:** Verifies implementations respect project constraints
- **spec-interpretation:** Uses interpreted requirements to resolve implementation ambiguities

## Anti-Patterns
- **Specification bypass:** Implementing features not in validated specifications
- **Task skipping:** Executing tasks out of defined dependency order
- **Manual fallback:** Resorting to manual coding instead of Claude Code
- **Criteria neglect:** Accepting implementations without verifying acceptance criteria
- **Scope violation:** Implementing database, API, AI, or infrastructure components
- **Batch execution:** Attempting multiple unrelated tasks in single execution cycles
- **Traceability loss:** Implementing without maintaining links to source requirements
- **Blocker silence:** Failing to report when tasks cannot be completed as specified
