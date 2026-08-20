import buildHeaderCell from "./HeaderCell.js";
const showLog = false;

export function appendHeaderCells({
    inHeaderRowElement,
    inColumns,
    inClasses = {},
    inSortState = [],
    inOnSort = () => { }
}) {
    inColumns.forEach(columnData => {
        if (showLog) console.log("appendHeaderCells -> columnData", columnData);

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
