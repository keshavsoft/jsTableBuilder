import { applyType } from "./1-createInputElement/typeLayer.js";
import { applyStandardAttributes } from "./1-createInputElement/standardAttributesLayer.js";
import { applyConstraints } from "./1-createInputElement/constraintsLayer.js";
import { applyBooleans } from "./1-createInputElement/booleansLayer.js";
import { createDatalist } from "./1-createInputElement/datalistControl.js";
import { createSelect } from "./1-createInputElement/selectControl.js";

const logger = {
    showLogs: false,
    log: function (...args) {
        if (this.showLogs) {
            console.log(...args);
        }
    }
};

const createInputElement = (inOptions) => {
    const localOptions = inOptions;
    logger.log(localOptions, "----------");

    let createdElement;

    if (localOptions.controlType === "datalist") {
        createdElement = createDatalist(localOptions);
    } else if (localOptions.controlType === "select") {
        createdElement = createSelect(localOptions);
    } else {
        createdElement = document.createElement("input");
        applyType(createdElement, localOptions);
    }

    applyStandardAttributes(createdElement, localOptions);
    applyConstraints(createdElement, localOptions);
    applyBooleans(createdElement, localOptions);

    return createdElement;
};

export { createInputElement };
