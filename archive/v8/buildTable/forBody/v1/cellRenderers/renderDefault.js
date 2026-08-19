export function renderDefault(shadowRoot, val) {
    if (typeof val === "object" && val !== null) {
        val = JSON.stringify(val);
    }
    val = val !== undefined && val !== null ? val : "";
    
    // Render the value directly without a wrapper element
    shadowRoot.textContent = val;
}
