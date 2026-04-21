<script setup lang="ts">
import { ref, watch } from 'vue';

// 定義 Props
const props = defineProps<{
  isOpen: boolean;
  work: any;
}>();

// 定義 Emit 用於關閉彈窗
const emit = defineEmits(['close']);

// 當前顯示的圖片索引
const activeImgIndex = ref(0);

// 當作品切換時，將圖片索引重置為 0
watch(() => props.work, () => {
  activeImgIndex.value = 0;
});

// 修正紅線錯誤：使用函式來處理賦值
const setImgIndex = (idx: number) => {
  activeImgIndex.value = idx;
};

const nextImg = () => {
  if (props.work?.images) {
    activeImgIndex.value = (activeImgIndex.value + 1) % props.work.images.length;
  }
};

const prevImg = () => {
  if (props.work?.images) {
    activeImgIndex.value = (activeImgIndex.value - 1 + props.work.images.length) % props.work.images.length;
  }
};

const close = () => {
  emit('close');
};
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
      
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="close"></div>

      <div class="relative bg-white w-full max-w-4xl aspect-[9/5] overflow-hidden shadow-2xl flex flex-col md:flex-row border-b-[12px] border-black">
        
        <button 
          @click="close" 
          class="absolute top-5 right-5 z-50 hover:rotate-90 transition-transform duration-300"
        >
          <svg width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" fill="none" stroke="black" stroke-width="2.5"/>
            <path d="M12 12L28 28M28 12L12 28" stroke="black" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
        </button>

        <div class="w-full md:w-[45%] bg-white p-6 flex flex-col">
          <div class="relative flex-1 flex items-center justify-center group min-h-[300px]">
            <button 
              v-if="work?.images?.length > 1" 
              @click="prevImg" 
              class="absolute left-0 text-4xl text-pink-500 z-10 font-bold hover:scale-125 transition-transform p-2"
            > &lt; </button>
            
            <img 
              :src="work?.images[activeImgIndex]" 
              class="max-w-full max-h-[55vh] object-contain drop-shadow-xl" 
            />

            <button 
              v-if="work?.images?.length > 1" 
              @click="nextImg" 
              class="absolute right-0 text-4xl text-pink-500 z-10 font-bold hover:scale-125 transition-transform p-2"
            > &gt; </button>
          </div>

          <div class="mt-6 flex gap-3 overflow-x-auto py-2 scrollbar-hide">
            <button 
              v-for="(img, idx) in work?.images" 
              :key="idx"
              @click="setImgIndex(idx)"
              class="w-18 aspect-square flex-shrink-0 border-2 transition-all duration-300"
              :class="activeImgIndex === idx ? 'border-pink-500 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'"
            >
              <img :src="img" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <div class="w-full md:w-[55%] p-8 md:p-14 bg-white flex flex-col overflow-y-auto">
          
          <div class="mb-12">
            <h2 class="text-5xl font-black mb-3 tracking-tighter">{{ work?.title }}</h2>
            <h3 class="text-l font-bold text-gray-800 mb-8">{{ work?.subtitle }}</h3>
            <p class="text-gray-600 leading-relaxed text-[0.8rem] whitespace-pre-line">
              {{ work?.concept }}
            </p>
          </div>

          <div class="mt-auto pt-8">
            <div class="flex flex-wrap gap-x-2 gap-y-4">
              <div 
                v-for="(member, mIdx) in work?.members" 
                :key="mIdx" 
                class="w-[85px] flex flex-col items-center text-center group"
              >
                <div class="w-full aspect-[3/4] bg-gray-100 mb-3 overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                  <img :src="member.img" class="w-full h-full object-cover transition-all duration-500" />
                </div>
                <p class="text-sm font-bold text-black mb-1 whitespace-nowrap">{{ member.name }}</p>
                <p class="text-[10px] font-medium text-gray-400 tracking-widest leading-tight uppercase">
                  {{ member.role }}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* 淡入淡出動畫 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 隱藏捲軸但保留功能 (Chrome/Safari) */
.scrollbar-hide::-webkit-scrollbar {
  height: 4px;
}
.scrollbar-hide::-webkit-scrollbar-thumb {
  background: #eee;
  border-radius: 10px;
}

/* 讓文字區塊滾動更順暢 */
.overflow-y-auto {
  scrollbar-gutter: stable;
}
</style>