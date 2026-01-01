# Skill: constraint-enforcement

## Purpose
Enables the consistent application and enforcement of project constraints, rules, and governance principles across all specification-related activities. This skill ensures that specifications and related artifacts remain compliant with established boundaries and standards.

## When to Use
- When checking if a specification violates project constitution or principles
- When validating that proposed changes respect established constraints
- When a decision requires verification against governance rules
- When reviewing outputs from other skills for constraint compliance
- When stakeholder requests conflict with project boundaries
- When ensuring consistency with cross-cutting project standards

## When NOT to Use
- When understanding specification content (use spec-interpretation)
- When creating new specifications (use spec-writing)
- When improving existing specifications (use spec-refinement)
- When validating specification completeness or quality (use spec-validation)
- When no constraints or governance rules have been established

## Responsibilities
- Verify compliance with project constitution and principles
- Enforce scope boundaries defined in specifications
- Detect violations of established constraints before they propagate
- Prevent unauthorized expansion of requirements or scope
- Ensure consistency with project-wide standards and conventions
- Flag conflicts between proposed actions and governance rules
- Maintain constraint traceability to authoritative sources
- Provide clear violation reports with specific rule references

## Inputs
- Project constitution and governing principles
- Established constraint definitions and boundaries
- Specification documents requiring constraint checking
- Proposed changes or additions to specifications
- Outputs from other skills requiring compliance verification
- Cross-cutting standards and conventions

## Outputs
- Constraint compliance report (pass/fail with details)
- Violation list with specific rule references
- Conflict identification between constraints and proposed content
- Remediation guidance for constraint violations
- Constraint traceability matrix linking content to rules

## Constraints
- Never waive or relax constraints without explicit governance approval
- Never enforce rules that have not been formally established
- Never apply constraints selectively or inconsistently
- Never assume constraint intent; enforce as written
- Always reference the specific constraint being enforced
- Always provide clear, actionable violation descriptions
- Always escalate unresolvable constraint conflicts to governance authority

## Interaction With Agents
Agents invoke this skill as a checkpoint during and after other skill executions. Before finalizing any specification change, agents verify constraint compliance. When violations are detected, agents must address them before proceeding. This skill does not modify artifacts; it only reports compliance status. Agents must not bypass constraint-enforcement to expedite workflows; all specification artifacts pass through constraint checking.

## Anti-Patterns
- **Selective enforcement:** Applying constraints to some artifacts but not others
- **Phantom constraints:** Enforcing rules that were never formally established
- **Constraint inflation:** Adding new constraints during enforcement without governance approval
- **Silent bypass:** Ignoring constraint violations to meet deadlines or convenience
- **Vague violations:** Reporting constraint failures without specific rule references
- **Interpretation overreach:** Enforcing assumed constraint intent rather than stated rules
- **Enforcement without escalation:** Failing to escalate unresolvable conflicts to governance authority
