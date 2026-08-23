import { buildVerticalFormElements } from "./buildVerticalForm.js";
import { appendToDom } from "../shared/dom/appendToDom.js";
import { mergeClasses } from "../shared/config/mergeClasses.js";

const logger = {
    showLogs: true,
    log: function (...args) {
        if (this.showLogs) {
            console.log(...args);
        }
    }
};

export const VERTICAL_DEFAULTS = {
    verticalForm: {
        show: true,
        label: "Default Vertical Form",
        style: "default"
    }
};

class VerticalRenderer {
    static DEFAULTS = VERTICAL_DEFAULTS;

    constructor(config = {}) {
        this.htmlId = config.htmlId || "table-root";
        this.rendererType = "vertical";
        this.verticalForm = {
            ...VERTICAL_DEFAULTS.verticalForm,
            ...(config.verticalForm || {})
        };
        this.classes = mergeClasses({ inClasses: config.classes || {}, inTheme: config.theme || "style1" });

        // Simulating dataStore for vertical form
        this.dataStore = {
            data: config.data || [],
            columns: config.columns || []
        };

        this.services = {};
        if (config.endPoints) {
            // Setup services if needed
        }
    }

    async appendToDom() {
        if (this.dataStore.data.length === 0 && this.services.read) {
            this.dataStore.originalData = await this.services.read();
            this.dataStore.data = this.dataStore.originalData;
        }

        appendToDom(this);
    }

    // Required by appendToDom.js currently
    buildVerticalFormElement() {
        logger.log("VerticalRenderer buildVerticalFormElement called", this);
        if (!this.verticalForm || this.verticalForm.show === false) return null;

        return buildVerticalFormElements({
            inData: this.dataStore.data,
            inColumns: this.dataStore.columns,
            inClasses: this.classes
        });
    }

    build() {
        return this.appendToDom();
    }
}

export { VerticalRenderer };
