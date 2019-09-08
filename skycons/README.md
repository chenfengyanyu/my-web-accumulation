### skycons 实现的“天气板块”示例

#### 一、demo 演示
![demo 演示](https://github.com/chenfengyanyu/my-web-accumulation/blob/master/images/weather.gif)

#### 二、简单示例
首先，添加 `canvas`，并设置 `id`，以备后续使用，宽高可以随意设置，如下:
```html
<canvas id="jartto" width="128" height="128"></canvas>
```

其次，我们实例化 `Skycons`：
```js
let skycons = new Skycons({'color': 'pink'});
```

然后，在我们的元素上通过 `canvas id` 来添加动画，并选择[动画类型](#animateType)：
```js
skycons.add('jartto', Skycons.PARTLY_CLOUDY_DAY);
```

最后，别忘了：
```js
skycons.play();
```

{% alert info %}
通过调用 skycons.play() 来播放动画。
{% endalert %}

这样，一个简单的示例就完成了，是不是很简单呢？下面我们来看看参数详解。

#### 三、<a name="animateType">参数详解</a>
可设置的天气类型参数：
- CLEAR_DAY
- PARTLY_CLOUDY_DAY
- CLOUDY
- RAIN
- SLEET
- SNOW
- WIND
- FOG

添加动画：
```js
// 通过 canvas
skycons.add('jartto1', Skycons.PARTLY_CLOUDY_DAY);
// 通过 元素 id
skycons.add(document.getElementById('jartto2'), Skycons.PARTLY_CLOUDY_DAY);
```
播放动画：
```js
skycons.play();
```
暂停动画：
```js
skycons.pause()
```
动态更改 icon ：
```js
skycons.set('jartto1', Skycons.PARTLY_CLOUDY_NIGHT);
```
移除动画：
```js
skycons.remove('jartto2');
```
#### 四、详细介绍
[有趣的动态天气图标插件](http://jartto.wang/2017/04/10/funny-plugin-for-dynamic-weather/)

