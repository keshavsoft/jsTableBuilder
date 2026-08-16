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
        
        // Clear previous content
        this.shadowRoot.innerHTML = '';

        if (Array.isArray(val)) {
            const btn = document.createElement("button");
            btn.textContent = `View (${val.length})`;
            // Basic Tailwind-like inline styles for the button
            btn.style.cssText = "padding: 0.25rem 0.5rem; font-size: 0.75rem; font-weight: 500; color: #374151; background-color: #f3f4f6; border-radius: 0.375rem; border: 1px solid #d1d5db; cursor: pointer;";
            
            // Optional: Add hover effect via JS since it's inline
            btn.onmouseover = () => btn.style.backgroundColor = "#e5e7eb";
            btn.onmouseout = () => btn.style.backgroundColor = "#f3f4f6";
            
            this.shadowRoot.appendChild(btn);
            return;
        }

        if (typeof val === "object" && val !== null) {
            val = JSON.stringify(val);
        }
        val = val !== undefined && val !== null ? val : "";
        
        // Render the value directly without a wrapper element
        this.shadowRoot.textContent = val;
    }
}

if (!customElements.get("ks-table-cell-content")) {
    customElements.define("ks-table-cell-content", KsTableCellContent);
}

export { KsTableCellContent };
