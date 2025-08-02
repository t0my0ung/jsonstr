# Release Guide

## 自动发布流程

这个项目使用GitHub Actions自动构建和发布VS Code扩展。

### 重要设置

在首次使用前，请更新 `package.json` 中的仓库URL：

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
  }
}
```

将 `YOUR_USERNAME` 和 `YOUR_REPO_NAME` 替换为你的GitHub用户名和仓库名。

### 发布步骤

1. **更新版本号**
   ```bash
   # 查看当前版本
   npm run version:current
   
   # 更新到新版本
   npm run version 1.1.0
   ```

2. **提交更改**
   ```bash
   git add package.json
   git commit -m "Bump version to 1.1.0"
   git push origin main
   ```

3. **自动发布**
   - GitHub Actions会自动触发构建
   - 生成 `jsonstr-1.1.0.vsix` 文件
   - 在GitHub Releases中创建新版本
   - 上传.vsix文件到发布页面

### 版本号规范

使用语义化版本控制 (Semantic Versioning):

- **主版本号** (Major): 不兼容的API修改
- **次版本号** (Minor): 向下兼容的功能性新增
- **修订号** (Patch): 向下兼容的问题修正

示例：
- `1.0.0` - 初始版本
- `1.1.0` - 新增功能
- `1.1.1` - 修复bug
- `2.0.0` - 重大更新，可能不兼容

### 预发布版本

支持预发布版本号：

```bash
npm run version 1.2.0-beta.1
npm run version 2.0.0-rc.1
```

### 发布文件

每次发布会生成：
- `jsonstr-版本号.vsix` - VS Code扩展安装文件

### 安装方法

用户可以通过以下方式安装：

1. 下载 `.vsix` 文件
2. 在VS Code中打开扩展面板 (Ctrl+Shift+X)
3. 点击 "..." 菜单
4. 选择 "Install from VSIX..."
5. 选择下载的文件

### 手动触发

如果需要手动触发构建：

1. 前往GitHub仓库的Actions页面
2. 选择 "Build and Release VS Code Extension"
3. 点击 "Run workflow"
4. 选择分支并运行

### 注意事项

- 确保版本号格式正确 (x.y.z)
- 每次推送都会创建新的发布
- 发布会自动创建Git标签
- 可以在GitHub Actions页面查看构建日志
- 支持预发布版本 (beta, rc等)
- **重要**：确保package.json中的repository URL正确

### 故障排除

如果发布失败：

1. 检查GitHub Actions日志
2. 确保package.json中的版本号正确
3. 确保所有依赖都已安装
4. 检查构建脚本是否正常工作
5. 验证repository URL是否正确设置 