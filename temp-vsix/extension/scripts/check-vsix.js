#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Checking VSIX file structure...\n');

try {
  // 查找VSIX文件
  const files = fs.readdirSync('.');
  const vsixFiles = files.filter(file => file.endsWith('.vsix'));
  
  if (vsixFiles.length === 0) {
    console.log('❌ No VSIX files found in current directory');
    return;
  }
  
  console.log('📦 Found VSIX files:');
  vsixFiles.forEach(file => {
    const stats = fs.statSync(file);
    console.log(`   ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
  });
  
  // 检查最新的VSIX文件
  const latestVsix = vsixFiles[0]; // 假设按名称排序
  console.log(`\n🔍 Analyzing: ${latestVsix}`);
  
  // 使用vsce ls命令查看内容
  try {
    console.log('\n📋 VSIX contents:');
    const contents = execSync(`vsce ls ${latestVsix}`, { encoding: 'utf8' });
    console.log(contents);
  } catch (error) {
    console.log('❌ Error listing VSIX contents:', error.message);
  }
  
  // 检查package.json中的关键字段
  console.log('\n📦 Package.json validation:');
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  const requiredFields = ['name', 'version', 'publisher', 'displayName', 'description'];
  const optionalFields = ['icon', 'repository', 'keywords', 'engines'];
  
  console.log('Required fields:');
  requiredFields.forEach(field => {
    const value = packageJson[field];
    const status = value ? '✅' : '❌';
    console.log(`   ${status} ${field}: ${value || 'MISSING'}`);
  });
  
  console.log('\nOptional fields:');
  optionalFields.forEach(field => {
    const value = packageJson[field];
    const status = value ? '✅' : '⚠️';
    console.log(`   ${status} ${field}: ${value ? 'Present' : 'Missing'}`);
  });
  
  // 检查版本号格式
  console.log('\n🔢 Version validation:');
  const version = packageJson.version;
  const versionRegex = /^\d+\.\d+\.\d+$/;
  const isValidVersion = versionRegex.test(version);
  console.log(`   Version: ${version}`);
  console.log(`   Format valid: ${isValidVersion ? '✅' : '❌'}`);
  
  if (!isValidVersion) {
    console.log('   ⚠️ Version should follow semantic versioning (e.g., 1.0.0)');
  }
  
  // 检查publisher
  console.log('\n👤 Publisher validation:');
  const publisher = packageJson.publisher;
  console.log(`   Publisher: ${publisher}`);
  console.log(`   Length: ${publisher.length} characters`);
  
  if (publisher.length < 3) {
    console.log('   ⚠️ Publisher ID should be at least 3 characters');
  }
  
  console.log('\n💡 Publishing tips:');
  console.log('1. Ensure VSCE_PAT secret is set in GitHub');
  console.log('2. Verify publisher ID matches your Azure DevOps account');
  console.log('3. Check that version number is unique and follows semver');
  console.log('4. Ensure all required fields are present');
  
} catch (error) {
  console.error('❌ Error:', error.message);
} 