<script setup lang="ts">
import { ref, watch, computed, onUnmounted } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  work: any;
}>();

const emit = defineEmits(['close']);
const activeImgIndex = ref(0);

// 當切換不同作品時，重置圖片索引
watch(() => props.work, () => {
  activeImgIndex.value = 0;
});

// 紀錄開啟彈窗前的捲動位置
let scrollPos = 0;

// 核心修復：使用 classList 配合 App.vue 控制 Navbar 顯示，並鎖定背景
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    scrollPos = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPos}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    // 🚩 通知 App.vue 隱藏 Navbar
    document.body.classList.add('modal-open'); 
  } else {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    // 🚩 恢復 Navbar
    document.body.classList.remove('modal-open');
    window.scrollTo(0, scrollPos);
  }
});

onUnmounted(() => {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  document.body.style.overflow = '';
  document.body.classList.remove('modal-open');
});

const visibleThumbnailIndices = computed(() => {
  const total = props.work?.images?.length || 0;
  if (total <= 3) return Array.from({ length: total }, (_, i) => i);
  let start = activeImgIndex.value - 1;
  if (start < 0) start = 0;
  if (start + 3 > total) start = total - 3;
  return Array.from({ length: 3 }, (_, i) => start + i);
});

const setImgIndex = (idx: number) => { activeImgIndex.value = idx; };
const nextImg = () => {
  if (props.work?.images) activeImgIndex.value = (activeImgIndex.value + 1) % props.work.images.length;
};
const prevImg = () => {
  if (props.work?.images) activeImgIndex.value = (activeImgIndex.value - 1 + props.work.images.length) % props.work.images.length;
};
const close = () => { emit('close'); };
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-[99999] flex items-center justify-center p-0 md:p-8 overflow-hidden">
        
        <div class="absolute inset-0 bg-black/90 backdrop-blur-md" @click="close"></div>

        <div class="relative bg-white w-full max-w-full h-full md:h-auto md:max-w-4xl md:aspect-[16/10] flex flex-col md:flex-row border-b-[10px] border-black overflow-hidden shadow-2xl">
          
          <button 
            @click="close" 
            class="absolute top-4 right-4 z-[60] bg-white rounded-full p-1 shadow-md md:bg-transparent md:shadow-none transition-transform hover:scale-110"
          >
            <svg width="32" height="32" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18" fill="none" stroke="black" stroke-width="3"/>
              <path d="M12 12L28 28M28 12L12 28" stroke="black" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </button>

          <div class="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col md:flex-row touch-pan-y">
            
            <div class="w-full md:w-[45%] bg-gray-50 flex flex-col shrink-0 min-h-[350px] md:min-h-0">
              <div class="relative flex-1 flex items-center justify-center pt-12 md:pt-0 overflow-hidden group">
                
                <button 
                  v-if="work?.images?.length > 1" 
                  @click="prevImg" 
                  class="absolute z-20 left-4 w-10 h-10 rounded-full bg-black/80 flex items-center justify-center transition-all hover:scale-110 hover:bg-black"
                > 
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M15 19l-7-7 7-7" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                
                <img 
                  :src="work?.images[activeImgIndex]" 
                  class="w-full h-full object-contain drop-shadow-xl p-4" 
                />

                <button 
                  v-if="work?.images?.length > 1" 
                  @click="nextImg" 
                  class="absolute z-20 right-4 w-10 h-10 rounded-full bg-black/80 flex items-center justify-center transition-all hover:scale-110 hover:bg-black"
                > 
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M9 5l7 7-7 7" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>

              <div class="flex justify-center gap-2 pb-6 pt-2 bg-gray-50">
                <button 
                  v-for="idx in visibleThumbnailIndices" 
                  :key="idx"
                  @click="setImgIndex(idx)"
                  class="w-12 h-12 border-2 transition-all flex-shrink-0"
                  :class="activeImgIndex === idx ? 'border-pink-500 scale-105 shadow-sm' : 'border-transparent opacity-40'"
                >
                  <img :src="work?.images[idx]" class="w-full h-full object-cover" />
                </button>
              </div>
            </div>

            <div class="w-full md:w-[55%] p-8 md:p-12 bg-white flex flex-col">
              <div class="mb-8">
                <h2 class="text-3xl md:text-5xl font-black mb-2 tracking-tighter">{{ work?.title }}</h2>
                <h3 class="text-sm md:text-base font-bold text-pink-500 mb-6 tracking-widest uppercase">{{ work?.subtitle }}</h3>
                <div class="w-10 h-1 bg-black mb-6"></div>
                <p class="text-gray-700 leading-relaxed text-[0.9rem] whitespace-pre-line text-justify mb-10">
                  {{ work?.concept }}
                </p>
              </div>

              <div class="border-t border-gray-100 pt-8">
                <h4 class="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-6">Production Team</h4>
                <div class="grid grid-cols-3 gap-y-8 gap-x-4">
                  <div v-for="(member, mIdx) in work?.members" :key="mIdx" class="flex flex-col items-center text-center group overflow-hidden">
                    <div class="w-full aspect-[3/4] bg-gray-100 mb-2 overflow-hidden border border-gray-100">
                      <img :src="member.img" class="w-full h-full object-cover transition-all" />
                    </div>
                    <p class="text-[11px] font-bold text-black mb-0.5 truncate w-full px-1">{{ member.name }}</p>
                    <p class="text-[9px] font-medium text-gray-400 tracking-tighter uppercase px-1">{{ member.role }}</p>
                  </div>
                </div>
              </div>
            </div>

          </div> 
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.overflow-y-auto {
  -webkit-overflow-scrolling: touch;
}
@media (min-width: 768px) {
  .overflow-y-auto::-webkit-scrollbar { width: 6px; }
  .overflow-y-auto::-webkit-scrollbar-thumb { background-color: #000; }
}
</style>