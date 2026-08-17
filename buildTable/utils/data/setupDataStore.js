import initializeColumns from "./prepareColumns.js";
import prepareData from "./prepareData.js";
import { setupServices } from "../services.js";

export default function setupDataStore({ instance, localColumns, localData, localEndPoints }) {
    instance.dataStore.columns = initializeColumns({
        inColumns: localColumns, 
        inShowSerialNo: instance.tableOptions?.inCommonOptions?.inShowSerialNo
    });

    instance.dataStore.originalData = localData;

    if (localEndPoints) {
        setupServices(instance, localEndPoints);
    } else {
        instance.dataStore.data = prepareData({ 
            inData: localData, 
            inShowSerialNo: instance.tableOptions?.inCommonOptions?.inShowSerialNo 
        });
    };
}
