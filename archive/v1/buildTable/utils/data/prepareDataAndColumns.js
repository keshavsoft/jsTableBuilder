import { applySerial } from "./applySerial.js";
import { normalizeSize } from "../style/normalizeSize.js";

export function prepareDataAndColumns({ inData, inColumns, inShowSerialNo }) {
    const localData = inData;
    const localColumns = inColumns;
    const localShowSerialNo = inShowSerialNo;

    // Apply serial number column if requested
    const { data: processedData, columns: processedColumns } = applySerial(localData, localColumns, localShowSerialNo);

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

    return {
        processedData,
        processedColumns: normalizedColumns
    };
}
