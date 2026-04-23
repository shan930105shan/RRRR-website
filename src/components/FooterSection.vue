<script setup lang="ts">
import moreRRRR from '@/assets/footer/more.png'; // 替換為你的圖片路徑
import iconIg from '@/assets/footer/ig.png';
import iconFB from '@/assets/footer/fb.png';
import iconThreads from '@/assets/footer/threads.png';

// 定義社群連結資料
const socialLinks = [
  { id: 'ig', src: iconIg, url: 'https://instagram.com/ntut.ixd', alt: 'Instagram' },
  { id: 'fb', src: iconFB, url: 'https://facebook.com/NTUT111IXD', alt: 'FB' },
  { id: 'threads',  src: iconThreads, url: 'https://www.threads.com/@ntut.ixd', alt: 'Threads' },
];
</script>

<template>
  <footer class="w-full bg-white py-20 px-10 md:px-20 border-t border-gray-100">
    <div class="max-w-[1440px] mx-auto flex flex-col items-end">
      
      <div class="mb-6 w-64 md:w-80">
        <img :src="moreRRRR" alt="More RRRR" class="w-full h-auto object-contain" />
      </div>

      <div class="flex gap-6 items-center">
        <a 
          v-for="link in socialLinks" 
          :key="link.id" 
          :href="link.url" 
          target="_blank" 
          rel="noopener noreferrer"
          class="transition-transform duration-300 hover:-translate-y-1"
        >
          <img :src="link.src" :alt="link.alt" class="w-6 h-6 md:w-7 md:h-7 object-contain opacity-80 hover:opacity-100" />
        </a>
      </div>

      <p class="mt-10 text-[10px] tracking-[0.2em] text-gray-400 uppercase">
        © 2026 TaipeiTech Interaction Design. All Rights Reserved.
      </p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  /* 確保 Footer 總是在最底層 */
  position: relative;
  z-index: 10;
}
</style>