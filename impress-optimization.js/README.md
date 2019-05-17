impressiv.js
============

impressiv.js is node.js app that allows you to host your impress.js
presentation to an online audience.

It uses:

* node.js
* express.js
* socket.io
* impress.js
* markdown


HOW TO USE IT
---------------
### Presentations
Add your impress.js presentation in the /views/presentations directory as jade files. You should only include the body. Have a look at sample.jade for an example.

### Routes
The are three different routes depending on the viewing mode. 

* /view/{presi} - normal viewing mode, ie, standard impress.js
* /host/{presi} - page for the presenter. Use it the same way as you use
  impress.js. It connects to the node.js server over websockets to
progress the slide for the audience. (It uses basic authetication.)
* /live/{presi} - view for the audience.

Replace "{presi}" with the name of your jade file without the
extension (e.g. sample). 

### Configuration
All over the place at the moment.

* host password - app.js (line 44)
* hostname - change them in audience\_socket.js and host\_socket.js

ABOUT THE NAME
----------------

It is based to on impress.js so...

VERSION HISTORY
-----------------

See the first release
[video](http://www.youtube.com/watch?v=c5fKlqcEcOo).

First release.

Just scrambled together...  works but needs work.

LICENSE
---------

Copyright 2012 David Bankier. Released under MIT License.

