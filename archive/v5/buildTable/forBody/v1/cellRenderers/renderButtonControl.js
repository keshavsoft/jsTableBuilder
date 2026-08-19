export function renderButtonControl(shadowRoot, tdConfig) {
    const btn = document.createElement("button");
    const controlOptions = tdConfig.controlOptions || {};
    btn.textContent = controlOptions.label || "Button";
    
    // Basic Tailwind-like inline styles for the custom button
    btn.style.cssText = "padding: 0.375rem 0.75rem; font-size: 0.875rem; font-weight: 500; color: #ffffff; background-color: #3b82f6; border-radius: 0.375rem; border: none; cursor: pointer; transition: background-color 0.2s;";
    
    btn.onmouseover = () => btn.style.backgroundColor = "#2563eb";
    btn.onmouseout = () => btn.style.backgroundColor = "#3b82f6";
    
    if (controlOptions.onClick) {
        let clickHandler;
        if (typeof controlOptions.onClick === "string") {
            try {
                clickHandler = new Function('return (' + controlOptions.onClick + ')')();
            } catch (e) {
                console.error("Failed to parse onClick function:", e);
            }
        } else if (typeof controlOptions.onClick === "function") {
            clickHandler = controlOptions.onClick;
        }
        
        if (clickHandler) {
            btn.addEventListener("click", clickHandler);
        }
    }
    
    shadowRoot.appendChild(btn);
}
