import { DEFAULT_CONFIG } from "../../config/defaults.js";
import { normalizeSize } from "../style/normalizeSize.js";

export function extractTableOptions({ inTableOptions = {} }) {
    const localCommon = { ...DEFAULT_CONFIG.inTableOptions.inCommonOptions, ...(inTableOptions.inCommonOptions || {}) };
    const localHead = { ...DEFAULT_CONFIG.inTableOptions.inHeadOptions, ...(inTableOptions.inHeadOptions || {}) };
    const localBody = { ...DEFAULT_CONFIG.inTableOptions.inBodyOptions, ...(inTableOptions.inBodyOptions || {}) };
    const localFoot = { ...DEFAULT_CONFIG.inTableOptions.inFootOptions, ...(inTableOptions.inFootOptions || {}) };

    return {
        inCommonOptions: {
            inTableWidth: normalizeSize(localCommon?.inTableWidth),
            inTableBorder: normalizeSize(localCommon?.inTableBorder),
            inShowSerialNo: localCommon?.inShowSerialNo
        },
        inHeadOptions: {
            inHeaderHeight: normalizeSize(localHead?.inHeaderHeight)
        },
        inBodyOptions: {
            inRowHeight: normalizeSize(localBody?.inRowHeight)
        },
        inFootOptions: {
            inShowFooter: localFoot?.inShowFooter,
            inRowHeight: normalizeSize(localFoot?.inRowHeight)
        }
    };
}
