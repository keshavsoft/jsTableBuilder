export function buildTableBodyElement({ inWrapperClass }) {
    const bodyWrapperElement = document.createElement("tbody");
    
    if (inWrapperClass) bodyWrapperElement.className = inWrapperClass;
    
    return bodyWrapperElement;
}
