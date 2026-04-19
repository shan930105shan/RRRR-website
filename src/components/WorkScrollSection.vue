<script setup lang="ts">
import { ref } from 'vue';
// --- 引入 Swiper 核心 ---
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Mousewheel } from 'swiper/modules'; // 如果想支援滾輪
import 'swiper/css';

import tagLineImg from '@/assets/tags/tagLine.png';

const totalWorks = 19;
const currentIndex = ref(0);
const swiperRef = ref<any>(null); // 用來儲存 Swiper 實體

// 1. 作品資料
const works = Array.from({ length: totalWorks }, (_, i) => ({
  id: i + 1,
  title: `Project ${String(i + 1).padStart(2, '0')}`,
  img: new URL(`../assets/work/group${i + 1}/1.png`, import.meta.url).href 
}));

// 2. 標籤座標 (維持你的設定)
const tagConfigs = [
  { id: 1,  top: '20px',  left: '10%' }, { id: 2,  top: '25px',  left: '15%' },
  { id: 3,  top: '20px',  left: '20%' }, { id: 4,  top: '25px',  left: '25%' },
  { id: 5,  top: '20px',  left: '32%' }, { id: 6,  top: '25px',  left: '37%' },
  { id: 7,  top: '20px',  left: '42%' }, { id: 8,  top: '25px',  left: '47%' },
  { id: 9,  top: '20px',  left: '54%' }, { id: 10, top: '25px',  left: '59%' },
  { id: 11, top: '20px',  left: '64%' }, { id: 12, top: '25px',  left: '69%' },
  { id: 13, top: '100px', left: '45%' }, { id: 14, top: '105px', left: '50%' },
  { id: 15, top: '100px', left: '55%' }, { id: 16, top: '105px', left: '60%' },
  { id: 17, top: '100px', left: '68%' }, { id: 18, top: '105px', left: '73%' },
  { id: 19, top: '100px', left: '78%' },
];

const getTagImg = (id: number, isActive: boolean) => {
  const status = isActive ? 'Active' : 'Normal';
  return new URL(`../assets/tags/tag${id}${status}.png`, import.meta.url).href;
};

// --- Swiper 相關函式 ---
const onSwiper = (swiper: any) => {
  swiperRef.value = swiper;
};

const onSlideChange = (swiper: any) => {
  // 使用 realIndex 才能在 loop 模式下抓到正確的 0~18
  currentIndex.value = swiper.realIndex;
};

const selectWork = (index: number) => {
  // 讓 Swiper 跳轉到對應索引
  swiperRef.value?.slideToLoop(index);
};
</script>

<template>
  <section class="w-full py-20 bg-white overflow-hidden relative">
    
    <div class="relative w-full h-[180px] mb-12 max-w-[1400px] mx-auto">
      <img 
        :src="tagLineImg" 
        class="absolute bottom-7 left-33 w-[58%] h-full object-contain z-0 pointer-events-none"
        alt="tag-decoration-line"
      />

      <button 
        v-for="(config, index) in tagConfigs" 
        :key="config.id"
        @click="selectWork(index)"
        class="absolute transform -translate-x-1/2 transition-all duration-300 hover:scale-110 z-10"
        :style="{ top: config.top, left: config.left }"
      >
        <img :src="getTagImg(config.id, currentIndex === index)" class="w-14 h-14 object-contain" />
      </button>
    </div>

    <div class="relative w-full px-4 group">
      <swiper
        :modules="[Mousewheel]"
        :loop="true"
        :centeredSlides="true"
        :slidesPerView="1.5"
        :spaceBetween="20"
        :mousewheel="true"
        :breakpoints="{
          '768': { slidesPerView: 3, spaceBetween: 30 },
          '1024': { slidesPerView: 5, spaceBetween: 40 }
        }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        class="!overflow-visible"
      >
        <swiper-slide 
          v-for="(work, index) in works" 
          :key="work.id"
          v-slot="{ isActive }"
        >
          <div 
            class="transition-all duration-500 ease-out cursor-pointer py-10"
            :class="[isActive ? 'scale-120 opacity-100' : 'scale-75 opacity-30 blur-[1px] grayscale']"
          >
            <div class="relative aspect-[3/4] bg-white border-[1px] border-black overflow-hidden">
              <img :src="work.img" class="w-full h-full object-cover" />
            </div>
          </div>
        </swiper-slide>
      </swiper>

      <button @click="swiperRef?.slidePrev()" class="absolute left-10 top-1/2 -translate-y-1/2 z-40 bg-black text-white w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-transform">
        ←
      </button>
      <button @click="swiperRef?.slideNext()" class="absolute right-10 top-1/2 -translate-y-1/2 z-40 bg-black text-white w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-transform">
        →
      </button>
    </div>
  </section>
</template>

<style scoped>
/* 確保標籤區塊不會擋住下方的滑動 */
.relative { z-index: 1; }

@keyframes slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
.animate-in {
  animation: slide-up 0.4s ease-out;
}

/* 讓 Swiper 容器可以顯示出縮放後超出的部分 */
:deep(.swiper) {
  overflow: visible !important;
}
</style>