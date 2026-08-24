const DEFAULT_CONFIG = {
    htmlId: "table-root",
    data: [],
    columns: [],
    theme: "style1",
    tableOptions: {
        commonOptions: {
            tableWidth: "100%",
            tableBorder: "1px solid #e5e7eb",
            showSerialNo: false
        },
        headOptions: {
            headerHeight: "48px"
        },
        bodyOptions: {
            rowHeight: "48px"
        },
        footOptions: {
            showFooter: false,
            rowHeight: "48px",
            showAggregateRows: false,
            showTotals: false,
            showBalance: false,
            showInputsRow: false
        }
    },
    topHeader: {
        show: false,
        label: "Default Table",
        placeholder: "Search..."
    },
    verticalForm: {
        show: false,
        label: "Default Vertial Form",
        style: "default"
    },
    endPoints: {
        create: "",
        update: "",
        delete: "",
        read: "",
        read1: "",
        groupBy: "",
        read2: "",
        find: "",
        filter: "",
        dataLists: {},
        dataListEndpoints: {}
    }
};

export default DEFAULT_CONFIG;
