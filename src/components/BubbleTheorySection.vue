<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 記得註冊插件
gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const leftCircleRef = ref(null);
const rightCircleRef = ref(null);

let ctx: gsap.Context | null = null;

onMounted(() => {
  // 使用 gsap.context 可以便於在組件卸載時清理動畫，避免記憶體流失
  ctx = gsap.context(() => {
    // 建立時間軸，並將其連結到 ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value, // 動畫觸發的區塊
        start: "top bottom",       // 當區塊頂部到達視窗底部時開始計算
        end: "+=300%",         // 要滾 2000 像素才會結束這個畫面
        scrub: 1,                  // 關鍵設定！將動畫與滾動進度「同步」（1 代表有 1 秒的平滑延遲，讓轉動更柔和）
        // markers: true,          // 調試時可打開，觀察觸發線
      }
    });

    // 定義左側圓形的旋轉：往下滾時，從 0 度轉到 360 度
    tl.to(leftCircleRef.value, {
      rotation: 360,
      ease: "none", // 滾動動畫通常使用 linear (none) 速度
    }, 0); // 這裡的 0 代表時間軸開始點同時執行

    // 定義右側圓形的旋轉：反向轉動
    tl.to(rightCircleRef.value, {
      rotation: -360,
      ease: "none",
    }, 0); // 同時執行
  }, sectionRef.value!); // 限定 scope 為此組件
});

onUnmounted(() => {
  // 卸載時清理 ScrollTrigger 實例
  if (ctx) ctx.revert();
});
</script>

<template>
  <section ref="sectionRef" class="relative w-full py-32 bg-white overflow-hidden">
    
    <div class="max-w-[1200px] mx-auto px-10 relative z-10">
      <div class="w-full flex justify-center">
        <div class="max-w-[600px] text-center text-black leading-[2.2] tracking-widest text-[1.1rem]">
          <p class="mb-10 font-bold">
            近一步拆解其行為結構——「咀嚼 → 吹出 → 迸發」<br>
            與創作三階段形成完美對位。
          </p>
          <p class="mb-10 opacity-80">
            我們接收訊息、反覆咀嚼；在內化中等待行動的契機。<br>
            掌控吹出的節奏，泡泡糖迸裂時的響聲，正引發周遭空間的共振。
          </p>
          <p class="font-bold">
            每一次咀嚼、每一件作品，都在改變未來的走向。
          </p>
        </div>
      </div>
    </div>

    <div 
      ref="leftCircleRef"
      class="absolute left-[-200px] top-[50%] transform translate-y-[-50%]"
    >
      <img src="@/assets/bubble-ring.png" alt="" class="w-[500px] h-auto" />
    </div>

    <div 
      ref="rightCircleRef"
      class="absolute right-[-200px] top-[50%] transform translate-y-[-50%]"
    >
      <img src="@/assets/bubble-ring.png" alt="" class="w-[500px] h-auto" />
    </div>

  </section>
</template>

<style scoped>
/* 為了讓 rotation 動畫順暢，確保元素有 transform屬性 */
.absolute {
  will-change: transform;
}
</style>