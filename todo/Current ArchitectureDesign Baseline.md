# TableBuilder — Document 01: Current Architecture and Design Baseline

## Purpose

This document captures the current working architecture of the TableBuilder implementation before introducing the next generation of features.

The goal is to give an AI enough context to understand the existing pattern and extend it without inventing a different architecture.

This document is a baseline. Future changes should preserve the principles described here unless a later design document explicitly changes them.

---

## 1. Current Architecture at a Glance

The current implementation follows a layered DOM-builder pattern:

```text
TableBuilder
    |
    v
buildTable
    |
    +--> buildEmptyState
    |
    +--> buildTableContainer
    |       |
    |       +--> buildSearch
    |       |
    |       +--> buildTableWrapper
    |               |
    |               +--> buildTableElement
    |                       |
    |                       +--> buildTableHeader
    |                       |       |
    |                       |       +--> buildHeaderRow
    |                       |               |
    |                       |               +--> buildHeaderCell
    |                       |
    |                       +--> buildTableBody
    |                               |
    |                               +--> buildTableRow
    |                                       |
    |                                       +--> buildTableCell