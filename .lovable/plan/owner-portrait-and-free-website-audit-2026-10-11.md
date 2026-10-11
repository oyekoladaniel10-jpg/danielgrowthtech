# Owner portrait and free website audit

## Scope
- Replace Jacob's About-page portrait with the photo supplied in this request.
- Add a dedicated, responsive free website audit page and a site navigation link.

## Experience
- Let a visitor enter a public website URL and receive a score out of 100 with clearly grouped, actionable findings and positive checks.
- Inspect the submitted public page and a small, bounded sample of same-site pages for observable SEO, metadata, accessibility, mobile setup, security, and technical signals.
- Explain that findings reflect what the public pages expose; private analytics, rankings, and logged-in checkout flows are not represented as verified facts.

## Technical details
- Implement a validated same-origin app endpoint with strict URL, request-size, timeout, response-size, page-count, content-type, and redirect controls to limit abuse and unsafe fetches.
- Use a deterministic, explainable scoring rubric rather than inventing performance or ranking results; render accessible loading, validation, result, and error states.
- Preserve the existing visual system and site layout outside the requested About portrait and audit entry point.

## Verification
- Test a real public site through the form, confirm findings and score are returned, reject invalid/private URLs, and check responsive layout and route metadata.
- Confirm the About photo is updated and the remaining site is unchanged; inspect current build/runtime diagnostics.
