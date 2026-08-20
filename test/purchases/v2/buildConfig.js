import fs from 'fs';
import path from 'path';
import DEFAULT_CONFIG from '../../../buildTable/config/defaultConfig.js';

// purchases.json is in the parent directory (test/purchases/)
const purchasesPath = '../purchases.json';
const configPath = './config.json';

try {
    // Read and parse the purchases data
    const rawData = fs.readFileSync(purchasesPath, 'utf8');
    const purchasesData = JSON.parse(rawData);

    if (purchasesData && purchasesData.length > 0) {
        // Extract root keys from the first object
        const firstRow = purchasesData[0];
        const rootKeys = Object.keys(firstRow);
        
        // Build the columns array
        const columns = rootKeys.map(key => ({
            header: key,
            dataKey: key,
            options: {
                width: "150px",
                sortable: true
            }
        }));
        
        // Combine our columns with the system defaults
        const fullConfig = {
            ...DEFAULT_CONFIG,
            htmlId: "table-root",
            tableName: "purchases",
            columns: columns
        };
        
        // Write the resulting full configuration to config.json
        fs.writeFileSync(configPath, JSON.stringify(fullConfig, null, 4));
        console.log(`Successfully generated full config.json with ${columns.length} columns based on DEFAULT_CONFIG.`);
    } else {
        console.log("Error: purchases.json is empty or not an array.");
    }
} catch (error) {
    console.error("Error processing files:", error.message);
}
