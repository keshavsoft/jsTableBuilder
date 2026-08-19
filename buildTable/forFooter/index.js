import runMaxVersion from "./v3/index.js";
// import { buildTableBody as buildTableBodyV2 } from "./v2/TableBody.js";

// Export the version object so consumers can explicitly select a version if needed
export const v3 = { buildTableSummary: runMaxVersion };
// export const v2 = { buildTableBody: buildTableBodyV2 };

// Default export uses v2 since it has the new features
export const buildFooter = runMaxVersion;
