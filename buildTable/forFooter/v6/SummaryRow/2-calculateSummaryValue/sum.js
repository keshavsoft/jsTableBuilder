const showLog = false;

export const sum = ({ inData, inCol }) => {
    if (showLog) {
        console.log(inData, "localData");
        console.log(inCol, "localCol");
    };

    const total = inData.reduce((sum, row) => {
        const val = parseFloat(row[inCol.dataKey]);
        return sum + (isNaN(val) ? 0 : val);
    }, 0);

    if (showLog) {
        console.log(total, "total");
    };

    return Number.isInteger(total) ? total.toString() : total.toFixed(2);
};
