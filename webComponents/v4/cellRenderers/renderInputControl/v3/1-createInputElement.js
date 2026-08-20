const createInputElement = (inOptions) => {
    const input = document.createElement("input");
    
    input.type = inOptions.controlType || "text";
    
    if (inOptions.placeholder) {
        input.placeholder = inOptions.placeholder;
    };
    
    return input;
};

export { createInputElement };
