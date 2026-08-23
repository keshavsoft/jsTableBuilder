export const DEFAULT_TOP_HEADER = {
    show: false,
    label: "Default Table",
    placeholder: "Search..."
};

export function extractTopHeader({ inTopHeader, defaultTopHeader = DEFAULT_TOP_HEADER } = {}) {
    const defaults = defaultTopHeader || DEFAULT_TOP_HEADER;

    if (!inTopHeader) {
        return {
            inShow: defaults.show,
            inLabel: defaults.label,
            inPlaceholder: defaults.placeholder
        };
    }

    return {
        inShow: inTopHeader.show !== undefined ? inTopHeader.show : defaults.show,
        inLabel: inTopHeader.label !== undefined ? inTopHeader.label : defaults.label,
        inPlaceholder: inTopHeader.placeholder !== undefined ? inTopHeader.placeholder : defaults.placeholder
    };
}
