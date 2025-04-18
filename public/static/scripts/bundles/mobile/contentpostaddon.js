$(document).ready(function () {
    var editor = Jodit.make('#area_editor', {
        textIcons: false,
        toolbarButtonSize: 'small',
        toolbarinline: false,
        toolbarSticky: true,
        height: 'auto',
        inline: true,
        statusbar: false,
        minHeight: 100,
        defaultMode: Jodit.MODE_WYSIWYG,
        history: {
            timeout: 100
        },
        commandToHotkeys: {
            openreplacedialog: 'ctrl+p'
        }
    });
});
