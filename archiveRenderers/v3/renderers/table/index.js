import { createHeader } from "./forHead/index.js";
import { createBody } from "./forBody/index.js";
import { buildEmptyState } from "./buildEmptyState.js";
import { buildTableElement } from "./buildTableElement.js";
import { createFooter } from "./forFooter/index.js";

const logger = {
    showLogs: true,
    log: function (...args) {
        if (this.showLogs) {
            console.log(...args);
        }
    }
};

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
    // logger.log("inTableOptions", inTableOptions);
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

export { buildTable };
