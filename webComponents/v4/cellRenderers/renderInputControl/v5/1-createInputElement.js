import { applyType } from "./1-createInputElement/typeLayer.js";
import { applyStandardAttributes } from "./1-createInputElement/standardAttributesLayer.js";
import { applyConstraints } from "./1-createInputElement/constraintsLayer.js";
import { applyBooleans } from "./1-createInputElement/booleansLayer.js";

const createInputElement = (inOptions) => {
    const input = document.createElement("input");

    applyType(input, inOptions);
    applyStandardAttributes(input, inOptions);
    applyConstraints(input, inOptions);
    applyBooleans(input, inOptions);

    return input;
};

export { createInputElement };