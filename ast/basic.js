const esprima = require('esprima'); //解析js的语法的包
const estraverse = require('estraverse'); //遍历树的包
const escodegen = require('escodegen'); //生成新的树的包

let code = `function getAST(){}`;
//解析js的语法
let tree = esprima.parseScript(code);
//遍历树
estraverse.traverse(tree, {
  enter(node) {
    console.log('enter: ' + node.type);
  },
  leave(node) {
    console.log('leave: ' + node.type);
  }
});
//生成新的树
let r = escodegen.generate(tree);
console.log(r);