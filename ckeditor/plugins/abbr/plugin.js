CKEDITOR.plugins.add('abbr', {
  icons: 'abbr',
  onLoad: function() {
    // CKEDITOR.addCss(
    //   'p:first-child {' +
    //       'border-top: solid 2px green' +
    //   '}' +
    //   'p:last-child {' +
    //       'border-bottom: solid 2px green' +
    //   '}'
    // );
  },
  init: function (editor) {
    // Plugin logic goes here...
    editor.addCommand('abbr',new CKEDITOR.dialogCommand('abbrDialog',
      {
        allowedContent: 'abbr[title,id]'
      }
    ));

    editor.ui.addButton('Abbr', {
      label: 'Insert Abbreviation',
      command: 'abbr',
      toolbar: 'insert,0'
    });

    CKEDITOR.dialog.add('abbrDialog', this.path + 'dialogs/abbr.js');

    // 引入样式
    // var pluginDirectory = this.path;
    // editor.addContentsCss( pluginDirectory + 'styles/example.css' );

    if ( editor.contextMenu ) {
      editor.addMenuGroup( 'abbrGroup' );
      editor.addMenuItem( 'abbrItem', {
        label: 'Edit Abbreviation',
        icon: this.path + 'icons/abbr.png',
        command: 'abbr',
        group: 'abbrGroup'
      });

      editor.contextMenu.addListener( function( element ) {
        if ( element.getAscendant( 'abbr', true ) ) {
          return { abbrItem: CKEDITOR.TRISTATE_OFF };
        }
      });
    }
  }
});
