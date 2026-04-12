<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'; // 移除了 watch

interface Props {
  activeIndex: number;
}
const props = defineProps<Props>();

// ==========================================
// 1. 圖片資源 (請確保圖片路徑正確)
// ==========================================
import face1 from '@/assets/emoji/face1.png'; 
import face2 from '@/assets/emoji/face2.png';
import face3 from '@/assets/emoji/face3.png';

const faceImages = [face1, face2, face3]; 

// ==========================================
// 2. 隨機換臉邏輯
// ==========================================
const currentFaceIndex = ref(0);
let faceTimer: number | undefined = undefined;

const swapFace = () => {
  if (faceImages.length <= 1) return;
  let nextIndex: number;
  do {
    nextIndex = Math.floor(Math.random() * faceImages.length);
  } while (nextIndex === currentFaceIndex.value);
  currentFaceIndex.value = nextIndex;
};

// ==========================================
// 3. 飛行位置邏輯 (強型別修正)
// ==========================================
const emojiPositionStyle = computed(() => {
  interface Position {
    top: string;
    left: string;
    rotate: string;
  }

  const positions: Position[] = [
    { top: '20%', left: '80%', rotate: '0deg' },   // Section 0
    { top: '50%', left: '10%', rotate: '15deg' },  // Section 1
    { top: '80%', left: '70%', rotate: '-10deg' }, // Section 2
    { top: '40%', left: '40%', rotate: '180deg' }, // Section 3
    { top: '70%', left: '20%', rotate: '45deg' },  // Section 4
  ];

  // 使用「as Position」強行告訴 TS：這絕對就是 Position 型別，別擔心！
  const pos = (positions[props.activeIndex] || positions[0]) as Position;

  return {
    top: pos.top,
    left: pos.left,
    transform: `translate(-50%, -50%) rotate(${pos.rotate})`,
    position: 'fixed' as const
  };
});

onMounted(() => {
  faceTimer = window.setInterval(swapFace, 1000);
});

onUnmounted(() => {
  if (faceTimer !== undefined) clearInterval(faceTimer);
});
</script>

<template>
  <div 
    class="fixed z-[9999] pointer-events-none transition-all duration-1000 ease-in-out w-24 h-24 md:w-32 md:h-32"
    :style="emojiPositionStyle"
  >
    <div class="relative w-full h-full bg-transparent flex items-center justify-center overflow-hidden">
      <Transition name="emoji-fade" mode="out-in">
        <img 
          :key="currentFaceIndex"
          :src="faceImages[currentFaceIndex]" 
          class="w-[100%] h-[100%] object-contain"
        />
      </Transition>
    </div>
    
    <div class="absolute -top-2 -right-2 w-6 h-6 bg-black-400 border-2 border-black rounded-full animate-bounce"></div>
  </div>
</template>

<style scoped>
/* 圖片切換的淡入淡出效果 */
.emoji-fade-enter-active,
.emoji-fade-leave-active {
  transition: all 0s ease;
}

.emoji-fade-enter-from {
  opacity: 0;
}

.emoji-fade-leave-to {
  opacity: 0;
}

/* 讓容器有一點點漂浮的感覺 */
@keyframes float {
  0%, 100% { margin-top: 0px; }
  50% { margin-top: -10px; }
}

.fixed {
  animation: float 3s ease-in-out infinite;
}
</style>