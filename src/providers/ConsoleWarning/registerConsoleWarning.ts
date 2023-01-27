import * as vscode from 'vscode';
import { ConsoleWarningProvider } from './console-warning.codelens';
import { ConsoleWarningCommands } from './constants';
import { EXTENSION_NAME } from '../../constants/extension.constants';

 export function registerConsoleWarningCodeLens(){
    const consoleWarnCodeLens = new ConsoleWarningProvider(); 
	
	vscode.languages.registerCodeLensProvider("typescript", consoleWarnCodeLens);

	vscode.commands.registerCommand(`${EXTENSION_NAME}.${ConsoleWarningCommands.ENABLE_CODELENS}`, ()=>{
		vscode.workspace.getConfiguration(EXTENSION_NAME).update('enableConsoleWarning', true, true);
	});

	vscode.commands.registerCommand(`${EXTENSION_NAME}.${ConsoleWarningCommands.DISABLE_CODELENS}`, ()=>{
		vscode.workspace.getConfiguration(EXTENSION_NAME).update('disableConsoleWarning', false, true);
	});

	vscode.commands.registerCommand(`${EXTENSION_NAME}.${ConsoleWarningCommands.CONSOLE_WARNING_ACTION}`, ()=>{
		vscode.window.showInformationMessage('Remove this statement before PR');
	});
 }