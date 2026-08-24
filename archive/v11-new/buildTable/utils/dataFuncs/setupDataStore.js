import initializeColumns from "./prepareColumns.js";
import prepareData from "./prepareData.js";
import { setupServices } from "../services.js";
// import startFunc from "./prepareColumns.js";

const logger = {
    showLogs: false,
    log: function (...args) {
        if (this.showLogs) {
            console.log(...args);
        }
    }
};

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