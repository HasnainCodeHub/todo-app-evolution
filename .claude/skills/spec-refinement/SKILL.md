# Skill: spec-refinement

## Purpose
Enables the improvement, clarification, and enhancement of existing specification documents. This skill transforms incomplete or unclear specifications into precise, actionable documents while preserving original stakeholder intent.

## When to Use
- When an existing specification contains ambiguities that need resolution
- When stakeholder feedback requires incorporation into an existing specification
- When specification gaps have been identified that need to be filled
- When requirements need to be restructured for clarity without changing intent
- When terminology or language needs standardization across the specification
- When validation findings require specification corrections

## When NOT to Use
- When no specification exists yet (use spec-writing)
- When only reading or understanding a specification (use spec-interpretation)
- When checking specification quality without making changes (use spec-validation)
- When the refinement would change stakeholder intent without approval
- When enforcement of constraints is the primary goal (use constraint-enforcement)

## Responsibilities
- Resolve ambiguities identified during interpretation or validation
- Incorporate stakeholder clarifications into the specification
- Fill documented gaps with approved content
- Restructure requirements for improved clarity and testability
- Standardize terminology and language usage
- Strengthen acceptance criteria where they are weak or missing
- Remove contradictions between specification sections
- Maintain version history and change traceability
- Preserve original stakeholder intent throughout refinement

## Inputs
- Existing specification document requiring refinement
- Ambiguity reports from spec-interpretation
- Validation findings from spec-validation
- Stakeholder clarification responses
- Feedback from downstream consumers of the specification
- Constitution or governing principles for alignment

## Outputs
- Refined specification document with improvements applied
- Change log documenting what was modified and why
- Resolution record for each addressed ambiguity or gap
- Updated assumptions and dependencies if affected
- List of remaining open items requiring further clarification

## Constraints
- Never change stakeholder intent without explicit approval
- Never remove requirements without stakeholder consent
- Never introduce new requirements during refinement without authorization
- Never refine in a way that violates project standards or constitution
- Always document changes with clear rationale
- Always maintain traceability to original requirements
- Always preserve the distinction between refinement and rewriting

## Interaction With Agents
Agents invoke this skill after spec-validation identifies issues or when stakeholders provide clarifications. The skill consumes outputs from spec-interpretation (ambiguity reports) and spec-validation (validation findings). After refinement, agents should re-invoke spec-validation to confirm improvements. Agents must not conflate refinement with rewriting; major scope changes require spec-writing approval.

## Anti-Patterns
- **Silent modification:** Changing specifications without documenting what was changed
- **Intent drift:** Allowing refinements to subtly shift the original stakeholder intent
- **Scope expansion:** Using refinement as an opportunity to add unapproved requirements
- **Over-refinement:** Making changes that add complexity without improving clarity
- **Unilateral resolution:** Resolving ambiguities based on assumptions rather than stakeholder input
- **Destruction of history:** Losing traceability to original requirements during refinement
- **Cosmetic refinement:** Making superficial changes that do not address substantive issues
