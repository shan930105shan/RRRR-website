<script setup lang="ts">
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const containerRef = ref(null);
const videoRef = ref<HTMLVideoElement | null>(null);

onMounted(() => {
  const video = videoRef.value;
  if (!video) return;

  video.addEventListener('loadedmetadata', () => {
    gsap.to(video, {
      currentTime: video.duration || 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.value,
        start: "top top",
        // 增加滾動距離，讓影片播放感更細膩 (例如 300%)
        end: "+=300%", 
        scrub: 1,
        pin: true,
        pinSpacing: true, 
      }
    });
  });
});
</script>

<template>
  <div ref="containerRef" class="w-full bg-black overflow-hidden">
    <div class="w-full h-screen flex items-center justify-center">
      
      <div class="w-full h-full relative">
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
video {
  will-change: transform; /* 改用 transform 效能較佳 */
}
</style>