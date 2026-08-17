export function processSort(instance, dataKey, isMultiSort) {
    const existingIndex = instance.sortState.findIndex(s => s.dataKey === dataKey);

    if (isMultiSort) {
        if (existingIndex !== -1) {
            // Toggle direction
            instance.sortState[existingIndex].direction = instance.sortState[existingIndex].direction === 'asc' ? 'desc' : 'asc';
        } else {
            // Add to end
            instance.sortState.push({ dataKey, direction: 'asc' });
        }
    } else {
        if (existingIndex !== -1 && instance.sortState.length === 1) {
            // Toggle if it's the only one
            instance.sortState[0].direction = instance.sortState[0].direction === 'asc' ? 'desc' : 'asc';
        } else {
            // Reset to this column
            instance.sortState = [{ dataKey, direction: 'asc' }];
        }
    }

    applyCurrentSort(instance);
}

export function applyCurrentSort(instance) {
    if (instance.sortState && instance.sortState.length > 0) {
        instance.dataStore.data.sort((a, b) => {
            for (const sortConfig of instance.sortState) {
                const valA = a[sortConfig.dataKey];
                const valB = b[sortConfig.dataKey];
                
                if (valA === valB) continue;
                if (valA === undefined || valA === null) return 1;
                if (valB === undefined || valB === null) return -1;
                
                const cmp = valA < valB ? -1 : 1;
                return sortConfig.direction === 'asc' ? cmp : -cmp;
            }
            return 0;
        });
    }

    if (instance.tableElement) {
        const newTableElement = instance.buildTableElements();
        instance.tableElement.replaceWith(newTableElement);
        instance.tableElement = newTableElement;
    }
}
