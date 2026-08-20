import { sum } from "./sum.js";
import { count } from "./count.js";
import { avg } from "./avg.js";
import { min } from "./min.js";
import { max } from "./max.js";

const aggregators = {
    sum,
    count,
    avg,
    min,
    max
};

const showLog = false;

const calculateSummaryValue = ({ inData, inCol }) => {
    const localData = inData;
    const localCol = inCol;

    if (showLog) {
        console.log(localData, "localData");
        console.log(localCol, "localCol");
    };

    let summaryValue = "";

    if (localCol.options) {
        if (localCol.options.summaryLabel) {
            summaryValue = localCol.options.summaryLabel;
        } else if (localCol.options.summary) {
            const funcName = localCol.options.summary.toLowerCase();
            if (aggregators[funcName]) {
                summaryValue = aggregators[funcName]({ inData: localData, inCol: localCol });
            }
        }
    };

    return summaryValue;
};

export { calculateSummaryValue };
