# jsTableBuilder

> A lightweight and customizable JavaScript table builder for converting
> JSON data and JSON-based column configuration into clean, dynamic HTML
> tables.

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![NPM](https://img.shields.io/badge/npm-js--table--builder-red)](https://www.npmjs.com/package/js-table-builder)
[![Documentation](https://img.shields.io/badge/Docs-jsTableBuilder-blue)](https://keshavsoft.github.io/jsTableBuilder/docs.html)

## Overview

**jsTableBuilder** is a reusable JavaScript library for building HTML
table UIs from JSON data.

The main idea is simple:

-   **JSON data** provides the table rows.
-   **JSON column configuration** defines how those fields should
    appear.
-   **Table configuration** controls the table layout and UI behavior.
-   **TableBuilder** converts the configuration and data into a rendered
    HTML table.

This approach keeps the table structure separate from application code.
Instead of manually creating `<table>`, `<thead>`, `<tbody>`, and `<td>`
elements for every project, you can define the data and columns in JSON
and let `jsTableBuilder` generate the UI.

### Basic Flow

``` text
JSON Data
   +
JSON Column Configuration
   +
Table Options
   ↓
TableBuilder
   ↓
Dynamic HTML Table UI
```

This makes the library useful when the table structure can change
between screens, modules, APIs, or projects.

------------------------------------------------------------------------

## Why jsTableBuilder?

Traditional table development often requires manually maintaining:

-   Table headers
-   Column order
-   Row rendering
-   Serial numbers
-   Search input
-   Footer configuration
-   Table width and borders
-   Repeated HTML and JavaScript code

With `jsTableBuilder`, these responsibilities can be moved into reusable
configuration.

For example:

``` text
Data → all.json
Columns → columns.json
Configuration → JavaScript
              ↓
       jsTableBuilder
              ↓
        HTML Table UI
```

This makes table generation more consistent and easier to customize.

------------------------------------------------------------------------

## Key Features

-   **JSON-driven table generation**
-   **JSON-based column configuration**
-   Dynamic column rendering
-   Configurable column order and presentation
-   Global search/filter support
-   Optional automatic serial-number column
-   Optional footer
-   Configurable table width
-   Configurable table borders
-   Custom table/header options
-   Browser/CDN support
-   NPM package support
-   `npx` scaffold support
-   Source files can be generated locally for customization
-   Framework-independent core approach
-   Suitable for reusable business/admin table screens

------------------------------------------------------------------------

## Installation

### NPM

Install the package in your project:

``` bash
npm install js-table-builder
```

Then use the package according to the version/build available in your
project.

### NPM Scaffold / CLI

`jsTableBuilder` also provides an `npx` command for creating a local
`buildTable` folder.

``` bash
npx js-table-builder
```

This approach is useful when you want to start from the library's source
structure and customize the generated table components instead of
treating the package as a completely closed dependency.

------------------------------------------------------------------------

## CDN Usage

For a browser-based project, you can load the library directly from the
hosted build:

``` html
<script src="https://keshavsoft.github.io/jsTableBuilder/dist/v2/tableBuilder.umd.cjs"></script>
```

After loading the library, `TableBuilder` is available through the
`window.ks` namespace.

------------------------------------------------------------------------

# How It Works

The library separates **data**, **column definitions**, and **table
behavior**.

## 1. JSON Data

The data file contains the records that should become table rows.

Example:

``` json
[
    {
        "id": 1,
        "name": "Srinivas",
        "role": "Developer",
        "city": "Bengaluru"
    },
    {
        "id": 2,
        "name": "Rahul",
        "role": "Designer",
        "city": "Hyderabad"
    }
]
```

Each object represents one row.

------------------------------------------------------------------------

## 2. Column Configuration

The column configuration describes how the fields from the JSON data
should be represented in the table.

Example:

``` json
[
    {
        "key": "id",
        "label": "ID"
    },
    {
        "key": "name",
        "label": "Name"
    },
    {
        "key": "role",
        "label": "Role"
    },
    {
        "key": "city",
        "label": "City"
    }
]
```

The important concept is that **the table UI is driven by the column
configuration rather than hard-coded HTML**.

This allows the same table-building logic to be reused with different
column definitions.

> The exact supported column properties depend on the version and column
> configuration used by the project.

------------------------------------------------------------------------

## 3. Table Configuration

The table configuration controls the overall behavior and appearance.

Example:

``` javascript
const config = {
    htmlId: "table-root",

    data: tableData,

    columns: columnsData,

    tableOptions: {
        commonOptions: {
            tableWidth: "100%",
            tableBorder: "0px",
            showSerialNo: true
        },

        footOptions: {
            showFooter: true
        }
    },

    topHeader: {
        label: "My Beautiful Table",
        placeholder: "Search anything..."
    }
};
```

------------------------------------------------------------------------

# Quick Start

Create a container in your HTML:

``` html
<div id="table-root"></div>
```

Load the library:

``` html
<script src="https://keshavsoft.github.io/jsTableBuilder/dist/v2/tableBuilder.umd.cjs"></script>
```

Then load the JSON data and column configuration:

``` javascript
async function init() {
    try {
        const [dataResponse, columnsResponse] = await Promise.all([
            fetch("./all.json"),
            fetch("./columns.json")
        ]);

        if (!dataResponse.ok) {
            throw new Error("Failed to fetch data");
        }

        if (!columnsResponse.ok) {
            throw new Error("Failed to fetch columns");
        }

        const tableData = await dataResponse.json();
        const columnsData = await columnsResponse.json();

        const config = {
            htmlId: "table-root",

            data: tableData,

            columns: columnsData,

            tableOptions: {
                commonOptions: {
                    tableWidth: "100%",
                    tableBorder: "0px",
                    showSerialNo: true
                },

                footOptions: {
                    showFooter: true
                }
            },

            topHeader: {
                label: "My Beautiful Table",
                placeholder: "Search anything..."
            }
        };

        const tableBuilder =
            new window.ks.TableBuilder(config);

        tableBuilder.appendToDom();

    } catch (error) {
        console.error("Error initializing table:", error);
    }
}

init();
```

------------------------------------------------------------------------

# Configuration Reference

## `htmlId`

Defines the ID of the HTML element where the generated table will be
inserted.

``` javascript
htmlId: "table-root"
```

HTML:

``` html
<div id="table-root"></div>
```

------------------------------------------------------------------------

## `data`

Contains the JSON array used as table-row data.

``` javascript
data: tableData
```

Example:

``` javascript
[
    {
        id: 1,
        name: "Srinivas"
    },
    {
        id: 2,
        name: "Rahul"
    }
]
```

------------------------------------------------------------------------

## `columns`

Contains the column configuration used to build the table structure.

``` javascript
columns: columnsData
```

This is one of the main concepts of the project: **the columns
configuration controls the table UI**.

------------------------------------------------------------------------

# Table Options

## `tableOptions.commonOptions`

Common table-level settings are configured here.

### Table Width

``` javascript
commonOptions: {
    tableWidth: "100%"
}
```

Examples:

``` javascript
tableWidth: "100%"
```

``` javascript
tableWidth: "800px"
```

------------------------------------------------------------------------

### Table Border

``` javascript
tableBorder: "0px"
```

You can provide a CSS border value appropriate for your UI.

Example:

``` javascript
tableBorder: "1px solid #ccc"
```

------------------------------------------------------------------------

### Serial Number

Enable an automatically generated serial-number column:

``` javascript
showSerialNo: true
```

Disable it:

``` javascript
showSerialNo: false
```

------------------------------------------------------------------------

# Footer Options

The footer can be enabled through:

``` javascript
footOptions: {
    showFooter: true
}
```

Disable it:

``` javascript
footOptions: {
    showFooter: false
}
```

------------------------------------------------------------------------

# Top Header

The `topHeader` configuration controls the area displayed above the
table.

Example:

``` javascript
topHeader: {
    label: "Customers",
    placeholder: "Search customers..."
}
```

### `label`

Defines the table title.

``` javascript
label: "Customers"
```

### `placeholder`

Defines the search input placeholder.

``` javascript
placeholder: "Search customers..."
```

When configured, the table UI can provide a global search/filter
experience.

------------------------------------------------------------------------

# Project Structure

The repository contains multiple folders and version/build areas for the
table builder.

A simplified view is:

``` text
jsTableBuilder/
│
├── .github/
├── bin/
├── buildTable/
├── dist/
├── docs/
├── examples/
├── test/
├── todo/
│
├── v1/
├── v2/
├── v3/
├── v4/
├── v5/
│
├── all.json
├── columns.json
├── columns copy.json
├── config.json
│
├── dev.html
├── docs.html
├── index.html
│
├── package.json
└── README.md
```

### Important folders

  -----------------------------------------------------------------------
  Folder                              Purpose
  ----------------------------------- -----------------------------------
  `dist/`                             Built/distribution files used by
                                      consumers

  `buildTable/`                       Local/customizable table-building
                                      source generated or maintained by
                                      the project

  `docs/`                             Documentation-related resources

  `examples/`                         Example implementations

  `test/`                             Test-related files

  `v1/`                               Version-specific implementation

  `v2/`                               Version-specific implementation

  `v3/`                               Version-specific implementation

  `v4/`                               Version-specific implementation

  `v5/`                               Version-specific implementation
  -----------------------------------------------------------------------

The repository keeps versioned implementations so that different
generations of the table builder can be maintained and tested
independently.

------------------------------------------------------------------------

# Development

Clone the repository:

``` bash
git clone https://github.com/KeshavSoft/jsTableBuilder.git
```

Move into the project:

``` bash
cd jsTableBuilder
```

Install dependencies:

``` bash
npm install
```

Run the development setup according to the scripts defined in
`package.json`.

You can also open the available HTML development/demo pages to test the
table UI in a browser.

------------------------------------------------------------------------

# Working With JSON Files

A typical development setup can use:

``` text
all.json
columns.json
config.json
```

### `all.json`

Contains the actual table records.

``` text
all.json
   ↓
Table rows
```

### `columns.json`

Contains the column definitions.

``` text
columns.json
   ↓
Table columns
```

### `config.json`

Can be used by the project for configuration required by the
development/build workflow.

``` text
config.json
   ↓
Project/build configuration
```

This separation makes it easier to change the table structure without
rewriting the rendering logic.

------------------------------------------------------------------------

# Example Use Case

Imagine an application needs a **Customers** table.

The application receives customer data:

``` json
[
    {
        "customerId": 101,
        "customerName": "Srinivas",
        "mobile": "9876543210",
        "city": "Bengaluru"
    }
]
```

Instead of manually writing:

``` html
<table>
    ...
</table>
```

the application defines the required columns and passes the data to
`TableBuilder`.

The library then creates the table UI.

``` text
Customer JSON
     ↓
Column JSON
     ↓
Table Configuration
     ↓
TableBuilder
     ↓
Customers Table
```

If another screen needs an **Orders** table, the same table-building
logic can be reused with a different data set and column configuration.

------------------------------------------------------------------------

# Benefits for Application Development

`jsTableBuilder` is especially useful when an application contains many
similar data-table screens.

For example:

-   Customer management
-   Product management
-   Orders
-   Invoices
-   Employees
-   Transactions
-   Reports
-   Inventory
-   Admin dashboards

Instead of developing every table independently, the application can
reuse the same table-building mechanism.

------------------------------------------------------------------------

# Customization

One of the project's important goals is to allow developers to customize
the table-building behavior.

You can use the package directly:

``` bash
npm install js-table-builder
```

Or generate/localize the source structure:

``` bash
npx js-table-builder
```

The local source approach is useful when a project needs changes to the
generated table UI or internal behavior.

------------------------------------------------------------------------

# Browser Compatibility

The CDN build is intended for browser-based JavaScript applications.

Example:

``` html
<script src="https://keshavsoft.github.io/jsTableBuilder/dist/v2/tableBuilder.umd.cjs"></script>
```

The library can then be accessed through:

``` javascript
window.ks.TableBuilder
```

------------------------------------------------------------------------

# API Entry Point

The main entry point used in the browser example is:

``` javascript
new window.ks.TableBuilder(config)
```

After creating the instance:

``` javascript
tableBuilder.appendToDom();
```

This renders the generated table into the configured HTML container.

------------------------------------------------------------------------

# Recommended Development Pattern

For applications using JSON-driven tables, a clean structure can look
like:

``` text
Application
│
├── data/
│   └── customers.json
│
├── columns/
│   └── customers.json
│
├── pages/
│   └── customers.html
│
└── table/
    └── TableBuilder configuration
```

The application can then change the data or columns independently while
keeping the table-rendering logic reusable.

------------------------------------------------------------------------

# Documentation and Demo

-   **Landing Page:** https://keshavsoft.github.io/jsTableBuilder/
-   **Documentation:**
    https://keshavsoft.github.io/jsTableBuilder/docs.html
-   **NPM Package:** https://www.npmjs.com/package/js-table-builder

------------------------------------------------------------------------

# Project Goal

The goal of `jsTableBuilder` is to provide a reusable way to build HTML
table interfaces from JSON.

Instead of writing table markup repeatedly, developers can describe:

``` text
What data should be displayed
        +
How the columns should be displayed
        +
How the table should behave
```

and let the table builder generate the UI.

This makes table development more **configuration-driven, reusable,
consistent, and easier to maintain**.

------------------------------------------------------------------------

# Summary

`jsTableBuilder` is a JavaScript-based table UI builder focused on
JSON-driven table generation.

The core concept is:

``` text
JSON Data
    +
JSON Column Configuration
    +
Table Configuration
    ↓
jsTableBuilder
    ↓
Dynamic HTML Table
```

It can be consumed through NPM, loaded through a CDN, or scaffolded
locally for deeper customization.

------------------------------------------------------------------------

## License

See the repository/package metadata for the applicable license
information.

------------------------------------------------------------------------

## Maintainer / Project

**KeshavSoft --- jsTableBuilder**

Repository: https://github.com/KeshavSoft/jsTableBuilder
