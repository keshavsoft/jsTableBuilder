import initializeColumns from "./prepareColumns.js";
import prepareData from "./prepareData.js";
import { setupServices } from "../services.js";

const setupColumnsAndData = ({ instance, localColumns, localData, localEndPoints }) => {
    const dataStore = {};

    dataStore.columns = initializeColumns({
        inColumns: localColumns,
        inShowSerialNo: instance.tableOptions?.inCommonOptions?.inShowSerialNo
    });

    if (localEndPoints) {
        setupServices(instance, localEndPoints);
        // await loadDataFromServices({ instance, localColumns, localData, localEndPoints });

    } else {
        const preparedData = prepareData({
            inData: localData,
            inShowSerialNo: instance.tableOptions?.inCommonOptions?.inShowSerialNo
        });

        dataStore.data = preparedData;
    };

    return dataStore;
};

export { setupColumnsAndData };