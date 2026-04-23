<template>
  <main class="pt-[80px] bg-white min-h-screen relative">
    
    <FloatingEmoji :activeIndex="activeIndex" />

    <section 
      ref="section0" 
      class="w-full flex justify-center items-center py-[40px]"
    >
      <div class="w-[100%] h-full">
        <video autoplay muted loop playsinline class="w-full h-auto block">
          <source src="@/assets/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
    </section>

    <section 
      ref="section1"
      class="w-full overflow-hidden py-[15px] bg-white group"
    >
      <div class="flex w-max animate-[scroll-left_40s_linear_infinite] group-hover:[animation-play-state:paused]">
        <div class="flex items-center" v-for="i in 2" :key="i">


          <div class="flex items-center px-[40px] whitespace-nowrap">
            <span class="font-[600] text-[1.0rem] mr-[15px]">新一代設計展 Young Designers' Exhibition</span>
            <span class="font-[600] text-[1.0rem]">2O26.O5.22 Fri.</span>
            <span class="font-[600] text-[1.0rem]"> → </span>
            <span class="font-[600] text-[1.0rem]">O5.25 Mon.</span>
            <span class="font-[600] text-[1.0rem] ml-[15px]">南港展覽館二館 Taipei Nangang Exhibition Center Hall 2</span>
          </div>

          <div class="flex items-center px-[40px] whitespace-nowrap">
            <span class="font-[600] text-[1.0rem] mr-[15px]">放視大賞 Vision Get Wild Award </span>
            <span class="font-[600] text-[1.0rem]">2O26.O5.28 Thu.</span>
            <span class="font-[600] text-[1.0rem]"> → </span>
            <span class="font-[600] text-[1.0rem]">O5.3O Sat.</span>
            <span class="font-[600] text-[1.0rem] ml-[15px]">高雄展覽館南館 Kaohsiung Exhibition Center South Hall</span>
          </div>

          <div class="flex items-center px-[40px] whitespace-nowrap">
            <span class="font-[600] text-[1.0rem] mr-[15px]">校內展 On-campus Exhibition</span>
            <span class="font-[600] text-[1.0rem]">2O26.O5.O1 Fri..</span>
            <span class="font-[600] text-[1.0rem]"> → </span>
            <span class="font-[600] text-[1.0rem]">O5.O4 Mon.</span>
            <span class="font-[600] text-[1.0rem] ml-[15px]">北科藝文中心 TaipeiTech Arts and  Cultural Center</span>
          </div>
          
        </div>
      </div>
    </section>

    <div ref="section2" id="aboutus">
      <ConceptSection />
    </div>
    

    <div ref="section3">
      <BubbleTheorySection/>
    </div>
    

    <div ref="section4" id="work-introduction">
      <WorkScrollSection/>
    </div>

    <div ref="section5" id="teaser-video">
     <TeaserSection />
     </div>

     <div ref="section6" id="goods">
     <GoodsSection />
     </div>

     <div ref="section7" id="sponsor">
     <SponsorSection />
     </div>

     <div ref="section8" id="advisor">
     <AdvisorSection />
     </div>

      <div ref="section9" id="footer">
        <FooterSection />
      </div>


  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import WorkScrollSection from '@/components/WorkScrollSection.vue';
//import RotatingArrow from '@/components/RotatingArrow.vue';
import FloatingEmoji from '@/components/FloatingEmoji.vue'; // 引入組件
//import arrowImg from '@/assets/rrrr-logo-graffiti.png';
//import ScrollVideoSection from '@/components/ScrollVideoSection.vue';
import TeaserSection from '@/components/TeaserSection.vue';
import ConceptSection from '@/components/ConceptSection.vue';
import GoodsSection from '@/components/GoodsSection.vue'; 
import BubbleTheorySection from '@/components/BubbleTheorySection.vue';
import SponsorSection from '@/components/SponsorSection.vue';
import AdvisorSection from '@/components/AdvisorSection.vue';
import FooterSection from '@/components/FooterSection.vue';

// --- 滾動偵測與索引管理 ---
const activeIndex = ref(0);
const section0 = ref<HTMLElement | null>(null);
const section1 = ref<HTMLElement | null>(null);
const section2 = ref<HTMLElement | null>(null);
const section3 = ref<HTMLElement | null>(null);
const section4 = ref<HTMLElement | null>(null);

let observer: IntersectionObserver | null = null;

onMounted(() => {
  const sectionRefs = [section0, section1, section2, section3, section4];
  
  // 設定交叉觀察器
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 找出當前進入視窗的是哪一個區塊
        const index = sectionRefs.findIndex(refItem => refItem.value === entry.target);
        if (index !== -1) {
          activeIndex.value = index;
        }
      }
    });
  }, {
    threshold: 0.3, // 區塊露出 30% 即算切換
    rootMargin: "-10% 0px -10% 0px" // 微調觸發範圍，讓切換更精準
  });

  // 開始觀察
  sectionRefs.forEach(s => {
    if (s.value) observer?.observe(s.value);
  });
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<style>
/* 跑馬燈動畫 */
@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>