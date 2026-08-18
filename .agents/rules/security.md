---
name: Security & Sandbox Guardrails
description: Defines sandbox boundaries, forbidden file paths, secret protection, and execution restrictions for all AI agents.
trigger: always_on
---

# Security & Sandbox Guardrails

All AI agents and subagents operating within this workspace must strictly adhere to the following security boundaries:

## 1. Protected Files & Secrets
- **Environment Variables (`.env`, `appsettings.Production.json`):** Never expose, log, or commit API keys, connection strings, JWT signing keys, or credentials.
- **Git Metadata (`.git/`):** Never directly modify files in the `.git` directory except via standard Git commands.
- **Build & Dependency Artifacts (`bin/`, `obj/`, `node_modules/`, `dist/`):** Do not manually edit files inside compiled output or package directories.

## 2. Path Isolation & Scope
- All file operations (reads, writes, commands) must remain strictly within the workspace directory:
  - Backend: `src/`
  - Frontend: `client/`
  - Agent Configurations: `.agents/`
- Prohibited from accessing system files outside the workspace root without explicit instruction.

## 3. Tool Execution & Data Safety
- **Database Safety:** When executing MongoDB queries or scripts, destructive commands (`dropDatabase`, `dropCollection`) are forbidden unless explicitly authorized by the user.
- **Rollback Readiness:** Make modular, targeted edits using diff tools rather than full file overwrites when modifying existing source files.
- **Input Sanitization:** All backend endpoints and agent tools must validate user input before executing database operations or system commands.
