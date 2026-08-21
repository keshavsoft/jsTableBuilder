const logger = {
    showLogs: false,
    log: function (...args) {
        if (this.showLogs) {
            console.log(...args);
        }
    }
};

const buildCellContent = ({ inFootOptions = {}, inSummaryValue, inListData }) => {
    const localFootOptions = inFootOptions;
    const localSummaryValue = inSummaryValue;

    const cellContent = document.createElement("ks-table-cell-content-common");

    // Apply summary specific bold styling
    cellContent.style.fontWeight = "bold";
    // debugger;
    if (localSummaryValue !== "") {
        cellContent.inputs = {
            cellValue: localSummaryValue,
            options: {
                ...localFootOptions,
                listData: inListData
            }
        };
    } else {
        cellContent.inputs = {
            cellValue: "",
            options: {
                ...localFootOptions,
                listData: inListData
            }
        };
    };

    return cellContent;
};

export { buildCellContent };
