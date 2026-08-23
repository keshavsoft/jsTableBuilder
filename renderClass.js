import { VerticalRenderer } from "./renderers/vertical/VerticalRenderer.js";
import { TableRenderer } from "./renderers/table/TableRenderer.js";
import { DEFAULT_CLASSES, DEFAULT_CONFIG } from "./renderers/shared/config/defaults.js";

import "./webComponents/v4/KsTableCellContent.js";

const RENDERER_MAP = {
    vertical: VerticalRenderer,
    table: TableRenderer
};

class ViewBuilder {
    constructor(config = {}) {
        // if (Array.isArray(config)) {
        //     this.configs = config;
        // } else if (config && Array.isArray(config.views)) {
        //     const { views, ...baseProps } = config;
        //     // Merge base properties with each view so they share data, columns, etc.
        //     this.configs = views.map(view => ({ ...baseProps, ...view }));
        // } else {
        //     this.configs = [config];
        // }

        this.config = config;
    }

    async appendToDom() {
        // Clear loading state for all unique target elements first
        const clearedIds = new Set();
        for (const config of this.config.views) {
            const htmlId = config.htmlId || "table-root";
            if (!clearedIds.has(htmlId)) {
                const rootElement = document.getElementById(htmlId);
                if (rootElement) {
                    rootElement.innerHTML = "";
                    clearedIds.add(htmlId);
                }
            }
        }

        // Build each renderer
        for (const config of this.config.views) {
            const rendererType = config.rendererType || "vertical";
            const htmlId = config.htmlId || "table-root";

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

            // Ensure config has the resolved htmlId for the renderer
            config.htmlId = htmlId;

            const renderer = new RendererClass(config);
            // The specific renderer does ALL the heavy lifting
            await renderer.build();
        }
    }

    build() {
        return this.appendToDom();
    }
}

// Attach static defaults and renderer registry
ViewBuilder.RENDERERS = RENDERER_MAP;
ViewBuilder.DEFAULT_CLASSES = DEFAULT_CLASSES;
ViewBuilder.DEFAULT_CONFIG = DEFAULT_CONFIG;
ViewBuilder.version = "v10.1-orchestrator";

window.ks = window.ks || {};
window.ks.ViewBuilder = ViewBuilder;

export { ViewBuilder, TableRenderer, VerticalRenderer, DEFAULT_CLASSES, DEFAULT_CONFIG };
