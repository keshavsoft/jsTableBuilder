import { buildTable } from "./buildTable/index.js";
import { DEFAULT_CLASSES, DEFAULT_CONFIG } from "./buildTable/config/defaults.js";
import { processSort } from "./buildTable/utils/data/sortUtils.js";
import { processSearch } from "./buildTable/utils/data/searchUtils.js";
import { prepareDataAndColumns } from "./buildTable/utils/data/prepareDataAndColumns.js";
import { buildTopHeader } from "./buildTable/buildTopHeader.js";
import { extractTableOptions } from "./buildTable/utils/config/extractTableOptions.js";
import { mapTableOptions } from "./buildTable/utils/config/mapTableOptions.js";
import { extractTopHeader } from "./buildTable/utils/config/extractTopHeader.js";
import { mergeClasses } from "./buildTable/utils/config/mergeClasses.js";
import { appendToDom } from "./buildTable/utils/dom/appendToDom.js";

class TableBuilder {
    constructor({
        htmlId,
        data,
        columns = [],
        classes = {},
        tableOptions = {},
        topHeader = DEFAULT_CONFIG.inTopHeader
    }) {
        const localHtmlId = htmlId;
        const localData = data;
        const localColumns = columns;
        const localClasses = classes;

        // Map the clean external API (with subtrees) back to our strict internal 'in' naming convention
        const localTableOptionsMapped = mapTableOptions(tableOptions);

        this.tableOptions = extractTableOptions({ inTableOptions: localTableOptionsMapped });
        this.topHeader = extractTopHeader({ inTopHeader: topHeader });
        this.htmlId = localHtmlId;

        const { processedData, processedColumns } = prepareDataAndColumns({
            inData: localData,
            inColumns: localColumns,
            inShowSerialNo: this.tableOptions.inCommonOptions.inShowSerialNo
        });

        this.originalData = processedData;
        this.data = [...processedData];
        this.columns = processedColumns;

        this.classes = mergeClasses({ inClasses: localClasses });

        this.sortState = [];
        this.tableElement = null;
    }

    handleSort(dataKey, isMultiSort = false) {
        processSort(this, dataKey, isMultiSort);
    }

    handleSearch(query) {
        processSearch(this, query);
    }

    appendToDom() {
        appendToDom(this);
    }

    buildTableElements() {
        return buildTable({
            inData: this.data,
            inColumns: this.columns,
            inClasses: this.classes,
            inTableOptions: this.tableOptions,
            inSortState: this.sortState,
            inOnSort: this.handleSort.bind(this)
        });
    }

    buildTopHeaderElement() {
        if (!this.topHeader || this.topHeader.inShow === false) return null;

        return buildTopHeader({
            inLabel: this.topHeader.inLabel,
            inPlaceholder: this.topHeader.inPlaceholder,
            inClasses: this.classes.topHeader,
            inOnSearch: this.handleSearch.bind(this)
        });
    }

    build() {
        return this.appendToDom();
    }
}

window.ks = {};
window.ks.TableBuilder = TableBuilder;
window.ks.TableBuilder.DEFAULT_CLASSES = DEFAULT_CLASSES;
window.ks.TableBuilder.DEFAULT_CONFIG = DEFAULT_CONFIG;
window.ks.TableBuilder.version = "v3.0";

export { TableBuilder, DEFAULT_CLASSES, DEFAULT_CONFIG };

