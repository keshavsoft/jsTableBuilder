import buildTableCell from "./TableCell.js";
import { createTrElement } from "./TableRow/1-createTrElement.js";
import { buildSpacerCell } from "./TableRow/2-buildSpacerCell.js";

const buildTableRow = ({ inItem, inColumns, inClasses = {}, inBodyOptions = {} }) => {
    const localItem = inItem;
    const localColumns = inColumns;
    const localClasses = inClasses;
    const localBodyOptions = inBodyOptions;

    const rowElement = createTrElement({ 
        inClasses: localClasses, 
        inBodyOptions: localBodyOptions 
    });
    
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
    
    const spacerCell = buildSpacerCell({ inClasses: localClasses });
    rowElement.appendChild(spacerCell);

    return rowElement;
};

export { buildTableRow };
