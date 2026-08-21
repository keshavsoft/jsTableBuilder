const logger = {
    showLogs: false,
    log: function (...args) {
        if (this.showLogs) {
            console.log(...args);
        }
    }
};

const buildCellContent = ({ inFootOptions = {}, inSummaryValue }) => {
    const localFootOptions = inFootOptions;
    const localSummaryValue = inSummaryValue;

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
