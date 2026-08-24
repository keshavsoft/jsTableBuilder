function buildTableElement({ inClasses = {}, inCommonOptions = {} }) {
    const localClasses = inClasses;
    const localCommonOptions = inCommonOptions;

    const tableElement = document.createElement("table");
    if (localClasses.table) tableElement.className = localClasses.table;
    if (localCommonOptions.inTableWidth) tableElement.style.width = localCommonOptions.inTableWidth;
    
    if (localCommonOptions.inTableBorder) {
        if (localCommonOptions.inTableBorder.includes(" ")) {
            tableElement.style.border = localCommonOptions.inTableBorder;
        } else {
            tableElement.style.borderWidth = localCommonOptions.inTableBorder;
        }
    }
    
    return tableElement;
}

export { buildTableElement };
