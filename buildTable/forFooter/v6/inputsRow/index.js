import { createTrElement } from "./1-createTrElement.js";
import { calculateSummaryValue } from "./2-calculateSummaryValue/index.js";
import { buildTdElement } from "./3-buildTdElement.js";
import { buildCellContent } from "./4-buildCellContent.js";

const logger = {
    showLogs: true,
    log: function (...args) {
        if (this.showLogs) {
            console.log(...args);
        }
    }
};

const presentColumnData = (inData, inColumn) => {
    const counts = {};
    inData.forEach(element => {
        const val = element[inColumn];
        if (val !== undefined && val !== null && val !== "") {
            counts[val] = (counts[val] || 0) + 1;
        }
    });

    return Object.entries(counts)
        .map(([val, count]) => ({
            value: val,
            text: `${val} : ${count}`
        }))
        .sort((a, b) => a.value.localeCompare(b.value));
};

const startFunc = ({ inData, inColumns, inClasses = {} }) => {
    const localData = inData;
    const localColumns = inColumns;
    const localClasses = inClasses;

    const trElement = createTrElement({ inClasses: localClasses });

    localColumns.forEach(col => {
        const selectedArray = presentColumnData(localData, col?.dataKey);
        logger.log("selectedArray", selectedArray);

        const tdElement = buildTdElement({
            inClasses: localClasses,
            inCol: col
        });

        const summaryValue = calculateSummaryValue({
            inData: localData,
            inCol: col
        });

        const cellContent = buildCellContent({
            inFootOptions: col?.options?.table?.tfoot?.inputsRow,
            inSummaryValue: summaryValue,
            inListData: selectedArray
        });

        tdElement.appendChild(cellContent);
        trElement.appendChild(tdElement);
    });

    return { builtTrElement: trElement };
};

export default startFunc;