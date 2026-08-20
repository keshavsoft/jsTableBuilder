const showLogs = false;

const buildCellContent = ({ inFootOptions = {}, inSummaryValue }) => {
    const localFootOptions = inFootOptions;
    const localSummaryValue = inSummaryValue;

    if (showLogs) {
        console.log("----------", inFootOptions);
        // console.log("inSummaryValue", inSummaryValue);
    };

    const cellContent = document.createElement("ks-table-cell-content-common");

    // Apply summary specific bold styling
    cellContent.style.fontWeight = "bold";
    // debugger;
    if (localSummaryValue !== "") {
        cellContent.inputs = {
            cellValue: localSummaryValue,
            options: localFootOptions
        };
    } else {
        cellContent.inputs = { cellValue: "" };
    };

    return cellContent;
};

export { buildCellContent };
