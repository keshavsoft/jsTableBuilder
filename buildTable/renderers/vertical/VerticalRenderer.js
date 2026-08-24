import { buildVerticalFormElements } from "./buildVerticalForm.js";
import { appendToDom } from "../shared/dom/appendToDom.js";
import { mergeClasses } from "../shared/config/mergeClasses.js";

const logger = {
    showLogs: false,
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

    constructor({ htmlId, inDataStore }) {
        this.htmlId = htmlId;
        this.dataStore = inDataStore;

        console.log("jjjjjjj : ", this);

    };

    appendToDom(controlToInsert) {
        const root = document.getElementById(this.htmlId);
        if (!root) {
            console.error(`Element with id '${instance.htmlId}' not found.`);
            return;
        }

        root.appendChild(controlToInsert);
    };

    buildVerticalFormElement() {
        logger.log("VerticalRenderer buildVerticalFormElement called", this);
        // if (!this.verticalForm || this.verticalForm.show === false) return null;

        return buildVerticalFormElements({
            inData: this.dataStore.data,
            inColumns: this.dataStore.columns,
            inClasses: this?.classes
        });
    }

    build() {
        const verticalFormNode = this.buildVerticalFormElement();
        return this.appendToDom(verticalFormNode);
    }
}

export { VerticalRenderer };
