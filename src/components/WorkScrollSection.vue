<script setup lang="ts">
import { ref, computed } from 'vue';
import tagLineImg from '@/assets/tags/tagLine.png';

const totalWorks = 19;
const currentIndex = ref(0);

// 1. 作品資料
const works = Array.from({ length: totalWorks }, (_, i) => ({
  id: i + 1,
  title: `Project ${String(i + 1).padStart(2, '0')}`,
  img: new URL(`../assets/work${i + 1}.jpg`, import.meta.url).href 
}));

// 2. 標籤座標與圖片配置 (請根據 Figma 數值填入)
// 這裡展示前幾組，你可以繼續補完到 19 組
const tagConfigs = [
  { id: 1,  top: '20px',  left: '10%' },
  { id: 2,  top: '25px',  left: '15%' },
  { id: 3,  top: '20px',  left: '20%' },
  { id: 4,  top: '25px',  left: '25%' },
  { id: 5,  top: '20px',  left: '32%' },
  { id: 6,  top: '25px',  left: '37%' },
  { id: 7,  top: '20px',  left: '42%' },
  { id: 8,  top: '25px',  left: '47%' },
  { id: 9,  top: '20px',  left: '54%' },
  { id: 10, top: '25px',  left: '59%' },
  { id: 11, top: '20px',  left: '64%' },
  { id: 12, top: '25px',  left: '69%' },
  { id: 13, top: '100px',  left: '45%' },
  { id: 14, top: '105px',  left: '50%' },
  { id: 15, top: '100px',  left: '55%' },
  { id: 16, top: '105px',  left: '60%' },
  { id: 17, top: '100px',  left: '68%' },
  { id: 18, top: '105px',  left: '73%' },
  { id: 19, top: '100px',  left: '78%' },
];

// 動態取得標籤圖片路徑 (tag1Normal.png, tag1Active.png ...)
const getTagImg = (id: number, isActive: boolean) => {
  const status = isActive ? 'Active' : 'Normal';
  // 確保路徑與你 assets 資料夾一致
  return new URL(`../assets/tags/tag${id}${status}.png`, import.meta.url).href;
};

// --- 無限切換邏輯 ---
const nextWork = () => {
  currentIndex.value = (currentIndex.value + 1) % totalWorks;
};

const prevWork = () => {
  currentIndex.value = (currentIndex.value - 1 + totalWorks) % totalWorks;
};

const selectWork = (index: number) => {
  currentIndex.value = index;
};

// 3. 計算目前應該顯示的 5 組索引 (處理無限循環)
const visibleIndices = computed(() => {
  const indices = [];
  for (let i = -2; i <= 2; i++) {
    indices.push((currentIndex.value + i + totalWorks) % totalWorks);
  }
  return indices;
});
</script>

<template>
  <section class="w-full py-20 bg-white overflow-hidden relative">
    
    <div class="relative w-full h-[180px] mb-12 max-w-[1400px] mx-auto">

      <img 
        :src="tagLineImg" 
        class="absolute bottom-7 left-33 w-[58%] h-full object-contain z-10 pointer-events-none opacity-100"
        alt="tag-decoration-line"
      />

      <button 
        v-for="(config, index) in tagConfigs" 
        :key="config.id"
        @click="selectWork(index)"
        class="absolute transform -translate-x-1/2 transition-all duration-300 hover:scale-110 z-10"
        :style="{ top: config.top, left: config.left }"
      >
        <img 
          :src="getTagImg(config.id, currentIndex === index)" 
          class="w-14 h-14 object-contain" 
        />
      </button>

      </div>

    <div class="relative flex items-center justify-center w-full min-h-[500px] px-4">
      
      <button @click="prevWork" class="absolute left-4 md:left-8 z-40 bg-black text-white w-12 h-12 rounded-full shadow-lg hover:bg-gray-800 transition-colors">
        ←
      </button>

      <div class="flex items-center justify-center gap-2 md:gap-6 w-full max-w-[1600px]">
        <div 
          v-for="(work, index) in works" 
          :key="work.id"
          v-show="visibleIndices.includes(index)"
          class="transition-all duration-700 ease-in-out flex-shrink-0 cursor-pointer"
          :class="[
            currentIndex === index 
              ? 'w-[280px] md:w-[420px] z-30 scale-100 opacity-100 mx-4' 
              : visibleIndices.indexOf(index) === 0 || visibleIndices.indexOf(index) === 4
                ? 'w-[120px] md:w-[180px] z-10 opacity-20 scale-75 blur-[2px]' // 最外側兩張
                : 'w-[180px] md:w-[250px] z-20 opacity-50 scale-90'          // 中間兩張
          ]"
          @click="selectWork(index)"
        >
          <div class="relative aspect-[3/4] bg-white border-[3px] border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <img :src="work.img" class="w-full h-full object-cover" />
            
            <div 
              v-if="currentIndex === index" 
              class="absolute bottom-0 w-full bg-black text-white p-4 animate-in fade-in slide-in-from-bottom-2"
            >
              <h3 class="font-black italic text-lg uppercase">{{ work.title }}</h3>
            </div>
          </div>
        </div>
      </div>

      <button @click="nextWork" class="absolute right-4 md:right-8 z-40 bg-black text-white w-12 h-12 rounded-full shadow-lg hover:bg-gray-800 transition-colors">
        →
      </button>

    </div>
  </section>
</template>

<style scoped>
.transition-all {
  will-change: transform, opacity, filter;
}

/* 簡單的標題進場動畫 */
@keyframes slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
.animate-in {
  animation: slide-up 0.4s ease-out;
}
</style>