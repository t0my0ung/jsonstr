/**
 * JSON工具函数
 * 提供JSON字符串化、反字符串化和验证功能
 */

/**
 * 分析JSON字符串的缩进结构
 * @param jsonString JSON字符串
 * @returns 缩进信息对象
 */
export function analyzeIndentation(jsonString: string): {
  baseIndent: string;
  indentSize: number;
  lines: string[];
} {
  const lines = jsonString.split('\n');
  const nonEmptyLines = lines.filter(line => line.trim().length > 0);
  
  if (nonEmptyLines.length === 0) {
    return { baseIndent: '', indentSize: 2, lines: [] };
  }
  
  // 找到第一个非空行的缩进
  const firstLine = nonEmptyLines[0];
  const baseIndent = firstLine.match(/^(\s*)/)?.[1] || '';
  
  // 计算缩进大小
  let indentSize = 2; // 默认值
  if (baseIndent.length > 0) {
    // 尝试检测缩进类型
    const nextLine = nonEmptyLines.find(line => line.length > baseIndent.length);
    if (nextLine) {
      const nextIndent = nextLine.match(/^(\s*)/)?.[1] || '';
      if (nextIndent.length > baseIndent.length) {
        indentSize = nextIndent.length - baseIndent.length;
      }
    }
  }
  
  return { baseIndent, indentSize, lines };
}

/**
 * 保持原有缩进的JSON格式化
 * @param jsonString JSON字符串
 * @param preserveIndent 是否保持原有缩进
 * @returns 格式化后的JSON字符串
 */
export function formatJsonWithIndentation(jsonString: string, preserveIndent: boolean = true): string {
  if (!preserveIndent) {
    return jsonify(JSON.parse(jsonString), 2);
  }
  
  try {
    const parsed = JSON.parse(jsonString);
    const { baseIndent, indentSize } = analyzeIndentation(jsonString);
    
    // 使用原有的缩进设置进行格式化
    return jsonify(parsed, indentSize);
  } catch {
    // 如果解析失败，使用默认格式化
    return jsonify(JSON.parse(jsonString), 2);
  }
}

/**
 * 将任意值转换为JSON字符串
 * @param value 要转换的值
 * @param space 缩进空格数（可选）
 * @returns JSON字符串
 */
export function jsonify<T>(value: T, space?: number): string {
  try {
    return JSON.stringify(value, null, space);
  } catch (error) {
    throw new Error(`JSON序列化失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

/**
 * 将JSON字符串解析为原始值
 * @param jsonString JSON字符串
 * @returns 解析后的值
 */
export function dejsonify<T = any>(jsonString: string): T {
  if (typeof jsonString !== 'string') {
    throw new Error('输入必须是字符串');
  }
  
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    throw new Error(`JSON解析失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
}

/**
 * 检测字符串是否为有效的JSON格式（排除字符串字面量）
 * @param str 要检测的字符串
 * @returns 如果是有效的JSON格式返回true，否则返回false
 */
export function isJsonified(str: string): boolean {
  if (typeof str !== 'string') {
    return false;
  }
  
  const trimmed = str.trim();
  
  // 如果字符串以引号开始和结束，说明是字符串字面量，不是JSON
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return false;
  }
  
  try {
    JSON.parse(trimmed);
    return true;
  } catch {
    return false;
  }
}

/**
 * 检测字符串是否为字符串字面量（带引号的字符串）
 * @param str 要检测的字符串
 * @returns 如果是字符串字面量返回true，否则返回false
 */
export function isStringLiteral(str: string): boolean {
  if (typeof str !== 'string') {
    return false;
  }
  
  const trimmed = str.trim();
  
  // 检查是否以引号开始和结束
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return true;
  }
  
  return false;
}

/**
 * 检测字符串字面量是否包含JSON内容
 * @param str 要检测的字符串
 * @returns 如果字符串字面量包含有效的JSON内容返回true，否则返回false
 */
export function isStringLiteralWithJson(str: string): boolean {
  if (!isStringLiteral(str)) {
    return false;
  }
  
  try {
    // 解析字符串字面量
    const parsedString = JSON.parse(str);
    
    // 检查解析后的字符串是否包含JSON
    if (typeof parsedString === 'string') {
      try {
        JSON.parse(parsedString);
        return true;
      } catch {
        return false;
      }
    }
    
    return false;
  } catch {
    return false;
  }
}

/**
 * 安全地将字符串解析为JSON，失败时返回默认值
 * @param jsonString JSON字符串
 * @param defaultValue 解析失败时的默认值
 * @returns 解析后的值或默认值
 */
export function safeDejsonify<T = any>(jsonString: string, defaultValue: T): T {
  try {
    return dejsonify<T>(jsonString);
  } catch {
    return defaultValue;
  }
}

/**
 * 检测字符串是否为有效的JSON格式（带类型检查）
 * @param str 要检测的字符串
 * @param expectedType 期望的类型（可选）
 * @returns 对象包含是否有效和解析后的值
 */
export function validateJson<T = any>(str: string, expectedType?: 'object' | 'array' | 'string' | 'number' | 'boolean'): {
  isValid: boolean;
  value?: T;
  error?: string;
} {
  if (typeof str !== 'string') {
    return { isValid: false, error: '输入必须是字符串' };
  }
  
  try {
    const parsed = JSON.parse(str) as T;
    
    if (expectedType) {
      const actualType = Array.isArray(parsed) ? 'array' : typeof parsed;
      if (actualType !== expectedType) {
        return {
          isValid: false,
          error: `期望类型为 ${expectedType}，但实际类型为 ${actualType}`
        };
      }
    }
    
    return { isValid: true, value: parsed };
  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : 'JSON解析失败'
    };
  }
} 