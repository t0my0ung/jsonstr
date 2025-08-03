#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('🔍 Testing PAT validity...\n');

try {
  // 检查是否安装了vsce
  console.log('📦 Checking vsce installation...');
  const vsceVersion = execSync('vsce --version', { encoding: 'utf8' });
  console.log(`✅ vsce version: ${vsceVersion.trim()}`);
  
  // 检查publisher信息
  console.log('\n👤 Checking publisher information...');
  try {
    const publishers = execSync('vsce ls-publishers', { encoding: 'utf8' });
    console.log('Available publishers:');
    console.log(publishers);
  } catch (error) {
    console.log('❌ Error listing publishers:', error.message);
  }
  
  // 检查当前扩展信息
  console.log('\n📦 Checking current extension info...');
  try {
    const packageJson = require('../package.json');
    console.log(`Extension ID: ${packageJson.publisher}.${packageJson.name}`);
    console.log(`Publisher: ${packageJson.publisher}`);
    console.log(`Version: ${packageJson.version}`);
  } catch (error) {
    console.log('❌ Error reading package.json:', error.message);
  }
  
  console.log('\n💡 Next steps:');
  console.log('1. Ensure VSCE_PAT secret is set in GitHub repository');
  console.log('2. Verify PAT has "Marketplace" → "Manage" permissions');
  console.log('3. Check that publisher ID matches your Azure DevOps account');
  console.log('4. Try publishing manually with: vsce publish --pat YOUR_PAT');
  
} catch (error) {
  console.error('❌ Error:', error.message);
} 