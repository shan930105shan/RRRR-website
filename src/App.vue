<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterView } from 'vue-router';
import AppNavbar from './components/AppNavbar.vue';

// ==========================================
// 1. 引入圖片資源
// ==========================================
import face1 from '@/assets/emoji/face1.png';
import face2 from '@/assets/emoji/face2.png';
import face3 from '@/assets/emoji/face3.png';

const faceImages = [face1, face2, face3];

// ==========================================
// 2. 換臉邏輯
// ==========================================
const currentFaceIndex = ref(0);
let faceTimer: number | undefined = undefined;

const swapFace = () => {
  let nextIndex: number;
  do {
    nextIndex = Math.floor(Math.random() * faceImages.length);
  } while (nextIndex === currentFaceIndex.value);
  currentFaceIndex.value = nextIndex;
};

onMounted(() => {
  // 每 1 秒換一次臉
  faceTimer = window.setInterval(swapFace, 1000);
});

onUnmounted(() => {
  if (faceTimer !== undefined) clearInterval(faceTimer);
});
</script>

<template>
  <div class="mobile-blocker">
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
      <p>為了確保最佳觀賞體驗，<br>請先使用電腦瀏覽器觀賞喲!</p>
    </div>
  </div>

  <div class="main-layout">
    <AppNavbar />
    <RouterView />
  </div>
</template>

<style scoped>
/* 擋板基本樣式 */
.mobile-blocker {
  display: none;
  position: fixed;
  inset: 0;
  background-color: white;
  z-index: 99999;
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

/* Emoji 容器樣式 */
.emoji-container {
  width: 150px; /* 手機版建議尺寸 */
  height: 150px;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.emoji-img {
  width: 100%;
  height: 100%;
  object-contain: contain;
}

.mobile-blocker h1 {
  font-size: 1.4rem;
  font-weight: 900;
  margin-bottom: 1rem;
}

.mobile-blocker p {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
}

/* 換臉時的淡入淡出動畫 */
.face-fade-enter-active,
.face-fade-leave-active {
  transition: opacity 0s ease;
}
.face-fade-enter-from,
.face-fade-leave-to {
  opacity: 0;
}

/* 響應式判斷 */
@media (max-width: 1023px) {
  .mobile-blocker {
    display: flex;
  }
  .main-layout {
    display: none;
  }
}
</style>