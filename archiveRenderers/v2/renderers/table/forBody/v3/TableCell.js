const DEFAULT_OPTIONS = {
    width: "",
    align: "",
    vAlign: ""
};

// import "../../../webComponents/v1/KsTableCellContent.js";
// import applyCellOptions from "../../utils/style/applyCellOptions.js";
import applyCellOptions from "./applyCellOptions.js";

function buildTableCell({
    inCellValue,
    inRowData,
    inOptions = DEFAULT_OPTIONS,
    inClasses = {}
}) {
    let localCellValue = inCellValue;
    let localRowData = inRowData;
    const localOptions = inOptions;
    const localClasses = inClasses;

    const cellElement = document.createElement("td");
    if (localClasses.cell) cellElement.className = localClasses.cell;

    applyCellOptions({
        inElement: cellElement,
        inOptions: localOptions
    });

    if (typeof localCellValue === "object" && localCellValue !== null) {
        if (localClasses.cellTruncate) cellElement.className += (cellElement.className ? " " : "") + localClasses.cellTruncate;
    }

    // Create the Web Component and pass the inputs to it
    const contentComponent = document.createElement("ks-table-cell-content-common");
    contentComponent.inputs = {
        cellValue: localCellValue,
        rowData: localRowData,
        options: localOptions,
        classes: localClasses
    };

    cellElement.appendChild(contentComponent);
    return cellElement;
}

export { DEFAULT_OPTIONS };
export default buildTableCell;
