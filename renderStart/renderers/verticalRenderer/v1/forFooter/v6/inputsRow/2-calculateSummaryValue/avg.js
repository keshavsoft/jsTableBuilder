export const avg = ({ inData, inCol }) => {
    if (inData.length === 0) return "0";
    const total = inData.reduce((sum, row) => {
        const val = parseFloat(row[inCol.dataKey]);
        return sum + (isNaN(val) ? 0 : val);
    }, 0);
    const average = total / inData.length;
    return Number.isInteger(average) ? average.toString() : average.toFixed(2);
};
