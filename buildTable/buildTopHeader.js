function buildTopHeader({ inLabel = "", inPlaceholder = "", inClasses = {}, inOnSearch = () => {} }) {
    const localLabel = inLabel;
    const localPlaceholder = inPlaceholder;
    const localClasses = inClasses;
    const localOnSearch = inOnSearch;

    const headerWrapper = document.createElement("div");
    if (localClasses.wrapper) headerWrapper.className = localClasses.wrapper;

    const labelElement = document.createElement("div");
    if (localClasses.label) labelElement.className = localClasses.label;
    labelElement.textContent = localLabel;

    const inputWrapper = document.createElement("div");
    const inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.placeholder = localPlaceholder;
    if (localClasses.input) inputElement.className = localClasses.input;

    inputElement.addEventListener("input", (e) => {
        localOnSearch(e.target.value);
    });

    inputWrapper.appendChild(inputElement);
    
    headerWrapper.appendChild(labelElement);
    headerWrapper.appendChild(inputWrapper);

    return headerWrapper;
}

export { buildTopHeader };
