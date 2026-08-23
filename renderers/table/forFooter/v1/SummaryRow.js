// import applyCellOptions1 from "../utils/style/applyCellOptions.js";
// import applyCellOptions from "../../utils/style/applyCellOptions.js";
import applyCellOptions from "./applyCellOptions.js";
// import "../../webComponents/v1/KsTableCellContent.js";

function buildSummaryRow({ inData, inColumns, inClasses = {}, inFootOptions = {} }) {
    const localData = inData;
    const localColumns = inColumns;
    const localClasses = inClasses;
    const localFootOptions = inFootOptions;

    const trElement = document.createElement("tr");
    if (localClasses.tr) trElement.className = localClasses.tr;

    // Give the summary row a distinct background
    trElement.style.backgroundColor = "#f9fafb";
    trElement.style.borderTop = "2px solid #e5e7eb";

    localColumns.forEach(col => {
        const tdElement = document.createElement("td");
        if (localClasses.td) tdElement.className = localClasses.td;

        // Apply cell options (width, align) from column config
        if (col.options) {
            applyCellOptions(tdElement, col.options);
        }

        let summaryValue = "";

        if (col.options) {
            if (col.options.summaryLabel) {
                summaryValue = col.options.summaryLabel;
            } else if (col.options.summary === "sum") {
                const total = localData.reduce((sum, row) => {
                    // Extract numeric value from potentially string data
                    const val = parseFloat(row[col.dataKey]);
                    return sum + (isNaN(val) ? 0 : val);
                }, 0);

                // Keep it clean with up to 2 decimal places if needed
                summaryValue = Number.isInteger(total) ? total.toString() : total.toFixed(2);
            } else if (col.options.summary === "count") {
                summaryValue = localData.length.toString();
            }
        }

        const cellContent = document.createElement("ks-table-cell-content-common");
        if (localFootOptions.inRowHeight) {
            cellContent.style.minHeight = localFootOptions.inRowHeight;
        }

        // Apply summary specific bold styling
        cellContent.style.fontWeight = "bold";

        if (summaryValue !== "") {
            cellContent.inputs = { cellValue: summaryValue };
        } else {
            cellContent.inputs = { cellValue: "" };
        }

        tdElement.appendChild(cellContent);
        trElement.appendChild(tdElement);
    });

    return trElement;
}

export { buildSummaryRow };