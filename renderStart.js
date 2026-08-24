import { setupColumnsAndData } from "./renderStart/dataFuncs/setupDataStore.js";

import { VerticalRenderer } from "./renderStart/renderers/vertical/VerticalRenderer.js";
import { tableRenderer } from "./renderStart/renderers/tableRenderer/v1/index.js";

import "./webComponents/v4/KsTableCellContent.js";

const RENDERER_MAP = {
    vertical: VerticalRenderer,
    table: tableRenderer
};

class TableBuilder {
    constructor({
        htmlId,
        data,
        columns = [],
        endPoints,
        views
    }) {
        const localHtmlId = htmlId;
        const localData = data;
        const localColumns = columns;
        const localEndPoints = endPoints;

        this.htmlId = localHtmlId;
        // debugger;
        this.dataStore = setupColumnsAndData({
            instance: this,
            localColumns,
            localData,
            localEndPoints
        });

        this.views = views;

        console.log("bbbbbbbbb : ", this);

    };

    async appendToDom() {
        for (const config of this.views) {
            const rendererType = config.rendererType || "vertical";
            const htmlId = this.htmlId || "table-root";

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

            const renderer = new RendererClass({
                htmlId,
                inDataStore: this.dataStore
            });
            // The specific renderer does ALL the heavy lifting
            await renderer.build();
        };
    };

    build() {
        return this.appendToDom();
    };
};

window.ks = window.ks || {};
window.ks.TableBuilder = TableBuilder;
window.ks.TableBuilder.version = "v14.0";

export { TableBuilder };