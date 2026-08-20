import DEFAULT_CONFIG from "../../config/defaults.js";
import { normalizeSize } from "../style/normalizeSize.js";

export function extractTableOptions({ inTableOptions = {} }) {
    const defaultCommon = {
        inTableWidth: DEFAULT_CONFIG.tableOptions.commonOptions.tableWidth,
        inTableBorder: DEFAULT_CONFIG.tableOptions.commonOptions.tableBorder,
        inShowSerialNo: DEFAULT_CONFIG.tableOptions.commonOptions.showSerialNo
    };
    const defaultHead = {
        inHeaderHeight: DEFAULT_CONFIG.tableOptions.headOptions.headerHeight
    };
    const defaultBody = {
        inRowHeight: DEFAULT_CONFIG.tableOptions.bodyOptions.rowHeight
    };
    const defaultFoot = {
        inShowFooter: DEFAULT_CONFIG.tableOptions.footOptions.showFooter,
        inRowHeight: DEFAULT_CONFIG.tableOptions.footOptions.rowHeight
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
