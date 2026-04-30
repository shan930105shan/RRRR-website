<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isMenuOpen = ref(false);
const isScrolledPastHero = ref(false); // 控制圓球顯示的開關

// 精準偵測：當 aboutus 進入視線時才啟動圓球
const handleScroll = () => {
  const aboutSection = document.getElementById('aboutus');
  if (aboutSection) {
    const rect = aboutSection.getBoundingClientRect();
    // 當 aboutus 頂端距離視窗頂部小於 80px (即 Navbar 高度) 時開啟
    isScrolledPastHero.value = rect.top <= 80;
  }
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// 捲動邏輯
const scrollToSection = (id: string) => {
  isMenuOpen.value = false;

  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const element = document.getElementById(id);
  if (element) {
    const offset = 80; 
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // 初始偵測一次
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const navItems = [
  { name: '關於我們', id: 'aboutus' },
  { name: '作品介紹', id: 'work-introduction' },
  { name: '前導片', id: 'teaser-video' },
  { name: '周邊', id: 'goods' },
  { name: '贊助夥伴', id: 'sponsor' },
  { name: '指導老師', id: 'advisor' },
];

// 🌸 產生飄浮圓球資料
const TOTAL_BUBBLES = 6; 
const bubbles = Array.from({ length: TOTAL_BUBBLES }).map((_, i) => ({
  id: i,
  size: Math.random() * 3 + 10 + 'px', 
  top: '40%',
  delay: `${i * 0.8}s`, // 遞增延遲創造序列感
  duration: Math.random() * 10 + 0.8 + 's', 
  opacity: 1
}));
</script>

<template>
  <nav class="navbar" :class="{ 'is-open': isMenuOpen }">
    
    <Transition name="bubble-fade">
      <div v-if="isScrolledPastHero && !isMenuOpen" class="bubble-container md:hidden">
        <div 
          v-for="b in bubbles" 
          :key="b.id" 
          class="bubble"
          :style="{ 
            width: b.size, 
            height: b.size, 
            top: b.top, 
            left: '-40px',
            animationDelay: b.delay,
            animationDuration: b.duration,
            opacity: b.opacity
          }"
        ></div>
      </div>
    </Transition>

    <div class="navbar-container">
      
      <div class="logo" @click="scrollToSection('top')">
        <img src="@/assets/logo.png" alt="Logo" class="h-10 md:h-15 cursor-pointer" />
      </div>

      <ul class="nav-links hidden md:flex">
        <li v-for="item in navItems" :key="item.id" @click="scrollToSection(item.id)" class="nav-item">
          {{ item.name }}
        </li>
      </ul>

      <button @click="toggleMenu" class="hamburger md:hidden">
        <div class="hamburger-box">
          <span :class="['line', isMenuOpen ? 'rotate-45 translate-y-2' : '']"></span>
          <span :class="['line', isMenuOpen ? 'opacity-0' : '']"></span>
          <span :class="['line', isMenuOpen ? '-rotate-45 -translate-y-2' : '']"></span>
        </div>
      </button>

      <Transition name="menu-fade">
        <div v-if="isMenuOpen" class="mobile-menu md:hidden">
          <ul class="mobile-nav-links">
            <li v-for="item in navItems" :key="item.id" @click="scrollToSection(item.id)" class="mobile-nav-item">
              {{ item.name }}
            </li>
          </ul>
        </div>
      </Transition>

    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 1000;
  transition: background-color 0.3s ease;
  background-color: transparent;
  overflow: hidden; 
}

/* 🌸 圓球容器 */
.bubble-container {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.bubble {
  position: absolute;
  background-color: #ec4899;
  border-radius: 50%;
  filter: none;
  animation: float-wave-smooth infinite linear;
}

/* 🌊 絲滑流暢版波浪動畫 */
@keyframes float-wave-smooth {
  0% { transform: translateX(0) translateY(0); }
  20% { transform: translateX(20vw) translateY(-12px); }
  40% { transform: translateX(40vw) translateY(12px); }
  60% { transform: translateX(60vw) translateY(-12px); }
  80% { transform: translateX(80vw) translateY(12px); }
  100% { transform: translateX(calc(100vw + 60px)) translateY(0); }
}

/* 圓球淡入淡出動畫 */
.bubble-fade-enter-active,
.bubble-fade-leave-active {
  transition: opacity 0.5s ease;
}
.bubble-fade-enter-from,
.bubble-fade-leave-to {
  opacity: 0;
}

@media (min-width: 1024px) {
  .navbar {
    background-color: rgba(255, 255, 255, 1);
    backdrop-filter: blur(10px);
    padding: 0 50px;
    overflow: visible; 
  }
}

.navbar.is-open {
  background-color: white !important;
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  position: relative;
  z-index: 10;
}

.nav-links {
  list-style: none;
  gap: 30px;
}

.nav-item {
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  transition: color 0.3s;
}

.nav-item:hover {
  color: #ec4899;
}

.hamburger {
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1100;
  padding: 10px;
}

.hamburger-box {
  width: 24px;
  height: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.line {
  width: 100%;
  height: 2px;
  background-color: black;
  transition: all 0.3s ease;
}

.mobile-menu {
  position: fixed;
  top: 80px; 
  left: 0;
  width: 100%;
  height: calc(100vh - 80px);
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.mobile-nav-links {
  list-style: none;
  text-align: center;
  padding: 0;
}

.mobile-nav-item {
  font-size: 24px;
  font-weight: 900;
  margin: 25px 0;
  cursor: pointer;
}

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.3s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}
</style>