// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { registerConsoleWarningCodeLens } from './providers/ConsoleWarning/registerConsoleWarning';



let disposable: vscode.Disposable[] = [];

export function activate(context: vscode.ExtensionContext) {

	registerConsoleWarningCodeLens();
}


export function deactivate() {}
