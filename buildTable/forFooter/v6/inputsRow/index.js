import { createTrElement } from "./1-createTrElement.js";
import { calculateSummaryValue } from "./2-calculateSummaryValue/index.js";
import { buildTdElement } from "./3-buildTdElement.js";
import { buildCellContent } from "./4-buildCellContent.js";

const showLogs = false;

const startFunc = ({ inData, inColumns, inClasses = {} }) => {
    const localData = inData;
    const localColumns = inColumns;
    const localClasses = inClasses;

    // if (showLogs) {
    //     console.log("localData", localData);
    //     console.log("localColumns", localColumns);
    //     console.log("localClasses", localClasses);
    //     console.log("localFootOptions", localFootOptions);
    // };

    const trElement = createTrElement({ inClasses: localClasses });

    localColumns.forEach(col => {
        if (showLogs) {
            console.log("col", col);
        };

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
            inSummaryValue: summaryValue
        });

        tdElement.appendChild(cellContent);
        trElement.appendChild(tdElement);
    });

    return { builtTrElement: trElement };
};

export default startFunc;