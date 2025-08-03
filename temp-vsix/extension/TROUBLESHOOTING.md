# 故障排除指南

如果插件没有响应，请按照以下步骤进行排查：

## 1. 检查插件是否正确激活

### 方法1：查看输出面板
1. 在VSCode中按 `Ctrl+Shift+U` (Windows/Linux) 或 `Cmd+Shift+U` (Mac)
2. 在输出面板的下拉菜单中选择 "jsonstr"
3. 查看是否有激活信息：
   ```
   Congratulations, your extension "jsonstr" is now active!
   Extension activation context: jsonstr
   === 插件调试信息 ===
   插件已激活
   ```

### 方法2：查看开发者控制台
1. 按 `Ctrl+Shift+I` (Windows/Linux) 或 `Cmd+Option+I` (Mac)
2. 在控制台中查看是否有插件相关的日志信息

## 2. 检查命令是否正确注册

### 方法1：使用命令面板
1. 按 `Ctrl+Shift+P` (Windows/Linux) 或 `Cmd+Shift+P` (Mac)
2. 输入 "jsonstr" 查看是否有以下命令：
   - `jsonstr: 测试插件`
   - `jsonstr: 检查选中文本是否为JSON`
   - `jsonstr: 转换JSON格式`

### 方法2：测试命令
1. 按 `Ctrl+Shift+P` 打开命令面板
2. 输入 "测试插件" 并执行
3. 如果看到 "插件测试命令正常工作！" 的提示，说明插件正常

## 3. 检查快捷键是否被占用

### 方法1：查看键盘快捷键
1. 按 `Ctrl+K Ctrl+S` (Windows/Linux) 或 `Cmd+K Cmd+S` (Mac)
2. 搜索 "ctrl+shift+j" 或 "cmd+shift+j"
3. 检查是否有冲突的快捷键

### 方法2：重新绑定快捷键
如果快捷键被占用，可以手动绑定：
1. 打开键盘快捷键设置
2. 搜索 "检查选中文本是否为JSON"
3. 设置新的快捷键

## 4. 检查选中文本

### 确保有选中的文本
1. 在编辑器中选中一段文本
2. 确保选中的文本不为空
3. 尝试选中JSON格式的文本进行测试

### 测试用的JSON示例
```json
{"name":"张三","age":25}
```

## 5. 重新加载窗口

如果以上步骤都没有问题，尝试重新加载窗口：

### 方法1：使用命令
1. 按 `Ctrl+Shift+P` 打开命令面板
2. 输入 "Developer: Reload Window"
3. 选择并执行

### 方法2：使用快捷键
- Windows/Linux: `Ctrl+R`
- Mac: `Cmd+R`

## 6. 检查插件文件

### 验证编译结果
在终端中运行：
```bash
npm run compile
```
确保没有编译错误。

### 检查文件结构
确保以下文件存在：
```
src/
├── extension.ts      # 主插件文件
├── json-utils.ts     # JSON工具函数
└── debug-extension.ts # 调试工具
```

## 7. 常见问题解决

### 问题1：插件没有激活
**解决方案**：
1. 检查 `package.json` 中的 `activationEvents`
2. 确保 `main` 字段指向正确的文件
3. 重新编译插件

### 问题2：命令不响应
**解决方案**：
1. 检查命令是否正确注册
2. 查看控制台错误信息
3. 尝试使用命令面板执行命令

### 问题3：快捷键不工作
**解决方案**：
1. 检查快捷键是否被其他插件占用
2. 重新绑定快捷键
3. 使用命令面板作为替代方案

### 问题4：JSON检测不准确
**解决方案**：
1. 确保选中的文本是完整的JSON
2. 检查JSON格式是否正确
3. 尝试不同的JSON格式

## 8. 调试步骤

### 启用详细日志
1. 打开设置 (`Ctrl+,`)
2. 搜索 "jsonstr"
3. 启用相关调试选项

### 查看扩展主机日志
1. 按 `Ctrl+Shift+P`
2. 输入 "Developer: Show Logs"
3. 选择 "Extension Host"

## 9. 联系支持

如果问题仍然存在，请提供以下信息：
1. VSCode版本
2. 操作系统版本
3. 插件版本
4. 错误日志
5. 重现步骤

## 10. 临时解决方案

如果插件暂时无法工作，可以使用以下替代方案：

### 在线JSON工具
- [JSONLint](https://jsonlint.com/)
- [JSON Formatter](https://jsonformatter.curiousconcept.com/)

### VSCode内置功能
- 使用内置的JSON格式化功能
- 安装其他JSON相关的扩展

## 测试清单

在报告问题之前，请确认以下项目：

- [ ] 插件已正确激活（查看输出面板）
- [ ] 命令已正确注册（使用命令面板测试）
- [ ] 快捷键未被占用（检查键盘快捷键设置）
- [ ] 有选中的文本（确保文本不为空）
- [ ] 文本是有效的JSON格式
- [ ] 已重新加载窗口
- [ ] 已重新编译插件 