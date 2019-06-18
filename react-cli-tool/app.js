'use strict';

require("@babel/register")({
    presets: ["@babel/preset-env", "@babel/preset-react"]
});

require('import-jsx')('./demo/figlet');