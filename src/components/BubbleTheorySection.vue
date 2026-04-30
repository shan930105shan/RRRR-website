<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const leftCircleRef = ref(null);
const rightCircleRef = ref(null);

let ctx: gsap.Context | null = null;

onMounted(() => {
  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: "top bottom",
        end: "+=300%",
        scrub: 1,
      }
    });
    tl.to(leftCircleRef.value, { rotation: 360, ease: "none" }, 0);
    tl.to(rightCircleRef.value, { rotation: -360, ease: "none" }, 0);
  }, sectionRef.value!);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <section ref="sectionRef" class="relative w-full py-48 md:py-32 bg-white overflow-hidden">
    
    <div class="max-w-[1200px] mx-auto px-10 relative z-10">
      <div class="w-full flex justify-center">
        <div class="max-w-[600px] text-center text-black leading-[2.2] tracking-widest text-[0.95rem] md:text-[1.1rem]">
          <p class="mb-10 font-bold">近一步拆解其行為結構——「咀嚼 → 吹出 → 迸發」</p>
          <p class="mb-10 opacity-80">我們接收訊息、反覆咀嚼；在內化中等待行動的契機。</p>
          <p class="font-bold">每一次咀嚼、每一件作品，都在改變未來的走向。</p>
        </div>
      </div>
    </div>

    <div 
      ref="leftCircleRef"
      class="absolute 
             /* 手機版：右上 */
             top-[-150px] right-[-150px] left-auto bottom-auto translate-y-0
             /* 電腦版：完全還原你的設定，並強制清除手機版樣式 */
             md:left-[-200px] md:top-[0%] md:right-auto md:bottom-auto md:-translate-y-1/2"
    >
      <img src="@/assets/bubble-ring.png" alt="" class="w-[300px] md:w-[450px] h-auto" />
    </div>

    <div 
      ref="rightCircleRef"
      class="absolute 
             /* 手機版：左下 */
             bottom-[-150px] left-[-150px] right-auto top-auto translate-y-0
             /* 電腦版：完全還原你的設定，並強制清除手機版樣式 */
             md:right-[-200px] md:top-[0%] md:left-auto md:bottom-auto md:-translate-y-1/2"
    >
      <img src="@/assets/bubble-ring.png" alt="" class="w-[300px] md:w-[450px] h-auto" />
    </div>

  </section>
</template>

<style scoped>
.absolute {
  will-change: transform;
}
</style>