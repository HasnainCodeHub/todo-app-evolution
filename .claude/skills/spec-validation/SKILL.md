# Skill: spec-validation

## Purpose
Enables the systematic verification of specification quality, completeness, and correctness. This skill assesses whether specifications meet project standards and are ready for downstream consumption without introducing defects or ambiguities.

## When to Use
- When a specification has been created and needs quality verification
- When a specification has been refined and changes need validation
- When assessing specification readiness for downstream workflows
- When checking specification completeness against required sections
- When verifying internal consistency within a specification
- When evaluating specification clarity and testability

## When NOT to Use
- When understanding specification content (use spec-interpretation)
- When creating new specifications (use spec-writing)
- When improving existing specifications (use spec-refinement)
- When enforcing governance constraints (use constraint-enforcement)
- When specifications are explicitly marked as draft or work-in-progress

## Responsibilities
- Verify all required specification sections are present and complete
- Check for internal consistency across specification sections
- Validate that requirements are discrete, testable, and unambiguous
- Confirm acceptance criteria exist and are verifiable
- Detect contradictions between requirements
- Assess specification clarity and readability
- Identify gaps, missing dependencies, or undefined terms
- Produce validation reports with specific findings and locations
- Rate overall specification readiness for downstream use

## Inputs
- Specification document requiring validation
- Project specification templates and standards
- Constitution or governing principles for alignment verification
- Validation criteria and quality thresholds
- Previous validation reports for comparison (if applicable)

## Outputs
- Validation report with pass/fail status
- Completeness checklist with section-by-section assessment
- Consistency findings identifying contradictions or conflicts
- Clarity assessment with specific unclear sections identified
- Gap analysis listing missing elements
- Testability evaluation for each requirement
- Readiness recommendation (ready, needs refinement, not ready)
- Prioritized list of issues requiring resolution

## Constraints
- Never validate specifications against unstated criteria
- Never modify the specification during validation
- Never mark specifications as valid when critical issues exist
- Never skip required validation checks for convenience
- Always reference specific sections when reporting issues
- Always provide actionable findings that enable correction
- Always distinguish between critical issues and recommendations

## Interaction With Agents
Agents invoke this skill after spec-writing or spec-refinement to verify quality. Validation findings feed into spec-refinement for issue resolution. Agents must not proceed to downstream workflows when validation reports critical failures. This skill is read-only; it produces findings but does not modify specifications. Agents should re-validate after refinement to confirm issues are resolved.

## Anti-Patterns
- **Rubber-stamping:** Approving specifications without thorough validation
- **Criteria drift:** Applying different validation standards to different specifications
- **Finding suppression:** Omitting known issues from validation reports
- **Vague findings:** Reporting problems without specific locations or actionable details
- **Validation as refinement:** Modifying specifications during the validation process
- **Premature approval:** Marking specifications ready when issues remain unresolved
- **Validation fatigue:** Reducing thoroughness when validating similar specifications
- **Missing severity:** Failing to distinguish critical issues from minor recommendations
