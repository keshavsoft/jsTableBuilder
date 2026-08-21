import runMaxVersion from "./v6/index.js";
// import { buildTableBody as buildTableBodyV2 } from "./v2/TableBody.js";

// Export the version object so consumers can explicitly select a version if needed
export const v6 = { buildTableSummary: runMaxVersion };
// export const v2 = { buildTableBody: buildTableBodyV2 };

// Default export uses v2 since it has the new features
export const buildFooter = runMaxVersion;

export const createFooter = ({ tableElement, inData, inColumns, inClasses, inFootOptions }) => {
    if (!inFootOptions.inShowFooter) return;
    
    const tfootElement = buildFooter({
        inData, // Will sum over the currently filtered data
        inColumns,
        inClasses: inClasses.summary || {},
        inFootOptions
    });
    tableElement.appendChild(tfootElement);
};
