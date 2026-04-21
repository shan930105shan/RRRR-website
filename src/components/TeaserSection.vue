<script setup lang="ts">
// 引入左上角的標題圖片
import teaserTitle from '@/assets/teaser-title.png';

// 定義影片資料，方便後續維護
const teaserVideos = [
  { 
    id: 1, 
    src: new URL('../assets/previewVideo/teaser1.mp4', import.meta.url).href, 
    label: '01_日常 C◯~', 
    ratio: 'aspect-[1/1]', // 2:2 即 1:1
    class: 'top-[10%] left-[5%] w-[22%]' 
  },
  { 
    id: 2, 
    src: new URL('../assets/previewVideo/teaser2.mp4', import.meta.url).href, 
    label: '02_聲音 C:RR~', 
    ratio: 'aspect-[1/1]', 
    class: 'bottom-[15%] left-[45%] w-[18%]' 
  },
  { 
    id: 3, 
    src: new URL('../assets/previewVideo/teaser3.mp4', import.meta.url).href, 
    label: '03_一起？C~C~C~', 
    ratio: 'aspect-[4/5]', 
    class: 'top-[5%] right-[10%] w-[22%]' 
  },
  { 
    id: 4, 
    src: new URL('../assets/previewVideo/teaser4.mp4', import.meta.url).href, 
    label: '(RRRR)', 
    ratio: 'aspect-[5/4]', 
    class: 'bottom-[5%] left-[15%] w-[28%]' 
  },
];
</script>

<template>
  <section class="relative w-full min-h-screen bg-white py-20 px-[5%] overflow-hidden">
    
    <div class="absolute top-10 left-10 w-20 md:w-20 z-20">
      <img :src="teaserTitle" alt="Taser 前導片" class="w-full h-auto object-contain" />
    </div>

    <div class="relative w-full h-[800px] max-w-[1400px] mx-auto">
      
      <div 
        v-for="video in teaserVideos" 
        :key="video.id"
        class="absolute group transition-transform duration-500 hover:scale-105"
        :class="video.class"
      >
        <div class="relative w-full bg-gray-100 overflow-hidden shadow-lg">
          <video 
            :src="video.src" 
            autoplay 
            muted 
            loop 
            playsinline 
            class="w-full h-full object-cover"
            :class="video.ratio"
          ></video>
        </div>
        <div v-if="video.id === 3 || video.id === 4" 
               class="absolute w-12 h-12 bg-black z-20"
               :class="video.id === 3 ? '-bottom-3 -right-4' : '-top-4 -left-4'">
        </div>

        <p class="mt-3 text-sm font-medium text-black font-mono">
          {{ video.label }}
        </p>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* 如果想要影片有不同的進場動畫可以在這裡加 */
</style>