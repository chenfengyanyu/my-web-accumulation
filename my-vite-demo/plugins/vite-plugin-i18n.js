export default {
  // 将load进来的代码块进一步加工处理
  // code是快的内容
  // id是请求的url
  transform(code, id) {
    // i18n信息写入组件配置
    if (!/vue&type=i18n/.test(id)) {
      return;
    }
    return `export default Comp => {
      Comp.i18n = ${code}
    }`;
  },
};
