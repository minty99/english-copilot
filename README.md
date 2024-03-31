# English Copilot

English Copilot is a VS Code extension designed to assist software engineers in writing clear and fluent comments in English. It leverages LLMs to improve the readability and grammatical correctness of your code comments.

## How to use

1. Select a block of text containing the comment you want to improve.
2. Open the Command Palette in VS Code (Ctrl+Shift+P or Cmd+Shift+P).
3. Select the "English Copilot: Improve Selected Block" command.
4. The extension will process the selected comment and replace it with the improved version.

## Requirements

To use English Copilot, you need to have an OpenAI API key. Sign up for an API key at [OpenAI](https://www.openai.com/) and configure it in the extension settings.

## Extension Settings

English Copilot contributes the following settings:

* `english-copilot.openAiApiKey`: Set your OpenAI API key here to enable the extension's functionality.
* `english-copilot.openAiModelName`: Specify the name of the language model to use. Default is set to 'gpt-4'.

## Release Notes

### 0.1.0

- Initial release of English Copilot
- Basic comment translation and grammatical error correction functionality

**Enjoy using English Copilot to enhance your code comments!**
