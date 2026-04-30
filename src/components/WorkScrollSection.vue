<script setup lang="ts">
import { ref, computed } from 'vue'; // 🚩 加上 computed
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { Swiper as SwiperClass } from 'swiper/types';
import 'swiper/css';

import WorkModal from './WorkModal.vue'; 
import tagLineImg from '@/assets/tags/tagLine.png';
import tagLineImg2 from '@/assets/tags/tagLine2.png';
import workTitle from '@/assets/work-title.png';
import { WORK_DATA } from '@/constants/works'; 

const totalWorks = 19;
const currentIndex = ref(0);
const swiperRef = ref<any>(null);
const isModalOpen = ref(false);
const activeWork = ref<any>(null);

const works = Array.from({ length: totalWorks }, (_, i) => ({
  id: i + 1,
  title: `Project ${String(i + 1).padStart(2, '0')}`,
  img: new URL(`../assets/work/group${i + 1}/1.png`, import.meta.url).href 
}));

// 原本的電腦版標籤配置
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

const getTagImg = (id: number, isActive: boolean) => {
  const status = isActive ? 'Active' : 'Normal';
  return new URL(`../assets/tags/tag${id}${status}.png`, import.meta.url).href;
};

const onSwiper = (swiper: SwiperClass) => { swiperRef.value = swiper; };
const onSlideChange = (swiper: SwiperClass) => { currentIndex.value = swiper.realIndex; };
const selectWork = (index: number) => { swiperRef.value?.slideToLoop(index); };

const handleWorkClick = (simpleWork: any, isActive: boolean, index: number) => {
  if (isActive) {
    const fullDetail = WORK_DATA.find(item => item.id === simpleWork.id);
    if (fullDetail) {
      activeWork.value = fullDetail;
      isModalOpen.value = true;
      document.body.style.overflow = 'hidden';
    }
  } else {
    selectWork(index);
  }
};

const closePopup = () => {
  isModalOpen.value = false;
  document.body.style.overflow = '';
};

// 🚩 計算當前選中的作品標題或 ID 用於手機版顯示
const currentWorkTitle = computed(() => {
  return WORK_DATA.find(item => item.id === works[currentIndex.value]!.id)?.title || `Project ${currentIndex.value + 1}`;
});
</script>

<template>
  <section class="w-full py-16 md:py-20 bg-white overflow-hidden relative">

    <div class="absolute top-6 left-6 md:top-10 md:left-10 w-24 md:w-30 z-20">
      <img :src="workTitle" alt="Work Title" class="w-full h-auto object-contain" />
    </div>
    
    <div class="hidden md:block relative w-full h-[180px] mb-12 max-w-[1400px] mx-auto">
      <img :src="tagLineImg" class="absolute bottom-6 right-23 w-[58%] h-full object-contain z-0 pointer-events-none" />
      <img :src="tagLineImg2" class="absolute top-13 right-23 w-[38%] h-full object-contain z-0 pointer-events-none" />
      <button 
        v-for="(config, index) in tagConfigs" :key="config.id"
        @click="selectWork(index)"
        class="absolute transform -translate-x-1/2 transition-all duration-300 hover:scale-110 z-10"
        :style="{ top: config.top, left: config.left }"
      >
        <img :src="getTagImg(config.id, currentIndex === index)" class="w-14 h-14 object-contain" />
      </button>
    </div>

    <div class="md:hidden w-full flex flex-col items-center mb-8 px-6 pt-16">
      <div class="flex items-center space-x-4">
        <span class="text-[0.8rem] font-bold tracking-tighter">
          {{ String(currentIndex + 1).padStart(2, '0') }}
        </span>
        <div class="w-24 h-[1px] bg-gray-200 relative">
          <div 
            class="absolute top-0 left-0 h-full bg-black transition-all duration-300"
            :style="{ width: `${((currentIndex + 1) / totalWorks) * 100}%` }"
          ></div>
        </div>
        <span class="text-[0.8rem] text-gray-400">19</span>
      </div>
      <h3 class="mt-2 text-[0.9rem] font-medium tracking-[0.2em] text-black uppercase">
        {{ currentWorkTitle }}
      </h3>
    </div>

    <div class="relative w-full px-4 group">
      <swiper
        :loop="true"
        :centeredSlides="true"
        :slidesPerView="1.4"
        :spaceBetween="15"
        :breakpoints="{
          '768': { slidesPerView: 3, spaceBetween: 30 },
          '1024': { slidesPerView: 5, spaceBetween: 40 }
        }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        class="!overflow-visible"
      >
        <swiper-slide v-for="(work, index) in works" :key="work.id" v-slot="{ isActive }">
          <div 
            class="transition-all duration-500 ease-out cursor-pointer py-12"
            :class="[isActive ? 'scale-110 md:scale-120 opacity-100' : 'scale-75 opacity-30 blur-[1px] grayscale']"
            @click="handleWorkClick(work, isActive, index)"
          >
            <div class="relative aspect-[3/4] bg-white border-[1px] border-black overflow-hidden shadow-sm">
              <img :src="work.img" class="w-full h-full object-cover" />
            </div>
          </div>
        </swiper-slide>
      </swiper>

      <button @click="swiperRef?.slidePrev()" class="hidden md:block absolute left-10 top-1/2 -translate-y-1/2 z-40 bg-black text-white w-12 h-12 rounded-full shadow-lg">
        ←
      </button>
      <button @click="swiperRef?.slideNext()" class="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 z-40 bg-black text-white w-12 h-12 rounded-full shadow-lg">
        →
      </button>
    </div>

    <WorkModal :isOpen="isModalOpen" :work="activeWork" @close="closePopup" />
    
  </section>
</template>

<style scoped>
.relative { z-index: 1; }
:deep(.swiper) { overflow: visible !important; }
</style>