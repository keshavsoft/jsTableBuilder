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

    const fromFetch = await fetch(config?.endPoints?.read);

    config.defaults.data = await fromFetch.json();

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