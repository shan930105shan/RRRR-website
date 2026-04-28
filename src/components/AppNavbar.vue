<template>
  <nav class="navbar">
    <div class="logo">
      <img src="@/assets/logo.png" alt="Logo" class="h-15" />
    </div>
    <ul class="nav-links">
      <li @click="scrollToSection('aboutus')" class="nav-item">關於我們</li>
      <li @click="scrollToSection('work-introduction')" class="nav-item">作品介紹</li>
      <li @click="scrollToSection('teaser-video')" class="nav-item">前導片</li>
      <li @click="scrollToSection('goods')" class="nav-item">周邊</li>
      <li @click="scrollToSection('sponsor')" class="nav-item">贊助夥伴</li>
      <li @click="scrollToSection('advisor')" class="nav-item">指導老師</li>
    </ul>
  </nav>
</template>

<script setup>
const scrollToSection = (id) => {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const element = document.getElementById(id);
  if (element) {
    // 取得目標元素位置
    const offset = 80; // 這裡是你的 Navbar 高度
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    // 平滑捲動
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};
</script>

<style scoped>
.navbar {
  position: fixed; /* 固定在最上方 */
  top: 0;
  left: 0;
  width: 100%;
  height: 80px; /* 根據設計稿高度調整 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  background-color: white; /* 確保背景是不透明的白色 */
  z-index: 1000; /* 確保它在影片之上 */
}

.nav-links {
  cursor: pointer;
  display: flex;
  list-style: none;
  gap: 30px; /* 選單之間的距離 */
}
</style>