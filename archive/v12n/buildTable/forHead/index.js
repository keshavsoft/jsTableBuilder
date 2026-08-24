import { buildTableHeader } from "./TableHeader.js";

const createHeader = ({ tableElement, inColumns, inClasses, inHeadOptions, inSortState, inOnSort }) => {
    const theadElement = buildTableHeader({
        inColumns,
        inClasses: inClasses.head || {},
        inHeadOptions,
        inSortState,
        inOnSort
    });
    tableElement.appendChild(theadElement);
};

export { createHeader };
