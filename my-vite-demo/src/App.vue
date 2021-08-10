<template>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <img alt="Vue logo" :src="logo" />
  <div :class="classes.logo"></div>
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <input type="text" placeholder="请输入用户名" />

  <label>{{ t("language") }}</label>
  <select v-model="locale">
    <option value="en">en</option>
    <option value="zh">zh</option>
  </select>
  <p>{{ t("hello") }}</p>
</template>

<script setup>
import HelloWorld from "comps/HelloWorld.vue";
// 解析为地址
import logo from "@/assets/logo.png";

// 加载模块化css
import classes from "./App.module.css";

import { getCurrentInstance, ref, computed } from "vue";

// 获取组件实例
const ins = getCurrentInstance();

function useI18n() {
  const locale = ref("zh");
  // 获取资源信息
  const i18n = ins.type.i18n;
  const t = (msg) => {
    return computed(() => i18n[locale.value][msg]).value;
  };
  return { locale, t };
}

const { locale, t } = useI18n();

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md

fetch("/api-dev/users")
  .then((res) => res.json())
  .then((users) => console.log(users));
</script>

<i18n>
{
  "en": {
    "language": "Language",
    "hello": "hello, world!"
  },
  "zh": {
    "language": "语言",
    "hello": "你好，世界！"
  }
}
</i18n>

<style scoped>
img {
  border: 1px solid black;
}
::placeholder {
  color: blue;
}
</style>
