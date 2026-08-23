const calculateSummaryValue = ({ inData, inCol }) => {
    const localData = inData;
    const localCol = inCol;
    
    let summaryValue = "";

    if (localCol.options) {
        if (localCol.options.summaryLabel) {
            summaryValue = localCol.options.summaryLabel;
        } else if (localCol.options.summary === "sum") {
            const total = localData.reduce((sum, row) => {
                // Extract numeric value from potentially string data
                const val = parseFloat(row[localCol.dataKey]);
                return sum + (isNaN(val) ? 0 : val);
            }, 0);

            // Keep it clean with up to 2 decimal places if needed
            summaryValue = Number.isInteger(total) ? total.toString() : total.toFixed(2);
        } else if (localCol.options.summary === "count") {
            summaryValue = localData.length.toString();
        }
    }

    return summaryValue;
};

export { calculateSummaryValue };
