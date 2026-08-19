import configJson from "../../../../configs/billShow.json" with { type: "json" };

const jFLocalToInputkSTableContainer = (inValue) => {
    const jVarLocalHtmlId = 'kSTableContainer';
    const jVarLocalkSTableContainer = document.getElementById(jVarLocalHtmlId);

    if (jVarLocalkSTableContainer) {
        jVarLocalkSTableContainer.innerHTML = inValue;
    };
};

const clickFuncToRun = async ({ inCurrentTarget }) => {
    jFLocalToInputkSTableContainer("");

    const config = structuredClone(configJson);

    config.options.firstRow.showSearch = true;
    config.options.firstRow.columnWiseSearch = false;
    config.options.firstRow.allColumns = true;

    const fromFetch = await fetch(config?.endPoints?.read);
    const fromFetchAsJson = await fromFetch.json();

    const sortedMembers = fromFetchAsJson.toSorted((a, b) => {
        // Normalize missing values to empty strings safely
        const itemA = a.stockitemname ? String(a.stockitemname).trim() : "";
        const itemB = b.stockitemname ? String(b.stockitemname).trim() : "";

        const batchA = a.batchname ? String(a.batchname).trim() : "";
        const batchB = b.batchname ? String(b.batchname).trim() : "";

        // Sort with options: 'numeric: true' treats '0.75' correctly, 'sensitivity: base' ignores case distinctions
        return itemA.localeCompare(itemB, undefined, { sensitivity: 'base', numeric: true }) ||
            batchA.localeCompare(batchB, undefined, { sensitivity: 'base', numeric: true });
    });

    config.defaults.data = sortedMembers;

    if (config.callbacks) {
        if (config.callbacks.table.body.show) {
            config.callbacks.table.body.show = {};
        };

        if (config.callbacks.table.body.edit) {
            config.callbacks.table.body.edit = {};
        };
    }

    const ksTable1 = new window.ks.classes.tableShowOnly(config);
    ksTable1.initShowTable();
};

export { clickFuncToRun };