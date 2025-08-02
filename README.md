# JSON String Converter VSCode Extension

A powerful VSCode extension for detecting and converting JSON format text.

## Features

### 🔍 JSON Detection
- Automatically detect if selected text is valid JSON format
- Support various JSON types: objects, arrays, strings, numbers, booleans, null

### 🔄 JSON Conversion
- **Format JSON**: Convert compressed JSON to formatted readable version
- **Compress JSON**: Convert formatted JSON to compressed version
- **Stringify**: Convert JSON objects to strings
- **Parse JSON**: Parse JSON strings to objects

### 🎯 Trigger Methods
1. **Shortcut**: `Ctrl+Shift+T` (Windows/Linux) or `Cmd+Shift+T` (Mac)
2. **Right-click menu**: Select text and right-click to choose "Convert JSON format"
3. **Auto-detection**: Automatically detect and prompt when text is selected (configurable)

## Usage

### 1. Check JSON Format
1. Select the text to check in the editor
2. Press shortcut `Ctrl+Shift+T` or right-click to select "Check if selected text is JSON"
3. The extension will automatically detect and show results

### 2. Configure Extension Settings
1. Open settings (`Cmd+,` or `Ctrl+,`)
2. Search for "jsonstr" to view all configuration options
3. Adjust auto-detection, indentation preservation, notification display settings as needed

### 3. Convert JSON Format
1. Select JSON text
2. Right-click to select "Convert JSON format"
3. Choose appropriate conversion options based on detection results:
   - If it's a JSON string: choose to parse as object or format
   - If it's a JSON object: choose to convert to string or compress

### 4. Supported Conversion Types

#### JSON String → JSON Object
```json
// Input
"{\"name\":\"John\",\"age\":25}"

// Output
{
  "name": "John",
  "age": 25
}
```

#### JSON Object → JSON String
```json
// Input
{
  "name": "Jane",
  "age": 30
}

// Output
"{\"name\":\"Jane\",\"age\":30}"
```

#### Compressed JSON → Formatted JSON
```json
// Input
{"name":"Bob","hobbies":["coding","reading"]}

// Output
{
  "name": "Bob",
  "hobbies": [
    "coding",
    "reading"
  ]
}
```

## Command List

| Command | Shortcut | Description |
|---------|----------|-------------|
| `jsonstr.checkSelectedText` | `Ctrl+Shift+T` | Check if selected text is JSON |
| `jsonstr.convertJson` | Right-click menu | Convert JSON format |
| `jsonstr.toggleAutoDetection` | Right-click menu | Toggle auto-detection mode |

## Error Handling

The extension includes comprehensive error handling:
- Detect invalid JSON formats
- Provide friendly error messages
- Safe conversion operations to avoid data loss

## Technical Implementation

- Developed with TypeScript for type safety
- Based on VSCode Extension API
- Includes complete JSON utility function library
- Supports detection and conversion of various JSON formats

## Development

### Project Structure
```
src/
├── extension.ts      # Main extension file
├── json-utils.ts     # JSON utility functions
├── HelloWorldPanel.ts # WebView panel
└── getNonce.ts      # Utility functions
```

### Compile and Test
```bash
# Compile extension
npm run compile

# Package extension
npm run package

# Run tests
npm test
```

## 🔧 Configuration Options

### Auto-detection Mode
- **Setting**: `jsonstr.autoDetection`
- **Default**: `true`
- **Function**: Automatically detect JSON format and popup when text is selected

### Preserve Indentation
- **Setting**: `jsonstr.preserveIndentation`
- **Default**: `true`
- **Function**: Preserve original indentation structure during conversion

### Show Notification Messages
- **Setting**: `jsonstr.showNotifications`
- **Default**: `true`
- **Function**: Show notification messages for successful conversions

## 🎛️ Usage Modes

### Silent Mode
If you don't want the extension to automatically popup:
1. Disable auto-detection: `"jsonstr.autoDetection": false`
2. Disable notifications: `"jsonstr.showNotifications": false`
3. Still can use shortcuts for manual conversion

### Preserve Format Mode
If your project has specific indentation standards:
1. Enable preserve indentation: `"jsonstr.preserveIndentation": true`
2. Extension will analyze and maintain original JSON indentation structure

### Standard Format Mode
If you want all JSON to use standard format:
1. Disable preserve indentation: `"jsonstr.preserveIndentation": false`
2. All converted JSON will use 2-space indentation

## 📋 Setting Methods

### Through Settings Interface
1. Press `Cmd+,` (Mac) or `Ctrl+,` (Windows/Linux) to open settings
2. Search for "jsonstr"
3. Find and modify related settings

### Through Command Palette
1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Enter "Preferences: Open Settings (JSON)"
3. Add configuration in settings.json

### Through Right-click Menu
- Right-click in editor and select "Toggle auto-detection mode"

For detailed settings instructions, please refer to [SETTINGS.md](./SETTINGS.md)

## License

MIT License
