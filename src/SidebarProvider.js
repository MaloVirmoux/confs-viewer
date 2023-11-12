// import * as vscode from "vscode"
const vscode = require("vscode")

class SidebarProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri
    }

    resolveWebviewView(webviewView) {
        this._view = webviewView

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        }

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview)
    }

    revive(panel) {
        this._view = panel
    }

    _getHtmlForWebview(webview) {
        const styleResetUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, "media", "reset.css")
        )
        const styleVSCodeUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css")
        )
        const styleCustomUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, "media", "custom.css")
        )

        return `<!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <!--
                            Use a content security policy to only allow loading images from https or from our extension directory,
                            and only allow scripts that have a specific nonce.
                            -->
                        <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource}; script-src;">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link href="${styleResetUri}" rel="stylesheet">
                        <link href="${styleVSCodeUri}" rel="stylesheet">
                        <link href="${styleCustomUri}" rel="stylesheet">
                    </head>
                    <body>
                        <form action="" method="get" class="env-form">
                            <label class="env-form-radio">
                                <input type="radio" name="env" id="dev-radio" required />
                                dev
                            </label>
                            <label class="env-form-radio">
                                <input type="radio" name="env" id="ppd-radio"/>
                                ppd
                            </label>
                            <label class="env-form-radio">
                                <input type="radio" name="env" id="prd-radio"/>
                                prd
                            </label>
                        </form>
                    </body>
                </html>`
    }
}

module.exports = SidebarProvider