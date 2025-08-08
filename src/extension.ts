import * as vscode from 'vscode';
import { HelloWorldPannel } from "./HelloWorldPanel";
import { isJsonified, isStringLiteral, isStringLiteralWithJson, jsonify, dejsonify, formatJsonWithIndentation } from './json-utils';

export function activate(context: vscode.ExtensionContext) {

	// 获取设置
	const getConfig = () => vscode.workspace.getConfiguration('jsonstr');
	const getAutoDetection = () => getConfig().get<boolean>('autoDetection', true);
	const getPreserveIndentation = () => getConfig().get<boolean>('preserveIndentation', true);
	const getShowNotifications = () => getConfig().get<boolean>('showNotifications', true);

	// 插件启动提示
	if (getShowNotifications()) {
		const autoDetectionStatus = getAutoDetection() ? 'enabled' : 'disabled';
		vscode.window.showInformationMessage(
			`JSON Converter extension activated! Auto-detection: ${autoDetectionStatus}, Shortcut: Cmd+Shift+T`, 
			'OK'
		);
	}

	// 监听文本选择变化
	let selectionChangeDisposable: vscode.Disposable | undefined;
	let lastSelectedText = '';
	let isProcessing = false;
	let debounceTimer: NodeJS.Timeout | undefined;

	// 当编辑器激活时开始监听
	const startSelectionListener = () => {
		if (selectionChangeDisposable) {
			selectionChangeDisposable.dispose();
		}

		selectionChangeDisposable = vscode.window.onDidChangeTextEditorSelection(async (event) => {
			// 简单去抖，降低频繁选区变动的触发频率
			if (debounceTimer) {
				clearTimeout(debounceTimer);
			}
			debounceTimer = setTimeout(async () => {
			// 检查是否启用自动检测
			if (!getAutoDetection()) {
				return;
			}

			if (isProcessing) return; // 防止重复处理

			const editor = event.textEditor;
			const selection = event.selections[0]; // 获取第一个选择

			if (!selection || selection.isEmpty) {
				lastSelectedText = '';
				return;
			}

			const selectedText = editor.document.getText(selection);
			const trimmedText = selectedText.trim();

			// 如果选中的文本没有变化，不重复处理
			if (trimmedText === lastSelectedText) {
				return;
			}

			lastSelectedText = trimmedText;

			// 如果选中的文本太短，不处理
			if (trimmedText.length < 8) {
				return;
			}

			// 检测是否为字符串字面量
			const isString = isStringLiteral(trimmedText);

			if (isString) {
				// 检查字符串字面量是否包含JSON内容
				const hasJsonContent = isStringLiteralWithJson(trimmedText);

				if (hasJsonContent) {
					isProcessing = true;
					
					const action = await vscode.window.showInformationMessage(
						`Detected JSON content in string (${trimmedText.length} chars), convert to formatted JSON?`,
						'Convert to JSON',
						'Ignore'
					);

					if (action === 'Convert to JSON') {
						try {
							// 解析字符串字面量，然后解析其中的JSON内容
							const parsedString = JSON.parse(trimmedText);
							const parsedJson = JSON.parse(parsedString);
							
							// 使用保持缩进的格式化
							const preserveIndent = getPreserveIndentation();
							const formattedJson = preserveIndent 
								? formatJsonWithIndentation(JSON.stringify(parsedJson), true)
								: jsonify(parsedJson, 2);
							
							await editor.edit(editBuilder => {
								editBuilder.replace(selection, formattedJson);
							});
							
							if (getShowNotifications()) {
								vscode.window.showInformationMessage(`🎉 Conversion completed! JSON in string converted to formatted JSON`, 'Great');
							}
						} catch (error) {
							const errorMessage = error instanceof Error ? error.message : 'Unknown error';
							vscode.window.showErrorMessage(`❌ Conversion failed: ${errorMessage}`);
						}
					}
					
					isProcessing = false;
				}
			} else {
				// 检测是否为JSON
				const isJson = isJsonified(trimmedText);

				if (isJson) {
					isProcessing = true;
					
					// 只询问是否转换为字符串化的JSON
					const action = await vscode.window.showInformationMessage(
						`Detected JSON format text (${trimmedText.length} chars), convert to string?`,
						'Convert to String',
						'Ignore'
					);

					if (action === 'Convert to String') {
						try {
							// 先解析JSON，压缩为一行，然后转换为字符串字面量
							const parsed = dejsonify(trimmedText);
							const compressedJson = jsonify(parsed); // 压缩为一行
							const stringLiteral = JSON.stringify(compressedJson); // 添加引号和转义
							
							await editor.edit(editBuilder => {
								editBuilder.replace(selection, stringLiteral);
							});
							
							// 成功转换提示
							if (getShowNotifications()) {
								vscode.window.showInformationMessage(`🎉 Conversion successful! JSON converted to string literal`, 'Great');
							}
						} catch (error) {
							const errorMessage = error instanceof Error ? error.message : 'Unknown error';
							vscode.window.showErrorMessage(`❌ Conversion failed: ${errorMessage}`);
						}
					}
					
					isProcessing = false;
				} else {
					// 如果不是JSON，尝试解析为JSON对象
					try {
						const parsed = JSON.parse(trimmedText);
						
						isProcessing = true;
						const action = await vscode.window.showInformationMessage(
							`Detected JSON object (${trimmedText.length} chars), convert to string?`,
							'Convert to String',
							'Ignore'
						);

						if (action === 'Convert to String') {
							try {
								const result = JSON.stringify(trimmedText);
								
								await editor.edit(editBuilder => {
									editBuilder.replace(selection, result);
								});
								
								if (getShowNotifications()) {
									vscode.window.showInformationMessage(`🎉 Conversion completed! JSON object converted to string`, 'Great');
								}
							} catch (error) {
								const errorMessage = error instanceof Error ? error.message : 'Unknown error';
								vscode.window.showErrorMessage(`❌ Conversion failed: ${errorMessage}`);
							}
						}
						
						isProcessing = false;
					} catch (error) {
						// 无法解析为JSON，忽略
					}
				}
			}
			}, 200);

		});
	};

	// 当窗口激活时开始监听
	startSelectionListener();

	// 当编辑器变化时重新开始监听
	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(() => {
			startSelectionListener();
		})
	);

	// 清理函数
	context.subscriptions.push({
		dispose: () => {
			if (selectionChangeDisposable) {
				selectionChangeDisposable.dispose();
			}
		}
	});

	// 统一转换命令（快捷键触发）
	context.subscriptions.push(
		vscode.commands.registerCommand('jsonstr.checkSelectedText', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}

			const selection = editor.selection;
			const selectedText = editor.document.getText(selection);
			const trimmedText = selectedText.trim();

			if (!trimmedText || trimmedText.length < 3) {
				return;
			}

			try {
				// 检测是否为字符串字面量
				const isString = isStringLiteral(trimmedText);
				
				if (isString) {
					// 检查字符串字面量是否包含JSON内容
					const hasJsonContent = isStringLiteralWithJson(trimmedText);
					
					if (hasJsonContent) {
						// 解析字符串字面量，然后解析其中的JSON内容
						const parsedString = JSON.parse(trimmedText);
						const parsedJson = JSON.parse(parsedString);
						
						// 使用保持缩进的格式化
						const preserveIndent = getPreserveIndentation();
						const formattedJson = preserveIndent 
							? formatJsonWithIndentation(JSON.stringify(parsedJson), true)
							: jsonify(parsedJson, 2);
						
						await editor.edit(editBuilder => {
							editBuilder.replace(selection, formattedJson);
						});
						
						if (getShowNotifications()) {
							vscode.window.showInformationMessage('✅ Shortcut conversion successful: String → Formatted JSON', 'OK');
						}
					}
				} else {
					// 检测是否为JSON
					const isJson = isJsonified(trimmedText);
					
					if (isJson) {
						// 先解析JSON，压缩为一行，然后转换为字符串字面量
						const parsed = dejsonify(trimmedText);
						const compressedJson = jsonify(parsed);
						const stringLiteral = JSON.stringify(compressedJson);
						
						await editor.edit(editBuilder => {
							editBuilder.replace(selection, stringLiteral);
						});
						
						if (getShowNotifications()) {
							vscode.window.showInformationMessage('✅ Shortcut conversion successful: JSON → String literal', 'OK');
						}
					} else {
						// 尝试解析为JSON对象
						try {
							const parsed = JSON.parse(trimmedText);
							
							const result = JSON.stringify(trimmedText);
							
							await editor.edit(editBuilder => {
								editBuilder.replace(selection, result);
							});
							
							if (getShowNotifications()) {
								vscode.window.showInformationMessage('✅ Shortcut conversion successful: JSON object → String', 'OK');
							}
						} catch (error) {
							// 无法解析为JSON
						}
					}
				}
			} catch (error) {
				// 转换失败
			}
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('jsonstr.helloWorld', () => {
			HelloWorldPannel.createOrShow(context.extensionUri);
	}));

	context.subscriptions.push(
		vscode.commands.registerCommand('jsonstr.askQuestion', async () => {
			const answer = await vscode.window.showInformationMessage('How was your day', 'good', "bad", 'neutral');
			// console.log(answer);

			if (answer === "bad") {
				vscode.window.showInformationMessage('I am sorry to hear that');
			} else if (answer === "good") {
				vscode.window.setStatusBarMessage('Good to hear!', 3000);
			} else if (answer === "neutral") {
				vscode.window.showInformationMessage('Whatever');
			}
		})
	);

	// 添加测试命令
	context.subscriptions.push(
		vscode.commands.registerCommand('jsonstr.test', () => {
			vscode.window.showInformationMessage('Extension test command working!');
		})
	);

	// 添加切换自动检测命令
	context.subscriptions.push(
		vscode.commands.registerCommand('jsonstr.toggleAutoDetection', async () => {
			const config = getConfig();
			const currentValue = getAutoDetection();
			const newValue = !currentValue;
			
			await config.update('autoDetection', newValue, vscode.ConfigurationTarget.Global);
			
			const status = newValue ? 'enabled' : 'disabled';
			vscode.window.showInformationMessage(`Auto-detection mode ${status}`, 'OK');
		})
	);
}

// This method is called when your extension is deactivated
export function deactivate() {
	vscode.window.showInformationMessage('JSON Converter extension deactivated', 'OK');
}


