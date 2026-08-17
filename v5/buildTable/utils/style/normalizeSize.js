export function normalizeSize(inValue) {
    if (inValue !== undefined && inValue !== null && inValue !== "") {
        if (typeof inValue === 'number' || /^\d+$/.test(String(inValue).trim())) {
            return `${inValue}px`;
        }
    }
    return inValue;
}
