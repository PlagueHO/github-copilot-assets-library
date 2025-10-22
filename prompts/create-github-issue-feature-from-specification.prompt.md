---
agent: 'agent'
description: 'Create GitHub Issue for feature request from specification file using feature_request.yml template.'
tools: ['edit', 'search', 'github/add_issue_comment', 'github/add_sub_issue', 'github/assign_copilot_to_issue', 'github/create_issue', 'github/get_issue', 'github/get_issue_comments', 'github/list_issues', 'github/list_sub_issues', 'github/remove_sub_issue', 'github/reprioritize_sub_issue', 'github/search_issues', 'github/update_issue', 'fetch']
---
# Create GitHub Issue from Specification

Create GitHub Issue for the specification at `${file}`.

## Process

1. Analyze specification file to extract requirements
2. Check existing issues using `search_issues`
3. Create new issue using `create_issue` or update existing with `update_issue`
4. Use `feature_request.yml` template (fallback to default)

## Requirements

- Single issue for the complete specification
- Clear title identifying the specification
- Include only changes required by the specification
- Verify against existing issues before creation

## Issue Content

- Title: Feature name from specification
- Description: Problem statement, proposed solution, and context
- Labels: feature, enhancement (as appropriate)
