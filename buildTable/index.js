import { buildTableHeader } from "./forHead/TableHeader.js";
import { buildTableBody } from "./forBody/index.js";
import { buildEmptyState } from "./buildEmptyState.js";
import { buildTableElement } from "./buildTableElement.js";
import { buildFooter } from "./forFooter/index.js";

function buildTable({
    inData,
    inColumns,
    inClasses = {},
    inTableOptions = {},
    inSortState = [],
    inOnSort = () => { }
}) {
    const localData = inData;
    const localColumns = inColumns;
    const localClasses = inClasses;
    const localTableOptions = inTableOptions;
    const localCommonOptions = localTableOptions.inCommonOptions || {};
    const localHeadOptions = localTableOptions.inHeadOptions || {};
    const localBodyOptions = localTableOptions.inBodyOptions || {};
    const localFootOptions = localTableOptions.inFootOptions || {};
    const localSortState = inSortState;
    const localOnSort = inOnSort;

    if (!localData || localData.length === 0) {
        return buildEmptyState({ inClasses: localClasses });
    }

    const tableElement = buildTableElement({
        inClasses: localClasses,
        inCommonOptions: localCommonOptions
    });

    const visibleColumns = localColumns.filter(col => col?.options?.table?.isVisible !== false);

    createHeader({
        tableElement,
        inColumns: visibleColumns,
        inClasses: localClasses,
        inHeadOptions: localHeadOptions,
        inSortState: localSortState,
        inOnSort: localOnSort
    });

    createBody({
        tableElement,
        inData: localData,
        inColumns: visibleColumns,
        inClasses: localClasses,
        inBodyOptions: localBodyOptions
    });

    createFooter({
        tableElement,
        inData: localData,
        inColumns: visibleColumns,
        inClasses: localClasses,
        inFootOptions: localFootOptions
    });

    return tableElement;
}

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

const createBody = ({ tableElement, inData, inColumns, inClasses, inBodyOptions }) => {
    const tbodyElement = buildTableBody({
        inData,
        inColumns,
        inClasses: inClasses.body || {},
        inBodyOptions
    });
    tableElement.appendChild(tbodyElement);
};

const createFooter = ({ tableElement, inData, inColumns, inClasses, inFootOptions }) => {
    if (!inFootOptions.inShowFooter) return;
    
    const tfootElement = buildFooter({
        inData, // Will sum over the currently filtered data
        inColumns,
        inClasses: inClasses.summary || {},
        inFootOptions
    });
    tableElement.appendChild(tfootElement);
};

export { buildTable };
