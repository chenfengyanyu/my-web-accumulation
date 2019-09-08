/* ============================================================
 * Pages Calendar JS
 * package metadata file for Meteor.js
 * ============================================================ */

'use strict';

var packageName = 'revox:pages-calendar';
var where = 'client'; // where to install: 'client' or 'server'. For both, pass nothing.

Package.describe({
    name: packageName,
    summary: 'Pages Calendar',
    version: "2.2.0", //packageJson.version,
    git: 'https://github.com/revoxltd/pages'
});

Package.onUse(function(api) {
    api.versionsFrom(['METEOR@0.9.0', 'METEOR@1.0','METEOR@1.2']);
    api.addFiles([
        'js/pages.calendar.min.js'], where);
});

Package.onTest(function(api) {
    api.use(packageName, where);
    api.use(['webapp'], where);
});