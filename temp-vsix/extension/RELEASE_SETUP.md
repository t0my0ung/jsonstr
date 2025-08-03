# 智能发布设置指南

## 🚀 概述

这个项目使用智能发布流程，只在版本号变化时才触发发布，并自动发布到VS Code Extension Marketplace。

## 📋 前置要求

### 1. VS Code Marketplace 账号
- 在 [Visual Studio Marketplace](https://marketplace.visualstudio.com/) 注册账号
- 创建 Publisher ID: `t0my0ung`

### 2. Personal Access Token (PAT)
1. 访问 [Azure DevOps](https://dev.azure.com/)
2. 登录你的Microsoft账号
3. 进入 "Personal Access Tokens"
4. 创建新的Token：
   - **Name**: `VSCode Extension Publishing`
   - **Organization**: 选择你的组织
   - **Expiration**: 建议设置1年
   - **Scopes**: 选择 "Custom defined" → "Marketplace" → "Manage"

## 🔧 GitHub Secrets 配置

在GitHub仓库中设置以下Secrets：

### 1. 进入仓库设置
- 访问你的GitHub仓库
- 点击 "Settings" 标签
- 在左侧菜单选择 "Secrets and variables" → "Actions"

### 2. 添加 VSCE_PAT Secret
- 点击 "New repository secret"
- **Name**: `VSCE_PAT`
- **Value**: 粘贴你从Azure DevOps获取的Personal Access Token

## 📦 发布流程

### 自动发布触发条件
- 只有 `package.json` 中的 `version` 字段发生变化时才会触发发布
- 支持手动触发（在Actions页面点击 "Run workflow"）

### 发布步骤
1. **版本检查**: 比较当前版本与上一个提交的版本
2. **构建扩展**: 编译TypeScript代码
3. **打包VSIX**: 生成扩展安装包
4. **验证扩展**: 验证VSIX文件的完整性
5. **发布到Marketplace**: 自动发布到VS Code Extension Marketplace
6. **创建GitHub Release**: 在GitHub上创建发布版本

## 🔄 版本管理

### 版本号规范
- 使用语义化版本号：`MAJOR.MINOR.PATCH`
- 例如：`1.0.0`, `1.0.1`, `1.1.0`, `2.0.0`

### 更新版本号
```bash
# 修改 package.json 中的 version 字段
# 例如：从 "1.0.0" 改为 "1.0.1"
```

### 提交触发发布
```bash
git add package.json
git commit -m "feat: bump version to 1.0.1"
git push origin main
```

## 🛠️ 故障排除

### 常见错误及解决方案

#### 1. "Invalid version" 错误
**原因**: 版本号格式不符合VS Code Marketplace要求
**解决**: 
- 确保版本号遵循语义化版本规范
- 不要使用预发布版本号（如 `1.0.0-beta`）

#### 2. "Publisher ID mismatch" 错误
**原因**: package.json中的publisher与Marketplace账号不匹配
**解决**: 
- 确保package.json中的publisher字段正确
- 验证GitHub Secrets中的VSCE_PAT是否有效

#### 3. "Authentication failed" 错误
**原因**: Personal Access Token无效或过期
**解决**:
- 重新生成PAT
- 更新GitHub Secrets中的VSCE_PAT

#### 4. "Extension already exists" 错误
**原因**: 尝试发布相同版本的扩展
**解决**:
- 更新版本号
- 确保版本号唯一

### 调试步骤
1. 检查GitHub Actions日志
2. 验证package.json配置
3. 确认GitHub Secrets设置
4. 测试PAT权限

## 📝 手动发布

如果需要手动发布：

1. 进入GitHub Actions页面
2. 选择 "Smart Release - VS Code Extension" 工作流
3. 点击 "Run workflow"
4. 选择分支（通常是main）
5. 点击 "Run workflow"

## 🔍 监控发布状态

### GitHub Actions
- 查看工作流执行状态
- 检查构建和发布日志

### VS Code Marketplace
- 访问 [Visual Studio Marketplace](https://marketplace.visualstudio.com/)
- 搜索你的扩展名称
- 验证发布状态

### GitHub Releases
- 查看自动创建的发布版本
- 下载VSIX文件

## 📚 相关文档

- [VS Code Extension Publishing](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [Azure DevOps Personal Access Tokens](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) 