// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { registerConsoleWarningCodeLens } from './providers/ConsoleWarning/registerConsoleWarning';
import { ConsoleLogsDataProvider } from './activity-bar/console-logs-view/console-logs.data-provider';



let disposable: vscode.Disposable[] = [];

export function activate(context: vscode.ExtensionContext) {

	const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
		? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;

	registerConsoleWarningCodeLens();

	const consoleLogsProvider = new ConsoleLogsDataProvider(rootPath);
	vscode.window.registerTreeDataProvider('console-logs',consoleLogsProvider);
}


export function deactivate() {}
