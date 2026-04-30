<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

const allAvatars = Array.from({ length: 10 }, (_, i) => 
  new URL(`../assets/avatars/${i + 1}.png`, import.meta.url).href
);

// --- 響應式與視差邏輯 ---
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1200);
const scrollY = ref(0);
const sectionRef = ref<HTMLElement | null>(null);
const sectionTop = ref(0);

const isMobile = computed(() => windowWidth.value < 768);
const displayCount = computed(() => (isMobile.value ? 4 : 8));
const displayAvatars = ref([...allAvatars.slice(0, 8)]);

const handleScroll = () => {
  // 只有手機版才需要記錄滾動數值以節省效能（選做，但建議保留以利即時切換）
  scrollY.value = window.scrollY;
};

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  if (sectionRef.value) {
    sectionTop.value = sectionRef.value.offsetTop;
  }
};

// 🚩 關鍵邏輯：文字向下鑽 (僅限手機版)
const textParallaxStyle = computed(() => {
  // 1. 如果不是手機版，直接回傳空樣式（不位移）
  if (!isMobile.value) {
    return { transform: 'none' };
  }

  // 2. 手機版邏輯：當滾動超過區塊頂部時開始下沉
  // 這裡的 -400 是為了讓效果早點開始，你可以根據體感微調
  const diff = Math.max(0, scrollY.value - (sectionTop.value - 50));
  const offset = diff * 0.2; 
  
  return {
    transform: `translateY(${offset}px)`,
    willChange: 'transform'
  };
});

// 隨機換圖邏輯
let timer: number | null = null;
const startRandomChange = () => {
  timer = window.setInterval(() => {
    const displayIndex = Math.floor(Math.random() * displayCount.value);
    const poolIndex = Math.floor(Math.random() * 10);
    displayAvatars.value[displayIndex] = allAvatars[poolIndex]!;
  }, 800);
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  window.addEventListener('scroll', handleScroll);
  setTimeout(handleResize, 150); 
  startRandomChange();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('scroll', handleScroll);
  if (timer) clearInterval(timer);
});

const visibleAvatars = computed(() => displayAvatars.value.slice(0, displayCount.value));
</script>

<template>
  <section ref="sectionRef" class="w-full relative bg-white flex flex-col items-center overflow-hidden">
    
    <div 
      class="max-w-[800px] text-black text-center pt-[100px] pb-[40px] px-6 relative z-0 transition-transform duration-75 ease-out"
      :style="textParallaxStyle"
    >
      <p class="text-[0.85rem] md:text-[1.1rem] leading-[1.8] md:leading-[2] mb-8 tracking-widest">
        作為畢業展的核心主題，我們試圖提出一種屬於全體創作者的共同象徵。<br class="hidden md:block">
        本次展覽的核心聚焦於「創作」本身，並將其提煉為三個不可分割的階段：<br class="hidden md:block">
        思考 → 轉化 → 實現
      </p>
      
      <p class="text-[0.85rem] md:text-[1.1rem] leading-[1.8] md:leading-[2] mb-8 tracking-widest">
        我們觀察到，當代新銳創作者具備鮮明的集體特質：誠實面對內在需求、直視
        自我價值，並勇於在既有框架中進行破格嘗試。為使抽象的創作心理具象化，
        我們取「泡泡糖」為意象載體。泡泡糖天生帶有街頭、青春與自主性的文化連
        結，其咀嚼、吹出至迸發的動態過程，映射了創作中不斷推敲與轉譯的狀態。
      </p>
    </div>

    <div class="w-full grid grid-cols-4 md:grid-cols-8 relative z-20 bg-white">
      <div 
        v-for="(img, index) in visibleAvatars" 
        :key="index"
        class="aspect-[3/4] overflow-hidden border-r border-gray-100 last:border-r-0"
      >
        <transition name="pix-fade" mode="out-in">
          <img 
            :key="img" 
            :src="img" 
            class="w-full h-full object-cover" 
          />
        </transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pix-fade-enter-active, .pix-fade-leave-active {
  transition: opacity 0.3s ease;
}
.pix-fade-enter-from, .pix-fade-leave-to {
  opacity: 0;
}

/* 🚩 視覺增強：手機版加強頂部陰影，電腦版可以稍微減弱或保持 */
.z-20 {
  box-shadow: 0 -40px 50px rgba(255, 255, 255, 1);
}

/* 讓視差移動在低階手機上稍微平滑一點 */
.transition-transform {
  transition-property: transform;
}
</style>