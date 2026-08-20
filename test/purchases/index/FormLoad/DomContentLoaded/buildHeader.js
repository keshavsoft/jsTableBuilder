import headerConfig from "./headers.json" with { type: "json" };
const showLog = false;

const buildHeader = async () => {
    if (showLog) console.log("buildHeader : ", headerConfig);
    await window.ks.components.header(headerConfig);
};

export { buildHeader };