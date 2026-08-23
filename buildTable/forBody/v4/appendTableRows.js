import { buildTableRow } from "./TableRow/index.js";

export function appendTableRows({
    inBodyWrapperElement,
    inData,
    inColumns,
    inClasses,
    inBodyOptions
}) {
    inData.forEach(itemData => {
        const rowElement = buildTableRow({
            inItem: itemData,
            inColumns: inColumns,
            inClasses: inClasses,
            inBodyOptions: inBodyOptions
        });
        inBodyWrapperElement.appendChild(rowElement);
    });
}
