import { DEFAULT_TABLE_OPTIONS } from "./mapTableOptions.js";
import { normalizeSize } from "../style/normalizeSize.js";

export function extractTableOptions({ inTableOptions = {}, defaultTableOptions = DEFAULT_TABLE_OPTIONS } = {}) {
    const defaults = defaultTableOptions || DEFAULT_TABLE_OPTIONS;

    const defaultCommon = {
        inTableWidth: defaults.commonOptions.tableWidth,
        inTableBorder: defaults.commonOptions.tableBorder,
        inShowSerialNo: defaults.commonOptions.showSerialNo
    };
    const defaultHead = {
        inHeaderHeight: defaults.headOptions.headerHeight
    };
    const defaultBody = {
        inRowHeight: defaults.bodyOptions.rowHeight
    };
    const defaultFoot = {
        inShowFooter: defaults.footOptions.showFooter,
        inRowHeight: defaults.footOptions.rowHeight
    };

    const localCommon = { ...defaultCommon, ...(inTableOptions.inCommonOptions || {}) };
    const localHead = { ...defaultHead, ...(inTableOptions.inHeadOptions || {}) };
    const localBody = { ...defaultBody, ...(inTableOptions.inBodyOptions || {}) };
    const localFoot = { ...defaultFoot, ...(inTableOptions.inFootOptions || {}) };

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
