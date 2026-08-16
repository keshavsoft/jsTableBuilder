export const DEFAULT_CLASSES = {
    emptyState: "p-4 text-gray-500 italic",
    table: "w-full border border-gray-200 divide-y divide-gray-200 table-fixed",
    head: {
        wrapper: "bg-gray-100 sticky top-0 z-10",
        row: "divide-x divide-gray-200",
        cell: "px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-b"
    },
    body: {
        wrapper: "bg-white divide-y divide-gray-200",
        row: "hover:bg-gray-50 transition-colors divide-x divide-gray-200",
        cell: "px-4 py-3 whitespace-nowrap text-sm text-gray-700",
        cellTruncate: "truncate max-w-xs"
    },
    topHeader: {
        wrapper: "flex justify-between items-center p-4 bg-white border-b border-gray-200 rounded-t-lg",
        label: "text-lg font-semibold text-gray-800",
        input: "px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64 transition-all"
    }
};

export const DEFAULT_CONFIG = {
    inTableOptions: {
        inCommonOptions: {
            inTableWidth: "100%",
            inTableBorder: "1px solid #e5e7eb",
            inShowSerialNo: false
        },
        inHeadOptions: {
            inHeaderHeight: "48px"
        },
        inBodyOptions: {
            inRowHeight: "48px"
        },
        inFootOptions: {
            inShowFooter: false,
            inRowHeight: "48px"
        }
    },
    inTopHeader: {
        inShow: false,
        inLabel: "Default Table",
        inPlaceholder: "Search..."
    }
};
