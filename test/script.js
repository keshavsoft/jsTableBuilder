function loadScriptAsModuleCommon(src, showErrorLog = true) {
    return import(src)
        .then(() => true)
        .catch(err => {
            if (showErrorLog) console.error(`Error loading module ${src}:`, err);
            throw err;
        });
};

function loadCss(href) {
    return new Promise((resolve, reject) => {
        const link = document.createElement("link");

        link.rel = "stylesheet";
        link.href = href;

        link.onload = () => resolve(true);
        link.onerror = reject;

        document.head.appendChild(link);
    });
};

async function loadResource({ name, isLoaded, sources, showLog = true, showErrorLog = true }) {
    if (isLoaded && isLoaded()) {
        if (window.ksShowLog && showLog) console.log(`${name} loaded from Firefox Extension`);
        return;
    }

    for (const source of sources) {
        try {
            if (source.type === "css") {
                await loadCss(source.url);
            } else {
                await loadScriptAsModuleCommon(source.url, showErrorLog);
            }

            if (window.ksShowLog && showLog) console.log(`${name} loaded from ${source.label} : ${source.url}`);
            return;
        } catch (err) {
            if (showErrorLog) console.error(`${name} failed to load from ${source.label} : ${source.url}`, err);
            if (window.ksShowLog && showLog) console.log(`${name} -failed- from ${source.label} : ${source.url}`);
        }
    }

    throw new Error(`${name} could not be loaded`);
}

function createIsLoadedCheck(checkConfig) {
    if (!checkConfig) return undefined;
    if (checkConfig.type === "elementId") {
        return () => document.getElementById(checkConfig.value);
    }
    if (checkConfig.type === "windowProperty") {
        return () => !!window[checkConfig.value];
    }
    if (checkConfig.type === "windowNestedProperty") {
        return () => {
            let current = window;
            for (const prop of checkConfig.value) {
                if (current === undefined || current === null) return false;
                current = current[prop];
            }
            return !!current;
        };
    }
    return undefined;
}

// Fetch and load resources from JSON configuration
try {
    const jsonUrl = new URL('./resources.json', import.meta.url);
    const response = await fetch(jsonUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch resources.json: ${response.status}`);
    }
    const resources = await response.json();

    const loadPromises = resources.map(resourceConfig => {
        return loadResource({
            name: resourceConfig.name,
            isLoaded: createIsLoadedCheck(resourceConfig.isLoadedCheck),
            sources: resourceConfig.sources,
            showLog: resourceConfig.showLog !== false, // default to true if undefined
            showErrorLog: resourceConfig.showErrorLog !== false // default to true if undefined
        });
    });

    await Promise.all(loadPromises);
} catch (error) {
    console.error("Failed to load resources configuration:", error);
};
//     ensureTableBuilder()
// ]);