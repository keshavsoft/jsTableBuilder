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
    const container = document.createElement("div");
    container.classList.add("ks-vertical-form-container");
    // Basic styling for the form container
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "1rem";
    container.style.padding = "1rem";

    inColumns.forEach(col => {
        const footOptions = col.options?.table?.tfoot?.inputsRow;
        
        // Render inputs for every column with a dataKey
        if (col.dataKey) {
            const wrapper = document.createElement("div");
            wrapper.classList.add("ks-vertical-form-field");
            wrapper.style.display = "flex";
            wrapper.style.flexDirection = "column";

            const label = document.createElement("label");
            label.textContent = col.label || col.dataKey;
            label.style.fontWeight = "bold";
            label.style.marginBottom = "0.25rem";

            let selectedArray = [];
            // If the control type needs a list, generate it
            if (footOptions?.controlType === "datalist" || footOptions?.controlType === "select") {
                selectedArray = presentColumnData(inData, col.dataKey);
            };

            logger.log("selectedArray", selectedArray);

            // Fallback options in case footer config isn't explicitly set for a column
            const defaultFootOptions = {
                showInput: true,
                controlType: "text",
                className: "border border-gray-300 rounded px-2 py-1 w-full"
            };

            const cellContent = buildCellContent({
                inFootOptions: footOptions || defaultFootOptions,
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
