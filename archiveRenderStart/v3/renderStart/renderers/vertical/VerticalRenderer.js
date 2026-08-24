import { buildVerticalFormElements } from "./buildVerticalForm.js";
import { appendToDom } from "../shared/dom/appendToDom.js";
import { mergeClasses } from "./mergeClasses.js";

export const VERTICAL_DEFAULTS = {
    verticalForm: {
        show: true,
        label: "Default Vertical Form",
        style: "default"
    }
};

class VerticalRenderer {
    static DEFAULTS = VERTICAL_DEFAULTS;

    constructor({ htmlId, inDataStore, inClasses, inTheme = "style1" }) {
        this.htmlId = htmlId;
        this.dataStore = inDataStore;
        this.classes = mergeClasses({ inClasses, inTheme });
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
        return buildVerticalFormElements({
            inData: this.dataStore.data,
            inColumns: this.dataStore.columns,
            inClasses: this?.classes
        });
    };

    build() {
        const verticalFormNode = this.buildVerticalFormElement();
        return this.appendToDom(verticalFormNode);
    }
}

export { VerticalRenderer };
