#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// The source buildTable directory (one level up from bin/)
const sourceDir = path.join(__dirname, '..', 'buildTable');
// The destination directory (where the user ran the command)
const targetDir = path.join(process.cwd(), 'buildTable');

// Utility to recursively copy a directory
function copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

console.log('📦 Installing jsTableBuilder source components...');

try {
    if (!fs.existsSync(sourceDir)) {
        console.error(`❌ Source directory not found at: ${sourceDir}`);
        process.exit(1);
    }

    if (fs.existsSync(targetDir)) {
        console.warn(`⚠️  Target directory ./buildTable already exists. Files will be overwritten.`);
    }

    copyDirectory(sourceDir, targetDir);
    console.log(`✅ Successfully copied buildTable to ./buildTable`);

    // Copy TableBuilder.js
    const sourceTableBuilder = path.join(__dirname, '..', 'TableBuilder.js');
    const destTableBuilder = path.join(process.cwd(), 'TableBuilder.js');
    if (fs.existsSync(sourceTableBuilder)) {
        fs.copyFileSync(sourceTableBuilder, destTableBuilder);
        console.log(`✅ Successfully copied TableBuilder.js to ./TableBuilder.js`);
    }

    // Scaffold a sample index.html
    const indexHtmlPath = path.join(process.cwd(), 'index.html');
    if (!fs.existsSync(indexHtmlPath)) {
        const templatePath = path.join(__dirname, 'template.html');
        if (fs.existsSync(templatePath)) {
            const indexHtmlContent = fs.readFileSync(templatePath, 'utf8');
            fs.writeFileSync(indexHtmlPath, indexHtmlContent);
            console.log(`✅ Scaffolding complete: Created ./index.html starter file`);
        } else {
            console.warn(`⚠️ Could not find template.html at ${templatePath}. Skipping index.html creation.`);
        }
    }

    console.log(`\nYou can now import and customize the TableBuilder directly from your own project!`);
} catch (error) {
    console.error(`❌ Failed to copy files: ${error.message}`);
    process.exit(1);
}
