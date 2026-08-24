import { buildTable } from "./buildTable/index.js";
// import { appendToDom } from "./buildTable/utils/dom/appendToDom.js";
// import "./webComponents/v4/KsTableCellContent.js";

class tableRenderer {
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
        console.log("aaaaaaaaa----- : ", root, controlToInsert);

        root.appendChild(controlToInsert);
    };

    buildTableElements() {
        return buildTable({
            inData: this.dataStore.data,
            inColumns: this.dataStore.columns
        });
    };

    build() {
        const verticalFormNode = this.buildTableElements();

        return this.appendToDom(verticalFormNode);
    };
};

export { tableRenderer };