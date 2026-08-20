import { buildTableBody as buildTableBodyV1 } from "./v1/TableBody.js";
import { buildTableBody as buildTableBodyV4 } from "./v4/TableBody.js";

// Export the version object so consumers can explicitly select a version if needed
export const v1 = { buildTableBody: buildTableBodyV1 };
export const v4 = { buildTableBody: buildTableBodyV4 };

// Default export uses v2 since it has the new features
export const buildTableBody = buildTableBodyV4;
