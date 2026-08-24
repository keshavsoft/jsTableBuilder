import applyCellOptions from "./applyCellOptions.js";

const buildTdElement = ({ inClasses = {}, inCol }) => {
    const localClasses = inClasses;
    const localCol = inCol;

    const tdElement = document.createElement("td");
    if (localClasses.td) tdElement.className = localClasses.td;

    // Apply cell options (width, align) from column config
    if (localCol.options) {
        applyCellOptions(tdElement, localCol.options);
    }

    return tdElement;
};

export { buildTdElement };
