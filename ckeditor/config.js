/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
  // config.uiColor = '#66AB16';
  // config.readOnly = true;
  config.extraPlugins = 'mathjax,timestamp,abbr,contextmenu,simplebox,newblod,easyimage';
  config.mathJaxLib = '//cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_HTML';
  config.extraAllowedContent = 'str[font-weight]';
  config.cloudServices_tokenUrl = 'https://16319.cke-cs.com/token/dev/PHE4JzvHCrdHd68h1cQWwjHJOyxLlZzA4RzCamQaMYlEHy26GKtXOlwkuRVl',
  // config.cloudServices_uploadUrl = 'https://16319.cke-cs.com/easyimage/upload/'
  config.cloudServices_uploadUrl = "http://127.0.0.1:6688/collector/ckeditor_upload"
};
