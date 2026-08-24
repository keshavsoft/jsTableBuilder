const buildSpacerCell = ({ inClasses = {} }) => {
    const localClasses = inClasses;

    const spacerCell = document.createElement("td");
    if (localClasses.cell) spacerCell.className = localClasses.cell;

    return spacerCell;
};

export { buildSpacerCell };
