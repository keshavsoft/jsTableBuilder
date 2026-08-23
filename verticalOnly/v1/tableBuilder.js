import DEFAULT_CONFIG, { DEFAULT_CLASSES } from "./buildTable/config/defaults.js";
import mapTableOptions from "./buildTable/utils/config/mapTableOptions.js";
import { mergeClasses } from "./buildTable/utils/config/mergeClasses.js";
import { appendToDom } from "./buildTable/utils/dom/appendToDom.js";
import { buildVerticalFormElements } from "./buildTable/buildVerticalForm.js";

import "./webComponents/v4/KsTableCellContent.js";

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
        verticalForm = DEFAULT_CONFIG.verticalForm,
        rendererType = "vertical",
        endPoints
    }) {
        const localHtmlId = htmlId;
        const localData = data;
        const localColumns = columns;
        const localClasses = classes;
        const localEndPoints = endPoints;

        this.rendererType = rendererType;
        this.verticalForm = verticalForm;

        this.htmlId = localHtmlId;

        this.classes = mergeClasses({ inClasses: localClasses, inTheme: theme });
        
        // Simulating dataStore for vertical form
        this.dataStore = {
            data: localData || [],
            columns: localColumns || []
        };
        
        this.services = {};
        if (localEndPoints) {
            // Setup services if needed
        }
    }

    async appendToDom() {
        if (this.dataStore.data.length === 0 && this.services.read) {
            this.dataStore.originalData = await this.services.read();
            this.dataStore.data = this.dataStore.originalData;
        }

        appendToDom(this);
    };

    buildVerticalFormElement() {
        logger.log("buildVerticalFormElement called", this);
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
    inTableOptions: mapTableOptions(DEFAULT_CONFIG.tableOptions)
};

window.ks = window.ks || {};
window.ks.TableBuilder = TableBuilder;
window.ks.TableBuilder.DEFAULT_CLASSES = DEFAULT_CLASSES;
window.ks.TableBuilder.DEFAULT_CONFIG = DEFAULT_CONFIG;
window.ks.TableBuilder.DEFAULT_INTERNAL_OBJECT = DEFAULT_INTERNAL_OBJECT;
window.ks.TableBuilder.version = "v10.0-renderer";

export { TableBuilder, DEFAULT_CLASSES, DEFAULT_CONFIG, DEFAULT_INTERNAL_OBJECT };
