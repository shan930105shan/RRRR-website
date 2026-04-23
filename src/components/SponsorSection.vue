<script setup lang="ts">
import sponsorTitle from '@/assets/sponsor-title.png'; // 確保路徑與檔名正確
</script>

<template>
  <section class="relative w-full bg-white mt-40 py-20 overflow-hidden">

    <div class="absolute top-10 left-10 w-42 md:w-50 z-20">
      <img :src="sponsorTitle" alt="贊助夥伴" class="w-full h-auto object-contain" />
    </div>

    <div class="flex flex-col gap-8 pt-20">
      
      <div class="marquee-container">
        <div class="marquee-content marquee-right">
          <p v-for="i in 3" :key="i" class="whitespace-nowrap text-lg tracking-widest px-4">
            本次展覽感謝 <span class="font-bold">宣藝術</span> <span class="font-bold">金展創意</span> <span class="font-bold">數辰創藝</span> <span class="font-bold">瑞思影像工作室</span> <span class="font-bold">雞肉本家</span> 的支持與幫助
            &nbsp;&nbsp;&nbsp;&nbsp;
          </p>
        </div>
      </div>

      <div class="marquee-container">
        <div class="marquee-content marquee-left">
          <p v-for="i in 4" :key="i" class="whitespace-nowrap text-lg tracking-widest px-4">
            本次展覽感謝 <span class="font-bold">張啓城 校友</span> <span class="font-bold">李名芳 校友</span> <span class="font-bold">吳宗權 校友</span> <span class="font-bold">陳圳卿 主任</span> 的支持與幫助
            &nbsp;&nbsp;&nbsp;&nbsp;
          </p>
        </div>
      </div>

      <div class="marquee-container mt-4">
        <div class="marquee-content marquee-right">
          <div v-for="i in 5" :key="i" class="flex gap-10 px-5">
            <img src="@/assets/sponsors/logo1.jpg" class="h-16 w-auto grayscale hover:grayscale-0 transition-all" />
            <img src="@/assets/sponsors/logo2.jpg" class="h-16 w-auto grayscale hover:grayscale-0 transition-all" />
            <img src="@/assets/sponsors/logo3.jpg" class="h-16 w-auto grayscale hover:grayscale-0 transition-all" />
            <img src="@/assets/sponsors/logo4.jpg" class="h-16 w-auto grayscale hover:grayscale-0 transition-all" />
            <img src="@/assets/sponsors/logo5.jpg" class="h-16 w-auto grayscale hover:grayscale-0 transition-all" />
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
  animation: scroll-left 20s linear infinite;
}

.marquee-right {
  animation: scroll-right 20s linear infinite;
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