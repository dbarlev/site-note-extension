const css = `
    .note-content{
        height: 100%;
        width: 100%;
    }

    [contenteditable][placeholder]:empty:before {
        content: attr(placeholder);
        position: absolute;
        color: #000000a6;
        background-color: transparent;
    }

    .textarea{
        word-break: break-word;
        outline: none;
        cursor: text;
    }

    .note-container{
        display: grid;
        height: 100%;
        grid-template-rows: 4fr 0.6fr;
    }

    .footer{
        text-align: center;
        background: rgb(255, 223, 165) !important;
        position: fixed;
        width: 100%;
        bottom: 0;
        height: 31px;
    }

    .show .edit-icons{
        display: none;
    }

    .edit-icons{
        display: block;
        font-size: 12px;
        margin-top: 5px;
        cursor: pointer;
    }

    .icon-container{
        margin-right: 10px;
    }

    .icon-container.remove:hover{
        color: #e60606;
    }

    .icon-container.color:hover{
        color: #0089ff;
    }

    .icon-container span{
        font-size: 10px;
    }

    .save{
        cursor: pointer;
        font-size: 12px;
        display: none;
    }

    .save.show{
        display: block;
        margin-top: 5px;
    }

    .chooseColorContainer.show{
        display: block;
    }

    .chooseColorContainer{
        display: none;
    }

    .chooseColor{
        display: inline-block;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        margin-right: 10px;
        cursor: pointer;
    }
`;

module.exports = class Iframe {

    constructor(id, className) {
        this.id = id;
        this.className = className;
        this.iframeContainer;
        this.iframe;
        this.iframeDocument;
        this.init();
    }

    init() {
        this.create();
    }

    create() {
        this.iframeContainer = document.createElement("div");
        this.iframeContainer.id = this.id;
        this.iframeContainer.classList.add(this.className);

        this.constructIframeHeader();
        this.iframe = document.createElement("iframe");

        this.iframeContainer.append(this.iframe);
        document.body.append(this.iframeContainer);
        this.iframe.onload = this.onIframeLoad();
    }

    constructIframeHeader() {
        const html = `
            <div class="siteNote-header">
                <div class="note-logo">
                    <div class="note-sublogo">
                
                    </div>
                </div>
                <div class="note-headerText">Site Note</div>
            </div>
        `;
        this.iframeContainer.innerHTML += html;
    }

    onIframeLoad() {
        this.iframeDocument = this.iframe.contentWindow.document;
        const fontawesome = `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css`;
        const linkCss = `<link rel="stylesheet" type="text/css" href="${fontawesome}">`;
        this.iframeDocument.head.innerHTML += `<style>${css}</style>`;
        this.iframeDocument.head.innerHTML += linkCss;
    }

    addHtml(html) {
        this.iframeDocument.body.innerHTML += html;
    }

    addStyle() {

    }
}