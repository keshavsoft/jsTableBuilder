import { runAfterDomLoad } from "./runAfterDomLoad.js";

export function startDomContentLoaded() {
    document.addEventListener("DOMContentLoaded", () => {
        runAfterDomLoad();
    });
};