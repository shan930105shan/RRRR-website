<script setup>
import AppNavbar from './components/AppNavbar.vue' // 引入你的導覽列零件
</script>

<template>
  <AppNavbar />

  <RouterView />
</template>

<style>
/* 這裡可以放全域樣式，例如把 body 的 margin 清空 */
body {
  margin: 0;
  background-color: white;
}
/* 當 body 被鎖定滾動時（Modal 開啟時），隱藏 Navbar */
body[style*="overflow: hidden"] nav, 
body[style*="overflow: hidden"] .navbar{
  display: none;
}
</style>