export function appendSpacerCell({ inHeaderRowElement, inCellClass }) {
    const spacerCell = document.createElement("th");
    if (inCellClass) spacerCell.className = inCellClass;
    inHeaderRowElement.appendChild(spacerCell);
}
