import buildHeaderCell from "./HeaderCell.js";

export function appendHeaderCells({ 
    inHeaderRowElement, 
    inColumns, 
    inClasses = {}, 
    inSortState = [], 
    inOnSort = () => {} 
}) {
    inColumns.forEach(columnData => {
        const headerCellElement = buildHeaderCell({ 
            inHeader: columnData.header,
            inDataKey: columnData.dataKey,
            inOptions: columnData.options || {},
            inClasses: inClasses,
            inSortState: inSortState,
            inOnSort: inOnSort
        });
        inHeaderRowElement.appendChild(headerCellElement);
    });
}
