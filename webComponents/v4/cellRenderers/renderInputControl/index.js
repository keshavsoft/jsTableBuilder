import runV1 from "./v1/index.js";
import runV2 from "./v2/index.js";
import runV3 from "./v3/index.js";
import runV4 from "./v4/index.js";
import runV6 from "./v6/index.js";

// Export the version object so consumers can explicitly select a version if needed
export const v1 = { renderInputControl: runV1 };
export const v2 = { renderInputControl: runV2 };
export const v3 = { renderInputControl: runV3 };
export const v4 = { renderInputControl: runV4 };
export const v6 = { renderInputControl: runV6 };

// Default export uses v5 since it has the new features
export const renderInputControl = runV6;
