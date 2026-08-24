import { renderButtonControl } from "./cellRenderers/renderButtonControl.js";
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
        const options = this._inputs.options || {};
        
        // Clear previous content
        this.shadowRoot.innerHTML = '';

        // 1. Check for custom control definition (e.g. Button)
        const tdConfig = options.table?.tbody?.td;
        if (tdConfig && tdConfig.controlType === "button") {
            renderButtonControl(this.shadowRoot, tdConfig);
            return;
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

if (!customElements.get("ks-table-cell-content")) {
    customElements.define("ks-table-cell-content", KsTableCellContent);
}

export { KsTableCellContent };
