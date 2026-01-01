# Skill: spec-writing

## Purpose
Enables the creation of clear, complete, and well-structured specification documents from stakeholder inputs, requirements, and domain context. This skill transforms raw ideas and needs into formal, governance-ready specifications.

## When to Use
- When creating a new specification document from scratch
- When transforming stakeholder conversations into formal requirements
- When documenting a feature, capability, or system behavior for the first time
- When formalizing verbal or informal requirements into structured specifications
- When establishing the initial authoritative source for a feature or component

## When NOT to Use
- When a specification already exists and needs improvement (use spec-refinement)
- When understanding an existing specification (use spec-interpretation)
- When checking specification quality or completeness (use spec-validation)
- When enforcing rules during the writing process (use constraint-enforcement)
- When the input lacks sufficient clarity to produce a meaningful specification

## Responsibilities
- Structure requirements into clear, logical specification sections
- Translate stakeholder intent into unambiguous requirement statements
- Define scope boundaries explicitly (what is included and excluded)
- Establish acceptance criteria for each requirement
- Document assumptions and dependencies clearly
- Use consistent terminology throughout the specification
- Ensure each requirement is discrete, testable, and traceable
- Produce specifications that conform to project templates and standards

## Inputs
- Stakeholder requirements and feature requests
- Domain context and constraints
- Constitution or governing principles
- Existing related specifications for consistency
- Clarification responses from stakeholders
- Project templates and specification standards

## Outputs
- Complete specification document (spec.md)
- Defined scope statement with explicit boundaries
- Structured requirements with acceptance criteria
- Documented assumptions and dependencies
- Glossary of terms if domain-specific language is used
- Open questions requiring stakeholder resolution

## Constraints
- Never write specifications without sufficient stakeholder input
- Never invent requirements not provided or clearly implied by stakeholders
- Never leave requirements ambiguous; seek clarification first
- Never violate project specification templates or standards
- Never include speculative or assumed features
- Always ensure every requirement has clear acceptance criteria
- Always maintain traceability to source stakeholder inputs

## Interaction With Agents
Agents invoke this skill when a new specification must be created. Before writing, agents should confirm sufficient input exists. After writing, agents should invoke spec-validation to verify completeness and quality. Agents must not bypass this skill to create ad-hoc specifications; all formal specifications flow through spec-writing for consistency.

## Anti-Patterns
- **Premature writing:** Creating specifications without sufficient stakeholder input
- **Scope creep:** Including requirements not requested or approved by stakeholders
- **Ambiguity tolerance:** Leaving vague statements rather than seeking clarification
- **Template deviation:** Ignoring project specification standards and formats
- **Assumption embedding:** Writing speculative requirements as if they were confirmed
- **Monolithic requirements:** Combining multiple requirements into single, untestable statements
- **Terminology inconsistency:** Using different terms for the same concept throughout the specification
