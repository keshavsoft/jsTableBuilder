const buildCellContent = ({ inFootOptions = {}, inSummaryValue }) => {
    const localFootOptions = inFootOptions;
    const localSummaryValue = inSummaryValue;

    const cellContent = document.createElement("ks-table-cell-content-common");
    if (localFootOptions.inRowHeight) {
        cellContent.style.minHeight = localFootOptions.inRowHeight;
    }

    // Apply summary specific bold styling
    cellContent.style.fontWeight = "bold";

    if (localSummaryValue !== "") {
        cellContent.inputs = { cellValue: localSummaryValue };
    } else {
        cellContent.inputs = { cellValue: "" };
    }

    return cellContent;
};

export { buildCellContent };
