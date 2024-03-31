// Copyright 2024 Muhwan Kim
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as vscode from 'vscode';
import OpenAI from "openai";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let channel = vscode.window.createOutputChannel("English Copilot");
	channel.appendLine("English Copilot activated")

	let disposable = vscode.commands.registerCommand('english-copilot.improve', async () => {
		// The code you place here will be executed every time your command is executed
		let config = vscode.workspace.getConfiguration('english-copilot');
		let openAiApiKey = config.get('openAiApiKey');
		if (!openAiApiKey) {
			vscode.window.showErrorMessage('Please set your OpenAI API key in the settings');
			return;
		}
		let openAiModelName = config.get('openAiModelName');
		const openai = new OpenAI({ apiKey: openAiApiKey as string });

		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			const selectedText = editor.document.getText(selection);
			console.log('Selected text:', selectedText);
			if (selectedText) {
				// Do something with the selected text
				const response = await openai.chat.completions.create({
					messages: [{
						role: "system",
						content: `
You are an English language assistant designed to help software engineers who find it challenging to write comments in English.
Your role is to assist them in improving the clarity and fluency of their comments.
When provided with a comment, your task is to translate or convert its contents into natural and fluent English.
Correct any grammatical errors and ensure that the output text uses commonly understood English terminology.
Only output the resulting text without any additional explanations or annotations.
It is crucial to maintain any indentations or special characters present in the input, as the output will replace the original comment in the code editor.
For example, if the input is a code comment, you must preserve the comment symbols and indentations in the output.
Remember, the output should be formatted in a way that allows it to seamlessly replace the original text without requiring any further modifications.
Additionally, do not add code block annotations like backticks, even if the input is a code block.

The input is:
${selectedText}
`,
					}],
					model: openAiModelName as string,
				})

				console.log(response);

				const result = response.choices[0].message.content;
				if (result) {
					editor.edit(editBuilder => {
						editBuilder.replace(selection, result);
					});
				}
			}
			else {
				vscode.window.showErrorMessage('No text selected');
			}
		} else {
			vscode.window.showErrorMessage('No active text editor');
		}
	});



	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
