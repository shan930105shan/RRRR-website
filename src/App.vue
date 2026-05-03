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
/* 只有當 body 真的有 .modal-open 這個類別時，才隱藏 Navbar */
body.modal-open nav, 
body.modal-open .navbar {
  display: none !important;
}

html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden; /* 保持這個，防止白邊 */
  background-color: white;
  font-family: "Zalando Sans", "Noto Sans TC", sans-serif;
  position: relative;
}

</style>