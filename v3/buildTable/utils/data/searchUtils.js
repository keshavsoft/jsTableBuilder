import { applyCurrentSort } from "./sortUtils.js";

export function processSearch(instance, query) {
    const lowerQuery = (query || "").toLowerCase().trim();
    
    if (!lowerQuery) {
        instance.data = [...instance.originalData];
    } else {
        instance.data = instance.originalData.filter(row => {
            return instance.columns.some(col => {
                if (col.dataKey === "$serial") return false;
                const val = row[col.dataKey];
                if (val === null || val === undefined) return false;
                return String(val).toLowerCase().includes(lowerQuery);
            });
        });
    }
    
    applyCurrentSort(instance);
}
