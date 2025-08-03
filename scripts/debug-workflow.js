#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔍 Debugging Workflow Trigger Issues\n');

try {
  // 检查当前package.json
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log('📦 Current package.json:');
  console.log(`   Name: ${packageJson.name}`);
  console.log(`   Version: ${packageJson.version}`);
  console.log(`   Publisher: ${packageJson.publisher}`);
  console.log(`   DisplayName: ${packageJson.displayName}`);
  console.log(`   Description: ${packageJson.description}`);
  console.log(`   Icon: ${packageJson.icon || 'Not set'}\n`);

  // 检查最近的git提交
  console.log('📝 Recent commits affecting package.json:');
  try {
    const commits = execSync('git log --oneline --follow -10 package.json', { encoding: 'utf8' });
    console.log(commits);
  } catch (error) {
    console.log('❌ Error getting git history:', error.message);
  }

  // 检查当前分支
  console.log('\n🌿 Current branch:');
  try {
    const branch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
    console.log(`   ${branch}`);
  } catch (error) {
    console.log('❌ Error getting current branch:', error.message);
  }

  // 检查package.json的最近变化
  console.log('\n📄 Recent changes to package.json:');
  try {
    const changes = execSync('git log -p --follow -3 package.json', { encoding: 'utf8' });
    console.log(changes);
  } catch (error) {
    console.log('❌ Error getting package.json changes:', error.message);
  }

  // 检查workflow文件
  console.log('\n⚙️ Workflow configuration:');
  try {
    const workflow = fs.readFileSync('.github/workflows/release.yml', 'utf8');
    const triggerLines = workflow.split('\n').filter(line => 
      line.includes('branches:') || line.includes('paths:') || line.includes('package.json')
    );
    console.log('   Trigger conditions:');
    triggerLines.forEach(line => console.log(`   ${line.trim()}`));
  } catch (error) {
    console.log('❌ Error reading workflow file:', error.message);
  }

  console.log('\n💡 Troubleshooting tips:');
  console.log('1. Ensure you\'re pushing to the "main" branch');
  console.log('2. Ensure package.json is actually modified in the commit');
  console.log('3. Check if the version number actually changed');
  console.log('4. Verify the workflow file is in the correct location');
  console.log('5. Check GitHub Actions tab for any workflow runs');

} catch (error) {
  console.error('❌ Error:', error.message);
} 