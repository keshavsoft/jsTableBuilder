const startFunc = (shadowRoot, inOptions = null) => {
    // Keep options local for now as defaults, but allow overriding from outside later
    const options = inOptions || {
        controlType: "text",
        placeholder: "Enter value..."
    };

    const input = document.createElement("input");
    
    input.type = options.controlType || "text";
    if (options.placeholder) input.placeholder = options.placeholder;
    
    // Add very nice styling using inline CSS since this is inside a Shadow DOM
    // (Tailwind classes won't work by default unless the stylesheet is injected)
    input.style.cssText = "width: 100%; max-width: 12rem; box-sizing: border-box; border: 1px solid #d1d5db; border-radius: 0.375rem; padding: 0.375rem 0.75rem; font-size: 0.875rem; outline: none; transition: all 0.2s ease-in-out; color: #374151; background-color: #ffffff; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);";
    
    // Add focus effects
    input.addEventListener("focus", () => {
        input.style.borderColor = "#3b82f6";
        input.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.3)";
    });
    
    input.addEventListener("blur", () => {
        input.style.borderColor = "#d1d5db";
        input.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
    });
    
    // If a className is passed from outside, we could optionally append it
    if (options.className) {
        input.className = options.className;
    }

    shadowRoot.appendChild(input);
};

export default startFunc;
