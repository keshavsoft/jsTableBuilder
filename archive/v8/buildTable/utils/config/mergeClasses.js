import { DEFAULT_CLASSES } from "../../config/defaults.js";

export function mergeClasses({ inClasses, inTheme = "style1" }) {
    const localClasses = inClasses || {};
    const defaultThemeClasses = DEFAULT_CLASSES[inTheme] || DEFAULT_CLASSES.style1;
    
    return {
        ...defaultThemeClasses,
        ...localClasses,
        head: { ...defaultThemeClasses.head, ...(localClasses.head || {}) },
        body: { ...defaultThemeClasses.body, ...(localClasses.body || {}) },
        topHeader: { ...defaultThemeClasses.topHeader, ...(localClasses.topHeader || {}) }
    };
}
