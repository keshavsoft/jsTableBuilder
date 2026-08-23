import { buildHeaderRowElement } from "./buildHeaderRowElement.js";
import { appendHeaderCells } from "./appendHeaderCells.js";
import { appendSpacerCell } from "./appendSpacerCell.js";

function buildHeaderRow({
    inColumns,
    inClasses = {},
    inHeadOptions = {},
    inSortState = [],
    inOnSort = () => { }
}) {
    const localColumns = inColumns;
    const localClasses = inClasses;
    const localHeadOptions = inHeadOptions;
    const localSortState = inSortState;
    const localOnSort = inOnSort;

    const headerRowElement = buildHeaderRowElement({
        inRowClass: localClasses?.row,
        inHeaderHeight: localHeadOptions?.inHeaderHeight
    });

    appendHeaderCells({
        inHeaderRowElement: headerRowElement,
        inColumns: localColumns,
        inClasses: localClasses,
        inSortState: localSortState,
        inOnSort: localOnSort
    });

    appendSpacerCell({
        inHeaderRowElement: headerRowElement,
        inCellClass: localClasses?.cell
    });

    return headerRowElement;
}

export { buildHeaderRow };
