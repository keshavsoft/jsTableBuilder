const createTrElement = ({ inClasses = {}, inBodyOptions = {} }) => {
    const localClasses = inClasses;
    const localBodyOptions = inBodyOptions;

    const rowElement = document.createElement("tr");
    if (localClasses.row) rowElement.className = localClasses.row;
    if (localBodyOptions.inRowHeight) rowElement.style.height = localBodyOptions.inRowHeight;

    return rowElement;
};

export { createTrElement };
