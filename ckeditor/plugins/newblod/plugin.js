CKEDITOR.plugins.add('newblod', {
  icons: 'newblod',
  init: function (editor) {
    editor.addCommand('resetBlod', {
      exec: function (editor) {
        var _target = editor.getSelection();
        var _selected = _target.getSelectedText(); 
        var context = _target.getStartElement().$.textContent;
        var start = _target.getRanges()[0].startOffset;
        var end = _target.getRanges()[0].endOffset;
        var parent = _target.getStartElement().getParent();

        // var arrs = ['_before','_middle','_after'];

        var _before = new CKEDITOR.dom.element('str');
        var _middle = new CKEDITOR.dom.element('str');
        var _after = new CKEDITOR.dom.element('str');

        _middle.setAttributes({'font-weight': 'bold'})
        _middle.setText(_selected);

        console.log(start,end,context,parent);

        if(!start || start === 0) {
          _after.setText(context.replace(_selected,''));
          editor.insertElement(_middle);
        } else {
          _before.setText(context.substring(0,start));
          _after.setText(context.substring(end));
          editor.insertElement(_middle);
        }
      }
    });

    editor.ui.addButton('Newblod', {
      label: '字体加粗',
      command: 'resetBlod',
      toolbar: 'insert,0'
    });
  }
});