<script setup lang="ts">
import sponsorTitle from '@/assets/sponsor-title.png'; 
</script>

<template>
  <section class="relative w-full bg-white mt-20 md:mt-40 py-16 md:py-20 overflow-hidden">

    <div class="absolute top-0 left-6 md:top-10 md:left-10 w-52 md:w-70 z-20">
      <img :src="sponsorTitle" alt="贊助夥伴" class="w-full h-auto object-contain" />
    </div>

    <div class="flex flex-col gap-6 md:gap-8 pt-20 md:pt-24">
      
      <div class="marquee-container">
        <div class="marquee-content marquee-right">
          <p v-for="i in 3" :key="i" class="whitespace-nowrap text-sm md:text-lg tracking-widest px-4 text-black">
            本次展覽感謝 <span class="font-bold">宣藝術</span> <span class="font-bold">金展創意</span> <span class="font-bold">數辰創藝</span> <span class="font-bold">瑞思影像工作室</span> <span class="font-bold">雞肉本家</span> 的支持與幫助
            &nbsp;&nbsp;&nbsp;&nbsp;
          </p>
        </div>
      </div>

      <div class="marquee-container">
        <div class="marquee-content marquee-left">
          <p v-for="i in 4" :key="i" class="whitespace-nowrap text-sm md:text-lg tracking-widest px-4 text-black">
            本次展覽感謝 <span class="font-bold">張啓城 校友</span> <span class="font-bold">李名芳 校友</span> <span class="font-bold">吳宗權 校友</span> <span class="font-bold">114年度 實作場域設備精進計畫</span> 的支持與幫助
            &nbsp;&nbsp;&nbsp;&nbsp;
          </p>
        </div>
      </div>

      <div class="marquee-container mt-4">
        <div class="marquee-content marquee-right">
          <div v-for="i in 5" :key="i" class="flex gap-8 md:gap-10 px-5">
            <img src="@/assets/sponsors/logo1.jpg" class="h-10 md:h-16 w-auto grayscale hover:grayscale-0 transition-all" />
            <img src="@/assets/sponsors/logo2.jpg" class="h-10 md:h-16 w-auto grayscale hover:grayscale-0 transition-all" />
            <img src="@/assets/sponsors/logo3.jpg" class="h-10 md:h-16 w-auto grayscale hover:grayscale-0 transition-all" />
            <img src="@/assets/sponsors/logo4.jpg" class="h-10 md:h-16 w-auto grayscale hover:grayscale-0 transition-all" />
            <img src="@/assets/sponsors/logo5.jpg" class="h-10 md:h-16 w-auto grayscale hover:grayscale-0 transition-all" />
            <img src="@/assets/sponsors/logo6.jpg" class="h-10 md:h-16 w-auto grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.marquee-container {
  @apply flex overflow-hidden w-full;
}

.marquee-content {
  @apply flex shrink-0 min-w-full;
}

.marquee-left {
  animation: scroll-left 30s linear infinite; /* 稍微調慢一點點，手機版比較好閱讀 */
}

.marquee-right {
  animation: scroll-right 30s linear infinite;
}

@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes scroll-right {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
</style>