export const applyStandardAttributes = (input, inOptions) => {
    if (inOptions.placeholder) input.placeholder = inOptions.placeholder;
    if (inOptions.value !== undefined) input.value = inOptions.value;
    if (inOptions.name) input.name = inOptions.name;
    if (inOptions.id) input.id = inOptions.id;
};
