import { buildTableBody as buildTableBodyV1 } from "./v1/TableBody.js";

// Export the version object so consumers can explicitly select a version if needed
export const v1 = {
    buildTableBody: buildTableBodyV1
};

// Default export uses v1 for backward compatibility
export const buildTableBody = buildTableBodyV1;
