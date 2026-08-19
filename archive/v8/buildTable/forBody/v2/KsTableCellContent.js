import { renderButtonControl } from "./cellRenderers/renderButtonControl.js";
import { renderAnchorControl } from "./cellRenderers/renderAnchorControl.js";
import { renderArrayView } from "./cellRenderers/renderArrayView.js";
import { renderDefault } from "./cellRenderers/renderDefault.js";

class KsTableCellContent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._inputs = {};
    }

    set inputs(data) {
        this._inputs = data;
        this.render();
    }

    render() {
        let val = this._inputs.cellValue;
        let rowData = this._inputs.rowData;
        const options = this._inputs.options || {};
        
        // Clear previous content
        this.shadowRoot.innerHTML = '';

        // 1. Check for custom control definition
        const tdConfig = options.table?.tbody?.td;
        if (tdConfig) {
            if (tdConfig.controlType === "button") {
                renderButtonControl(this.shadowRoot, tdConfig, rowData, val);
                return;
            } else if (tdConfig.controlType === "anchor") {
                renderAnchorControl(this.shadowRoot, tdConfig, rowData, val);
                return;
            }
        }

        // 2. Check for Array Data
        if (Array.isArray(val)) {
            renderArrayView(this.shadowRoot, val);
            return;
        }

        // 3. Fallback to default text rendering
        renderDefault(this.shadowRoot, val);
    }
}

if (!customElements.get("ks-table-cell-content-v2")) {
    customElements.define("ks-table-cell-content-v2", KsTableCellContent);
}

export { KsTableCellContent };
