<template>
  <h1>{{ msg }}</h1>

  <p>hello,vite2!!!</p>
  <a href="https://vitejs.dev/">aaaaaaaa</a>

  <ul>
    <li v-for="c in courses" :key="c.id">{{ c.name }}</li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps, reactive } from "vue";

defineProps({
  msg: String,
});

const state = reactive({ count: 0 });

type Course = {
  id: number;
  name: string;
};
const courses = reactive<Course[]>([{ id: 1, name: "开课吧全栈架构师" }]);
</script>

<style scoped lang="scss">
$link-color: rgb(238, 94, 11);
a {
  color: $link-color;
}
</style>
