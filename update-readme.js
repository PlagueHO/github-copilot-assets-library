#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Template sections for the README
const TEMPLATES = {
  header: `# 🤖 GitHub Copilot Assets Library

Enhance your GitHub Copilot experience with comprehensive instructions, prompts, chat modes, and configurations. Get consistent AI assistance that follows your team's coding standards and project requirements for development, architecture, planning, and documentation tasks.

There are many ways GitHub Copilot can be used to help you with not just your coding tasks, but also with ideation, problem solving, understanding, planning, research and so much more.

The biggest challenge is either creating or finding the right prompts and tools to get the most out of GitHub Copilot - and when to use them.

I've spent many hours building my own tools and prompts and chat modes to help me with my work, and I want to share them with you.

> [!NOTE]
> I created this repository without knowing the GitHub team had plans to release a similar library [https://github.com/github/awesome-copilot](https://github.com/github/awesome-copilot). However, I am planning to migrate all the resource from this repository over to the Github Awesome Copilot repository in the future. So, you will start seeing duplicated content in both repositories.

## 🎯 GitHub Copilot Customization Features

GitHub Copilot provides multiple ways to customize AI responses and tailor assistance to your specific workflows, team guidelines, and project requirements:

| **🔧 Custom Instructions** | **📝 Prompt Files (Reusable Prompts)** | **🧩 Custom Chat Modes** | **🔌 MCP Servers** |
| --- | --- | --- | --- |
| Define common guidelines for tasks like code generation, reviews, and commit messages. Describe *how* tasks should be performed<br><br>**Benefits:**<br>• Automatic inclusion in every chat request<br>• Repository-wide consistency<br>• Multiple implementation options | Create reusable, standalone prompts for specific tasks. Describe *what* should be done with optional task-specific guidelines<br><br>**Benefits:**<br>• Eliminate repetitive prompt writing<br>• Shareable across teams<br>• Support for variables and dependencies | Define chat behavior, available tools, and codebase interaction patterns within specific boundaries for each request<br><br>**Benefits:**<br>• Context-aware assistance<br>• Tool configuration<br>• Role-specific workflows | Extend GitHub Copilot agents with standardized tools, resources, and prompts via Model Context Protocol for specialized tasks and external integrations<br><br>**Benefits:**<br>• Invoke tools for databases, APIs, and file operations<br>• Access external resources as chat context<br>• Pre-configured prompts for complex workflows<br>• Tool confirmation and parameter editing<br>• Automatic discovery and workspace sharing |

> **💡 Pro Tip:** Custom instructions only affect Copilot Chat (not inline code completions). You can combine all three customization types - use custom instructions for general guidelines, prompt files for specific tasks, and chat modes to control the interaction context.`,

  tableOfContents: `## Table of Contents

- [Asset Types Overview](#asset-types-overview)
- [Feature Comparison](#copilot-features-comparison-table)
- [Available Assets](#copilot-feature-library)
  - [Copilot Instructions](#copilot-instructions)
  - [� Custom Instructions Files](#-custom-instructions-files)
  - [📝 Prompt Files (Reusable Prompts)](#-prompt-files-reusable-prompts)
  - [🧩 Custom Chat Modes](#-custom-chat-modes)
  - [🔌 MCP Servers](#-mcp-servers)`,

  assetTypesOverview: `## Asset Types Overview

| Asset Type | Description | Availability | Configuration |
|------------|-------------|--------------|---------------|
| **Copilot Instructions** | Repository-wide instructions to set tone, style, and context for Copilot responses | VS Code & VS | User & Workspace |
| **Custom Instructions** | Language-specific guidelines that apply to file types (e.g., C# files) | VS Code & VS | User & Workspace |
| **Prompt Files** | Reusable, standalone prompts for specific tasks with optional variables | VS Code only | User & Workspace |
| **Custom Chat Modes** | Predefined instructions and tools for specialized workflows and contexts | VS Code only | User & Workspace |
| **MCP Servers** | External service integrations via Model Context Protocol for enhanced functionality | VS Code & VS | User & Workspace |`,

  featureComparison: `## Copilot Features Comparison Table

| Feature Name | Description | VS Code/VS Support | Configuration Level |
|--------------|-------------|--------------------|---------------------|
| Copilot Instructions | [Custom instructions](https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions) to set tone, style, and context for Copilot responses. | VS Code & VS | User & Workspace |
| Custom Code Generation Instructions | [Code generation instructions](https://code.visualstudio.com/docs/copilot/copilot-customization#_custom-instructions-examples) for code generation tasks. | VS Code only | User & Workspace |
| Prompt Files | [Prompt files](https://code.visualstudio.com/docs/copilot/copilot-customization#_prompt-files-experimental) are reusable prompts for common tasks. | VS Code only | User & Workspace |
| Custom Chat Modes | [Custom chat modes](https://code.visualstudio.com/docs/copilot/chat/chat-modes#_custom-chat-modes) combine instructions and tools for specific workflows. | VS Code only | User & Workspace |
| MCP Servers | [MCP Servers](https://code.visualstudio.com/docs/copilot/chat/mcp-servers) enable Copilot to call external services via Model Context Protocol. | VS Code & VS | User & Workspace |`,

  copilotFeatureLibrary: `## Copilot Feature Library`,

  copilotInstructions: `### Copilot Instructions

Examples for Copilot Instructions can be found in subfolders in the [\`copilot-instructions/\`](copilot-instructions/) folder.

| Name | Example File | Usage |
|------|--------------|-------|
| Azure Developer Solution Accelerator | [copilot-instructions/azure_developer_solution_accelerator/copilot-instructions.md](copilot-instructions/azure_developer_solution_accelerator/copilot-instructions.md) | Azure Developer CLI (AZD) solution accelerator for deploying Azure resources using modern Infrastructure as Code practices. |

> [!IMPORTANT]
> Copilot Instructions only apply to Chat modes (Ask, Edit, Agent or custom modes), they do not apply to Copilot auto-completion in the editor.

#### Copilot Instructions in workspace usage

To set a custom instruction file in your repository:

1. Copy it from the subfolder in the \`copilot-instructions\` folder in this repository to the \`.github/copilot-instructions/\` folder of your repository.
1. (Optional) In Visual Studio Code, use the \`Auto-update instructions\` command to update the instructions in your repository based on the content of the repository and other AI tools that may have stored instructions in your repository.

    ![Auto-update instructions command in Visual Studio Code](images/auto-update-copilot-instructions.png)

This file will automatically apply to all contributors when they use GitHub Copilot for all file types.`,

  instructionsSection: `### 📋 Custom Instructions Files

Custom instruction files with specific language and framework guidance can be found in the [\`instructions/\`](instructions/) folder.

> [!IMPORTANT]
> Custom Instructions only apply to Chat modes (Ask, Edit, Agent or custom modes), they do not apply to Copilot auto-completion in the editor.`,

  instructionsUsage: `#### Custom Instruction Files in workspace usage

To set a custom instruction file in your repository:

1. Copy it from the \`instructions\` folder in this repository to the \`.github/instructions/\` folder of your repository.

This file will automatically apply to all contributors when they use GitHub Copilot in the specified file types (e.g., C# files).`,

  promptsSection: `### 📝 Prompt Files (Reusable Prompts)

Prompt file examples are found in the [\`prompts/\`](prompts/) folder.`,

  promptsUsage: `#### Prompt Files in workspace usage

To use a prompt file:

1. Copy it from the \`prompts\` folder in this repository to your workspace or user \`.vscode/prompts/\` folder.
2. Use \`@\` in VS Code chat and select your prompt, or run the \`Chat: Run Prompt\` command.

    ![Run a custom prompt file in Visual Studio Code](images/run-custom-prompt-file.png)`,

  chatmodesSection: `### 🧩 Custom Chat Modes

Custom chat modes define specific behaviors and tools for GitHub Copilot Chat, enabling enhanced context-aware assistance for particular tasks or workflows.

Chat mode examples are found in the [\`chatmodes/\`](chatmodes/) folder.`,

  chatmodesUsage: `#### Custom Chat Modes in workspace usage

To use a chat mode:

1. Copy it from the \`chatmodes\` folder in this repository to your workspace or user \`.vscode/chatmodes/\` folder.
2. In VS Code, select your custom chat mode from the chat mode dropdown.

    ![Select a custom chat mode in Visual Studio Code](images/select-custom-chat-mode.png)`,

  mcpSection: `### 🔌 MCP Servers

Sample MCP (Model Context Protocol) server configurations can be found in the [\`mcp/\`](mcp/) folder.

MCP servers extend GitHub Copilot agents with external tools, resources, and prompts for specialized tasks.`,

  footer: `## 📚 Additional Resources

- [VS Code Copilot Customization Documentation](https://code.visualstudio.com/docs/copilot/copilot-customization) - Official Microsoft documentation
- [GitHub Copilot Chat Documentation](https://code.visualstudio.com/docs/copilot/chat/copilot-chat) - Complete chat feature guide
- [Custom Chat Modes](https://code.visualstudio.com/docs/copilot/chat/chat-modes) - Advanced chat configuration
- [VS Code Settings](https://code.visualstudio.com/docs/getstarted/settings) - General VS Code configuration guide

## 🛠️ Development Configuration

This repository uses various configuration files to ensure consistent code style and avoid issues with line endings:

- [\`.editorconfig\`](.editorconfig) - Defines coding styles across different editors and IDEs
- [\`.gitattributes\`](.gitattributes) - Ensures consistent line endings in text files
- [\`.vscode/settings.json\`](.vscode/settings.json) - VS Code-specific settings for this repository
- [\`.vscode/extensions.json\`](.vscode/extensions.json) - Recommended VS Code extensions

> 💡 **Note**: All markdown files in this repository use LF line endings (Unix-style) to avoid mixed line endings issues. The repository is configured to automatically handle line endings conversion.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## ™️ Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft
trademarks or logos is subject to and must follow
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.`,
};

// Add error handling utility
function safeFileOperation(operation, filePath, defaultValue = null) {
  try {
    return operation();
  } catch (error) {
    console.error(`Error processing file ${filePath}: ${error.message}`);
    return defaultValue;
  }
}

function extractTitle(filePath) {
  return safeFileOperation(
    () => {
      const content = fs.readFileSync(filePath, "utf8");
      const lines = content.split("\n");

      // Step 1: Look for title in frontmatter for all file types
      let inFrontmatter = false;
      let frontmatterEnded = false;

      for (const line of lines) {
        if (line.trim() === "---") {
          if (!inFrontmatter) {
            inFrontmatter = true;
          } else if (!frontmatterEnded) {
            frontmatterEnded = true;
          }
          continue;
        }

        if (inFrontmatter && !frontmatterEnded) {
          // Look for title field in frontmatter
          if (line.includes("title:")) {
            // Extract everything after 'title:'
            const afterTitle = line
              .substring(line.indexOf("title:") + 6)
              .trim();
            // Remove quotes if present
            const cleanTitle = afterTitle.replace(/^['"]|['"]$/g, "");
            return cleanTitle;
          }
        }
      }

      // Reset for second pass
      inFrontmatter = false;
      frontmatterEnded = false;

      // Step 2: For prompt/chatmode/instructions files, look for heading after frontmatter
      if (
        filePath.includes(".prompt.md") ||
        filePath.includes(".chatmode.md") ||
        filePath.includes(".instructions.md")
      ) {
        for (const line of lines) {
          if (line.trim() === "---") {
            if (!inFrontmatter) {
              inFrontmatter = true;
            } else if (inFrontmatter && !frontmatterEnded) {
              frontmatterEnded = true;
            }
            continue;
          }

          if (frontmatterEnded && line.startsWith("# ")) {
            return line.substring(2).trim();
          }
        }

        // Step 3: Format filename for prompt/chatmode/instructions files if no heading found
        const basename = path.basename(
          filePath,
          filePath.includes(".prompt.md")
            ? ".prompt.md"
            : filePath.includes(".chatmode.md")
            ? ".chatmode.md"
            : ".instructions.md"
        );
        return basename
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());
      }

      // Step 4: For instruction files, look for the first heading
      for (const line of lines) {
        if (line.startsWith("# ")) {
          return line.substring(2).trim();
        }
      }

      // Step 5: Fallback to filename
      const basename = path.basename(filePath, path.extname(filePath));
      return basename
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
    },
    filePath,
    path
      .basename(filePath, path.extname(filePath))
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase())
  );
}

function extractDescription(filePath) {
  return safeFileOperation(
    () => {
      const content = fs.readFileSync(filePath, "utf8");

      // Parse frontmatter for description (for both prompts and instructions)
      const lines = content.split("\n");
      let inFrontmatter = false;
      let frontmatterEnded = false;

      // For multi-line descriptions
      let isMultilineDescription = false;
      let multilineDescription = [];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.trim() === "---") {
          if (!inFrontmatter) {
            inFrontmatter = true;
          } else if (inFrontmatter && !frontmatterEnded) {
            frontmatterEnded = true;
            break;
          }
          continue;
        }

        if (inFrontmatter && !frontmatterEnded) {
          // Check for multi-line description with pipe syntax (|)
          const multilineMatch = line.match(/^description:\s*\|(\s*)$/);
          if (multilineMatch) {
            isMultilineDescription = true;
            // Continue to next line to start collecting the multi-line content
            continue;
          }

          // If we're collecting a multi-line description
          if (isMultilineDescription) {
            // If the line has no indentation or has another frontmatter key, stop collecting
            if (!line.startsWith("  ") || line.match(/^[a-zA-Z0-9_-]+:/)) {
              isMultilineDescription = false;
              // Join the collected lines and return
              return multilineDescription.join(" ").trim();
            }

            // Add the line to our multi-line collection (removing the 2-space indentation)
            multilineDescription.push(line.substring(2));
          } else {
            // Look for single-line description field in frontmatter
            const descriptionMatch = line.match(
              /^description:\s*['"]?(.+?)['"]?$/
            );
            if (descriptionMatch) {
              return descriptionMatch[1];
            }
          }
        }
      }

      // If we've collected multi-line description but the frontmatter ended
      if (multilineDescription.length > 0) {
        return multilineDescription.join(" ").trim();
      }

      return null;
    },
    filePath,
    null
  );
}

/**
 * Generate badges for installation links in VS Code and VS Code Insiders.
 * @param {string} link - The relative link to the instructions or prompts file.
 * @returns {string} - Markdown formatted badges for installation.
 */
const vscodeInstallImage =
  "https://img.shields.io/badge/VS_Code-Install-0098FF?style=flat-square&logo=visualstudiocode&logoColor=white";
const vscodeInsidersInstallImage =
  "https://img.shields.io/badge/VS_Code_Insiders-Install-24bfa5?style=flat-square&logo=visualstudiocode&logoColor=white";
const repoBaseUrl =
  "https://raw.githubusercontent.com/PlagueHO/github-copilot-assets-library/main";
const vscodeBaseUrl = "https://vscode.dev/redirect?url=";
const vscodeInsidersBaseUrl = "https://insiders.vscode.dev/redirect?url=";
function makeBadges(link, type) {
  // Map file types to their URL types
  const urlTypeMap = {
    'instructions': 'chat-instructions',
    'prompt': 'prompt-files', 
    'chatmode': 'chat-modes'
  };
  
  const urlType = urlTypeMap[type] || type;
  
  return `[![Install in VS Code](${vscodeInstallImage})](${vscodeBaseUrl}${encodeURIComponent(
    `vscode:${urlType}/install?url=${repoBaseUrl}/${link}`
  )}) [![Install in VS Code](${vscodeInsidersInstallImage})](${vscodeInsidersBaseUrl}${encodeURIComponent(
    `vscode-insiders:${urlType}/install?url=${repoBaseUrl}/${link}`
  )})`;
}

/**
 * Generate the instructions section with a table of all instructions
 */
function generateInstructionsSection(instructionsDir) {
  // Get all instruction files
  const instructionFiles = fs
    .readdirSync(instructionsDir)
    .filter((file) => file.endsWith(".md"))
    .sort();

  console.log(`Found ${instructionFiles.length} instruction files`);

  // Create table header
  let instructionsContent =
    "| Title | Description | Install |\n| ----- | ----------- | ------- |\n";

  // Generate table rows for each instruction file
  for (const file of instructionFiles) {
    const filePath = path.join(instructionsDir, file);
    const title = extractTitle(filePath);
    const link = encodeURI(`instructions/${file}`);

    // Check if there's a description in the frontmatter
    const customDescription = extractDescription(filePath);

    // Create badges for installation links
    const badges = makeBadges(link, "instructions");

    if (customDescription && customDescription !== "null") {
      // Use the description from frontmatter
      instructionsContent += `| [${title}](${link}) | ${customDescription} | ${badges} |\n`;
    } else {
      // Fallback to the default approach - use last word of title for description, removing trailing 's' if present
      const topic = title.split(" ").pop().replace(/s$/, "");
      instructionsContent += `| [${title}](${link}) | ${topic} specific coding standards and best practices | ${badges} |\n`;
    }
  }

  return `${TEMPLATES.instructionsSection}\n\n${instructionsContent}\n${TEMPLATES.instructionsUsage}`;
}

/**
 * Generate the prompts section with a table of all prompts
 */
function generatePromptsSection(promptsDir) {
  // Get all prompt files
  const promptFiles = fs
    .readdirSync(promptsDir)
    .filter((file) => file.endsWith(".prompt.md"))
    .sort();

  console.log(`Found ${promptFiles.length} prompt files`);

  // Create table header
  let promptsContent =
    "| Title | Description | Install |\n| ----- | ----------- | ------- |\n";

  // Generate table rows for each prompt file
  for (const file of promptFiles) {
    const filePath = path.join(promptsDir, file);
    const title = extractTitle(filePath);
    const link = encodeURI(`prompts/${file}`);

    // Check if there's a description in the frontmatter
    const customDescription = extractDescription(filePath);

    // Create badges for installation links
    const badges = makeBadges(link, "prompt");

    if (customDescription && customDescription !== "null") {
      promptsContent += `| [${title}](${link}) | ${customDescription} | ${badges} |\n`;
    } else {
      promptsContent += `| [${title}](${link}) | | ${badges} |\n`;
    }
  }

  return `${TEMPLATES.promptsSection}\n\n${promptsContent}\n${TEMPLATES.promptsUsage}`;
}

/**
 * Generate the chat modes section with a table of all chat modes
 */
function generateChatModesSection(chatmodesDir) {
  // Check if chatmodes directory exists
  if (!fs.existsSync(chatmodesDir)) {
    console.log("Chat modes directory does not exist");
    return "";
  }

  // Get all chat mode files
  const chatmodeFiles = fs
    .readdirSync(chatmodesDir)
    .filter((file) => file.endsWith(".chatmode.md"))
    .sort();

  console.log(`Found ${chatmodeFiles.length} chat mode files`);

  // If no chat modes, return empty string
  if (chatmodeFiles.length === 0) {
    return "";
  }

  // Create table header
  let chatmodesContent =
    "| Title | Description | Install |\n| ----- | ----------- | ------- |\n";

  // Generate table rows for each chat mode file
  for (const file of chatmodeFiles) {
    const filePath = path.join(chatmodesDir, file);
    const title = extractTitle(filePath);
    const link = encodeURI(`chatmodes/${file}`);

    // Check if there's a description in the frontmatter
    const customDescription = extractDescription(filePath);

    // Create badges for installation links
    const badges = makeBadges(link, "chatmode");

    if (customDescription && customDescription !== "null") {
      chatmodesContent += `| [${title}](${link}) | ${customDescription} | ${badges} |\n`;
    } else {
      chatmodesContent += `| [${title}](${link}) | | ${badges} |\n`;
    }
  }

  return `${TEMPLATES.chatmodesSection}\n\n${chatmodesContent}\n${TEMPLATES.chatmodesUsage}`;
}

/**
 * Generate the complete README.md content from scratch
 */
function generateReadme() {
  const instructionsDir = path.join(__dirname, "instructions");
  const promptsDir = path.join(__dirname, "prompts");
  const chatmodesDir = path.join(__dirname, "chatmodes");

  // Generate each section
  const instructionsSection = generateInstructionsSection(instructionsDir);
  const promptsSection = generatePromptsSection(promptsDir);
  const chatmodesSection = generateChatModesSection(chatmodesDir);

  // Build the complete README content with template sections
  let readmeContent = [
    TEMPLATES.header,
    TEMPLATES.tableOfContents,
    TEMPLATES.assetTypesOverview,
    TEMPLATES.featureComparison,
    TEMPLATES.copilotFeatureLibrary,
    TEMPLATES.copilotInstructions,
    instructionsSection,
    promptsSection
  ];

  // Only include chat modes section if we have any chat modes
  if (chatmodesSection) {
    readmeContent.push(chatmodesSection);
  }

  // Add MCP section
  readmeContent.push(TEMPLATES.mcpSection);

  return readmeContent.join("\n\n");
}

// Main execution
try {
  console.log("Generating README.md from scratch...");

  const readmePath = path.join(__dirname, "README.md");
  const newReadmeContent = generateReadme();

  // Check if the README file already exists
  if (fs.existsSync(readmePath)) {
    const originalContent = fs.readFileSync(readmePath, "utf8");
    const hasChanges = originalContent !== newReadmeContent;

    if (hasChanges) {
      fs.writeFileSync(readmePath, newReadmeContent);
      console.log("README.md updated successfully!");
    } else {
      console.log("README.md is already up to date. No changes needed.");
    }
  } else {
    // Create the README file if it doesn't exist
    fs.writeFileSync(readmePath, newReadmeContent);
    console.log("README.md created successfully!");
  }
} catch (error) {
  console.error(`Error generating README.md: ${error.message}`);
  process.exit(1);
}
