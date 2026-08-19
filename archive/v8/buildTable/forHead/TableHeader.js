import { buildHeaderRow } from "./HeaderRow.js";

function buildTableHeader({ 
    inColumns, 
    inClasses = {}, 
    inHeadOptions = {},
    inSortState = [],
    inOnSort = () => {}
}) {
    const localColumns = inColumns;
    const localClasses = inClasses;
    const localHeadOptions = inHeadOptions;
    const localSortState = inSortState;
    const localOnSort = inOnSort;

    const headerWrapperElement = document.createElement("thead");
    if (localClasses.wrapper) headerWrapperElement.className = localClasses.wrapper;
    
    const headerRowElement = buildHeaderRow({ 
        inColumns: localColumns, 
        inClasses: localClasses,
        inHeadOptions: localHeadOptions,
        inSortState: localSortState,
        inOnSort: localOnSort
    });
    headerWrapperElement.appendChild(headerRowElement);
    
    return headerWrapperElement;
}

export { buildTableHeader };
