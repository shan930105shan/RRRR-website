<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import goodsTitle from '@/assets/goods-title.png';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const goodsItems = ref([]);

// 準備周邊資料
const goods = [
  { 
    id: 1, 
    price: '$350',
    src: new URL('@/assets/goods/card-case.png', import.meta.url).href, 
    class: 'w-120 -top-80 right-[25%] z-10' 
  },
  { 
    id: 2, 
    price: '$150',
    src: new URL('@/assets/goods/ribbon.png', import.meta.url).href, 
    class: 'w-120 -top-30 right-[20%] z-20' 
  },
  { 
    id: 3, 
    price: '$50',
    src: new URL('@/assets/goods/bookmark.png', import.meta.url).href, 
    class: 'w-200 top-40 left-[20%] z-10' 
  },
  { 
    id: 4, 
    price: '$100',
    src: new URL('@/assets/goods/stickers.png', import.meta.url).href, 
    class: 'w-120 top-10 right-[15%] z-25' 
  },
];

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 10%",
      toggleActions: "play none none none"
    }
  });

  tl.from(goodsItems.value, {
    y: -800,
    rotation: -15,
    opacity: 0,
    duration: 1.2,
    ease: "bounce.out",
    stagger: 0.3,
    onComplete: () => {
      goodsItems.value.forEach((el, index) => {
        gsap.to(el, {
          y: "random(-15, 15)",
          duration: "random(2, 3)",
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
  <section ref="sectionRef" class="relative w-full min-h-screen bg-white py-20 px-10 overflow-visible">
    
    <div class="absolute top-10 left-10 w-40 z-20">
      <img :src="goodsTitle" alt="周邊" class="w-full h-auto object-contain" />
    </div>

    <div class="relative w-full h-[800px] max-w-[1200px] mx-auto">
      <div 
        v-for="(item, index) in goods" 
        :key="item.id"
        ref="goodsItems"
        class="absolute group cursor-pointer"
        :class="item.class"
      >
        <div class="relative w-full h-full"> <img 
            :src="item.src" 
            class="w-full h-auto block object-contain drop-shadow-2xl transition-all duration-300 group-hover:brightness-0" 
        />
        
        <div class="absolute inset-0 z-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span class="text-white text-xl font-black bg-black px-4 py-2 rounded-sm backdrop-blur-md">
            {{ item.price }}
            </span>
        </div>
        </div>
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
.absolute {
  will-change: transform;
}
/* 強制剪影效果：如果 Tailwind 失效可啟用此段 */
.group:hover img {
  filter: brightness(0);
}
</style>