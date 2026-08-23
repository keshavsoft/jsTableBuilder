export const DEFAULT_CLASSES = {
    style1: {
        container: "w-full overflow-x-auto",
        verticalForm: {
            container: "flex flex-col gap-4 p-4 max-w-2xl bg-white border border-gray-200 rounded-lg shadow-sm mx-auto",
            wrapper: "flex flex-col",
            label: "font-bold mb-1 text-gray-700",
            input: "border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        }
    },
    style2: {
        container: "w-full max-w-6xl mx-auto bg-white rounded-lg shadow-sm overflow-x-auto",
        verticalForm: {
            // Label on the left, input on the right side
            container: "flex flex-col gap-6 p-6 max-w-3xl bg-gray-50 border border-gray-300 rounded-xl mx-auto shadow",
            wrapper: "flex flex-row items-center",
            label: "font-semibold w-1/3 text-right pr-4 text-gray-800",
            input: "border border-blue-400 rounded-lg px-3 py-2 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
        }
    },
    style3: {
        // Without labels
        verticalForm: {
            container: "flex flex-col gap-4 p-5 max-w-md bg-white border-t-4 border-blue-500 rounded shadow-md mx-auto",
            wrapper: "flex flex-col",
            label: "hidden", // Completely hide labels
            input: "border-b-2 border-gray-300 px-2 py-3 w-full focus:outline-none focus:border-blue-500 bg-gray-50"
        }
    },
    style4: {
        // Increase font size of the input
        verticalForm: {
            container: "flex flex-col gap-8 p-8 max-w-4xl bg-white border-2 border-gray-800 rounded-2xl mx-auto",
            wrapper: "flex flex-col",
            label: "font-extrabold mb-3 text-xl tracking-wide text-gray-900",
            input: "border-2 border-gray-400 rounded-xl px-5 py-4 w-full text-2xl focus:outline-none focus:border-black font-medium"
        }
    }
};

import DEFAULT_CONFIG from "./defaultConfig.js";

export default DEFAULT_CONFIG;
