import DEFAULT_CONFIG from "../../config/defaultConfig.js";

const startFunc = (tableOptions = {}) => {
    const mappedOptions = {};
    const defaultTableOptions = DEFAULT_CONFIG.tableOptions || {};

    for (const groupKey in defaultTableOptions) {
        const inGroupKey = 'in' + groupKey.charAt(0).toUpperCase() + groupKey.slice(1);
        mappedOptions[inGroupKey] = {};

        const userGroupObj = tableOptions[groupKey];
        if (userGroupObj) {
            for (const key in defaultTableOptions[groupKey]) {
                if (userGroupObj[key] !== undefined) {
                    const inKey = 'in' + key.charAt(0).toUpperCase() + key.slice(1);
                    mappedOptions[inGroupKey][inKey] = userGroupObj[key];
                }
            }
        }
    }

    return mappedOptions;
};

export default startFunc;
