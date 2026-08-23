import { buildTable } from "./index.js";
import { processSort } from "./dataFuncs/sortUtils.js";
import { processSearch } from "./dataFuncs/searchUtils.js";
import { buildTopHeader } from "./buildTopHeader.js";
import mapTableOptions, { DEFAULT_TABLE_OPTIONS } from "../shared/config/mapTableOptions.js";
import { extractTopHeader, DEFAULT_TOP_HEADER } from "../shared/config/extractTopHeader.js";
import { mergeClasses } from "../shared/config/mergeClasses.js";
import { setupColumnsAndData } from "./dataFuncs/setupDataStore.js";
import prepareData from "./dataFuncs/prepareData.js";

const logger = {
    showLogs: true,
    log: function (...args) {
        if (this.showLogs) {
            console.log(...args);
        }
    }
};

export const TABLE_DEFAULTS = {
    tableOptions: DEFAULT_TABLE_OPTIONS,
    topHeader: DEFAULT_TOP_HEADER
};

class TableRenderer {
    static DEFAULTS = TABLE_DEFAULTS;

    constructor(config = {}) {
        this.htmlId = config.htmlId || "table-root";
        this.rendererType = "table";

        // Map options with robust fallbacks from TABLE_DEFAULTS
        this.tableOptions = mapTableOptions(config.tableOptions || {}, TABLE_DEFAULTS.tableOptions);

        this.topHeader = extractTopHeader({
            inTopHeader: config.topHeader,
            defaultTopHeader: TABLE_DEFAULTS.topHeader
        });

        this.dataStore = setupColumnsAndData({
            instance: this,
            localColumns: config.columns || [],
            localData: config.data || [],
            localEndPoints: config.endPoints
        });

        this.classes = mergeClasses({ inClasses: config.classes || {}, inTheme: config.theme || "style1" });

        this.sortState = [];
        this.tableElement = null;
        this.services = {};
        if (config.endPoints) {
            // init services
        }
    }

    handleSort(dataKey, isMultiSort = false) {
        processSort(this, dataKey, isMultiSort);
    }

    handleSearch(query) {
        processSearch(this, query);
    }

    async appendToDom() {
        if (this.dataStore.data.length === 0 && this.services.read) {
            this.dataStore.originalData = await this.services.read();
            this.dataStore.data = prepareData({
                inData: this.dataStore.originalData,
                inShowSerialNo: this.tableOptions?.inCommonOptions?.inShowSerialNo
            });
        }

        const root = document.getElementById(this.htmlId);
        if (!root) {
            console.error(`Element with id '${this.htmlId}' not found.`);
            return;
        }

        const container = document.createElement("div");
        if (this.classes.container) {
            container.className = this.classes.container;
        }

        const topHeaderNode = this.buildTopHeaderElement();
        if (topHeaderNode) {
            container.appendChild(topHeaderNode);
        }

        this.tableElement = this.buildTableElements();
        if (this.tableElement) {
            container.appendChild(this.tableElement);
        }

        root.appendChild(container);
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
        debugger;
        return this.appendToDom();
    }
}

export { TableRenderer };
