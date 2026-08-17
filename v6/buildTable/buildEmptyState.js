function buildEmptyState({ inClasses = {} }) {
    const localClasses = inClasses;
    const emptyStateElement = document.createElement("div");
    if (localClasses.emptyState) emptyStateElement.className = localClasses.emptyState;
    emptyStateElement.textContent = "No data available";
    return emptyStateElement;
}

export { buildEmptyState };
