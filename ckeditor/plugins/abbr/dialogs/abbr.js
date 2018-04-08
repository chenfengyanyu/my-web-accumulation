CKEDITOR.dialog.add( 'abbrDialog', function ( editor ) {
  return {
    title: 'Abbreviation Properties',
      minWidth: 400,
      minHeight: 200,
      contents: [
        {
          id: 'tab-basic',
          label: 'Basic Settings',
          elements: [
            {
              type: 'text',
              id: 'abbr',
              label: 'Abbreviation',
              validate: CKEDITOR.dialog.validate.notEmpty( "Abbreviation field cannot be empty." )
            },
            {
              type: 'text',
              id: 'title',
              label: 'Explanation',
              validate: CKEDITOR.dialog.validate.notEmpty( "Explanation field cannot be empty." )
            }
          ]
        },
        {
          id: 'tab-adv',
          label: 'Advanced Settings',
          elements: [
            {
              type: 'text',
              id: 'id',
              label: 'Id'
            }
          ]
        }
    ],
    onOk: function() {
      var dialog = this;

      var abbr = editor.document.createElement( 'abbr' );
      abbr.setAttribute( 'title', dialog.getValueOf( 'tab-basic', 'title' ) );
      abbr.setText( dialog.getValueOf( 'tab-basic', 'abbr' ) );

      var id = dialog.getValueOf( 'tab-adv', 'id' );
      if ( id )
          abbr.setAttribute( 'id', id );

      editor.insertElement( abbr );
    }
  };
});