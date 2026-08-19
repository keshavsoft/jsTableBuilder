export function renderAnchorControl(shadowRoot, tdConfig, rowData, val) {
    const a = document.createElement("a");
    const controlOptions = tdConfig.controlOptions || {};
    
    // Set text to the label if provided, otherwise fallback to the cell value
    a.textContent = controlOptions.label || val || "Link";
    
    // Basic styling for anchor
    a.style.cssText = "color: #2563eb; text-decoration: underline; cursor: pointer; transition: color 0.2s;";
    a.onmouseover = () => a.style.color = "#1d4ed8";
    a.onmouseout = () => a.style.color = "#2563eb";
    
    // Evaluate the href function with rowData as 'this' context
    let hrefStr = "#";
    if (controlOptions.href) {
        if (typeof controlOptions.href === "string") {
            try {
                const fn = new Function('return (' + controlOptions.href + ')')();
                hrefStr = fn.call(rowData);
            } catch (e) {
                console.error("Failed to parse href function:", e);
            }
        } else if (typeof controlOptions.href === "function") {
            hrefStr = controlOptions.href.call(rowData);
        }
    }
    
    a.href = hrefStr;
    shadowRoot.appendChild(a);
}
