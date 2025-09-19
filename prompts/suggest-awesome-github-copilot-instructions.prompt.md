---
mode: 'agent'
description: 'Suggest relevant GitHub Copilot instruction files from the awesome-copilot repository based on current repository context and chat history, avoiding duplicates with existing instructions in this repository.'
tools: ['runTasks', 'edit', 'search', 'todos', 'think', 'changes', 'testFailure', 'openSimpleBrowser', 'fetch', 'githubRepo']
---
# Suggest Awesome GitHub Copilot Instructions

Analyze current repository context and suggest relevant copilot-instruction files from the [GitHub awesome-copilot repository](https://github.com/github/awesome-copilot/blob/main/README.instructions.md) that are not already available in this repository.

## Process

1. **Fetch Available Instructions**: Extract instruction list and descriptions from [awesome-copilot README.instructions.md](https://github.com/github/awesome-copilot/blob/main/README.instructions.md)
2. **Scan Local Instructions**: Discover existing instruction files in `instructions/` folder
3. **Extract Descriptions**: Read front matter from local instruction files to get descriptions and `applyTo` patterns
4. **Analyze Context**: Review chat history, repository files, and current project needs
5. **Compare Existing**: Check against instructions already available in this repository
6. **Match Relevance**: Compare available instructions against identified patterns and requirements
7. **Present Options**: Display relevant instructions with descriptions, rationale, and availability status
8. **Validate**: Ensure suggested instructions would add value not already covered by existing instructions
9. **Output**: Provide structured table with suggestions, descriptions, and links to both awesome-copilot instructions and similar local instructions
10. **Next Steps**: If any suggestions are made, provide instructions that GitHub Copilot will be able to follow to add the suggested instructions to the repository by downloading the file into the instructions directory. Offer to do this automatically if the user confirms.

## Context Analysis Criteria

If needs are explicitly stated, prioritize those. Otherwise, analyze the following:

🔍 **Repository Patterns**:
- Programming languages used (.cs, .js, .py, .ts, etc.)
- Framework indicators (ASP.NET, React, Azure, Next.js, etc.)
- Project types (web apps, APIs, libraries, tools)
- Development workflow requirements (testing, CI/CD, deployment)

🗨️ **Chat History Context**:
- Recent discussions and pain points
- Technology-specific questions
- Coding standards discussions
- Development workflow requirements

## Output Format

Display analysis results in structured table comparing awesome-copilot instructions with existing repository instructions:

| Awesome-Copilot Instruction | Description | Already Installed | Similar Local Instruction | Suggestion Rationale |
|------------------------------|-------------|-------------------|---------------------------|---------------------|
| [blazor.instructions.md](https://github.com/github/awesome-copilot/blob/main/instructions/blazor.instructions.md) | Blazor development guidelines | ❌ No | blazor.instructions.md | Already covered by existing Blazor instructions |
| [reactjs.instructions.md](https://github.com/github/awesome-copilot/blob/main/instructions/reactjs.instructions.md) | ReactJS development standards | ❌ No | None | Would enhance React development with established patterns |
| [java.instructions.md](https://github.com/github/awesome-copilot/blob/main/instructions/java.instructions.md) | Java development best practices | ❌ No | None | Could improve Java code quality and consistency |

## Local Instructions Discovery Process

1. List all `*.instructions.md` files in the `instructions/` directory
2. For each discovered file, read front matter to extract `description` and `applyTo` patterns
3. Build comprehensive inventory of existing instructions with their applicable file patterns
4. Use this inventory to avoid suggesting duplicates

## File Structure Requirements

Based on GitHub documentation, copilot-instructions files should be:
- **Repository-wide instructions**: `.github/copilot-instructions.md` (applies to entire repository)
- **Path-specific instructions**: `.github/instructions/NAME.instructions.md` (applies to specific file patterns via `applyTo` frontmatter)
- **Community instructions**: `instructions/NAME.instructions.md` (for sharing and distribution)

## Front Matter Structure

Instructions files in awesome-copilot use this front matter format:
```markdown
---
description: 'Brief description of what this instruction provides'
applyTo: '**/*.js,**/*.ts' # Optional: glob patterns for file matching
---
```

## Requirements

- Use `githubRepo` tool to get content from awesome-copilot repository
- Scan local file system for existing instructions in `instructions/` directory
- Read YAML front matter from local instruction files to extract descriptions and `applyTo` patterns
- Compare against existing instructions in this repository to avoid duplicates
- Focus on gaps in current instruction library coverage
- Validate that suggested instructions align with repository's purpose and standards
- Provide clear rationale for each suggestion
- Include links to both awesome-copilot instructions and similar local instructions
- Consider technology stack compatibility and project-specific needs
- Don't provide any additional information or context beyond the table and the analysis

## Icons Reference

- ✅ Already installed in repo
- ❌ Not installed in repo
