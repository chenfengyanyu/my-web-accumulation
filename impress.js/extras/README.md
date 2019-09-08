Extra (but standard) addons for Impress.js
==========================================

This is a collection of JavaScript libraries commonly used in
[Impress.js](https://github.com/impress/impress.js) presentations. 


More precisely, they are called "Extra addons" in impress.js. They are assumed to be available in
an impress.js repo, but are not loaded by default, rather a presentation would add a `<script>` tag
when it wants to use an extra addon.

In an impress.js repo, these addons will be found in the `extras/` directory. Typically you will
get them as a git submodule, but simply copying the contents of this repo is fine too.

This repo is only used to collect together the set of libraries we want to use as impress.js extra
addons. The files you find, are the released "dist" files of each project. There's no development
happening in this repo. Libraries are updated as needed, there's no goal of updating to every latest
version released.