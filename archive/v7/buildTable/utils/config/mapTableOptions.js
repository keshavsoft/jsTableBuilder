export function mapTableOptions(tableOptions = {}) {
    const mappedOptions = {
        inCommonOptions: {},
        inHeadOptions: {},
        inBodyOptions: {},
        inFootOptions: {}
    };
    
    if (tableOptions?.commonOptions?.tableWidth !== undefined) mappedOptions.inCommonOptions.inTableWidth = tableOptions.commonOptions.tableWidth;
    if (tableOptions?.commonOptions?.tableBorder !== undefined) mappedOptions.inCommonOptions.inTableBorder = tableOptions.commonOptions.tableBorder;
    if (tableOptions?.commonOptions?.showSerialNo !== undefined) mappedOptions.inCommonOptions.inShowSerialNo = tableOptions.commonOptions.showSerialNo;
    
    if (tableOptions?.headOptions?.headerHeight !== undefined) mappedOptions.inHeadOptions.inHeaderHeight = tableOptions.headOptions.headerHeight;
    
    if (tableOptions?.bodyOptions?.rowHeight !== undefined) mappedOptions.inBodyOptions.inRowHeight = tableOptions.bodyOptions.rowHeight;
    
    if (tableOptions?.footOptions?.showFooter !== undefined) mappedOptions.inFootOptions.inShowFooter = tableOptions.footOptions.showFooter;
    if (tableOptions?.footOptions?.rowHeight !== undefined) mappedOptions.inFootOptions.inRowHeight = tableOptions.footOptions.rowHeight;

    return mappedOptions;
}
