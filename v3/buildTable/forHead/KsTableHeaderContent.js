class KsTableHeaderContent extends HTMLElement {
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
        const { header, dataKey, options = {}, sortState = [] } = this._inputs;
        let textContent = header || dataKey || "";
        
        if (options.sortable) {
            const sortIndex = Array.isArray(sortState) ? sortState.findIndex(s => s.dataKey === dataKey) : -1;
            
            if (sortIndex !== -1) {
                const sortConfig = sortState[sortIndex];
                let indicator = sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
                
                if (sortState.length > 1) {
                    indicator += (sortIndex + 1);
                }
                textContent += indicator;
            }
        }
        
        this.shadowRoot.textContent = textContent;
    }
}

if (!customElements.get("ks-table-header-content")) {
    customElements.define("ks-table-header-content", KsTableHeaderContent);
}

export { KsTableHeaderContent };
