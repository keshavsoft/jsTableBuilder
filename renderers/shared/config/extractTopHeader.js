import DEFAULT_CONFIG from "../../config/defaults.js";

export function extractTopHeader({ inTopHeader }) {
    // If the user didn't pass an inTopHeader, it equals DEFAULT_CONFIG.topHeader
    const isDefaultHeader = inTopHeader === DEFAULT_CONFIG.topHeader;
    
    if (isDefaultHeader) {
        return {
            inShow: DEFAULT_CONFIG.topHeader.show,
            inLabel: DEFAULT_CONFIG.topHeader.label,
            inPlaceholder: DEFAULT_CONFIG.topHeader.placeholder
        };
    }

    // Map the external topHeader and only pull the specific allowed properties
    return { 
        inShow: inTopHeader.show !== undefined ? inTopHeader.show : true, 
        inLabel: inTopHeader.label !== undefined ? inTopHeader.label : DEFAULT_CONFIG.topHeader.label, 
        inPlaceholder: inTopHeader.placeholder !== undefined ? inTopHeader.placeholder : DEFAULT_CONFIG.topHeader.placeholder 
    };
}
