export function applySerial(data, columns, showSerialNo) {
    let finalData = Array.isArray(data) ? data : [data];
    let finalColumns = Array.isArray(columns) ? columns : [];

    if (showSerialNo) {
        finalData = finalData.map((row, index) => {
            return { ...row, $serial: index + 1 };
        });

        finalColumns = [
            {
                header: "#",
                dataKey: "$serial",
                options: { width: "60px", align: "center", sortable: true }
            },
            ...finalColumns
        ];
    }

    return { data: finalData, columns: finalColumns };
}
