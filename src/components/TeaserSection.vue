<script setup lang="ts">
import teaserTitle from '@/assets/teaser-title.png';

const teaserVideos = [
  { 
    id: 1, 
    src: new URL('../assets/previewVideo/teaser1.mp4', import.meta.url).href, 
    label: '01_日常 C◯~', 
    ratio: 'aspect-[1/1]',
    mobileClass: 'w-[70%] left-[5%]', 
    // md:inset-auto 會清除手機版的 top/bottom/left/right 影響
    desktopClass: 'md:inset-auto md:top-[10%] md:left-[5%] md:w-[22%] md:mt-0' 
  },
  { 
    id: 2, 
    src: new URL('../assets/previewVideo/teaser2.mp4', import.meta.url).href, 
    label: '02_聲音 C:RR~', 
    ratio: 'aspect-[1/1]', 
    mobileClass: 'w-[65%] left-[30%] mt-[-10%]', 
    desktopClass: 'md:inset-auto md:bottom-[15%] md:left-[45%] md:w-[18%] md:mt-0' 
  },
  { 
    id: 3, 
    src: new URL('../assets/previewVideo/teaser3.mp4', import.meta.url).href, 
    label: '03_一起？C~C~C~', 
    ratio: 'aspect-[4/5]', 
    mobileClass: 'w-[75%] left-[10%] mt-[5%]',
    // 特別注意：這裡要 md:left-auto，否則手機版的 left 會卡住電腦版的位置
    desktopClass: 'md:inset-auto md:top-[5%] md:right-[10%] md:left-auto md:w-[22%] md:mt-0' 
  },
  { 
    id: 4, 
    src: new URL('../assets/previewVideo/teaser4.mp4', import.meta.url).href, 
    label: '(RRRR)', 
    ratio: 'aspect-[5/4]', 
    mobileClass: 'w-[80%] left-[5%] mt-[10%]',
    desktopClass: 'md:inset-auto md:bottom-[5%] md:left-[15%] md:w-[28%] md:mt-0' 
  },
];
</script>

<template>
  <section class="relative w-full min-h-screen bg-transparent py-32 md:py-20 px-[5%] overflow-hidden">
    
    <div class="absolute top-10 left-10 w-20 z-10">
      <img :src="teaserTitle" alt="Taser 前導片" class="w-full h-auto object-contain" />
    </div>

    <div class="relative w-full h-auto md:h-[800px] max-w-[1400px] mx-auto flex flex-col items-start md:block">
      
      <div 
        v-for="video in teaserVideos" 
        :key="video.id"
        class="group transition-transform duration-500 hover:scale-105 mb-20 md:mb-0
               /* 手機版相對定位，電腦版絕對定位 */
               relative md:absolute"
        :class="[video.mobileClass, video.desktopClass]"
      >
        <div class="relative w-full bg-gray-100 overflow-hidden shadow-xl">
          <video 
            :src="video.src" 
            autoplay muted loop playsinline 
            class="w-full h-full object-cover"
            :class="video.ratio"
          ></video>
        </div>

        <div v-if="video.id === 3 || video.id === 4" 
             class="absolute w-8 h-8 md:w-12 md:h-12 bg-black z-20 pointer-events-none"
             :class="video.id === 3 ? '-bottom-3 -right-3' : '-top-3 -left-3'">
        </div>

        <p class="mt-3 text-xs md:text-sm font-medium text-black font-mono tracking-tighter">
          {{ video.label }}
        </p>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* 避免手機版 flex 導致寬度被壓縮 */
.relative {
  flex-shrink: 0;
}
</style>