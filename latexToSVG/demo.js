/*
 * @Author: Jartto
 * @Date: 2021-06-18 14:09:37
 * @LastEditTime: 2021-06-18 14:11:58
 */
// import * as texsvg from 'texsvg';
const texsvg = require("texsvg");

const quadraticFormula = "x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}";

texsvg(quadraticFormula)
  .then(svg => console.log(svg))
  .catch(err => console.error(err));
