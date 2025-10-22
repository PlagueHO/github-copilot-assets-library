---
agent: 'agent'
description: 'Create GitHub Issues from implementation plan phases using feature_request.yml or chore_request.yml templates.'
tools: ['edit', 'search', 'github/add_issue_comment', 'github/add_sub_issue', 'github/assign_copilot_to_issue', 'github/create_issue', 'github/get_issue', 'github/get_issue_comments', 'github/list_issues', 'github/list_sub_issues', 'github/remove_sub_issue', 'github/reprioritize_sub_issue', 'github/search_issues', 'github/update_issue', 'fetch']
---
# Create GitHub Issue from Implementation Plan

Create GitHub Issues for the implementation plan at `${file}`.

## Process

1. Analyze plan file to identify phases
2. Check existing issues using `search_issues`
3. Create new issue per phase using `create_issue` or update existing with `update_issue`
4. Use `feature_request.yml` or `chore_request.yml` templates (fallback to default)

## Requirements

- One issue per implementation phase
- Clear, structured titles and descriptions
- Include only changes required by the plan
- Verify against existing issues before creation

## Issue Content

- Title: Phase name from implementation plan
- Description: Phase details, requirements, and context
- Labels: Appropriate for issue type (feature/chore)
