export function buildHeaderRowElement({ inRowClass, inHeaderHeight }) {
    const headerRowElement = document.createElement("tr");

    if (inRowClass) headerRowElement.className = inRowClass;
    if (inHeaderHeight) headerRowElement.style.height = inHeaderHeight;

    return headerRowElement;
}
