import { VerticalRenderer } from "./renderers/vertical/VerticalRenderer.js";
import { TableRenderer } from "./renderers/table/TableRenderer.js";
import { DEFAULT_CLASSES, DEFAULT_CONFIG } from "./renderers/shared/config/defaults.js";

import "./webComponents/v4/KsTableCellContent.js";

const RENDERER_MAP = {
    vertical: VerticalRenderer,
    table: TableRenderer
};

class TableBuilder {
    constructor(config = {}) {
        this.config = config;
        this.rendererType = config.rendererType || "vertical";
        this.htmlId = config.htmlId || "table-root";
    }

    async appendToDom() {
        const rootElement = document.getElementById(this.htmlId);
        if (!rootElement) {
            console.error(`Element with id '${this.htmlId}' not found.`);
            return;
        }

        rootElement.innerHTML = ""; // Clear loading state

        const RendererClass = RENDERER_MAP[this.rendererType];
        if (!RendererClass) {
            console.error(`Renderer type '${this.rendererType}' is not supported.`);
            return;
        }

        const renderer = new RendererClass(this.config);
        // The specific renderer does ALL the heavy lifting
        await renderer.build();
    }

    build() {
        return this.appendToDom();
    }
}

// Attach static defaults and renderer registry
TableBuilder.RENDERERS = RENDERER_MAP;
TableBuilder.DEFAULT_CLASSES = DEFAULT_CLASSES;
TableBuilder.DEFAULT_CONFIG = DEFAULT_CONFIG;
TableBuilder.version = "v10.1-orchestrator";

window.ks = window.ks || {};
window.ks.TableBuilder = TableBuilder;

export { TableBuilder, TableRenderer, VerticalRenderer, DEFAULT_CLASSES, DEFAULT_CONFIG };
