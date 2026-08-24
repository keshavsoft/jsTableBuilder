function applyCellOptions({ inElement, inOptions = {} }) {
    const localElement = inElement;
    const localOptions = inOptions;

    if (localOptions.width) {
        localElement.style.width = localOptions.width;
    }

    if (localOptions.align) {
        localElement.style.textAlign = localOptions.align;
    }

    if (localOptions.vAlign) {
        localElement.style.verticalAlign = localOptions.vAlign;
    }
}

export default applyCellOptions;
