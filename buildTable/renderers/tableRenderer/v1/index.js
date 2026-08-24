import { buildTable } from "./buildTable/index.js";
import { appendToDom } from "./buildTable/utils/dom/appendToDom.js";
import "./webComponents/v4/KsTableCellContent.js";

class tableRenderer {
    constructor({
        htmlId,
        inDataStore,
        classes = {},
        theme = "style1",
        tableOptions = {},
    }) {
        const localHtmlId = htmlId;
        const localDataStore = inDataStore;

        this.htmlId = localHtmlId;
        // debugger;
        this.dataStore = localDataStore;

        this.sortState = [];
        this.tableElement = null;
    }

    async appendToDom() {
        appendToDom(this);
    };

    buildTableElements() {
        return buildTable({
            inData: this.dataStore.data,
            inColumns: this.dataStore.columns
        });
    };

    build() {
        return this.appendToDom();
    };
};

export { tableRenderer };