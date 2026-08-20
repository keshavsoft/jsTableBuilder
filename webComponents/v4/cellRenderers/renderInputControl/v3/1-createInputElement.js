const VALID_TYPES = [
    "text", "password", "email", "number", "tel", "url", "search",
    "date", "time", "datetime-local", "month", "week",
    "color", "range", "checkbox", "radio", "file", "hidden",
    "submit", "reset", "button", "image"
];

const createInputElement = (inOptions) => {
    const input = document.createElement("input");

    // Validate type against allowed HTML5 types, fallback to "text"
    const requestedType = (inOptions.controlType || "text").toLowerCase();
    input.type = VALID_TYPES.includes(requestedType) ? requestedType : "text";

    // Apply standard string/number attributes if provided
    if (inOptions.placeholder) input.placeholder = inOptions.placeholder;
    if (inOptions.value !== undefined) input.value = inOptions.value;
    if (inOptions.name) input.name = inOptions.name;
    if (inOptions.id) input.id = inOptions.id;

    // Number, Range, and Date constraints
    if (inOptions.min !== undefined) input.min = inOptions.min;
    if (inOptions.max !== undefined) input.max = inOptions.max;
    if (inOptions.step !== undefined) input.step = inOptions.step;

    // Text constraints
    if (inOptions.maxLength !== undefined) input.maxLength = inOptions.maxLength;
    if (inOptions.pattern) input.pattern = inOptions.pattern;

    // Boolean attributes
    if (inOptions.required) input.required = true;
    if (inOptions.disabled) input.disabled = true;
    if (inOptions.readOnly) input.readOnly = true;

    // Type-specific booleans
    if (inOptions.checked) input.checked = true; // checkbox/radio
    if (inOptions.multiple) input.multiple = true; // file/email

    return input;
};

export { createInputElement };