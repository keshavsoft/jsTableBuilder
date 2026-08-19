export function appendToDom(instance) {
    if (!instance.htmlId) {
        console.error("inHtmlId was not provided to TableBuilder.");
        return;
    }

    const root = document.getElementById(instance.htmlId);
    if (!root) {
        console.error(`Element with id '${instance.htmlId}' not found.`);
        return;
    }

    root.innerHTML = ""; // Clear loading state

    const topHeaderNode = instance.buildTopHeaderElement();
    if (topHeaderNode) {
        // Add some spacing below the standalone header
        topHeaderNode.style.marginBottom = "1rem";
        root.appendChild(topHeaderNode);
    }

    instance.tableElement = instance.buildTableElements();
    root.appendChild(instance.tableElement);
}
