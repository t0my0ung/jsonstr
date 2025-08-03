# GitHub Actions Workflow

## 自动发布流程

这个workflow会在每次推送到main分支时自动构建和发布VS Code扩展。

### 触发条件

- 推送到 `main` 分支
- 手动触发（在GitHub Actions页面）

### 工作流程

1. **检出代码** - 从GitHub仓库检出最新代码
2. **设置Node.js环境** - 安装Node.js 18并配置npm缓存
3. **安装依赖** - 运行 `npm ci` 安装项目依赖
4. **构建扩展** - 运行 `npm run compile` 编译TypeScript代码
5. **打包扩展** - 运行 `npm run package` 生成.vsix文件
6. **获取版本号** - 从package.json中读取版本号
7. **重命名文件** - 将.vsix文件重命名为 `jsonstr-版本号.vsix`
8. **上传构建产物** - 将.vsix文件上传为构建产物
9. **创建发布** - 在GitHub Releases中创建新版本
10. **上传发布文件** - 将.vsix文件附加到发布中

### 版本号管理

版本号来自 `package.json` 中的 `version` 字段。要发布新版本：

1. 更新 `package.json` 中的版本号
2. 提交并推送到main分支
3. GitHub Actions会自动构建并发布

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

### 注意事项

- 确保 `package.json` 中的版本号正确
- 发布会自动创建Git标签
- 可以在GitHub Actions页面查看构建日志
- 支持手动触发构建 