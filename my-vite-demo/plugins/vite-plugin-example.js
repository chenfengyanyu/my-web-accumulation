export default function (options) {
  return {
    name: "my-example",
    resolveId(source) {
      // 是否处理当前请求
      if (source === "virtual-module") {
        return source; // 表示接管
      }
      return null;
    },
    load(id) {
      // 返回加载模块代码
      return 'export default "this is virtaul!"';
    },
  };
}
