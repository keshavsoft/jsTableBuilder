const PREDEFINED_STYLES = {
    default: "width: 100%; max-width: 12rem; box-sizing: border-box; border: 1px solid #d1d5db; border-radius: 0.375rem; padding: 0.375rem 0.75rem; font-size: 0.875rem; outline: none; transition: all 0.2s ease-in-out; color: #374151; background-color: #ffffff; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);",
    minimal: "width: 100%; max-width: 12rem; box-sizing: border-box; border: none; border-bottom: 2px solid #d1d5db; border-radius: 0; padding: 0.375rem 0.5rem; font-size: 0.875rem; outline: none; transition: all 0.2s ease-in-out; color: #374151; background-color: transparent;",
    pill: "width: 100%; max-width: 12rem; box-sizing: border-box; border: 1px solid #d1d5db; border-radius: 9999px; padding: 0.375rem 1rem; font-size: 0.875rem; outline: none; transition: all 0.2s ease-in-out; color: #374151; background-color: #ffffff; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);",
    danger: "width: 100%; max-width: 12rem; box-sizing: border-box; border: 1px solid #ef4444; border-radius: 0.375rem; padding: 0.375rem 0.75rem; font-size: 0.875rem; outline: none; transition: all 0.2s ease-in-out; color: #b91c1c; background-color: #fef2f2; box-shadow: 0 1px 2px 0 rgba(239, 68, 68, 0.1);"
};

const showLogs = false; // Set to true to enable logging

const applyDefaultStyles = (inInput, inOptions) => {
    if (showLogs) console.log("applyDefaultStyles", inInput, inOptions);
    // Determine which theme to use, defaulting to 'default'
    const styleKey = (inOptions.theme && PREDEFINED_STYLES[inOptions.theme]) ? inOptions.theme : "default";

    // Apply the predefined inline CSS
    inInput.style.cssText = PREDEFINED_STYLES[styleKey];

    // If a className is passed from outside, we optionally append it
    if (inOptions.className) {
        inInput.className = inOptions.className;
    };
};

export { applyDefaultStyles, PREDEFINED_STYLES };
