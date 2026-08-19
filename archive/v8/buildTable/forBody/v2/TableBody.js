import { buildTableBodyElement } from "./buildTableBodyElement.js";
import { appendTableRows } from "./appendTableRows.js";

function buildTableBody({ inData, inColumns, inClasses = {}, inBodyOptions = {} }) {
    const localData = inData;
    const localColumns = inColumns;
    const localClasses = inClasses;
    const localBodyOptions = inBodyOptions;

    const bodyWrapperElement = buildTableBodyElement({ 
        inWrapperClass: localClasses?.wrapper 
    });

    appendTableRows({
        inBodyWrapperElement: bodyWrapperElement,
        inData: localData,
        inColumns: localColumns,
        inClasses: localClasses,
        inBodyOptions: localBodyOptions
    });

    return bodyWrapperElement;
}

export { buildTableBody };
