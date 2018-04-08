CKEDITOR.plugins.add('abbr', {
  icons: 'abbr',
  init: function (editor) {
    // Plugin logic goes here...
    editor.addCommand('abbr',new CKEDITOR.dialogCommand('abbrDialog'));

    editor.ui.addButton('Abbr', {
      label: 'Insert Abbreviation',
      command: 'abbr',
      toolbar: 'insert,0'
    });

    CKEDITOR.dialog.add('abbrDialog', this.path + 'dialogs/abbr.js');
  }
});
