import buildTableSummaryV1 from "./v2/TableSummary.js";
// import { buildTableBody as buildTableBodyV2 } from "./v2/TableBody.js";

// Export the version object so consumers can explicitly select a version if needed
export const v1 = { buildTableSummary: buildTableSummaryV1 };
// export const v2 = { buildTableBody: buildTableBodyV2 };

// Default export uses v2 since it has the new features
export const buildTableSummary = buildTableSummaryV1;
