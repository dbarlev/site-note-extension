const footerIcons = `
    <div class="edit-icons">
        <span class="icon-container resize">
            <i class="fas fa-expand"></i>
            <span>RESIZE</span>
        </span>
        <span class="icon-container color">
            <i class="fas fa-paint-brush"></i>
            <span>COLOR</span>
        </span>
        <span class="icon-container remove">
            <i class="far fa-trash-alt"></i>
            <span>REMOVE</span>
        </span>
    </div>
`;

const chooseColor = `
    <div class="chooseColorContainer">
        <span class="chooseColor red" color="red"></span>
        <span class="chooseColor green" color="green"></span>
        <span class="chooseColor blue" color="blue"></span>
        <span class="chooseColor orange" color="orange"></span>
        <span class="chooseColor purple" color="purple"></span>
        <span class="chooseColor pink" color="pink"></span>
        <span class="chooseColor white" color="white"></span>
        <span class="chooseColor black" color="black"></span>
    </div>
`;

const saveText = `
    <div class="save">
        <i class="fas fa-check"></i>
        <span>SAVE</span>
    </div>
`;


module.exports = {
    footerIcons: footerIcons.trim(),
    saveText: saveText.trim(),
    chooseColor: chooseColor.trim()
};