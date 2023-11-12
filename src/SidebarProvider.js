// import * as vscode from "vscode"
const vscode = require("vscode");
const fs = require("fs");

class SidebarProvider {
  constructor(_extensionUri) {
    this._extensionUri = _extensionUri;
  }

  resolveWebviewView(webviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
  }

  revive(panel) {
    this._view = panel;
  }

  _getHtmlForWebview(webview) {
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media/css", "reset.css")
    );
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media/css", "vscode.css")
    );
    const styleCustomUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media/css", "custom.css")
    );

    var html = fs.readFileSync(
      vscode.Uri.joinPath(this._extensionUri, "media/html", "index.html")
        .fsPath,
      "utf-8"
    );

    return html
      .replace("${webview.cspSource}", webview.cspSource)
      .replace("${styleResetUri}", styleResetUri)
      .replace("${styleVSCodeUri}", styleVSCodeUri)
      .replace("${styleCustomUri}", styleCustomUri);
  }
}

module.exports = SidebarProvider;
