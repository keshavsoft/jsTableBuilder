import { applyType } from "./1-createInputElement/typeLayer.js";
import { applyStandardAttributes } from "./1-createInputElement/standardAttributesLayer.js";
import { applyConstraints } from "./1-createInputElement/constraintsLayer.js";
import { applyBooleans } from "./1-createInputElement/booleansLayer.js";

const logger = {
    showLogs: false,
    log: function (...args) {
        if (this.showLogs) {
            console.log(...args);
        }
    }
};

const createInputElement = (inOptions) => {
    logger.log(inOptions);

    if (inOptions.controlType === "datalist") {
        const wrapper = document.createElement("div");
        wrapper.style.display = "inline-block";
        wrapper.style.width = "100%";

        const input = document.createElement("input");
        const dataList = document.createElement("datalist");
        const listId = "datalist-" + Math.random().toString(36).substr(2, 9);

        input.setAttribute("list", listId);
        dataList.id = listId;

        if (inOptions.listData && Array.isArray(inOptions.listData)) {
            inOptions.listData.forEach(item => {
                const option = document.createElement("option");
                option.value = item;
                dataList.appendChild(option);
            });
        }

        applyType(input, inOptions);
        applyStandardAttributes(input, inOptions);
        applyConstraints(input, inOptions);
        applyBooleans(input, inOptions);

        wrapper.appendChild(input);
        wrapper.appendChild(dataList);

        // Expose input property on wrapper so styles/behaviors targeting "input" can still reach it or just return wrapper
        // However, applyDefaultStyles in v5/index.js styles the returned element directly.
        // It's better to style the input inside the wrapper.
        // We can attach a reference to the actual input element on the wrapper to help with this, 
        // but for now returning the wrapper means styles apply to the div wrapper.
        // Let's adjust so it works nicely. Wait, we can return just the wrapper, and in index.js we might need to handle it.
        // Alternatively, we can return the input, and append the datalist as a sibling in index.js? 
        // No, createInputElement should return a single element. Returning the wrapper is standard. 
        // We'll see how index styles it. Let's return a Fragment instead of wrapper.
        const fragment = document.createDocumentFragment();
        fragment.appendChild(input);
        fragment.appendChild(dataList);

        // We must return the input element so that index.js can apply styles and behaviors to it.
        // The index.js will append the input to the shadow root. But what about the datalist?
        // We can attach the datalist to the input as a property, so index.js can append both.
        input.__dataListElement = dataList;
        return input;
    }

    const input = document.createElement("input");

    applyType(input, inOptions);
    applyStandardAttributes(input, inOptions);
    applyConstraints(input, inOptions);
    applyBooleans(input, inOptions);

    return input;
};

export { createInputElement };