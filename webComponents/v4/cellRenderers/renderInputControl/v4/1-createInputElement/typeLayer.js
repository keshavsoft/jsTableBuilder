const VALID_TYPES = [
    "text", "password", "email", "number", "tel", "url", "search",
    "date", "time", "datetime-local", "month", "week",
    "color", "range", "checkbox", "radio", "file", "hidden",
    "submit", "reset", "button", "image"
];

export const applyType = (input, inOptions) => {
    const requestedType = (inOptions.controlType || "text").toLowerCase();
    input.type = VALID_TYPES.includes(requestedType) ? requestedType : "text";
};
