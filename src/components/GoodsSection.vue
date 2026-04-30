<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import goodsTitle from '@/assets/goods-title.png';
import goodsTitleZ from '@/assets/goods-title-z.png';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const goodsItems = ref([]);

const goods = [
  { 
    id: 1, 
    price: '$279',
    src: new URL('@/assets/goods/card-case.png', import.meta.url).href, 
    // 手機版：使用 relative，給寬度，移除負的 top
    mobileClass: 'w-[80%] left-[5%] rotate-[-5deg] mb-[-20%]',
    // 電腦版：用 md:inset-auto 清除手機所有定位，再重新給原本的位置
    desktopClass: 'md:inset-auto md:absolute md:-top-80 md:right-[25%] md:w-120 md:rotate-0 md:mb-0' 
  },
  { 
    id: 2, 
    price: '$149',
    src: new URL('@/assets/goods/ribbon.png', import.meta.url).href, 
    mobileClass: 'w-[85%] left-[10%] mt-[-25%] z-99 rotate-[8deg] mb-[2%]',
    desktopClass: 'md:inset-auto md:absolute md:-top-30 md:right-[20%] md:w-120 md:rotate-0 md:mt-0' 
  },
  { 
    id: 3, 
    price: 'FREE',
    src: new URL('@/assets/goods/bookmark.png', import.meta.url).href, 
    mobileClass: 'w-[105%] left-[5%] mt-[-55%] rotate-[-3deg] mb-10',
    desktopClass: 'md:inset-auto md:absolute md:top-30 md:left-[10%] md:w-200 md:rotate-0 md:mt-0' 
  },
  { 
    id: 4, 
    price: '$80',
    src: new URL('@/assets/goods/stickers.png', import.meta.url).href, 
    mobileClass: 'w-[75%] left-[30%] mt-[-85%] z-99 rotate-[12deg] mb-10',
    desktopClass: 'md:inset-auto md:absolute md:top-20 md:right-[15%] md:w-120 md:rotate-0 md:mt-0' 
  },
  { 
    id: 5, 
    price: '$200',
    src: new URL('@/assets/goods/poster.png', import.meta.url).href, 
    mobileClass: 'w-[105%] left-[-20%] mt-[-57%] rotate-[-2deg] mb-20',
    desktopClass: 'md:inset-auto md:absolute md:top-120 md:right-[15%] md:w-140 md:rotate-0 md:mt-0' 
  },
];

onMounted(() => {
  // 修正 GSAP 動畫，確保在不同的佈局下都能正確運作
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 40%", // 稍微延後觸發，確保進場時看得到
      toggleActions: "play none none none"
    }
  });

  tl.from(goodsItems.value, {
    y: -300, // 減小掉落距離，避免在手機版飛出螢幕
    rotation: -10,
    opacity: 0,
    duration: 1,
    ease: "bounce.out",
    stagger: 0.15,
    onComplete: () => {
      // 漂浮動畫
      goodsItems.value.forEach((el, index) => {
        gsap.to(el, {
          y: "+=15",
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2
        });
      });
    }
  });
});
</script>

<template>
  <section ref="sectionRef" class="relative w-full min-h-screen bg-white py-40 md:py-20 px-4 md:px-10 overflow-y-visible">
    
    <div class="absolute top-10 left-6 w-28 md:w-40 z-[30]">
      <img :src="goodsTitle" alt="周邊" class="w-full h-auto object-contain" />
    </div>

    <div class="relative w-full h-auto md:h-[1000px] max-w-[1200px] mx-auto flex flex-col items-start md:block">
      <div 
        v-for="(item, index) in goods" 
        :key="item.id"
        ref="goodsItems"
        class="group cursor-pointer transition-shadow duration-300
               /* 手機版相對定位，電腦版絕對定位 */
               relative md:absolute z-10"
        :class="[item.mobileClass, item.desktopClass]"
      >
        <div class="relative w-full h-full"> 
          <img 
            :src="item.src" 
            class="w-full h-auto block object-contain drop-shadow-xl transition-all duration-300 group-hover:brightness-0" 
          />
        
          <div class="absolute inset-0 z-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span class="text-white text-base md:text-xl font-black bg-black px-4 py-2 rounded-sm shadow-xl">
              {{ item.price }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-10 right-6 w-28 md:w-40 z-[30]">
      <img :src="goodsTitleZ" alt="周邊" class="w-full h-auto object-contain" />
    </div>
  </section>
</template>

<style scoped>
/* 避免手機版內容被壓縮 */
.relative {
  flex-shrink: 0;
}
</style>