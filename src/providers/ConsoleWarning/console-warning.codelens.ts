import * as vscode from 'vscode';
import { ConsoleWarningCommands } from './constants';
import { EXTENSION_NAME } from '../../constants/extension.constants';

export class ConsoleWarningProvider implements vscode.CodeLensProvider{

    private regex:RegExp;
    private codeLenses: vscode.CodeLens[]=[];
    private _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
    public readonly onDidChangeCodeLenses?: vscode.Event<void> = this._onDidChangeCodeLenses.event;
    constructor(){
        this.regex = /(console.)+/g;

        vscode.workspace.onDidChangeConfiguration((_)=>{
            this._onDidChangeCodeLenses.fire();
        });
    }

    public provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.ProviderResult<vscode.CodeLens[]> {
        
        if(vscode.workspace.getConfiguration(EXTENSION_NAME).get(ConsoleWarningCommands.ENABLE_CODELENS, true)){
            this.codeLenses = [];
            const regex = new RegExp(this.regex);
            const content = document.getText();
            let matches;

            while((matches = regex.exec(content))!==null){
                const line = document.lineAt(document.positionAt(matches.index).line);
                const indexOf = line.text.indexOf(matches[0]);
                const position = new vscode.Position(line.lineNumber, indexOf);
                const range = document.getWordRangeAtPosition(position, new RegExp(this.regex));

                if(range){
                    this.codeLenses.push(new vscode.CodeLens(range));
                }
            }

            return this.codeLenses;
        }

        return [];
    }

    public resolveCodeLens(codeLens: vscode.CodeLens, token: vscode.CancellationToken): vscode.ProviderResult<vscode.CodeLens> {
        if(vscode.workspace.getConfiguration(EXTENSION_NAME).get(ConsoleWarningCommands.ENABLE_CODELENS, true)){
            codeLens.command={
                title:"Remove console.logs before putting a PR",
                command: `${EXTENSION_NAME}.${ConsoleWarningCommands.CONSOLE_WARNING_ACTION}`,                
            }
        }
        return null;
    }
}