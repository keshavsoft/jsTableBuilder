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

    const visibleColumns = localColumns.filter(col => col.isVisible !== false);

    const theadElement = buildTableHeader({
        inColumns: visibleColumns,
        inClasses: localClasses.head || {},
        inHeadOptions: localHeadOptions,
        inSortState: localSortState,
        inOnSort: localOnSort
    });

    tableElement.appendChild(theadElement);

    const tbodyElement = buildTableBody({
        inData: localData,
        inColumns: visibleColumns,
        inClasses: localClasses.body || {},
        inBodyOptions: localBodyOptions
    });

    tableElement.appendChild(tbodyElement);
    // debugger;
    if (localFootOptions.inShowFooter) {
        const tfootElement = buildFooter({
            inData: localData, // Will sum over the currently filtered data
            inColumns: visibleColumns,
            inClasses: localClasses.summary || {},
            inFootOptions: localFootOptions
        });
        tableElement.appendChild(tfootElement);
    }

    return tableElement;
}

export { buildTable };
