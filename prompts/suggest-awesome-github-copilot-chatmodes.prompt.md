---
mode: 'agent'
description: 'Suggest relevant GitHub Copilot Custom Chat Modes files from the awesome-copilot repository based on current repository context and chat history, avoiding duplicates with existing custom chat modes in this repository.'
tools: ['runTasks', 'edit', 'search', 'todos', 'think', 'changes', 'testFailure', 'openSimpleBrowser', 'fetch', 'githubRepo']
---

# Suggest Awesome GitHub Copilot Custom Chat Modes

Analyze current repository context and suggest relevant Custom Chat Modes files from the [GitHub awesome-copilot repository](https://github.com/github/awesome-copilot/blob/main/README.chatmodes.md) that are not already available in this repository. Custom Chat Mode files are located in the [chatmodes](https://github.com/github/awesome-copilot/tree/main/chatmodes) folder of the awesome-copilot repository.

## Process

1. **Fetch Available Custom Chat Modes**: Extract Custom Chat Modes list and descriptions from [awesome-copilot README.chatmodes.md](https://github.com/github/awesome-copilot/blob/main/README.chatmodes.md)
2. **Scan Local Custom Chat Modes**: Discover existing custom chat mode files in `.github/chatmodes/` folder
3. **Extract Descriptions**: Read front matter from local custom chat mode files to get descriptions
4. **Analyze Context**: Review chat history, repository files, and current project needs
5. **Compare Existing**: Check against custom chat modes already available in this repository
6. **Match Relevance**: Compare available custom chat modes against identified patterns and requirements
7. **Present Options**: Display relevant custom chat modes with descriptions, rationale, and availability status
8. **Validate**: Ensure suggested chatmodes would add value not already covered by existing chatmodes
9. **Output**: Provide structured table with suggestions, descriptions, and links to both awesome-copilot custom chat modes and similar local custom chat modes
10. **Next Steps**: If any suggestions are made, provide instructions that GitHub Copilot will be able to follow to add the suggested chatmodes to the repository by downloading the file into the chatmodes directory. Offer to do this automatically if the user confirms.

## Context Analysis Criteria

If needs are explicitly stated, prioritize those. Otherwise, analyze the following:

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

Display analysis results in structured table comparing awesome-copilot custom chat modes with existing repository custom chat modes:

| Awesome-Copilot Custom Chat Mode | Description | Already Installed | Similar Local Custom Chat Mode | Suggestion Rationale |
|---------------------------|-------------|-------------------|-------------------------|---------------------|
| [code-reviewer.chatmode.md](https://github.com/github/awesome-copilot/blob/main/chatmodes/code-reviewer.chatmode.md) | Specialized code review custom chat mode | ❌ No | None | Would enhance development workflow with dedicated code review assistance |
| [architect.chatmode.md](https://github.com/github/awesome-copilot/blob/main/chatmodes/architect.chatmode.md) | Software architecture guidance | ✅ Yes | azure_principal_architect.chatmode.md | Already covered by existing architecture custom chat modes |
| [debugging-expert.chatmode.md](https://github.com/github/awesome-copilot/blob/main/chatmodes/debugging-expert.chatmode.md) | Debug assistance custom chat mode | ❌ No | None | Could improve troubleshooting efficiency for development team |

## Local Chatmodes Discovery Process

1. List all `*.chatmode.md` files in `.github/chatmodes/` directory
2. For each discovered file, read front matter to extract `description`
3. Build comprehensive inventory of existing chatmodes
4. Use this inventory to avoid suggesting duplicates

## Requirements

- Use `githubRepo` tool to get content from awesome-copilot repository chatmodes folder
- Scan local file system for existing chatmodes in `.github/chatmodes/` directory
- Read YAML front matter from local chatmode files to extract descriptions
- Compare against existing chatmodes in this repository to avoid duplicates
- Focus on gaps in current chatmode library coverage
- Validate that suggested chatmodes align with repository's purpose and standards
- Provide clear rationale for each suggestion
- Include links to both awesome-copilot chatmodes and similar local chatmodes
- Don't provide any additional information or context beyond the table and the analysis

## Icons Reference

- ✅ Already installed in repo
- ❌ Not installed in repo
