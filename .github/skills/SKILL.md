
# Admin Workflows Skill

## Purpose
Use this skill when working on admin pages, dashboard actions, gallery management flows, client assignment, or other back-office features in the Photo Gallery & Portfolio app.

## Scope
This skill applies to:
- `src/app/admin/` pages and nested routes
- admin dashboard cards and quick actions
- gallery management tables and forms
- admin create/edit flows
- admin-specific mock data and types in `src/lib/`

## Admin Patterns to Follow
- Use the existing `Hero` + `SectionContainer` page structure
- Prefer reusable layout components from `src/components/ui/layout/`
- Keep admin actions in small reusable components instead of inline table markup
- Use `FeatureCard` for quick actions and dashboard tiles
- Use `SectionTitle` for major sections such as stats, actions, and lists
- Use `card-base`, `btn-icon`, `status-badge`, `status-active`, `status-private`, and `status-draft` classes when appropriate

## Typical Admin Pages
### Admin Dashboard
- Show stats first
- Follow with quick actions
- Finish with recent activity or recent galleries tables

### Admin Gallery Management
- Use typed data models from `src/lib/mock-admin-data.ts` or a nearby shared types file
- Prefer reusable table components for gallery lists
- Keep row actions accessible and clearly labeled

### Admin Create/Edit Flows
- Use form groups with `form-input` and `form-select`
- Validate required fields before advancing or submitting
- Keep wizard or form state local unless a shared utility is required
- Prefer single-purpose steps or sections for multi-step admin workflows

## Data and Type Rules
- Define admin types in `src/lib/mock-admin-data.ts` or a nearby shared types file
- Use strict string unions for gallery types and statuses
- Keep mock admin data in `src/lib/mock-admin-data.ts`
- Reuse existing admin types rather than creating duplicate shapes

## Reusable Admin Components
Prefer creating reusable components for:
- recent galleries tables
- gallery forms
- summary cards
- action toolbars
- status and badge rendering
- confirmation modals

## Admin Interaction Rules
- Make destructive actions clearly labeled
- Use accessible button labels for icon-only controls
- Keep navigation and redirects predictable
- If a flow ends in another admin task, link to the next logical page
- If a gallery is created, prefer redirecting to the next operational step such as upload or edit

## Form and Table Guidance
- Provide labels for every field
- Group related admin fields into logical sections
- Use semantic table markup with column headers and row actions
- Support empty states for lists and tables
- Keep table row actions reusable via props and callbacks

## Mock Data Guidance
Use mock data when:
- building dashboard summaries
- prototyping gallery management views
- needing deterministic admin examples for tables or forms

## Validation Checklist
Before finishing admin-workflow changes:
- Confirm the page uses the correct app route
- Confirm reusable components are exported from the correct barrel file
- Confirm TypeScript types match the mock data shape
- Confirm accessibility for buttons, inputs, and tables
- Run a build or targeted tests when possible

## Prompt Usage Example
When asking for admin workflow work, reference this skill explicitly in the prompt:

```text
Use .github/skills/SKILL.md to design and implement a new admin gallery management page.
```

Or:

```text
Follow the admin-workflows skill for this task and implement a reusable gallery management table.
```

