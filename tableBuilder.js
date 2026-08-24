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
// import { buildVerticalFormElements } from "./buildTable/buildVerticalForm.js";

import { VerticalRenderer } from "./buildTable/renderers/vertical/VerticalRenderer.js";
import { tableRenderer } from "./buildTable/renderers/tableRenderer/v1/index.js";

import "./webComponents/v4/KsTableCellContent.js";

const RENDERER_MAP = {
    vertical: VerticalRenderer,
    table: tableRenderer
};

const logger = {
    showLogs: true,
    log: function (...args) {
        if (this.showLogs) {
            console.log(...args);
        }
    }
};

class TableBuilder {
    constructor({
        htmlId,
        data,
        columns = [],
        classes = {},
        theme = "style1",
        tableOptions = {},
        topHeader = DEFAULT_CONFIG.topHeader,
        verticalForm = DEFAULT_CONFIG.verticalForm,
        endPoints
    }) {
        const localHtmlId = htmlId;
        const localData = data;
        const localColumns = columns;
        const localClasses = classes;
        const localEndPoints = endPoints;

        // Map the clean external API (with subtrees) back to our strict internal 'in' naming convention
        const localTableOptionsMapped = mapTableOptions(tableOptions);

        // this.tableOptions = extractTableOptions({ inTableOptions: localTableOptionsMapped });
        this.tableOptions = localTableOptionsMapped;

        this.topHeader = extractTopHeader({ inTopHeader: topHeader });
        this.verticalForm = verticalForm;

        this.htmlId = localHtmlId;
        // debugger;
        this.dataStore = setupColumnsAndData({
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
        // if (this.dataStore.data.length === 0) {
        //     this.dataStore.originalData = await this.services.read();

        //     this.dataStore.data = prepareData({
        //         inData: this.dataStore.originalData,
        //         inShowSerialNo: this.tableOptions?.inCommonOptions?.inShowSerialNo
        //     });

        // };

        // appendToDom(this);

        for (const config of this.config.views) {
            const rendererType = config.rendererType || "vertical";
            const htmlId = config.htmlId || "table-root";

            const rootElement = document.getElementById(htmlId);
            if (!rootElement) {
                console.error(`Element with id '${htmlId}' not found.`);
                continue;
            }

            const RendererClass = RENDERER_MAP[rendererType];
            if (!RendererClass) {
                console.error(`Renderer type '${rendererType}' is not supported.`);
                continue;
            }

            // Ensure config has the resolved htmlId for the renderer
            config.htmlId = htmlId;

            const renderer = new RendererClass(config);
            // The specific renderer does ALL the heavy lifting
            await renderer.build({
                htmlId,
                inDataStore: this.dataStore
            });
        };
    };

    async appendToDom1() {
        // debugger;
        if (this.dataStore.data.length === 0) {
            this.dataStore.originalData = await this.services.read();

            this.dataStore.data = prepareData({
                inData: this.dataStore.originalData,
                inShowSerialNo: this.tableOptions?.inCommonOptions?.inShowSerialNo
            });

        };

        appendToDom(this);
    };

    buildTableElements() {
        return buildTable({
            inData: this.dataStore.data,
            inColumns: this.dataStore.columns,
            inClasses: this.classes,
            inTableOptions: this.tableOptions,
            inSortState: this.sortState,
            inOnSort: this.handleSort.bind(this)
        });
    };

    buildTopHeaderElement() {
        if (!this.topHeader || this.topHeader.inShow === false) return null;

        return buildTopHeader({
            inLabel: this.topHeader.inLabel,
            inPlaceholder: this.topHeader.inPlaceholder,
            inClasses: this.classes.topHeader,
            inOnSearch: this.handleSearch.bind(this)
        });
    };

    buildVerticalFormElement() {
        logger.log("buildVerticalFormElement called", this);
        // debugger;
        if (!this.verticalForm || this.verticalForm.show === false) return null;

        return buildVerticalFormElements({
            inData: this.dataStore.data,
            inColumns: this.dataStore.columns,
            inClasses: this.classes
        });
    };

    build() {
        return this.appendToDom();
    };
};

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