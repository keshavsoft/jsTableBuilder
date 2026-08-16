import { DEFAULT_CLASSES } from "../../config/defaults.js";

export function mergeClasses({ inClasses }) {
    const localClasses = inClasses || {};
    
    return {
        ...DEFAULT_CLASSES,
        ...localClasses,
        head: { ...DEFAULT_CLASSES.head, ...(localClasses.head || {}) },
        body: { ...DEFAULT_CLASSES.body, ...(localClasses.body || {}) },
        topHeader: { ...DEFAULT_CLASSES.topHeader, ...(localClasses.topHeader || {}) }
    };
}
