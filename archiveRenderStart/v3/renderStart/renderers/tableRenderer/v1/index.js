import { buildTable } from "./buildTable/index.js";
// import { appendToDom } from "./buildTable/utils/dom/appendToDom.js";
// import "./webComponents/v4/KsTableCellContent.js";
import { mergeClasses } from "./mergeClasses.js";

class tableRenderer {
    constructor({ htmlId, inDataStore, inTheme, inClasses }) {
        console.log("hhhhhhhh : ", htmlId, inDataStore, inTheme, inClasses);

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

    buildTableElements() {
        return buildTable({
            inData: this.dataStore.data,
            inColumns: this.dataStore.columns,
            inClasses: this.classes
        });
    };

    build() {
        const verticalFormNode = this.buildTableElements();

        return this.appendToDom(verticalFormNode);
    };
};

export { tableRenderer };