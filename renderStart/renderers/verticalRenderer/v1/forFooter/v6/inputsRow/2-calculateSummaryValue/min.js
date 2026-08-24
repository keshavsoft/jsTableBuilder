export const min = ({ inData, inCol }) => {
    if (inData.length === 0) return "";
    const values = inData.map(row => parseFloat(row[inCol.dataKey])).filter(val => !isNaN(val));
    if (values.length === 0) return "";
    const minVal = Math.min(...values);
    return Number.isInteger(minVal) ? minVal.toString() : minVal.toFixed(2);
};
