import { prepareDataAndColumns } from "./prepareDataAndColumns.js";

export function initializeDataStore(instance, localData, localColumns) {
    const { processedData, processedColumns } = prepareDataAndColumns({
        inData: localData,
        inColumns: localColumns,
        inShowSerialNo: instance.tableOptions.inCommonOptions.inShowSerialNo
    });

    instance.dataStore = {
        originalData: processedData,
        data: [...processedData],
        columns: processedColumns
    };
}
