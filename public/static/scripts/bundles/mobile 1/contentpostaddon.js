$(document).ready(function () {
    var editor = Jodit.make('#area_editor', {
        textIcons: false,
        toolbarButtonSize: 'large',
        toolbarinline: false,
        toolbarSticky: true,
        toolbarStickyOffset: 570,
        height: 'auto',
        inline: true,
        statusbar: false,
        minHeight: 500,
        defaultMode: Jodit.MODE_WYSIWYG,
        history: {
            timeout: 100
        },
        commandToHotkeys: {
            openreplacedialog: 'ctrl+p'
        }
    });
});
