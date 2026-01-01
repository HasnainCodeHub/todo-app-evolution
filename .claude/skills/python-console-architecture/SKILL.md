# Skill: python-console-architecture

## Purpose
Enables the design of Python console application structures that operate entirely in-memory without external dependencies. This skill defines architectural patterns appropriate for Phase I governance, ensuring applications remain simple, testable, and aligned with Spec-Driven Development principles.

## When to Use
- When designing the structure of a Python console application
- When defining module organization and responsibility boundaries
- When establishing in-memory data management patterns
- When planning user interaction flows through console interfaces
- When creating architectural plans (plan.md) for Python console features
- When ensuring application design supports testability and maintainability

## When NOT to Use
- When working with web applications, APIs, or network services
- When designing database or persistent storage integrations
- When planning AI, machine learning, or cloud-native components
- When specifications have not been validated (use spec-validation first)
- When decomposing architecture into tasks (use task-decomposition)
- When executing implementation (use claude-code-operation)

## Responsibilities
- Define module structure and separation of concerns for console applications
- Establish in-memory data management patterns without external storage
- Design console input/output interaction patterns
- Specify error handling approaches appropriate for console contexts
- Plan testable component boundaries and interfaces
- Document architectural decisions in plan.md format
- Ensure designs align with Python idioms and conventions
- Maintain simplicity appropriate for Phase I scope

## Inputs
- Validated specification document (spec.md)
- Constitution and governing principles
- Project architectural standards and conventions
- Constraint definitions from constraint-enforcement
- Existing codebase structure (if applicable)

## Outputs
- Architectural plan document (plan.md)
- Module structure definition with responsibility assignments
- In-memory data management strategy
- Console interaction flow design
- Component interface definitions
- Error handling approach documentation
- Testability considerations and testing strategy outline

## Constraints
- Never design for external databases or persistent storage
- Never include network, API, or web service components
- Never incorporate AI, machine learning, or cloud dependencies
- Never violate Python idioms or established conventions
- Never create architectures that cannot be tested in isolation
- Always limit scope to in-memory, console-based operation
- Always maintain separation of concerns between components
- Always ensure designs are implementable via Claude Code

## Interaction With Other Skills
- **spec-validation:** Consumes validated specifications; never architect unvalidated requirements
- **spec-interpretation:** Uses interpreted requirements to inform architectural decisions
- **constraint-enforcement:** Ensures architectural plans respect project constraints
- **task-decomposition:** Produces plans that can be decomposed into implementable tasks
- **claude-code-operation:** Creates architectures implementable through Claude Code execution

## Anti-Patterns
- **Over-engineering:** Designing complex architectures beyond Phase I needs
- **Persistence creep:** Introducing file, database, or external storage patterns
- **Coupling excess:** Creating tightly coupled components that resist testing
- **Abstraction abuse:** Adding unnecessary abstraction layers for simple operations
- **Convention violation:** Ignoring Python idioms in favor of foreign patterns
- **Scope expansion:** Including infrastructure, cloud, or API concerns
- **Untestable design:** Creating architectures that cannot be verified in isolation
- **Premature optimization:** Designing for scale or performance not required in Phase I
