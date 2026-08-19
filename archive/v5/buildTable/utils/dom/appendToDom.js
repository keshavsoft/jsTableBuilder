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

    const container = document.createElement("div");
    if (instance.classes.container) {
        container.className = instance.classes.container;
    }

    const topHeaderNode = instance.buildTopHeaderElement();
    if (topHeaderNode) {
        container.appendChild(topHeaderNode);
    }

    instance.tableElement = instance.buildTableElements();
    container.appendChild(instance.tableElement);

    root.appendChild(container);
}
