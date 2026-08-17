import initializeColumns from "./prepareColumns.js";
import prepareData from "./prepareData.js";
import { setupServices } from "../services.js";
// import startFunc from "./prepareColumns.js";

const setupColumnsAndData = ({ instance, localColumns, localData, localEndPoints }) => {
    instance.dataStore.columns = initializeColumns({
        inColumns: localColumns,
        inShowSerialNo: instance.tableOptions?.inCommonOptions?.inShowSerialNo
    });

    instance.dataStore.originalData = localData;

    if (localEndPoints) {
        setupServices(instance, localEndPoints);
        // await loadDataFromServices({ instance, localColumns, localData, localEndPoints });

    } else {
        instance.dataStore.data = prepareData({
            inData: localData,
            inShowSerialNo: instance.tableOptions?.inCommonOptions?.inShowSerialNo
        });
    };
};

export { setupColumnsAndData };