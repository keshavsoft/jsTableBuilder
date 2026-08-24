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

const showLog = false; // Set to true to enable logging

const calculateSummaryValue = ({ inData, inCol }) => {
    const localData = inData;
    const localCol = inCol;

    if (showLog) {
        // console.log(localData, "localData");
        console.log(localCol, "localCol------");
    };
    // debugger;
    let summaryValue = "";

    if (localCol.options) {
        if (localCol?.options?.table?.tfoot?.summary?.summaryLabel) {
            summaryValue = localCol.options.table.tfoot.summary.summaryLabel;
        } else if (localCol.options?.table?.tfoot?.summary?.summary) {
            const funcName = localCol.options.table.tfoot.summary.summary.toLowerCase();

            if (showLog) {
                // console.log(localData, "localData");
                console.log(funcName, "funcName");
            };

            if (aggregators[funcName]) {
                summaryValue = aggregators[funcName]({ inData: localData, inCol: localCol });
            };
        };
    };

    return summaryValue;
};

export { calculateSummaryValue };
