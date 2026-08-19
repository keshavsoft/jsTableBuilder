import headerConfig from "./headers.json" with { type: "json" };

const buildHeader = async () => {
    console.log("buildHeader : ", headerConfig);
    await window.ks.components.header(headerConfig);
};

export { buildHeader };