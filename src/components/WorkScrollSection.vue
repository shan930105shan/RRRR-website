<script setup lang="ts">
import { ref } from 'vue';
// --- 引入 Swiper 核心 ---
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

// 引入你的組件與資源
import WorkModal from './WorkModal.vue'; 
import tagLineImg from '@/assets/tags/tagLine.png';
import tagLineImg2 from '@/assets/tags/tagLine2.png';
import workTitle from '@/assets/work-title.png';
// 🎈 引入你寫好的詳細資料
import { WORK_DATA } from '@/constants/works'; 

const totalWorks = 19;
const currentIndex = ref(0);
const swiperRef = ref<any>(null);

// 控制彈窗狀態
const isModalOpen = ref(false);
const activeWork = ref<any>(null);

// 1. 維持原本的作品清單（自動抓取 group1 ~ 19 的第一張圖作為封面）
const works = Array.from({ length: totalWorks }, (_, i) => ({
  id: i + 1,
  title: `Project ${String(i + 1).padStart(2, '0')}`,
  img: new URL(`../assets/work/group${i + 1}/1.png`, import.meta.url).href 
}));

// 2. 🎈 補齊 19 個標籤座標 (配合 tagLine 的流動感設定)
const tagConfigs = [
  { id: 1,  top: '20px',  left: '35%' }, { id: 2,  top: '25px',  left: '40%' },
  { id: 3,  top: '20px',  left: '45%' }, { id: 4,  top: '25px',  left: '50%' },
  { id: 5,  top: '20px',  left: '55%' }, { id: 6,  top: '25px',  left: '60%' },
  { id: 7,  top: '20px',  left: '65%' }, { id: 8,  top: '25px',  left: '70%' },
  { id: 9,  top: '20px',  left: '75%' }, { id: 10, top: '25px',  left: '80%' },
  { id: 11, top: '20px',  left: '85%' }, { id: 12, top: '25px',  left: '90%' },
  { id: 13, top: '100px', left: '57%' }, { id: 14, top: '105px', left: '62%' },
  { id: 15, top: '100px', left: '67%' }, { id: 16, top: '105px', left: '72%' },
  { id: 17, top: '100px', left: '80%' }, { id: 18, top: '105px', left: '85%' },
  { id: 19, top: '100px', left: '90%' },
];

// 取得標籤圖片邏輯
const getTagImg = (id: number, isActive: boolean) => {
  const status = isActive ? 'Active' : 'Normal';
  return new URL(`../assets/tags/tag${id}${status}.png`, import.meta.url).href;
};

// --- Swiper 相關函式 ---
const onSwiper = (swiper: any) => {
  swiperRef.value = swiper;
};

const onSlideChange = (swiper: any) => {
  currentIndex.value = swiper.realIndex;
};

const selectWork = (index: number) => {
  swiperRef.value?.slideToLoop(index);
};

// --- 🎈 彈窗處理邏輯 ---
const handleWorkClick = (simpleWork: any, isActive: boolean, index: number) => {
  if (isActive) {
    // 透過點擊的作品 id，去 WORK_DATA 裡找到對應的詳細資料
    const fullDetail = WORK_DATA.find(item => item.id === simpleWork.id);
    
    if (fullDetail) {
      activeWork.value = fullDetail;
      isModalOpen.value = true;
      document.body.style.overflow = 'hidden'; // 開啟時鎖定頁面滾動
    } else {
      console.error(`找不到 ID 為 ${simpleWork.id} 的詳細資料，請確認 works.ts 內容`);
    }
  } else {
    // 如果點擊的是兩側的作品，則滑動到中間
    selectWork(index);
  }
};

const closePopup = () => {
  isModalOpen.value = false;
  document.body.style.overflow = ''; // 關閉時恢復頁面滾動
};
</script>

<template>
  <section class="w-full py-20 bg-white overflow-hidden relative">

    <div class="absolute top-10 left-10 w-30 md:w-30 z-20">
      <img :src="workTitle" alt="Taser 前導片" class="w-full h-auto object-contain" />
    </div>
    
    <div class="relative w-full h-[180px] mb-12 max-w-[1400px] mx-auto">
      <img 
        :src="tagLineImg" 
        class="absolute bottom-6 right-23 w-[58%] h-full object-contain z-0 pointer-events-none"
        alt="tag-decoration-line"
      />
      <img 
        :src="tagLineImg2" 
        class="absolute top-13 right-23 w-[38%] h-full object-contain z-0 pointer-events-none"
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
        :loop="true"
        :centeredSlides="true"
        :slidesPerView="1.5"
        :spaceBetween="20"
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
            @click="handleWorkClick(work, isActive, index)"
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

    <WorkModal 
      :isOpen="isModalOpen" 
      :work="activeWork" 
      @close="closePopup" 
    />
    
  </section>
</template>

<style scoped>
/* 保持樣式 ... */
.relative { z-index: 1; }
:deep(.swiper) {
  overflow: visible !important;
}
</style>