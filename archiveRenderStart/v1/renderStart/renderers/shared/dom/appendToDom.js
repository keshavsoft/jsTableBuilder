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

    if (instance.rendererType === "vertical") {
        const verticalFormNode = instance.buildVerticalFormElement();
        if (verticalFormNode) {
            container.appendChild(verticalFormNode);
        }
    } else {
        console.warn(`Renderer type '${instance.rendererType}' is currently not implemented outside archive.`);
    }

    root.appendChild(container);
}
