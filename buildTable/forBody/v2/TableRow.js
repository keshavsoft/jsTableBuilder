import buildTableCell from "./TableCell.js";

function buildTableRow({ inItem, inColumns, inClasses = {}, inBodyOptions = {} }) {
    const localItem = inItem;
    const localColumns = inColumns;
    const localClasses = inClasses;
    const localBodyOptions = inBodyOptions;

    const rowElement = document.createElement("tr");
    if (localClasses.row) rowElement.className = localClasses.row;
    if (localBodyOptions.inRowHeight) rowElement.style.height = localBodyOptions.inRowHeight;
    
    localColumns.forEach(columnData => {
        const cellValue = localItem[columnData.dataKey];
        const cellElement = buildTableCell({ 
            inCellValue: cellValue, 
            inRowData: localItem,
            inOptions: columnData.options || {},
            inClasses: localClasses 
        });
        rowElement.appendChild(cellElement);
    });
    
    const spacerCell = document.createElement("td");
    if (localClasses.cell) spacerCell.className = localClasses.cell;
    rowElement.appendChild(spacerCell);

    return rowElement;
}

export { buildTableRow };
