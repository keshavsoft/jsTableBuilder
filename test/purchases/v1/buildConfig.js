import fs from 'fs';
import path from 'path';

const purchasesPath = './purchases.json';
const configPath = './config.json';

try {
    // Read and parse the purchases data
    const rawData = fs.readFileSync(purchasesPath, 'utf8');
    const purchasesData = JSON.parse(rawData);

    if (purchasesData && purchasesData.length > 0) {
        // Extract root keys from the first object
        const firstRow = purchasesData[0];
        const rootKeys = Object.keys(firstRow);
        
        // Build the configuration for the table
        const config = rootKeys.map(key => ({
            header: key,
            dataKey: key,
            options: {
                width: "150px",
                sortable: true
            }
        }));
        
        // Write the resulting configuration to config.json
        fs.writeFileSync(configPath, JSON.stringify(config, null, 4));
        console.log(`Successfully generated config.json with ${rootKeys.length} columns: ${rootKeys.join(', ')}`);
    } else {
        console.log("Error: purchases.json is empty or not an array.");
    }
} catch (error) {
    console.error("Error processing files:", error.message);
}
