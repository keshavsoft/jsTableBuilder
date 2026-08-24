// import applyCellOptions from "../utils/style/applyCellOptions.js";
import "./KsTableHeaderContent.js";

const DEFAULT_OPTIONS = {
    width: "",
    align: "",
    vAlign: ""
};

const applyCellOptions = ({ inElement, inOptions = {} }) => {
    const localElement = inElement;
    const localOptions = inOptions;

    if (localOptions.width) {
        localElement.style.width = localOptions.width;
    }

    if (localOptions.align) {
        localElement.style.textAlign = localOptions.align;
    }

    if (localOptions.vAlign) {
        localElement.style.verticalAlign = localOptions.vAlign;
    }
};

function buildHeaderCell({
    inHeader = "",
    inDataKey = "",
    inOptions = DEFAULT_OPTIONS,
    inClasses = {},
    inSortState = [],
    inOnSort = () => { }
}) {

    const localHeader = inHeader;
    const localDataKey = inDataKey;
    const localOptions = inOptions;
    const localClasses = inClasses;
    const localSortState = inSortState;
    const localOnSort = inOnSort;

    const headerCellElement = document.createElement("th");
    if (localClasses.cell) headerCellElement.className = localClasses.cell;

    if (localOptions.sortable) {
        headerCellElement.style.cursor = "pointer";
        headerCellElement.style.userSelect = "none";

        // Pass the shift/ctrl/meta key state to detect multi-sort requests
        headerCellElement.onclick = (e) => {
            const isMulti = e.shiftKey || e.ctrlKey || e.metaKey;
            localOnSort(localDataKey, isMulti);
        };
    }

    const contentElement = document.createElement("ks-table-header-content");
    contentElement.inputs = {
        header: localHeader,
        dataKey: localDataKey,
        options: localOptions,
        sortState: localSortState
    };

    headerCellElement.appendChild(contentElement);

    applyCellOptions({
        inElement: headerCellElement,
        inOptions: localOptions
    });

    return headerCellElement;
}

export { DEFAULT_OPTIONS };
export default buildHeaderCell;
