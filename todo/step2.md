# TableBuilder — Document 02: Next-Generation Configuration Architecture

## Purpose

This document defines the next phase of the TableBuilder architecture.

The current TableBuilder is already working and should not be unnecessarily rewritten.

The goal of this phase is to move gradually from:

```text
External data
External columns
External classes
        |
        v
TableBuilder
```

To a more robust, extensible architecture:

```text
       Unified Configuration Object
        (Data, Columns, Classes, Options, Events)
                    |
                    v
            TableBuilder Core
                    |
      +-------------+-------------+
      |             |             |
State Manager  Event Emitter  DOM Builders
      |             |             |
      +-------------+-------------+
                    |
                    v
             Rendered Table
```

## Key Architectural Principles for Phase 2

1. **Unified Configuration**: 
   Instead of just passing separate arrays and objects, accept a unified configuration object containing `options` and `events`. This allows for easier addition of new features (like sorting, pagination, or custom renderers) without breaking the API signature.

2. **Internal State Management**: 
   Introduce a lightweight internal state manager (e.g., to handle the current search term, sort column, sort direction, pagination). The DOM building functions will observe or react to state changes, rather than manipulating the DOM directly.

3. **Event-Driven Interactions**: 
   Expose an event system so external code can hook into interactions (e.g., `onRowClick`, `onSearch`, `onSort`). 

4. **Preserve the DOM Builder & Naming Conventions**: 
   The actual rendering should still use the existing layered DOM-builder pattern (e.g., `buildTable`, `buildTableHeader`, etc.).
   *Crucial: We must preserve the existing naming convention where all functions accept a single object with `in`-prefixed properties, which are then assigned to `local`-prefixed variables at the start of the function body.*

## Proposed Changes

### 1. Enhanced Config Structure
```javascript
const inConfig = {
    inData: [...],
    inColumns: [...],
    inClasses: {...},
    inOptions: {
        pagination: true,
        sortable: true,
        searchable: true
    },
    inEvents: {
        onRowClick: (localRow) => {},
        onSort: (localColumn, localDirection) => {}
    }
};
```

### 2. State Management & Store
We will introduce a simple internal store within the `TableBuilder` instance to manage state changes (like searching, sorting, pagination) without mutating the original `inData`. 

### 3. Decoupling DOM Manipulation from Logic
Currently, `buildTable` reaches into the search input and directly filters the DOM rows. In the next generation, features like the Search input should update the internal state. The state change should then trigger a targeted DOM update of the `tbody` or a re-render of the relevant components.

## Implementation Steps

1. Update `TableBuilder.js` constructor to accept and merge `inOptions` and `inEvents`, while maintaining backward compatibility with the current `inData`, `inColumns`, and `inClasses`.
2. Introduce a lightweight `StateStore` (or `StateManager`) class to manage `data`, `filteredData`, and `searchTerm`.
3. Refactor `buildSearch.js` and `buildTable.js` to dispatch state updates rather than handling direct DOM style manipulation for filtering.