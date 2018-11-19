const babel = require('babel-core'); //babel核心解析库
const t = require('babel-types'); //babel类型转化库

let code = `let sum = (a, b)=>{return a+b}`;
let ArrowPlugins = {
  //访问者模式
  visitor: {
    //捕获匹配的API
    ArrowFunctionExpression(path) {
      let {
        node
      } = path;
      let body = node.body;
      let params = node.params;
      let r = t.functionExpression(null, params, body, false, false);
      path.replaceWith(r);
    }
  }
}
let d = babel.transform(code, {
  plugins: [
    ArrowPlugins
  ]
})
console.log(d.code);