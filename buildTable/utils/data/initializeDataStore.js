import { prepareDataAndColumns } from "./prepareDataAndColumns.js";
import prepareColumns from "./prepareColumns.js";

export function initializeColumns(instance, localColumns) {
    const processedColumns = prepareColumns({ inColumns: localColumns, inShowSerialNo: instance.tableOptions.inCommonOptions.inShowSerialNo });

    instance.dataStore = {
        columns: processedColumns
    };
};

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
};

export {
    initializeColumns, initializeDataStore
};
