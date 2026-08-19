import { buildSummaryRow } from "./SummaryRow/index.js";

const startFunc = ({ inData, inColumns, inClasses = {}, inFootOptions = {} }) => {
    const localData = inData;
    const localColumns = inColumns;
    const localClasses = inClasses;
    const localFootOptions = inFootOptions;

    const tfootElement = document.createElement("tfoot");
    // We can reuse the head class or body class, or create a new tfoot class in defaults.
    // For now, let's use head styles so it stands out, or body styles.
    // We'll apply basic inline styles to differentiate it for now if there are no specific classes.

    const summaryRow = buildSummaryRow({
        inData: localData,
        inColumns: localColumns,
        inClasses: localClasses,
        inFootOptions: localFootOptions
    });

    tfootElement.appendChild(summaryRow);

    return tfootElement;
};

export default startFunc;
