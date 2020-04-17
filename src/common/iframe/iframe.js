const css = `
    .note-content{
        height: 100%;
        width: 100%;
    }

    [contenteditable][placeholder]:empty:before {
        content: attr(placeholder);
        position: absolute;
        color: gray;
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
    }

    .save{
        cursor: pointer;
        display: none;
    }

    .save.show{
        display: block;
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