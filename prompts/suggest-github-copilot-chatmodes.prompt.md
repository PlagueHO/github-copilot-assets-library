---
mode: 'agent'
description: 'Suggest relevant GitHub Copilot chatmode files from a GitHub repository based on current repository context and chat history, avoiding duplicates with existing chatmodes in this repository.'
tools: ['runTasks', 'edit', 'search', 'todos', 'think', 'changes', 'testFailure', 'openSimpleBrowser', 'fetch', 'githubRepo']
---

# Suggest GitHub Copilot Chatmodes

Analyze current repository context and suggest relevant chatmode files from the [PlagueHO/github-copilot-assets-library repository](https://github.com/PlagueHO/github-copilot-assets-library) that are not already available in this repository.

## Repository Override

The default source repository is `PlagueHO/github-copilot-assets-library`. If a different repository is indicated in the prompt, use that instead. For example, if the user says something like get the chatmodes from this library `github/awesome-copilot`.

## Process

1. **Determine Source Repository**: Use specified repository or default to `PlagueHO/github-copilot-assets-library`
2. **Fetch Available Chatmodes**: Extract chatmode list and descriptions from source repository's README.md file
3. **Scan Local Chatmodes**: Discover existing chatmode files in `.github/chatmodes/` folder
4. **Extract Descriptions**: Read front matter from local chatmode files to get descriptions
5. **Analyze Context**: Review chat history, repository files, and current project needs
6. **Compare Existing**: Check against chatmodes already available in this repository
7. **Match Relevance**: Compare available chatmodes against identified patterns and requirements
8. **Present Options**: Display relevant chatmodes with descriptions, rationale, and availability status
9. **Validate**: Ensure suggested chatmodes would add value not already covered by existing chatmodes
10. **Output**: Provide structured table with suggestions, descriptions, and links to both source repository chatmodes and similar local chatmodes
11. **Next Steps**: If any suggestions are made, provide instructions that GitHub Copilot will be able to follow to add the suggested chatmodes to the repository by downloading the file into the chatmodes directory. Offer to do this automatically if the user confirms.

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

Display analysis results in structured table comparing source repository chatmodes with existing repository chatmodes:

| Source Repository Chatmode | Description | Already Installed | Similar Local Chatmode | Suggestion Rationale |
|---------------------------|-------------|-------------------|-------------------------|---------------------|
| [code-reviewer.chatmode.md](https://github.com/PlagueHO/github-copilot-assets-library/blob/main/chatmodes/code-reviewer.chatmode.md) | Specialized code review chatmode | ❌ No | None | Would enhance development workflow with dedicated code review assistance |
| [architect.chatmode.md](https://github.com/PlagueHO/github-copilot-assets-library/blob/main/chatmodes/architect.chatmode.md) | Software architecture guidance | ✅ Yes | azure_principal_architect.chatmode.md | Already covered by existing architecture chatmodes |
| [debugging-expert.chatmode.md](https://github.com/PlagueHO/github-copilot-assets-library/blob/main/chatmodes/debugging-expert.chatmode.md) | Debug assistance chatmode | ❌ No | None | Could improve troubleshooting efficiency for development team |

## Local Chatmodes Discovery Process

1. List all `*.chatmode.md` files in `.github/chatmodes/` directory
2. For each discovered file, read front matter to extract `description`
3. Build comprehensive inventory of existing chatmodes
4. Use this inventory to avoid suggesting duplicates

## Source Repository Chatmodes Discovery Process

1. Fetch README.md from the source repository root
2. Parse the "Custom Chat Modes" section in the README.md
3. Extract chatmode names, descriptions, and file paths from the table
4. Use this data to compare against local chatmodes

## Requirements

- Use `githubRepo` tool to get README.md content from source repository
- Parse README.md to extract chatmode information from the Custom Chat Modes table
- Scan local file system for existing chatmodes in `.github/chatmodes/` directory
- Read YAML front matter from local chatmode files to extract descriptions
- Compare against existing chatmodes in this repository to avoid duplicates
- Focus on gaps in current chatmode library coverage
- Validate that suggested chatmodes align with repository's purpose and standards
- Provide clear rationale for each suggestion
- Include links to both source repository chatmodes and similar local chatmodes
- Support repository override functionality through prompt parsing
- Don't provide any additional information or context beyond the table and the analysis

## Icons Reference

- ✅ Already installed in repo
- ❌ Not installed in repo
