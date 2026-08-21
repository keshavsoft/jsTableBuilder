import { buildSummaryRow } from "./SummaryRow/index.js";
import buildBalanceRow from "./BalanceRow/index.js";
import inputsRow from "./inputsRow/index.js";

const logger = {
    showLogs: true,
    log: function (...args) {
        if (this.showLogs) {
            console.log(...args);
        }
    }
};

const startFunc = ({ inData, inColumns, inClasses = {}, inFootOptions = {} }) => {
    logger.log("inFootOptions", inFootOptions);

    const localData = inData;
    const localColumns = inColumns;
    const localClasses = inClasses;
    const localFootOptions = inFootOptions;
    const tfootElement = document.createElement("tfoot");
    // We can reuse the head class or body class, or create a new tfoot class in defaults.
    // For now, let's use head styles so it stands out, or body styles.
    // We'll apply basic inline styles to differentiate it for now if there are no specific classes.

    if (localFootOptions.inShowBalance) {
        const { builtTrElement: summaryRow, summaryValues } = buildSummaryRow({
            inData: localData,
            inColumns: localColumns,
            inClasses: localClasses,
            inFootOptions: localFootOptions
        });

        tfootElement.appendChild(summaryRow);

        if (localFootOptions.inShowBalance) {
            const balanceRow = buildBalanceRow({
                inData: localData,
                inColumns: localColumns,
                inClasses: localClasses,
                inFootOptions: localFootOptions,
                inSummaryValues: summaryValues
            });
            tfootElement.appendChild(balanceRow);
        };
    };

    if (localFootOptions.inShowInputsRow) {
        const { builtTrElement: inputsTrElement } = inputsRow({
            inData: localData,
            inColumns: localColumns,
            inClasses: localClasses,
            inFootOptions: localFootOptions
        });

        tfootElement.appendChild(inputsTrElement);
    };

    return tfootElement;
};

export default startFunc;
