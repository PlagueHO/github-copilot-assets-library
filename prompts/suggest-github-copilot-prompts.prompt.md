---
mode: 'agent'
description: 'Suggest relevant GitHub Copilot prompt files from a GitHub repository based on current repository context and chat history, avoiding duplicates with existing prompts in this repository.
tools: ['runTasks', 'edit', 'search', 'todos', 'think', 'changes', 'testFailure', 'openSimpleBrowser', 'fetch', 'githubRepo']
---

# Suggest GitHub Copilot Prompts

Analyze current repository context and suggest relevant prompt files from the [PlagueHO/github-copilot-assets-library repository](https://github.com/PlagueHO/github-copilot-assets-library) that are not already available in this repository.

## Repository Override

The default source repository is `PlagueHO/github-copilot-assets-library`. If a different repository is indicated in the prompt, use that instead. For example, if the user says something like get the prompts from this library `github/awesome-copilot`.

## Process

1. **Determine Source Repository**: Use specified repository or default to `PlagueHO/github-copilot-assets-library`
2. **Fetch Available Prompts**: Extract prompt list and descriptions from source repository's README.md file
3. **Scan Local Prompts**: Discover existing prompt files in `.github/prompts/` folder
4. **Extract Descriptions**: Read front matter from local prompt files to get descriptions
5. **Analyze Context**: Review chat history, repository files, and current project needs
6. **Compare Existing**: Check against prompts already available in this repository
7. **Match Relevance**: Compare available prompts against identified patterns and requirements
8. **Present Options**: Display relevant prompts with descriptions, rationale, and availability status
9. **Validate**: Ensure suggested prompts would add value not already covered by existing prompts
10. **Output**: Provide structured table with suggestions, descriptions, and links to both source repository prompts and similar local prompts
11. **Next Steps**: If any suggestions are made, provide instructions that GitHub Copilot will be able to follow to add the suggested prompts to the repository by downloading the file into the prompts directory. Offer to do this automatically if the user confirms.

## Context Analysis Criteria

🔍 **Repository Patterns**:
- Programming languages used (.cs, .js, .py, etc.)
- Framework indicators (ASP.NET, React, Azure, etc.)
- Project types (web apps, APIs, libraries, tools)
- Documentation needs (README, specs, ADRs)

🗨️ **Chat History Context**:
- Recent discussions and pain points
- Feature requests or implementation needs
- Code review patterns
- Development workflow requirements

## Output Format

Display analysis results in structured table comparing source repository prompts with existing repository prompts:

| Source Repository Prompt | Description | Already Installed | Similar Local Prompt | Suggestion Rationale |
|-------------------------|-------------|-------------------|---------------------|---------------------|
| [code-review.prompt.md](https://github.com/PlagueHO/github-copilot-assets-library/blob/main/prompts/code-review.prompt.md) | Automated code review prompts | ❌ No | None | Would enhance development workflow with standardized code review processes |
| [documentation.prompt.md](https://github.com/PlagueHO/github-copilot-assets-library/blob/main/prompts/documentation.prompt.md) | Generate project documentation | ✅ Yes | create_oo_component_documentation.prompt.md | Already covered by existing documentation prompts |
| [debugging.prompt.md](https://github.com/PlagueHO/github-copilot-assets-library/blob/main/prompts/debugging.prompt.md) | Debug assistance prompts | ❌ No | None | Could improve troubleshooting efficiency for development team |

## Local Prompts Discovery Process

1. List all `*.prompt.md` files in `.github/prompts/` directory
2. For each discovered file, read front matter to extract `description`
3. Build comprehensive inventory of existing prompts
4. Use this inventory to avoid suggesting duplicates

## Source Repository Prompts Discovery Process

1. Fetch README.md from the source repository root
2. Parse the "Prompt Files (Reusable Prompts)" section in the README.md
3. Extract prompt names, descriptions, and file paths from the table
4. Use this data to compare against local prompts

## Requirements

- Use `githubRepo` tool to get README.md content from source repository
- Parse README.md to extract prompt information from the Prompt Files table
- Scan local file system for existing prompts in `.github/prompts/` directory
- Read YAML front matter from local prompt files to extract descriptions
- Compare against existing prompts in this repository to avoid duplicates
- Focus on gaps in current prompt library coverage
- Validate that suggested prompts align with repository's purpose and standards
- Provide clear rationale for each suggestion
- Include links to both source repository prompts and similar local prompts
- Support repository override functionality through prompt parsing
- Don't provide any additional information or context beyond the table and the analysis

## Icons Reference

- ✅ Already installed in repo
- ❌ Not installed in repo
