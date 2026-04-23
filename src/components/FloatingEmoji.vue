<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

interface Props {
  activeIndex: number;
}
const props = defineProps<Props>();

// ==========================================
// 1. 圖片資源
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
// 3. 躲避邏輯
// ==========================================
const isScared = ref(false);
const scaredPosition = ref({ top: '50%', left: '50%', rotate: '0deg' });

const handleMouseEnter = () => {
  if (isScared.value) return; // 避免冷卻期間重複觸發

  isScared.value = true;

  // 隨機產生一個躲避位置 (範圍限制在 20%-80% 以免飛出視窗)
  const randomTop = Math.floor(Math.random() * 60 + 20) + '%';
  const randomLeft = Math.floor(Math.random() * 60 + 20) + '%';
  const randomRotate = Math.floor(Math.random() * 720 - 360) + 'deg'; // 旋轉圈數多一點

  scaredPosition.value = { 
    top: randomTop, 
    left: randomLeft, 
    rotate: randomRotate 
  };

  // 1.5 秒後恢復冷靜，回到捲動位置
  setTimeout(() => {
    isScared.value = false;
  }, 1500);
};

// ==========================================
// 4. 飛行位置邏輯 (整合捲動與躲避)
// ==========================================
const emojiPositionStyle = computed(() => {
  if (isScared.value) {
    return {
      top: scaredPosition.value.top,
      left: scaredPosition.value.left,
      transform: `translate(-50%, -50%) rotate(${scaredPosition.value.rotate}) scale(1.3)`,
      position: 'fixed' as const,
      zIndex: 9999
    };
  }

  interface Position {
    top: string;
    left: string;
    rotate: string;
  }

  const positions: Position[] = [
    { top: '20%', left: '80%', rotate: '0deg' },   // Section 0
    { top: '50%', left: '10%', rotate: '15deg' },  // Section 1
    { top: '80%', left: '70%', rotate: '-10deg' }, // Section 2
    { top: '40%', left: '30%', rotate: '180deg' }, // Section 3
    { top: '70%', left: '20%', rotate: '45deg' },  // Section 4
    { top: '30%', left: '60%', rotate: '-45deg' }, // Section 5
    { top: '60%', left: '10%', rotate: '90deg' },  // Section 6
    { top: '50%', left: '80%', rotate: '270deg' }, // Section 7
    { top: '20%', left: '50%', rotate: '30deg' },  // Section 8
    { top: '80%', left: '80%', rotate: '-30deg' }, // Section 9
  ];

  const pos = (positions[props.activeIndex] || positions[0]) as Position;

  return {
    top: pos.top,
    left: pos.left,
    transform: `translate(-50%, -50%) rotate(${pos.rotate}) scale(1)`,
    position: 'fixed' as const,
    zIndex: 9999
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
    class="fixed z-[9999] cursor-help transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] w-24 h-24 md:w-32 md:h-32 pointer-events-auto"
    :style="emojiPositionStyle"
    @mouseenter="handleMouseEnter"
  >
    <div class="relative w-full h-full bg-transparent flex items-center justify-center overflow-hidden pointer-events-none">
      <Transition name="emoji-fade" mode="out-in">
        <img 
          :key="currentFaceIndex"
          :src="faceImages[currentFaceIndex]" 
          class="w-[100%] h-[100%] object-contain"
        />
      </Transition>
    </div>
    
    <div class="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-black rounded-full animate-bounce pointer-events-none"></div>
  </div>
</template>

<style scoped>
.emoji-fade-enter-active,
.emoji-fade-leave-active {
  transition: opacity 0.2s ease;
}

.emoji-fade-enter-from,
.emoji-fade-leave-to {
  opacity: 0;
}

@keyframes float {
  0%, 100% { margin-top: 0px; }
  50% { margin-top: -15px; }
}

/* 這裡是外層容器的漂浮動畫 */
.fixed {
  animation: float 3s ease-in-out infinite;
  /* 確保 transition 包含所有屬性，讓移動變平滑 */
  transition-property: top, left, transform;
}
</style>