import { applyCurrentSort } from "./sortUtils.js";

export function processSearch(instance, query) {
    const lowerQuery = (query || "").toLowerCase().trim();
    
    if (!lowerQuery) {
        instance.dataStore.data = [...instance.dataStore.originalData];
    } else {
        instance.dataStore.data = instance.dataStore.originalData.filter(row => {
            return instance.dataStore.columns.some(col => {
                if (col.dataKey === "$serial") return false;
                const val = row[col.dataKey];
                if (val === null || val === undefined) return false;
                return String(val).toLowerCase().includes(lowerQuery);
            });
        });
    }
    
    applyCurrentSort(instance);
}
