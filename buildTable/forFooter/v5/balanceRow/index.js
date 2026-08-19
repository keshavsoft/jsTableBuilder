import { createTrElement } from "./1-createTrElement.js";
import { buildTdElement } from "./3-buildTdElement.js";
import { buildCellContent } from "./4-buildCellContent.js";

const showLogs = true;

const startFunc = ({ inData, inColumns, inClasses = {}, inFootOptions = {}, inSummaryValues = {} }) => {
    const localData = inData;
    const localColumns = inColumns;
    const localClasses = inClasses;
    const localFootOptions = inFootOptions;
    const summaryValues = inSummaryValues;

    if (showLogs) {
        console.log("summaryValues : ", summaryValues);
    };

    const trElement = createTrElement({ inClasses: localClasses });

    const sumKeys = Object.keys(summaryValues);
    const sumValuesArray = Object.values(summaryValues);

    localColumns.forEach(col => {
        if (showLogs) {
            console.log("col : ", col);
        };

        const tdElement = buildTdElement({
            inClasses: localClasses,
            inCol: col
        });

        let displayValue = "";
        const balanceString = col?.options?.table?.tfoot?.summary?.balanceString;
        if (showLogs) {
            console.log("balanceString : ", balanceString);
        };

        if (balanceString) {

        };

        const cellContent = buildCellContent({
            inFootOptions: localFootOptions,
            inSummaryValue: displayValue
        });

        tdElement.appendChild(cellContent);
        trElement.appendChild(tdElement);
    });

    return trElement;
};

export default startFunc;