// 定義組員的資料結構
export interface Member {
  name: string;
  role: string;
  img: string; // 組員照片路徑
}

// 修改後的作品資料結構
export interface WorkItem {
  id: number;
  title: string;
  subtitle: string;    // 新增：小標題 (例如：C回到課桌前...)
  year: string;
  category: string;
  concept: string;     // 介紹文字
  images: string[];    // 作品圖片陣列 (1.png, 2.png...)
  members: Member[];   // 新增：組員陣列
}

// 資料範例 (供參考填寫方式)
export const WORK_DATA: WorkItem[] = [
  {
    id: 1,
    title: "C計畫",
    subtitle: "C回到課桌前，再當一次冒險家！",
    year: "2026",
    category: "Game Design",
    concept: "小時候，我們曾將不同的文具組合成自己的專屬武器，在課桌之間展開只屬於自己的冒險。\n「C計畫」希望帶領玩家重返那段用文具建構的幻想時光...",
    images: [
      new URL('../assets/work/group1/1.png', import.meta.url).href,
      new URL('../assets/work/group1/2.png', import.meta.url).href,
      new URL('../assets/work/group1/3.png', import.meta.url).href,
    ],
    members: [
      { 
        name: "央志賽", 
        role: "○特效○", 
        img: new URL('../assets/member/group1/1.jpg', import.meta.url).href 
      },
      { 
        name: "邱瑋柔", 
        role: "○3D美術○", 
        img: new URL('../assets/member/group1/2.jpg', import.meta.url).href 
      },
      { 
        name: "方萁萱", 
        role: "○程式○", 
        img: new URL('../assets/member/group1/3.jpg', import.meta.url).href 
      },
      { 
        name: "王邵琪", 
        role: "○3D美術○", 
        img: new URL('../assets/member/group1/4.jpg', import.meta.url).href 
      },
    ]
  },
  // 下一個作品...
];