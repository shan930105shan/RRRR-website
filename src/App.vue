<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppNavbar from './components/AppNavbar.vue';
</script>

<template>
  <div class="main-layout">
    <AppNavbar />
    <RouterView />
  </div>
</template>

<style>
/* --- 全域樣式 --- */
html,body {
  margin: 0;
  background-color: white;
  font-family: "Zalando Sans", "Noto Sans TC", sans-serif;
  /* 🚩 建議加入這一行，確保 RWD 物件出界時不會導致手機版左右晃動 */
  overflow-x: hidden; 
  width: 100%;
  max-width: 100vw;
  /* 🚩 防止內容撐開網頁寬度，徹底消除白邊 */
  overflow-x: hidden; 
  /* 🚩 防止手機瀏覽器預設的彈性滾動導致白邊出現 */
  position: relative;
  margin: 0;
  padding: 0;
}

/* 當 Modal 開啟時隱藏 Navbar（保留你原本的邏輯） */
body[style*="overflow: hidden"] nav, 
body[style*="overflow: hidden"] .navbar {
  display: none !important;
}



/* 移除所有 .mobile-blocker 相關樣式 */
/* 移除所有 @media (max-width: 1023px) 裡面的隱藏邏輯 */
</style>