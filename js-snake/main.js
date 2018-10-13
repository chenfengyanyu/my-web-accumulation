var snake_body  // 蛇节数组，存储每个蛇节的位置
var direction   // 蛇当前移动的方向
var food_position   // 食物的位置，每次被蛇吃掉时更新

function init_snake() {
  // 数组中每一个值都是一个对象，里面存放了x、y轴的坐标位置和color颜色信息，red是蛇头
  snake_body = [{
    x: 40,
    y: 40,
    color: 'black'
  }, {
    x: 60,
    y: 40,
    color: 'black'
  }, {
    x: 80,
    y: 40,
    color: 'red'
  }]
  // 蛇开始默认向右边移动
  direction = 'right'
  // 食物开始位置
  food_position = {
    x: 260,
    y: 180
  }
}
// 调用蛇的初始化方法
init_snake()

// 游戏场景 init canvas
function init() {
  context.strokeStyle = '#EEEEEE'
  for(var i = 0; i < 500; i += 20) {
      // 画竖线
    context.moveTo(i, 0)
    context.lineTo(i, 500)
    // 画横线
    context.moveTo(0, i)
    context.lineTo(500, i)
  }
  context.stroke()
  // 因为游戏场景中默认会有一个食物，这个食物在随机位置生成
  context.fillStyle = 'black'
  context.fillRect(food_position.x, food_position.y, 20, 20)
}   

// 开始画蛇
// repaint snake fastival
function draw_snake() {
  var new_fastival = []
  for(var i = 0; i < snake_body.length; i++) {
      context.fillStyle = snake_body[i].color
      context.fillRect(snake_body[i].x, snake_body[i].y, 20, 20)
      new_fastival.push({
        x: snake_body[i].x,
        y: snake_body[i].y
      })
  }
  // 判断是否和食物发生碰撞
  eat_food()
  // 判断是否死亡
  dead(new_fastival)
}

/**
 * 监听键盘点击事件，根据keycode修改direction方向变量
 * left 37
 * right 39
 * top 38
 * bottom 40
 */
window.addEventListener('keydown', function(e) {
  if(e.keyCode == 37) {
    if(direction != 'right') {
          direction = 'left'
    }
  } else if(e.keyCode == 39) {
    if(direction != 'left') {
          direction = 'right'
    }
  } else if(e.keyCode == 38) {
    if(direction != 'bottom') {
        direction = 'top'
    }
  } else if(e.keyCode == 40) {
    if(direction != 'top') {
          direction = 'bottom'
    }
  }
})

/**
 * 蛇的移动方法
 * 通过将后一位数组的值赋值给前一位，最后将snake_body蛇节数组中最后一个元素的x或y值加上一个蛇节的宽度，
 * 如果是left方向，x-=20，right方向x+=20，top方向y-=20，bottom方向y+=20。
 */
function move_snake() {
  var x = 0, y = 0
  // 对方向作判断
  if(direction == 'right') {
    x = 20
  } else if(direction == 'left') {
    x = -20
  } else if(direction == 'top') {
    y = -20
  } else if(direction == 'bottom') {
    y = 20
  }
  for(var i = 0; i < snake_body.length - 1; i++) {
    snake_body[i].x = snake_body[i + 1].x
    snake_body[i].y = snake_body[i + 1].y
  }
  snake_body[snake_body.length - 1].x += x
  snake_body[snake_body.length - 1].y += y
}

// 判断食物是否被吃掉
function eat_food() {
  // 如果蛇节数组中最后一个对象的x、y值等于食物的x、y值，那么这个食物将会被蛇吃掉
  if(snake_body[snake_body.length - 1].x == food_position.x && snake_body[snake_body.length - 1].y == food_position.y) {
    // 再次生产食物
    random_food()
    // 蛇在吃掉食物之后将会添加一个蛇节
    add_snake_fastival()
  }
}

// 食物在被吃掉之后，位置将随机生产
// 随机生产食物位置的方法
function random_food() {
  food_position = {
      // ~~ 是位运算取整算法，比Math.floor()这个方法效率高
    x: ~~(Math.random() * (500 / 20)) * 20,
    y: ~~(Math.random() * (500 / 20)) * 20
  }
}

// 为蛇添加一个蛇节
function add_snake_fastival() {
  // 新蛇节
  new_fastival = {
    x: snake_body[0].x - 20,
    y: snake_body[0].y - 20,
    color: 'black'
  }
  // 在全局数组中的头部添加
  snake_body.unshift(new_fastival)
}

// 判断蛇是否死掉，蛇在撞墙或者撞自己都会死掉
function dead(new_fastival) {
  var last_fastival = snake_body[snake_body.length - 1]
  // 判断是否撞墙
  if(last_fastival.x == -20 || last_fastival.x == 500 || last_fastival.y == -20 || last_fastival.y == 500) {
    alert("重新开始游戏")
    init_snake()
  }
  // 判断是否自残
  for(var i = 0; i < new_fastival.length; i++) {
    for(var j = i + 1; j < new_fastival.length; j++) {
          if(new_fastival[i].x == new_fastival[j].x && new_fastival[i].y == new_fastival[j].y) {
            alert("重新开始游戏")
            init_snake()
          }
    }
  }
}
