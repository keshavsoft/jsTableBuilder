import { presentColumnData } from "./forFooter/v6/inputsRow/index.js";
import { buildCellContent } from "./forFooter/v6/inputsRow/4-buildCellContent.js";

const logger = {
    showLogs: true,
    log: function (...args) {
        if (this.showLogs) {
            console.log(...args);
        }
    }
};

const buildVerticalFormElements = ({ inData, inColumns, inClasses = {} }) => {
    const formClasses = inClasses?.verticalForm || {
        container: "flex flex-col gap-4 p-4",
        wrapper: "flex flex-col",
        label: "font-bold mb-1",
        input: "border border-gray-300 rounded px-2 py-1 w-full"
    };

    const container = document.createElement("div");
    if (formClasses.container) container.className = formClasses.container;
    container.classList.add("ks-vertical-form-container");

    inColumns.forEach(col => {
        const footOptions = col.options?.table?.tfoot?.inputsRow;
        
        // Render inputs for every column with a dataKey
        if (col.dataKey) {
            const wrapper = document.createElement("div");
            if (formClasses.wrapper) wrapper.className = formClasses.wrapper;
            wrapper.classList.add("ks-vertical-form-field");

            const label = document.createElement("label");
            label.textContent = col.label || col.dataKey;
            if (formClasses.label) label.className = formClasses.label;

            let selectedArray = [];
            // If the control type needs a list, generate it
            if (footOptions?.controlType === "datalist" || footOptions?.controlType === "select") {
                selectedArray = presentColumnData(inData, col.dataKey);
            };

            logger.log("selectedArray", selectedArray);

            // Options: merging column's specific config with the fallback defaults from classes
            const currentFootOptions = footOptions || {
                showInput: true,
                controlType: "text",
                className: formClasses.input
            };
            
            // Apply the custom input class if provided in the options, else fallback to theme input class
            if (!currentFootOptions.className) {
                currentFootOptions.className = formClasses.input;
            }

            const cellContent = buildCellContent({
                inFootOptions: currentFootOptions,
                inSummaryValue: "", // Empty for new entry
                inListData: selectedArray
            });

            wrapper.appendChild(label);
            wrapper.appendChild(cellContent);
            container.appendChild(wrapper);
        }
    });

    return container;
};

export { buildVerticalFormElements };
