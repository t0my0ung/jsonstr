# JSON String Converter VSCode Extension

一个强大的VSCode扩展，用于检测和转换JSON格式的文本。

## 功能特性

### 🔍 JSON检测
- 自动检测选中的文本是否为有效的JSON格式
- 支持各种JSON类型：对象、数组、字符串、数字、布尔值、null

### 🔄 JSON转换
- **格式化JSON**: 将压缩的JSON转换为格式化的易读版本
- **压缩JSON**: 将格式化的JSON转换为压缩版本
- **字符串化**: 将JSON对象转换为字符串
- **解析JSON**: 将JSON字符串解析为对象

### 🎯 触发方式
1. **快捷键**: `Ctrl+Shift+T` (Windows/Linux) 或 `Cmd+Shift+T` (Mac)
2. **右键菜单**: 选中文本后右键选择 "转换JSON格式"
3. **自动检测**: 选中文本时自动检测并提示（可配置）

## 使用方法

### 1. 检查JSON格式
1. 在编辑器中选中要检查的文本
2. 按快捷键 `Ctrl+Shift+T` 或右键选择 "检查选中文本是否为JSON"
3. 插件会自动检测并显示结果

### 2. 配置插件设置
1. 打开设置 (`Cmd+,` 或 `Ctrl+,`)
2. 搜索 "jsonstr" 查看所有配置选项
3. 根据需要调整自动检测、缩进保持、通知显示等设置

### 3. 转换JSON格式
1. 选中JSON文本
2. 右键选择 "转换JSON格式"
3. 根据检测结果选择相应的转换选项：
   - 如果是JSON字符串：可以选择解析为对象或格式化
   - 如果是JSON对象：可以选择转换为字符串或压缩

### 4. 支持的转换类型

#### JSON字符串 → JSON对象
```json
// 输入
"{\"name\":\"张三\",\"age\":25}"

// 输出
{
  "name": "张三",
  "age": 25
}
```

#### JSON对象 → JSON字符串
```json
// 输入
{
  "name": "李四",
  "age": 30
}

// 输出
"{\"name\":\"李四\",\"age\":30}"
```

#### 压缩JSON → 格式化JSON
```json
// 输入
{"name":"王五","hobbies":["编程","阅读"]}

// 输出
{
  "name": "王五",
  "hobbies": [
    "编程",
    "阅读"
  ]
}
```

## 命令列表

| 命令 | 快捷键 | 描述 |
|------|--------|------|
| `jsonstr.checkSelectedText` | `Ctrl+Shift+T` | 检查选中文本是否为JSON |
| `jsonstr.convertJson` | 右键菜单 | 转换JSON格式 |
| `jsonstr.toggleAutoDetection` | 右键菜单 | 切换自动检测模式 |

## 错误处理

插件包含完善的错误处理机制：
- 检测无效的JSON格式
- 提供友好的中文错误提示
- 安全的转换操作，避免数据丢失

## 技术实现

- 使用TypeScript开发，确保类型安全
- 基于VSCode Extension API
- 包含完整的JSON工具函数库
- 支持各种JSON格式的检测和转换

## 开发说明

### 项目结构
```
src/
├── extension.ts      # 主扩展文件
├── json-utils.ts     # JSON工具函数
├── HelloWorldPanel.ts # WebView面板
└── getNonce.ts      # 工具函数
```

### 编译和测试
```bash
# 编译扩展
npm run compile

# 打包扩展
npm run package

# 运行测试
npm test
```

## 🔧 配置选项

### 自动检测模式
- **设置**: `jsonstr.autoDetection`
- **默认**: `true`
- **功能**: 选中文本时自动检测JSON格式并弹出提示

### 保持缩进格式
- **设置**: `jsonstr.preserveIndentation`
- **默认**: `true`
- **功能**: 转换时保持原有的缩进结构

### 显示通知消息
- **设置**: `jsonstr.showNotifications`
- **默认**: `true`
- **功能**: 转换成功后显示通知消息

## 🎛️ 使用模式

### 静默模式
如果你不希望插件自动弹出提示：
1. 禁用自动检测: `"jsonstr.autoDetection": false`
2. 禁用通知: `"jsonstr.showNotifications": false`
3. 仍然可以使用快捷键进行手动转换

### 保持格式模式
如果你的项目有特定的缩进规范：
1. 启用保持缩进: `"jsonstr.preserveIndentation": true`
2. 插件会分析原有JSON的缩进结构并保持

### 标准格式化模式
如果你希望所有JSON都使用标准格式：
1. 禁用保持缩进: `"jsonstr.preserveIndentation": false`
2. 所有转换后的JSON都会使用2空格缩进

## 📋 设置方法

### 通过设置界面
1. 按 `Cmd+,` (Mac) 或 `Ctrl+,` (Windows/Linux) 打开设置
2. 搜索 "jsonstr"
3. 找到相关设置项并修改

### 通过命令面板
1. 按 `Cmd+Shift+P` (Mac) 或 `Ctrl+Shift+P` (Windows/Linux)
2. 输入 "Preferences: Open Settings (JSON)"
3. 在settings.json中添加配置

### 通过右键菜单
- 在编辑器中右键，选择 "切换自动检测模式"

详细设置说明请参考 [SETTINGS-zh.md](./SETTINGS-zh.md)

## 许可证

本项目采用 CC0 1.0 Universal 许可证 - 详情请参阅 [LICENSE](LICENSE) 文件。

CC0 1.0 Universal 是最宽松的许可证。它将作品奉献给公共领域，在全球范围内放弃作者对作品的所有权利，包括所有相关和邻接权利，在法律允许的最大范围内。

您可以复制、修改、分发和执行该作品，甚至用于商业目的，所有这些都无需请求许可。
