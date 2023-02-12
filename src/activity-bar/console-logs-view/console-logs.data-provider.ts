import * as vscode from 'vscode';
import * as fs from 'fs';


export class ConsoleLogItem extends vscode.TreeItem{

    contextValue: string = 'console logs';
    constructor(
        public readonly lineNumber:string,             
        public readonly command?: vscode.Command
    ){
        super(lineNumber, vscode.TreeItemCollapsibleState.None);    
        
    }
}

export class ParentFile extends vscode.TreeItem{
    contextValue: string = 'console logs';
    constructor(
        public readonly file:string,       
        public collapsibleState: vscode.TreeItemCollapsibleState        
    ){
        super(file, collapsibleState);    
        
    }
}

export class ConsoleLogsDataProvider implements vscode.TreeDataProvider<ConsoleLogItem | ParentFile>{

    private regex:RegExp;
    private _onDidChangeTreeData: vscode.EventEmitter<ConsoleLogItem | ParentFile | undefined | void> = new vscode.EventEmitter();
    readonly onDidChangeTreeData?: vscode.Event<void | ConsoleLogItem| ParentFile | ConsoleLogItem[] | null | undefined> = this._onDidChangeTreeData.event;

    mock:ParentFile[] = [];
    constructor(private workspaceRoot: string|undefined){
        this.regex = /(console.)+/g;
        fs.readdir(this.workspaceRoot!,(err, files)=>{
            files.forEach(file=>{
                this.mock.push(new ParentFile(file, vscode.TreeItemCollapsibleState.Collapsed));                
            });
            this.refresh();
        });
       
    }

    refresh():void{
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: ConsoleLogItem): vscode.TreeItem {
        return element;
    }   
    getChildren(element?: ConsoleLogItem | undefined): Thenable<ConsoleLogItem[] | ParentFile[]> {
        if(!this.workspaceRoot)
        {
            vscode.window.showInformationMessage(" No logs to display");
            return Promise.resolve([]);
        }

        if(element)
        {
            return this.getConsoleLog(element.label?.toString()!);
        }
        else
        {
            return Promise.resolve(this.mock);
        }


    }

    getConsoleLog(file:string)
    {   
        const documentData = fs.readFileSync(this.workspaceRoot+'\\'+file, "utf8");
        const regex = new RegExp(this.regex);
        const documentLines = documentData.split("\n");
        let items:ConsoleLogItem[] = [];

       documentLines.forEach((line,index)=>{
        if(line.match(regex))
        {
            items.push(new ConsoleLogItem(`Line ${index+1}`));
        }
       });

       return Promise.resolve(items);
    }
}