import { buildTable } from "./buildTable/index.js";
import DEFAULT_CONFIG, { DEFAULT_CLASSES } from "./buildTable/config/defaults.js";
import { processSort } from "./buildTable/utils/dataFuncs/sortUtils.js";
import { processSearch } from "./buildTable/utils/dataFuncs/searchUtils.js";
import { buildTopHeader } from "./buildTable/buildTopHeader.js";
import { extractTableOptions } from "./buildTable/utils/config/extractTableOptions.js";
import mapTableOptions from "./buildTable/utils/config/mapTableOptions.js";
import { extractTopHeader } from "./buildTable/utils/config/extractTopHeader.js";
import { mergeClasses } from "./buildTable/utils/config/mergeClasses.js";
import { appendToDom } from "./buildTable/utils/dom/appendToDom.js";
import { setupColumnsAndData } from "./buildTable/utils/dataFuncs/setupDataStore.js";
import prepareData from "./buildTable/utils/dataFuncs/prepareData.js";

import "./webComponents/v1/KsTableCellContent.js";

const showLogs = false;

class TableBuilder {
    constructor({
        htmlId,
        data,
        columns = [],
        classes = {},
        theme = "style1",
        tableOptions = {},
        topHeader = DEFAULT_CONFIG.topHeader,
        endPoints
    }) {
        const localHtmlId = htmlId;
        const localData = data;
        const localColumns = columns;
        const localClasses = classes;
        const localEndPoints = endPoints;
        // debugger;
        if (showLogs) {
            // console.log("localHtmlId", localHtmlId);
            // console.log("localData", localData);
            // console.log("localColumns", localColumns);
            // console.log("localClasses", localClasses);
            // console.log("localEndPoints", localEndPoints);
            console.log("tableOptions", tableOptions);
        };

        // Map the clean external API (with subtrees) back to our strict internal 'in' naming convention
        const localTableOptionsMapped = mapTableOptions(tableOptions);

        if (showLogs) {
            // console.log("localHtmlId", localHtmlId);
            // console.log("localData", localData);
            // console.log("localColumns", localColumns);
            // console.log("localClasses", localClasses);
            // console.log("localEndPoints", localEndPoints);
            console.log("localTableOptionsMapped", localTableOptionsMapped);
        };

        // this.tableOptions = extractTableOptions({ inTableOptions: localTableOptionsMapped });
        this.tableOptions = localTableOptionsMapped;

        this.topHeader = extractTopHeader({ inTopHeader: topHeader });
        this.htmlId = localHtmlId;
        this.dataStore = {};
        // debugger;
        setupColumnsAndData({
            instance: this,
            localColumns,
            localData,
            localEndPoints
        });

        this.classes = mergeClasses({ inClasses: localClasses, inTheme: theme });

        this.sortState = [];
        this.tableElement = null;
    }

    handleSort(dataKey, isMultiSort = false) {
        processSort(this, dataKey, isMultiSort);
    }

    handleSearch(query) {
        processSearch(this, query);
    }

    async appendToDom() {
        // debugger;
        if (this.dataStore.data.length === 0) {

            this.dataStore.originalData = await this.services.read();

            this.dataStore.data = prepareData({
                inData: this.dataStore.originalData,
                inShowSerialNo: this.tableOptions?.inCommonOptions?.inShowSerialNo
            });

        };

        appendToDom(this);
    }

    buildTableElements() {
        return buildTable({
            inData: this.dataStore.data,
            inColumns: this.dataStore.columns,
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

const DEFAULT_INTERNAL_OBJECT = {
    inTableOptions: mapTableOptions(DEFAULT_CONFIG.tableOptions),
    inTopHeader: {
        inShow: DEFAULT_CONFIG.topHeader.show,
        inLabel: DEFAULT_CONFIG.topHeader.label,
        inPlaceholder: DEFAULT_CONFIG.topHeader.placeholder
    }
};

// window.ks = {};
window.ks = window.ks || {};
window.ks.TableBuilder = TableBuilder;
window.ks.TableBuilder.DEFAULT_CLASSES = DEFAULT_CLASSES;
window.ks.TableBuilder.DEFAULT_CONFIG = DEFAULT_CONFIG;
window.ks.TableBuilder.DEFAULT_INTERNAL_OBJECT = DEFAULT_INTERNAL_OBJECT;
window.ks.TableBuilder.version = "v9.0";

export { TableBuilder, DEFAULT_CLASSES, DEFAULT_CONFIG, DEFAULT_INTERNAL_OBJECT };
