// 定义散列表
let graph = new Map();
graph.set('you', ['alice', 'bob', 'claire']);
graph.set('bob', ['anuj', 'peggy']);
graph.set('alice', ['peggy']);
graph.set('claire', ['thom', 'jonny']);
graph.set('anuj', []);
graph.set('peggy', []);
graph.set('thom', []);
graph.set('jonny', []);


function search(name) {
  let queue = [];
  let searched = [];
  queue = queue.concat(graph.get(name));

  while (queue.length > 0) {
    person = queue.shift();
    if (!searched.includes(person)) {
      if (isSeller(person)) {
        console.log(`${person} is a mango seller`);
        return true;
      } else {
        queue = queue.concat(graph.get(person));
        searched.push(person);
      }
    }
  }
  return false;
}

// 检查人的姓名是否以m结尾：如果是，他就是芒果销售商。
function isSeller(name) {
  return name[name.length-1] == 'm';
}

search('you');