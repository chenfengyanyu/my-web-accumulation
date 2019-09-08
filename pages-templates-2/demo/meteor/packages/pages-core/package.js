/* ============================================================
 * Pages Core JS
 * package metadata file for Meteor.js
 * Contribution : Jan @mediatainment
 * ============================================================ */

'use strict';

var packageName = 'revox:pages-core';
var where = 'client'; // where to install: 'client' or 'server'. For both, pass nothing.

Package.describe({
    name: packageName,
    summary: 'Pages Core',
    version: "3.0.0", //packageJson.version,
    git: 'https://github.com/revoxltd/pages'
});

Package.onUse((api) => {
    api.versionsFrom(['METEOR@0.9.0', 'METEOR@1.0','METEOR@1.2','METEOR@1.5']);
    api.use(['kadira:blaze-layout',
        'kadira:flow-router',
        'zimme:active-route',
        'less',
        'fourseven:scss',
        'abpetkov:switchery',
        'rgnevashev:select2',
        'summernote:summernote',
        'vansonhk:bootstrap3-datepicker',
        'gilbertwat:bootstrap3-daterangepicker',
        'rcy:nouislider',
        'postrednik:meteor-rangeslider',
        'themeteorchef:jquery-validation',
        'ryanswapp:interactjs',
        'isotope:isotope',
        'iamkevingreen:imagesloaded',
        'snamoah:bootstrap-wizard',
        'coursierprive:tether',
        'momentjs:moment',
        ], where);
    api.addFiles([
        'js/pages.min.js'], where);
});