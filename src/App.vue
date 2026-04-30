<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import AppNavbar from './components/AppNavbar.vue';

// 1. 引入 Emoji 圖片資源
import face1 from '@/assets/emoji/face1.png';
import face2 from '@/assets/emoji/face2.png';
import face3 from '@/assets/emoji/face3.png';

const route = useRoute();
const faceImages = [face1, face2, face3];

// ==========================================
// 2. 擋板與 Debug 顯示邏輯
// ==========================================
// 偵測網址是否有 ?debug=1
const isDebugMode = computed(() => {
  return route.query.debug === '1';
});

// 只有在「不是 Debug 模式」時才渲染擋板 HTML
const showBlocker = computed(() => {
  return !isDebugMode.value;
});

// ==========================================
// 3. 換臉計時器邏輯
// ==========================================
const currentFaceIndex = ref(0);
let faceTimer: number | any = undefined;

const swapFace = () => {
  let nextIndex: number;
  do {
    nextIndex = Math.floor(Math.random() * faceImages.length);
  } while (nextIndex === currentFaceIndex.value);
  currentFaceIndex.value = nextIndex;
};

onMounted(() => {
  faceTimer = setInterval(swapFace, 1000);
});

onUnmounted(() => {
  if (faceTimer) clearInterval(faceTimer);
});
</script>

<template>
  <div v-if="showBlocker" class="mobile-blocker">
    <div class="blocker-content">
      <div class="emoji-container">
        <transition name="face-fade" mode="out-in">
          <img 
            :key="currentFaceIndex" 
            :src="faceImages[currentFaceIndex]" 
            alt="Emoji" 
            class="emoji-img" 
          />
        </transition>
      </div>

      <h1>行動裝置版正在製作中 :RRRR</h1>
      <p>為了確保最佳觀賞體驗，<br>請先使用電腦瀏覽器觀賞喲！</p>
      
      <div v-if="isDebugMode" class="debug-hint">
        Debug 模式已開啟
      </div>
    </div>
  </div>

  <div class="main-layout" :class="{ 'debug-view': isDebugMode }">
    <AppNavbar />
    <RouterView />
  </div>
</template>

<style>
/* --- 全域樣式 --- */
body {
  margin: 0;
  background-color: white;
  font-family: "Zalando Sans", "Noto Sans TC", sans-serif;
}

/* 當 Modal 開啟時隱藏 Navbar */
body[style*="overflow: hidden"] nav, 
body[style*="overflow: hidden"] .navbar {
  display: none !important;
}

/* --- 擋板樣式 (Scoped 建議拿掉或改為全域確保層級) --- */
.mobile-blocker {
  display: none; /* 預設在電腦版隱藏 */
  position: fixed;
  inset: 0;
  background-color: white;
  z-index: 999999; /* 絕對最上層 */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

.blocker-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.emoji-container {
  width: 150px;
  height: 150px;
  margin-bottom: 2rem;
}

.emoji-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.mobile-blocker h1 {
  font-size: 1.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
  color: black;
}

.mobile-blocker p {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
}

/* 換臉動畫 */
.face-fade-enter-active,
.face-fade-leave-active {
  transition: opacity 0.15s ease;
}
.face-fade-enter-from,
.face-fade-leave-to {
  opacity: 0;
}

/* --- 響應式核心邏輯 --- */
@media (max-width: 1023px) {
  /* 手機版：顯示擋板，隱藏主內容 */
  .mobile-blocker {
    display: flex;
  }
  
  .main-layout {
    display: none;
  }

  /* 核心修正：如果是 Debug 模式，強制救回主內容 */
  .main-layout.debug-view {
    display: block !important;
  }
  
  /* 如果在 Debug 模式，也要強行關掉已經渲染出來的擋板 */
  .debug-view ~ .mobile-blocker,
  .main-layout.debug-view + .mobile-blocker {
    display: none !important;
  }
}
</style>