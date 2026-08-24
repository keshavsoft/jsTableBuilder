const normalizeSize = (inValue) => {
    if (inValue !== undefined && inValue !== null && inValue !== "") {
        if (typeof inValue === 'number' || /^\d+$/.test(String(inValue).trim())) {
            return `${inValue}px`;
        }
    }
    return inValue;
};

const addColumn = (columns, showSerialNo) => {
    let finalColumns = Array.isArray(columns) ? columns : [];

    if (showSerialNo) {
        finalColumns = [
            {
                header: "#",
                dataKey: "$serial",
                options: { width: "60px", align: "center", sortable: true }
            },
            ...finalColumns
        ];
    }

    return finalColumns;
};

const startFunc = ({ inColumns, inShowSerialNo }) => {
    const localColumns = inColumns;
    const localShowSerialNo = inShowSerialNo;

    const processedColumns = addColumn(localColumns, localShowSerialNo);

    // Normalize column sizes
    const normalizedColumns = processedColumns.map(col => {
        const normalizedCol = { ...col };
        if (normalizedCol.options && normalizedCol.options.width) {
            normalizedCol.options = {
                ...normalizedCol.options,
                width: normalizeSize(normalizedCol.options.width)
            };
        }
        return normalizedCol;
    });

    return normalizedColumns;
};

export default startFunc;