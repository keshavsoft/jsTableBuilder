import { DEFAULT_CONFIG } from "../../config/defaults.js";

export function extractTopHeader({ inTopHeader }) {
    // If the user didn't pass an inTopHeader, it equals DEFAULT_CONFIG.inTopHeader (show: false)
    const isDefaultHeader = inTopHeader === DEFAULT_CONFIG.inTopHeader;
    
    if (isDefaultHeader) {
        return DEFAULT_CONFIG.inTopHeader;
    }

    // Map the external topHeader and only pull the specific allowed properties
    return { 
        inShow: inTopHeader.show !== undefined ? inTopHeader.show : true, 
        inLabel: inTopHeader.label !== undefined ? inTopHeader.label : DEFAULT_CONFIG.inTopHeader.inLabel, 
        inPlaceholder: inTopHeader.placeholder !== undefined ? inTopHeader.placeholder : DEFAULT_CONFIG.inTopHeader.inPlaceholder 
    };
}
