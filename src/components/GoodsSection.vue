<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import goodsTitle from '@/assets/goods-title.png';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const goodsItems = ref([]);

// 準備你的四張圖
const goods = [
  { id: 1, name: '卡套', src: new URL('@/assets/goods/card-case.png', import.meta.url).href, class: 'w-120 -top-80 right-[25%]' },
  { id: 2, name: '織帶', src: new URL('@/assets/goods/ribbon.png', import.meta.url).href, class: 'w-120 -top-30 right-[20%]' },
  { id: 3, name: '書籤', src: new URL('@/assets/goods/bookmark.png', import.meta.url).href, class: 'w-200 top-40 left-[20%]' },
  { id: 4, name: '貼紙包', src: new URL('@/assets/goods/stickers.png', import.meta.url).href, class: 'w-120 top-10 right-[15%]' },
];

onMounted(() => {
  // 建立掉落動畫
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 60%", // 當區塊頂部到達視窗 60% 時開始掉落
      toggleActions: "play none none none"
    }
  });

  tl.from(goodsItems.value, {
    y: -800,           // 從上方 800px 處掉落
    rotation: -15,     // 掉落時帶一點旋轉更自然
    opacity: 0,
    duration: 1.2,
    stagger: 0.3,       // 每張圖片間隔 0.3 秒出現
    onComplete: () => {
      // 掉落完成後，為每一張圖片開啟平滑浮動
      goodsItems.value.forEach((el, index) => {
        gsap.to(el, {
          y: "random(-15, 15)", // 在 -15px 到 15px 之間隨機浮動
          duration: "random(2, 3)",
          repeat: -1,           // 無限循環
          yoyo: true,           // 來回播放
          ease: "sine.inOut",   // 平滑的進出效果
          delay: index * 0.2    // 錯開浮動的起點
        });
      });
    }
  });
});
</script>

<template>
  <section ref="sectionRef" class="relative w-full min-h-screen bg-white py-20 px-10">
    
    <div class="absolute top-10 left-10 w-40 md:w-40 z-20">
      <img :src="goodsTitle" alt="周邊" class="w-full h-auto object-contain" />
    </div>

    <div class="relative w-full h-[800px] max-w-[1200px] mx-auto">
      <div 
        v-for="(item, index) in goods" 
        :key="item.id"
        ref="goodsItems"
        class="absolute"
        :class="item.class"
      >
        <img :src="item.src" :alt="item.name" class="w-full h-auto object-contain drop-shadow-2xl" />
      </div>
    </div>

    <div class="absolute bottom-10 right-20 text-right">
      <p class="text-3xl font-black italic tracking-tighter uppercase opacity-50 mb-4">More R R R R</p>
      <div class="flex justify-end gap-4">
        <div class="w-6 h-6 bg-gray-300 rounded-sm"></div>
        <div class="w-6 h-6 bg-gray-300 rounded-sm"></div>
        <div class="w-6 h-6 bg-gray-300 rounded-sm"></div>
      </div>
    </div>

  </section>
</template>

<style scoped>
/* 確保圖片不會遮擋文字互動，或根據需求調整 z-index */
.absolute {
  will-change: transform;
}
</style>