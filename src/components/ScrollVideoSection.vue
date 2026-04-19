<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 註冊套件
gsap.registerPlugin(ScrollTrigger);

const containerRef = ref(null);
const videoRef = ref<HTMLVideoElement | null>(null);

onMounted(() => {
  const video = videoRef.value;
  if (!video) return;

  // 確保影片元數據載入，才能抓到正確的 duration
  video.addEventListener('loadedmetadata', () => {
    gsap.to(video, {
      currentTime: video.duration || 1, // 將時間軸映射到影片長度
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.value,
        start: "top top",
        // 修改這裡：讓結束點更精確
        end: "bottom bottom", 
        scrub: 1,
        pin: true,
        // 新增：播完後自動取消固定，讓捲軸順著滑下去
        pinSpacing: true, 
      }
    });
  });
});
</script>

<template>
  <div ref="containerRef" class="relative w-full h-[100vh] bg-white">
    
    <div class="sticky top-0 w-full h-screen flex items-center justify-center">
      
      <div class="h-full aspect-[16/9] bg-gray-100 relative">
        <video
          ref="videoRef"
          src="@/assets/Info.mp4"
          preload="auto"
          muted
          playsinline
          class="w-full h-full object-cover"
        ></video>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* 避免影片在某些瀏覽器出現微小跳動 */
video {
  will-change: contents;
}
</style>