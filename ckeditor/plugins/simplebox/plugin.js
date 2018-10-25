CKEDITOR.plugins.add('simplebox', {
  // Simple Box widget code.
  requires: 'widget',
  icons: 'simplebox',
  init: function (editor) {
    // Plugin logic goes here...
    editor.widgets.add('simplebox', {
      button: 'Create a simple box',
      template: '<div class="simplebox">' +
        '<h2 class="simplebox-title">Title</h2>' +
        '<div class="simplebox-content"><p>Content...</p></div>' +
        '</div>',
      editables: {
        title: {
          selector: '.simplebox-title',
          allowedContent: 'br strong em'
        },
        content: {
          selector: '.simplebox-content',
          allowedContent: 'p br ul ol li strong em'
        }
      },
      allowedContent: 'div(!simplebox,align-left,align-right,align-center){width};' +
        'div(!simplebox); div(!simplebox-content); h2(!simplebox-title)',
      requiredContent: 'div(simplebox)',
      dialog: 'simplebox',
      upcast: function (element) {
        return element.name == 'div' && element.hasClass('simplebox');
      },
      init: function () {
        var width = this.element.getStyle('width');
        if (width)
          this.setData('width', width);
        if (this.element.hasClass('align-left'))
          this.setData('align', 'left');
        if (this.element.hasClass('align-right'))
          this.setData('align', 'right');
        if (this.element.hasClass('align-center'))
          this.setData('align', 'center');
      },

      data: function () {

        if (this.data.width == '')
          this.element.removeStyle('width');
        else
          this.element.setStyle('width', this.data.width);

        this.element.removeClass('align-left');
        this.element.removeClass('align-right');
        this.element.removeClass('align-center');
        if (this.data.align)
          this.element.addClass('align-' + this.data.align);
      }
    });

    CKEDITOR.dialog.add('simplebox', this.path + 'dialogs/simplebox.js');
  }
});