import { buildHeader } from "./buildHeader.js";
// import addListeners from "./AddListeners/start.js";

const runAfterDomLoad = () => {
    import("../../script.js").then(fromPromise => {
        console.log("fromPromise : ", fromPromise);
        buildHeader().then(fromPromise => {
            // addListeners();
        });

    });
};

export { runAfterDomLoad };
