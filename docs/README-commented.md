<!-- Project overview -->
# jsTableBuilder

A versatile and highly customizable JavaScript library to build dynamic HTML tables from JSON data.

<!-- Library features -->
## Features
- Dynamic column generation based on JSON configuration
- Built-in search/filtering functionality
- Customizable table appearance (borders, widths, etc.)
- Auto-generated serial numbers
- Optional footer row
<!-- Project links and resources -->
## Links
- **Landing Page**: [jsTableBuilder Site](https://keshavsoft.github.io/jsTableBuilder/)
- **NPM Package**: [js-table-builder](https://www.npmjs.com/package/js-table-builder)
- **Documentation**: [Full Docs](https://keshavsoft.github.io/jsTableBuilder/docs.html)

<!-- Install the library through NPM -->
## Installation via NPM

```bash
npm install js-table-builder
```

<!-- CLI usage for copying customizable source files -->
## Scaffold CLI Usage (shadcn-like)

You can use `npx` to paste the raw source files directly into your project! This will create a `buildTable` folder in your current directory, allowing you to completely customize the internal components of `jsTableBuilder`.

```bash
npx js-table-builder
```

<!-- Browser usage through CDN -->
## Usage via CDN

You can quickly get started by including `jsTableBuilder` directly in your HTML using our CDN link:

```html
<script src="https://keshavsoft.github.io/jsTableBuilder/dist/v2/tableBuilder.umd.cjs"></script>
```

<!-- Complete example: load JSON data, configure TableBuilder and render the table -->
### Quick Start Example

Here is a full example demonstrating how to fetch your data and columns configuration, initialize `jsTableBuilder`, and render the table into a DOM element.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>jsTableBuilder Example</title>
</head>
<body>
    <!-- The container where the table will be rendered -->
    <div id="table-root"></div>

    <!-- Include jsTableBuilder -->
    <script src="https://keshavsoft.github.io/jsTableBuilder/dist/v2/tableBuilder.umd.cjs"></script>

    <script>
        async function init() {
            try {
                // 1. Fetch the data and column configurations
                const [dataResponse, columnsResponse] = await Promise.all([
                    fetch("./all.json"),
                    fetch("./columns.json")
                ]);

                if (!dataResponse.ok) throw new Error("Failed to fetch data");
                if (!columnsResponse.ok) throw new Error("Failed to fetch columns");

                const tableData = await dataResponse.json();
                const columnsData = await columnsResponse.json();

                // 2. Define the table configuration
                const config = {
                    htmlId: "table-root", // ID of the container element
                    data: tableData,
                    columns: columnsData,
                    tableOptions: {
                        commonOptions: {
                            tableWidth: "100%", 
                            tableBorder: "0px",
                            showSerialNo: true // Automatically adds a # column
                        },
                        footOptions: {
                            showFooter: true
                        }
                    },
                    topHeader: {
                        label: "My Beautiful Table",
                        placeholder: "Search anything..." // Enables the global search bar
                    }
                };

                // 3. Initialize and render the table
                const tableBuilder = new window.ks.TableBuilder(config);
                tableBuilder.appendToDom();

            } catch (error) {
                console.error("Error initializing table:", error);
            }
        }

        // Run the init function
        init();
    </script>
</body>
</html>
```

<!-- TableBuilder configuration reference -->
## Configuration Details

The `config` object passed to `new window.ks.TableBuilder(config)` accepts the following properties:

- `htmlId` (String): The ID of the HTML element where the table will be injected.
- `data` (Array): An array of objects representing the rows of the table.
- `columns` (Array): An array of column configuration objects.
- `tableOptions` (Object): Customization options for the table appearance and behavior.
  - `commonOptions.tableWidth`: Set the CSS width of the table (e.g., `"800px"`, `"100%"`).
  - `commonOptions.tableBorder`: Set the CSS border for the table.
  - `commonOptions.showSerialNo`: Boolean to enable an auto-incrementing serial number column.
  - `footOptions.showFooter`: Boolean to display a table footer.
- `topHeader` (Object): Configuration for the header area above the table.
  - `label`: A title to display above the table.
  - `placeholder`: Placeholder text for the search input field.
