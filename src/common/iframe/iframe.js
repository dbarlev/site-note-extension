const css = `
    .note-content{
        display: grid;
        grid-template-columns: 4fr 0.6fr;
        height: 100%;
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

    .note-sidebar{
        display: grid;
        grid-template-rows: 1fr 1fr 1fr;
        margin: 5px;
    }

    i{
        font-size: 25px;
        color: #0870b9;
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

        this.headerElement = document.createElement("div");
        this.headerElement.classList.add("siteNote-header");

        this.iframe = document.createElement("iframe");
        this.iframeContainer.append(this.headerElement);
        this.iframeContainer.append(this.iframe);
        document.body.append(this.iframeContainer);
        this.iframe.onload = this.onIframeLoad();
    }

    onIframeLoad() {
        this.iframeDocument = this.iframe.contentWindow.document;
        const fontawesome = `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css`;
        const linkCss = `<link rel="stylesheet" type="text/css" href="${fontawesome}">`;
        this.iframeDocument.head.innerHTML += `<style>${css}</style>`;
        this.iframeDocument.head.innerHTML += linkCss;
    }

    bindEvent() {

    }

    addHtml(html) {
        this.iframeDocument.body.innerHTML += html;
    }

    addStyle() {

    }
}