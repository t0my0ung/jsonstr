#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '..', 'package.json');

function updateVersion(newVersion) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const oldVersion = packageJson.version;
    
    packageJson.version = newVersion;
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    
    console.log(`✅ Version updated from ${oldVersion} to ${newVersion}`);
    console.log(`📦 Next release will be: ${packageJson.name}-${newVersion}.vsix`);
    
    return true;
  } catch (error) {
    console.error('❌ Error updating version:', error.message);
    return false;
  }
}

function getCurrentVersion() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return packageJson.version;
  } catch (error) {
    console.error('❌ Error reading version:', error.message);
    return null;
  }
}

function showUsage() {
  console.log(`
📦 Version Management Script

Usage:
  node scripts/version.js <new-version>
  node scripts/version.js --current
  node scripts/version.js --help

Examples:
  node scripts/version.js 1.0.0
  node scripts/version.js 1.1.0
  node scripts/version.js 2.0.0-beta.1

Commands:
  --current    Show current version
  --help       Show this help message
`);
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length === 0 || args.includes('--help')) {
  showUsage();
  process.exit(0);
}

if (args.includes('--current')) {
  const currentVersion = getCurrentVersion();
  if (currentVersion) {
    console.log(`Current version: ${currentVersion}`);
  }
  process.exit(0);
}

if (args.length === 1) {
  const newVersion = args[0];
  
  // Validate version format
  const versionRegex = /^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?$/;
  if (!versionRegex.test(newVersion)) {
    console.error('❌ Invalid version format. Use semantic versioning (e.g., 1.0.0, 2.1.0-beta.1)');
    process.exit(1);
  }
  
  const success = updateVersion(newVersion);
  process.exit(success ? 0 : 1);
} else {
  console.error('❌ Invalid arguments');
  showUsage();
  process.exit(1);
} 