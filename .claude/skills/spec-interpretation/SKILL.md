# Skill: spec-interpretation

## Purpose
Enables accurate understanding and contextual analysis of specification documents. This skill extracts meaning, intent, and requirements from written specifications to inform governance decisions and downstream workflows.

## When to Use
- When an agent receives a specification document and must understand its contents
- When extracting discrete requirements from narrative specification text
- When identifying stakeholder intent embedded in specification language
- When mapping relationships between specification sections
- When disambiguating unclear or conflicting specification statements
- When preparing to apply other skills that depend on specification understanding

## When NOT to Use
- When the task involves writing or authoring new specifications (use spec-writing)
- When modifying or improving existing specifications (use spec-refinement)
- When checking specification correctness or completeness (use spec-validation)
- When enforcing rules or constraints (use constraint-enforcement)
- When implementation planning or task breakdown is required

## Responsibilities
- Parse specification documents to extract discrete requirements
- Identify the primary intent behind each specification section
- Recognize implicit assumptions embedded in specification language
- Distinguish between mandatory requirements and optional enhancements
- Surface ambiguities or gaps that require stakeholder clarification
- Preserve original meaning without introducing interpretation bias
- Map relationships and dependencies between specification elements
- Maintain clear traceability from interpretations to source text

## Inputs
- Feature specification documents (spec.md)
- Constitution or governing principles documents
- Project domain context
- Stakeholder clarification responses
- Related or referenced specifications

## Outputs
- Structured understanding of requirements
- List of explicit requirements extracted from the specification
- List of implicit assumptions identified during interpretation
- Ambiguity report highlighting unclear or conflicting statements
- Dependency map showing relationships between requirements
- Clarification questions for unresolved ambiguities

## Constraints
- Never infer requirements that are not stated or clearly implied
- Never add meaning beyond what the specification contains
- Never resolve ambiguities through assumption; flag them instead
- Never modify the source specification during interpretation
- Always preserve the distinction between explicit and implicit requirements
- Always attribute interpretations to specific specification text
- Never proceed with ambiguous requirements without flagging them

## Interaction With Agents
Agents invoke this skill as a prerequisite step before applying other specification-related skills. The interpretation outputs serve as canonical inputs for spec-validation, spec-refinement, and constraint-enforcement. Agents must not duplicate interpretation logic; they rely on this skill's outputs for consistent requirement understanding across workflows.

## Anti-Patterns
- **Over-interpretation:** Adding requirements or details not present in the specification
- **Under-interpretation:** Missing implicit requirements clearly implied by context
- **Assumption injection:** Resolving ambiguities through personal assumptions rather than flagging them
- **Context ignorance:** Interpreting sections in isolation without considering the full specification
- **Meaning drift:** Allowing interpretations to diverge from original specification intent
- **Selective reading:** Focusing on some specification sections while neglecting others
- **Conflation:** Merging distinct requirements into a single interpreted requirement
