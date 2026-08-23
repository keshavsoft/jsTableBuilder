import { VerticalRenderer } from "./renderers/vertical/VerticalRenderer.js";
// import { TableRenderer } from "./renderers/table/TableRenderer.js";
import DEFAULT_CONFIG, { DEFAULT_CLASSES } from "./renderers/shared/config/defaults.js";
import mapTableOptions from "./renderers/shared/config/mapTableOptions.js";

import "./webComponents/v4/KsTableCellContent.js";

class TableBuilder {
    constructor(config) {
        this.config = config;
        this.rendererType = config.rendererType || "vertical";
        this.htmlId = config.htmlId;
    }

    async appendToDom() {
        const rootElement = document.getElementById(this.htmlId);
        if (!rootElement) {
            console.error(`Element with id '${this.htmlId}' not found.`);
            return;
        }

        rootElement.innerHTML = ""; // Clear loading state

        let renderer;

        if (this.rendererType === "vertical") {
            renderer = new VerticalRenderer(this.config);
        } else if (this.rendererType === "table") {
            // renderer = new TableRenderer(this.config);
        } else {
            console.error(`Renderer type '${this.rendererType}' is not supported.`);
            return;
        }

        // The specific renderer does ALL the heavy lifting
        await renderer.build();
    }

    build() {
        return this.appendToDom();
    }
}

const DEFAULT_INTERNAL_OBJECT = {
    inTableOptions: mapTableOptions(DEFAULT_CONFIG.tableOptions)
};

window.ks = window.ks || {};
window.ks.TableBuilder = TableBuilder;
window.ks.TableBuilder.DEFAULT_CLASSES = DEFAULT_CLASSES;
window.ks.TableBuilder.DEFAULT_CONFIG = DEFAULT_CONFIG;
window.ks.TableBuilder.DEFAULT_INTERNAL_OBJECT = DEFAULT_INTERNAL_OBJECT;
window.ks.TableBuilder.version = "v10.1-orchestrator";

export { TableBuilder, DEFAULT_CLASSES, DEFAULT_CONFIG, DEFAULT_INTERNAL_OBJECT };
