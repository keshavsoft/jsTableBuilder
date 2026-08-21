const addInteractionBehaviors = (inInput) => {
    // Add focus effects
    inInput.addEventListener("focus", () => {
        inInput.style.borderColor = "#3b82f6";
        inInput.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.3)";
    });
    
    inInput.addEventListener("blur", () => {
        inInput.style.borderColor = "#d1d5db";
        inInput.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
    });
};

export { addInteractionBehaviors };
