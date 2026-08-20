const applyDefaultStyles = (inInput, inOptions) => {
    // Add very nice styling using inline CSS since this is inside a Shadow DOM
    inInput.style.cssText = "width: 100%; max-width: 12rem; box-sizing: border-box; border: 1px solid #d1d5db; border-radius: 0.375rem; padding: 0.375rem 0.75rem; font-size: 0.875rem; outline: none; transition: all 0.2s ease-in-out; color: #374151; background-color: #ffffff; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);";
    
    // If a className is passed from outside, we optionally append it
    if (inOptions.className) {
        inInput.className = inOptions.className;
    };
};

export { applyDefaultStyles };
