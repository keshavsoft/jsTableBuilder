export const DEFAULT_TABLE_OPTIONS = {
    commonOptions: {
        tableWidth: "100%",
        tableBorder: "1px solid #e5e7eb",
        showSerialNo: false
    },
    headOptions: {
        headerHeight: "48px"
    },
    bodyOptions: {
        rowHeight: "48px"
    },
    footOptions: {
        showFooter: false,
        rowHeight: "48px",
        showAggregateRows: false,
        showTotals: false,
        showBalance: false,
        showInputsRow: false
    }
};

const mapTableOptions = (userTableOptions = {}, defaultOptions = DEFAULT_TABLE_OPTIONS) => {
    const mappedOptions = {};
    const effectiveDefaults = defaultOptions || DEFAULT_TABLE_OPTIONS;

    for (const groupKey in effectiveDefaults) {
        const inGroupKey = 'in' + groupKey.charAt(0).toUpperCase() + groupKey.slice(1);
        mappedOptions[inGroupKey] = {};

        const userGroupObj = userTableOptions ? userTableOptions[groupKey] : undefined;
        const defaultGroupObj = effectiveDefaults[groupKey] || {};

        for (const key in defaultGroupObj) {
            const inKey = 'in' + key.charAt(0).toUpperCase() + key.slice(1);
            mappedOptions[inGroupKey][inKey] = (userGroupObj && userGroupObj[key] !== undefined)
                ? userGroupObj[key]
                : defaultGroupObj[key];
        }

        // Also preserve any extra user-defined keys in the group
        if (userGroupObj) {
            for (const key in userGroupObj) {
                if (!(key in defaultGroupObj)) {
                    const inKey = 'in' + key.charAt(0).toUpperCase() + key.slice(1);
                    mappedOptions[inGroupKey][inKey] = userGroupObj[key];
                }
            }
        }
    }

    return mappedOptions;
};

export default mapTableOptions;
