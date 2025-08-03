# JSON测试示例

这个文件包含各种JSON格式的示例，可以用来测试VSCode插件的功能。

## 1. 压缩的JSON对象
```json
{"name":"张三","age":25,"hobbies":["编程","阅读","音乐"],"address":{"city":"北京","street":"中关村大街"}}
```

## 2. 格式化的JSON对象
```json
{
  "name": "李四",
  "age": 30,
  "hobbies": [
    "游泳",
    "跑步",
    "健身"
  ],
  "address": {
    "city": "上海",
    "street": "南京路"
  }
}
```

## 3. JSON数组
```json
[1, 2, 3, "hello", {"key": "value"}]
```

## 4. 简单的JSON值
```json
"这是一个字符串"
```

## 5. 数字
```json
42
```

## 6. 布尔值
```json
true
```

## 7. 空值
```json
null
```

## 8. 嵌套对象
```json
{
  "user": {
    "profile": {
      "personal": {
        "name": "王五",
        "email": "wangwu@example.com"
      },
      "preferences": {
        "theme": "dark",
        "language": "zh-CN"
      }
    },
    "settings": {
      "notifications": true,
      "autoSave": false
    }
  }
}
```

## 测试说明

1. **选择文本测试**: 选中上面的任意JSON文本，然后：
   - 按 `Ctrl+Shift+J` (Windows/Linux) 或 `Cmd+Shift+J` (Mac) 来检查JSON
   - 或者右键选择 "转换JSON格式"

2. **功能验证**:
   - 检测是否为有效JSON
   - 提供转换选项（格式化、压缩、字符串化）
   - 错误处理和用户提示

3. **预期行为**:
   - 有效的JSON会显示转换选项
   - 无效的JSON会显示错误提示
   - 转换后会替换选中的文本 