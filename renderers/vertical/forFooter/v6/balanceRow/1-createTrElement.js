const createTrElement = ({ inClasses = {} }) => {
    const localClasses = inClasses;

    const trElement = document.createElement("tr");
    if (localClasses.tr) trElement.className = localClasses.tr;

    // Give the summary row a distinct background
    trElement.style.backgroundColor = "#f9fafb";
    trElement.style.borderTop = "2px solid #e5e7eb";

    return trElement;
};

export { createTrElement };
