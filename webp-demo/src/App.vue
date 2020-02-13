<template>
  <div id="app">
    <picture>
      <source type="image/webp" srcset="./assets/logo.webp">
      <img src="./assets/logo.png" alt="jartto’s demo">
    </picture>
    <div>{{supportFlag}}</div>
    <HelloWorld msg="Welcome to Jartto's WebP Demo"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Common from './lib/common'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data: ()=> {
    return {
      supportFlag: ''
    }
  },
  mounted() {
    this.checkSupport();
  },
  methods: {
    checkSupport: function() {
      let self = this;
      Common.checkWebpFeature('lossy', (feature, isSupported) => {
        // console.log('>>>>>>>>>>>>',self);
          if (isSupported) {
            self.supportFlag = '当前浏览器支持 WebP 格式！';
          } else {
            self.supportFlag = 'Sorry，当前浏览器不支持 WebP 格式';
          }
      });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
