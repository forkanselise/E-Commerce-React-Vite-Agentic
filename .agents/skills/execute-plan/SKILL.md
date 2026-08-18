---
name: execute-plan
description: Defines the generic multi-agent execution strategy and pipeline for implementing any feature plan.
---

# Execute Plan (Multi-Agent Swarm)

This skill provides the standard operating procedure for orchestrating the persistent subagents to execute **any** feature implementation plan provided by the user.

## Orchestration Pipeline
Invoke the workspace agents sequentially according to this pipeline:

1. **Phase 1 (Discovery)**: Invoke `code_explorer` and `designer` concurrently to map out insertion points and UI specs based on the provided plan.
2. **Phase 2 & 3 (Implementation)**: Pass the discovery context to the `coder`. When the coder is finished, invoke the `quality_checker` to enforce `nexus_coding_standards.md`.
3. **Testing**: Invoke `tester` and `self_tester_and_code_fix` concurrently to write tests and squash bugs.
4. **Phase 4 (Validation)**: Invoke `validator` for an end-to-end integration review.
5. **Phase 5 (Delivery)**: Invoke `pr_creator` to draft the PR description and commit changes.

## Orchestration & Visibility
*Note: Always maintain a live dashboard artifact named `execution_status.md` during execution to keep the user informed of the swarm's real-time progress.*
