<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 假設你有 10 張頭像
const allAvatars = Array.from({ length: 10 }, (_, i) => 
  new URL(`../assets/avatars/${i + 1}.png`, import.meta.url).href
);

// 畫面上顯示的 8 個位置
const displayAvatars = ref([...allAvatars.slice(0, 8)]);

let timer: number | null = null;

const startRandomChange = () => {
  timer = window.setInterval(() => {
    // 隨機選取畫面上的其中一個位置 (0~7)
    const displayIndex = Math.floor(Math.random() * 8);
    // 隨機選取庫裡的一張圖 (0~9)
    const poolIndex = Math.floor(Math.random() * 10);
    
    displayAvatars.value[displayIndex] = allAvatars[poolIndex];
  }, 100); // 每 0.8 秒變換一次，頻率可調
};

onMounted(() => {
  startRandomChange();
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <section class="w-full pt-[100px] pb-0 bg-white flex flex-col items-center">
    <div class="max-w-[800px] text-black text-center mb-[80px] px-6">
      <p class="text-[1.1rem] leading-[2] mb-8 tracking-widest">
        作為畢業展的核心主題，我們試圖提出一種屬於全體創作者的共同象徵。<br>
        本次展覽的核心聚焦於「創作」本身，並將其提煉為三個不可分割的階段：<br>
        思考 → 轉化 → 實現
      </p>
      
      <p class="text-[1.1rem] leading-[2] mb-8 tracking-widest">
        我們觀察到，當代新銳創作者具備鮮明的集體特質：誠實面對內在需求、直視<br>
        自我價值，並勇於在既有框架中進行破格嘗試。為使抽象的創作心理具象化，<br>
        我們取「泡泡糖」為意象載體。泡泡糖天生帶有街頭、青春與自主性的文化連<br>
        結，其咀嚼、吹出至迸發的動態過程，映射了創作中不斷推敲與轉譯的狀態。
      </p>

      <p class="text-[1.1rem] leading-[2] mb-8 tracking-widest">
        進一步拆解其行為結構——「咀嚼 → 吹出 → 迸發」，恰與創作三階段形成<br>
        完美的對位關係。當泡泡迸發，其瞬間產生的響聲與空間共振——<br>
        誠如我們的每一件作品與每一次表達，正持續震盪並改變著未來的走向<br>
      </p>
    </div>

    <div class="w-full grid grid-cols-4 md:grid-cols-8">
      <div 
        v-for="(img, index) in displayAvatars" 
        :key="index"
        class="aspect-[3/4] overflow-hidden last:border-r-0"
      >
        <transition name="pix-fade" mode="out-in">
          <img :key="img" :src="img" class="w-full h-full object-cover" />
        </transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 簡單的閃爍淡入效果 */
.pix-fade-enter-active, .pix-fade-leave-active {
  transition: opacity 0.3s ease;
}
.pix-fade-enter-from, .pix-fade-leave-to {
  opacity: 0;
}
</style>