# JSON转换插件设置说明

## 配置选项

### 1. 自动检测模式 (jsonstr.autoDetection)
- **类型**: 布尔值
- **默认值**: `true`
- **描述**: 是否启用自动检测JSON格式（选中文本时自动弹出提示）

**使用方法**:
- 在VS Code设置中搜索 "jsonstr.autoDetection"
- 或者右键菜单选择 "切换自动检测模式"

### 2. 保持缩进格式 (jsonstr.preserveIndentation)
- **类型**: 布尔值
- **默认值**: `true`
- **描述**: 是否保持原有的缩进格式

**功能说明**:
- 当启用时，转换后的JSON会保持原有的缩进结构
- 当禁用时，使用标准的2空格缩进

### 3. 显示通知消息 (jsonstr.showNotifications)
- **类型**: 布尔值
- **默认值**: `true`
- **描述**: 是否显示转换成功的通知消息

**功能说明**:
- 当启用时，转换成功后会显示通知消息
- 当禁用时，转换过程静默进行，不显示通知

## 设置方法

### 方法1: 通过设置界面
1. 按 `Cmd+,` (Mac) 或 `Ctrl+,` (Windows/Linux) 打开设置
2. 搜索 "jsonstr"
3. 找到相关设置项并修改

### 方法2: 通过命令面板
1. 按 `Cmd+Shift+P` (Mac) 或 `Ctrl+Shift+P` (Windows/Linux)
2. 输入 "Preferences: Open Settings (JSON)"
3. 在settings.json中添加配置：

```json
{
  "jsonstr.autoDetection": true,
  "jsonstr.preserveIndentation": true,
  "jsonstr.showNotifications": true
}
```

### 方法3: 通过右键菜单
- 在编辑器中右键，选择 "切换自动检测模式"

## 使用场景

### 场景1: 静默模式
如果你不希望插件自动弹出提示，可以：
1. 禁用自动检测: `"jsonstr.autoDetection": false`
2. 禁用通知: `"jsonstr.showNotifications": false`
3. 仍然可以使用快捷键 `Cmd+Shift+T` 进行手动转换

### 场景2: 保持原有格式
如果你的项目有特定的缩进规范：
1. 启用保持缩进: `"jsonstr.preserveIndentation": true`
2. 插件会分析原有JSON的缩进结构并保持

### 场景3: 标准格式化
如果你希望所有JSON都使用标准格式：
1. 禁用保持缩进: `"jsonstr.preserveIndentation": false`
2. 所有转换后的JSON都会使用2空格缩进

## 快捷键

- **转换JSON**: `Cmd+Shift+T` (Mac) 或 `Ctrl+Shift+T` (Windows/Linux)
- 无论自动检测是否启用，快捷键都可以正常使用

## 故障排除

### 问题1: 设置不生效
**解决方案**:
1. 重新加载VS Code窗口 (`Cmd+R`)
2. 检查设置是否正确保存
3. 查看输出面板中的插件日志

### 问题2: 缩进不正确
**解决方案**:
1. 检查 `jsonstr.preserveIndentation` 设置
2. 确保原始JSON格式正确
3. 尝试禁用保持缩进，使用标准格式化

### 问题3: 通知消息过多
**解决方案**:
1. 禁用 `jsonstr.showNotifications`
2. 禁用 `jsonstr.autoDetection`
3. 只使用快捷键进行手动转换 