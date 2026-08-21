const createSelect = (inOptions) => {
    const localOptions = inOptions;
    const select = document.createElement("select");

    if (localOptions.listData && Array.isArray(localOptions.listData)) {
        localOptions.listData.forEach(item => {
            const option = document.createElement("option");
            if (typeof item === "object" && item !== null) {
                option.value = item.value;
                option.textContent = item.text;
            } else {
                option.value = item;
                option.textContent = item;
            }
            select.appendChild(option);
        });
    }

    return select;
};

export { createSelect };
