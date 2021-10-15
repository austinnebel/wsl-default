// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    var wslExt = vscode.extensions.getExtension("ms-vscode-remote.remote-wsl");

    // do nothing if there is no workspace or if wsl is not available
    if (vscode.workspace.workspaceFolders == undefined || wslExt == undefined) {
        return;
    }

    // if wsl is active, immediately reload window
    if (wslExt.isActive == false) {
        // is the ext loaded and ready?
        wslExt.activate().then(
            function () {
                console.log("Activating WSL.");
                vscode.commands.executeCommand("remote-wsl.reopenInWSL");
            },
            function () {
                console.log("Could not activate WSL.");
            }
        );
    } else {
        vscode.commands.executeCommand("remote-wsl.reopenInWSL");
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
