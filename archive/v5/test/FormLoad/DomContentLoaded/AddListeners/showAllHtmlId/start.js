import { clickFuncToRun } from "./clickFunc.js";

const funcToRun = () => {
    const htmlElement = document.getElementById('showAllHtmlId');
    // debugger;
    htmlElement.addEventListener("click", (event) =>
        clickFuncToRun({ inCurrentTarget: event.currentTarget })
    );
};

export default funcToRun;
