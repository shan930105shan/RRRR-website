<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import advisorTitleImg from '@/assets/advisor-title.png'; // 確保你的圖片路徑正確

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const cardsRef = ref([]);

const advisors = [
  {
    name: '陳圳卿',
    enName: 'Chen, Chun-Ching',
    title: '國立臺北科技大學 互動設計系 教授/系主任',
    tags: '使用者經驗 | 人機介面設計 | 使用性工程 | 人因設計',
  },
  {
    name: '龍祈澔',
    enName: 'Lung, Chi-Hao',
    title: '國立臺北科技大學 互動設計系 副教授',
    tags: '數位藝術創作 | 互動媒體設計 | 虛擬視覺體驗開發 | 後人類文化探索',
  },
  {
    name: '莊育鯉',
    enName: 'Chuang, Yu-Li',
    title: '國立臺灣海洋大學 海洋文創設計產業學士學位學程 副教授',
    tags: '地域文創產業設計 | 包裝設計 | 視覺傳達設計 | 訊息視覺化設計',
  },
  {
    name: '洪兆宣',
    enName: 'Hung, Chao-Hsuan',
    title: '兆宣藝術有限公司 創辦人暨執行總監',
    tags: '展覽企劃 | 行銷 | 藝術ESG專案',
  },
  {
    name: '謝適鴻',
    enName: 'Hsieh, Shih-Hung',
    title: '金展創意有限公司 總經理',
    tags: '互動設計',
  }
];

onMounted(() => {
  // 建立飛入動畫
  gsap.from(cardsRef.value, {
    scrollTrigger: {
      trigger: sectionRef.value,
      start: "top 70%", // 當區塊進入視窗 70% 時開始動畫
      toggleActions: "play none none none"
    },
    x: -100,           // 從左邊 100px 處飛入
    opacity: 0,        // 從透明開始
    duration: 1,       // 動畫持續 1 秒
    stagger: 0.3,      // 每位老師間隔 0.3 秒，形成依序出現的效果
    ease: "power2.out" // 平滑的減速曲線
  });
});
</script>

<template>
  <section ref="sectionRef" class="relative w-full bg-white pb-40 px-10 md:px-20 overflow-hidden">
    
    <div class="mb-20 -ml-4 md:-ml-10 top-10 left-10 w-42 md:w-50 z-20">
      <img :src="advisorTitleImg" alt="指導老師 Advisor" class="h-auto object-contain" />
    </div>

    <div class="flex flex-col gap-16 max-w-[1000px]">
      <div 
        v-for="(pro, index) in advisors" 
        :key="index"
        ref="cardsRef"
        class="advisor-card"
      >
        <div class="flex items-baseline gap-4 mb-2">
          <h3 class="text-xl font-bold tracking-widest text-black">{{ pro.name }}</h3>
          <span class="text-lg text-gray-500 font-light">{{ pro.enName }}</span>
        </div>

        <p class="text-lg text-black mb-1 tracking-wider">{{ pro.title }}</p>
        
        <p class="text-sm text-gray-500 tracking-widest font-light">
          ｜ {{ pro.tags }} ｜
        </p>
      </div>
    </div>

  </section>
</template>

<style scoped>
.advisor-card {
  /* 設定 will-change 提高動畫效能 */
  will-change: transform, opacity;
}
</style>