# JSON Converter Extension Settings Guide

## Configuration Options

### 1. Auto-detection Mode (jsonstr.autoDetection)
- **Type**: Boolean
- **Default**: `true`
- **Description**: Enable automatic JSON format detection (auto-popup when text is selected)

**Usage**:
- Search for "jsonstr.autoDetection" in VS Code settings
- Or right-click menu to select "Toggle auto-detection mode"

### 2. Preserve Indentation Format (jsonstr.preserveIndentation)
- **Type**: Boolean
- **Default**: `true`
- **Description**: Preserve original indentation format

**Function**:
- When enabled, converted JSON will maintain original indentation structure
- When disabled, use standard 2-space indentation

### 3. Show Notification Messages (jsonstr.showNotifications)
- **Type**: Boolean
- **Default**: `true`
- **Description**: Show notification messages for successful conversions

**Function**:
- When enabled, show notification messages after successful conversion
- When disabled, conversion process runs silently without notifications

## Setting Methods

### Method 1: Through Settings Interface
1. Press `Cmd+,` (Mac) or `Ctrl+,` (Windows/Linux) to open settings
2. Search for "jsonstr"
3. Find and modify related settings

### Method 2: Through Command Palette
1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Enter "Preferences: Open Settings (JSON)"
3. Add configuration in settings.json:

```json
{
  "jsonstr.autoDetection": true,
  "jsonstr.preserveIndentation": true,
  "jsonstr.showNotifications": true
}
```

### Method 3: Through Right-click Menu
- Right-click in editor and select "Toggle auto-detection mode"

## Usage Scenarios

### Scenario 1: Silent Mode
If you don't want the extension to automatically popup:
1. Disable auto-detection: `"jsonstr.autoDetection": false`
2. Disable notifications: `"jsonstr.showNotifications": false`
3. Still can use shortcut `Cmd+Shift+T` for manual conversion

### Scenario 2: Preserve Original Format
If your project has specific indentation standards:
1. Enable preserve indentation: `"jsonstr.preserveIndentation": true`
2. Extension will analyze and maintain original JSON indentation structure

### Scenario 3: Standard Formatting
If you want all JSON to use standard format:
1. Disable preserve indentation: `"jsonstr.preserveIndentation": false`
2. All converted JSON will use 2-space indentation

## Shortcuts

- **Convert JSON**: `Cmd+Shift+T` (Mac) or `Ctrl+Shift+T` (Windows/Linux)
- Shortcuts work normally regardless of auto-detection settings

## Troubleshooting

### Problem 1: Settings not taking effect
**Solution**:
1. Reload VS Code window (`Cmd+R`)
2. Check if settings are saved correctly
3. View extension logs in output panel

### Problem 2: Incorrect indentation
**Solution**:
1. Check `jsonstr.preserveIndentation` setting
2. Ensure original JSON format is correct
3. Try disabling preserve indentation, use standard formatting

### Problem 3: Too many notification messages
**Solution**:
1. Disable `jsonstr.showNotifications`
2. Disable `jsonstr.autoDetection`
3. Only use shortcuts for manual conversion 