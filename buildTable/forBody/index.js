import { buildTableBody as buildTableBodyV1 } from "./v1/TableBody.js";
import { buildTableBody as buildTableBodyV4 } from "./v4/TableBody.js";

// Export the version object so consumers can explicitly select a version if needed
export const v1 = { buildTableBody: buildTableBodyV1 };
export const v4 = { buildTableBody: buildTableBodyV4 };

// Default export uses v2 since it has the new features
export const buildTableBody = buildTableBodyV4;

export const createBody = ({ tableElement, inData, inColumns, inClasses, inBodyOptions }) => {
    const tbodyElement = buildTableBody({
        inData,
        inColumns,
        inClasses: inClasses.body || {},
        inBodyOptions
    });
    tableElement.appendChild(tbodyElement);
};
