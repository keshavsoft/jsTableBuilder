import { applyType } from "./typeLayer.js";

const createDatalist = (inOptions) => {
    const localOptions = inOptions;
    const input = document.createElement("input");
    const dataList = document.createElement("datalist");
    const listId = "datalist-" + Math.random().toString(36).substr(2, 9);

    input.setAttribute("list", listId);
    dataList.id = listId;

    if (localOptions.listData && Array.isArray(localOptions.listData)) {
        localOptions.listData.forEach(item => {
            const option = document.createElement("option");
            if (typeof item === "object" && item !== null) {
                option.value = item.value;
                option.label = item.text;
                option.textContent = item.text;
            } else {
                option.value = item;
            }
            dataList.appendChild(option);
        });
    }

    applyType(input, localOptions);

    input.__dataListElement = dataList;
    return input;
};

export { createDatalist };
