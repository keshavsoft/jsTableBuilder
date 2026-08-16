import { buildTableBody as buildTableBodyV1 } from "./v1/TableBody.js";
import { buildTableBody as buildTableBodyV2 } from "./v2/TableBody.js";

// Export the version object so consumers can explicitly select a version if needed
export const v1 = { buildTableBody: buildTableBodyV1 };
export const v2 = { buildTableBody: buildTableBodyV2 };

// Default export uses v2 since it has the new features
export const buildTableBody = buildTableBodyV2;
