# Skill: task-decomposition

## Purpose
Enables the systematic breakdown of validated specifications into discrete, ordered, implementable tasks. This skill transforms high-level requirements into a structured task sequence that can be executed through Claude Code without manual intervention.

## When to Use
- When a validated specification is ready for implementation planning
- When breaking down features into atomic, executable units of work
- When establishing task dependencies and execution order
- When creating tasks.md from approved plan.md artifacts
- When ensuring each task has clear acceptance criteria before implementation
- When preparing work packages for Claude Code execution

## When NOT to Use
- When specifications have not been validated (use spec-validation first)
- When requirements are ambiguous or incomplete (use spec-refinement first)
- When defining application architecture (use python-console-architecture)
- When executing tasks (use claude-code-operation)
- When working on future phases beyond Phase I scope

## Responsibilities
- Decompose validated requirements into atomic, single-purpose tasks
- Establish logical task dependencies and execution sequence
- Ensure each task is independently testable and verifiable
- Define clear acceptance criteria for each decomposed task
- Identify prerequisite tasks that must complete before dependent tasks
- Size tasks appropriately for single Claude Code execution cycles
- Maintain traceability from tasks back to source requirements
- Produce task lists compatible with Claude Code operation patterns

## Inputs
- Validated specification document (spec.md)
- Approved architectural plan (plan.md)
- Constitution and governing principles
- Constraint definitions from constraint-enforcement
- Project task template standards

## Outputs
- Ordered task list document (tasks.md)
- Task dependency graph showing execution sequence
- Acceptance criteria for each individual task
- Traceability matrix linking tasks to source requirements
- Task sizing assessment for Claude Code compatibility
- Identified risks or blockers for specific tasks

## Constraints
- Never decompose unvalidated or ambiguous specifications
- Never create tasks that span multiple unrelated requirements
- Never produce tasks without clear, testable acceptance criteria
- Never ignore task dependencies that affect execution order
- Never create tasks too large for single Claude Code execution
- Always maintain one-to-many traceability from requirements to tasks
- Always sequence tasks respecting their dependencies
- Always scope tasks to Phase I boundaries (Python console, in-memory)

## Interaction With Other Skills
- **spec-validation:** Consumes validated specifications as input; never decompose unvalidated specs
- **spec-interpretation:** Relies on interpreted requirements for accurate decomposition
- **constraint-enforcement:** Ensures decomposed tasks respect project constraints
- **python-console-architecture:** Aligns task structure with architectural decisions
- **claude-code-operation:** Produces tasks formatted for Claude Code execution

## Anti-Patterns
- **Premature decomposition:** Breaking down specs before validation is complete
- **Monolithic tasks:** Creating tasks too large or complex for atomic execution
- **Missing dependencies:** Ignoring prerequisite relationships between tasks
- **Orphan tasks:** Producing tasks not traceable to source requirements
- **Vague acceptance:** Defining tasks without clear, testable completion criteria
- **Over-decomposition:** Breaking tasks into unnecessarily small fragments
- **Sequence ignorance:** Producing unordered task lists without execution flow
- **Scope leakage:** Including tasks for future phases or out-of-scope features
