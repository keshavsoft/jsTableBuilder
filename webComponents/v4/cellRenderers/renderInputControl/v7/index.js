import { createInputElement } from "./1-createInputElement.js";
import { applyDefaultStyles } from "./2-applyDefaultStyles.js";
import { addInteractionBehaviors } from "./3-addInteractionBehaviors.js";

const showLogs = false;

const startFunc = (shadowRoot, inOptions = null) => {
    if (showLogs) console.log("startFunc", shadowRoot, inOptions);
    // Keep options local for now as defaults, but allow overriding from outside later
    const options = inOptions || {
        controlType: "text",
        placeholder: "Enter value..."
    };

    // 1. Creation Layer
    const input = createInputElement(options);

    // 2. Styling Layer
    applyDefaultStyles(input, options);

    // 3. Behavior Layer
    addInteractionBehaviors(input);

    shadowRoot.appendChild(input);
    if (input.__dataListElement) {
        shadowRoot.appendChild(input.__dataListElement);
    }
};

export default startFunc;
