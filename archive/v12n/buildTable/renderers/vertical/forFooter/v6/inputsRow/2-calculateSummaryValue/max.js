export const max = ({ inData, inCol }) => {
    if (inData.length === 0) return "";
    const values = inData.map(row => parseFloat(row[inCol.dataKey])).filter(val => !isNaN(val));
    if (values.length === 0) return "";
    const maxVal = Math.max(...values);
    return Number.isInteger(maxVal) ? maxVal.toString() : maxVal.toFixed(2);
};
