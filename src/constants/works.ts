// 定義組員的資料結構
export interface Member {
  name: string;
  role: string;
  img: string;
}

// 修改後的作品資料結構，移除 year 與 category
export interface WorkItem {
  id: number;
  title: string;
  subtitle: string;
  concept: string;
  images: string[];
  members: Member[];
}

export const WORK_DATA: WorkItem[] = [
  {
    id: 19,
    title: "越界群落 Beyond the Colony",
    subtitle: "“I’m not chosen. I choose.”",
    concept: "《越界群落 Beyond the Colony》是一件以互動遊戲為核心的創作，透過「切葉蟻社會」作為隱喻，探討個體在高度制度化群體中的角色分工、順從與越界的可能性。",
    images: [
      new URL('../assets/work/group19/1.png', import.meta.url).href,
      new URL('../assets/work/group19/2.png', import.meta.url).href,
    ],
    members: [
      { name: "謝丞武", role: "3D建模", img: new URL('../assets/member/group19/1.jpg', import.meta.url).href },
      { name: "游曼林", role: "美術", img: new URL('../assets/member/group19/2.jpg', import.meta.url).href },
      { name: "許芮銘", role: "程式", img: new URL('../assets/member/group19/3.jpg', import.meta.url).href },
      { name: "游巧蕙", role: "展場設計", img: new URL('../assets/member/group19/4.jpg', import.meta.url).href },
    ]
  },
  {
    id: 18,
    title: "憂隔",
    subtitle: "在憂中留白，為自己劃出柔軟的邊界。",
    concept: "《憂隔》的核心理念是「情緒的緩衝與正念的轉化」。我們主張在現實壓力和內心世界之間，利用 AI 科技與正念練習建立一道「隔層」，讓使用者將負面情緒轉化為自我成長的養分。",
    images: [
        new URL('../assets/work/group18/1.png', import.meta.url).href,
        new URL('../assets/work/group18/2.png', import.meta.url).href,
        new URL('../assets/work/group18/3.png', import.meta.url).href,
        new URL('../assets/work/group18/4.png', import.meta.url).href,
        new URL('../assets/work/group18/5.png', import.meta.url).href,
    ],
    members: [
      { name: "朱柏翰", role: "UIUX、前端程式", img: new URL('../assets/member/group18/1.jpg', import.meta.url).href },
      { name: "賴宣妤", role: "美術、AI圖像及語音生成", img: new URL('../assets/member/group18/2.jpg', import.meta.url).href },
      { name: "周琳", role: "美術、UI動畫", img: new URL('../assets/member/group18/3.jpg', import.meta.url).href },
    ]
  },
  {
    id: 17,
    title: "陽光沒有照亮的那一半",
    subtitle: "當光照進另一半，他們的努力可以完整地被看見。",
    concept: "利用 MR 混合實境技術，打造針對「閱讀障礙」的沉浸式體驗。最終將使用者輸入轉化為扭曲的學障字跡並投影於「共鳴牆」，讓大眾看見彼此的體驗與感受。",
    images: [
        new URL('../assets/work/group17/1.png', import.meta.url).href,
        new URL('../assets/work/group17/2.png', import.meta.url).href,
        new URL('../assets/work/group17/3.png', import.meta.url).href,
        new URL('../assets/work/group17/4.png', import.meta.url).href,
        new URL('../assets/work/group17/5.png', import.meta.url).href,
    ],
    members: [
      { name: "鄭頌揚", role: "企劃發想、互動系統開發", img: new URL('../assets/member/group17/1.jpg', import.meta.url).href },
      { name: "姜欣妤", role: "主視覺設計、字卡動畫", img: new URL('../assets/member/group17/2.jpg', import.meta.url).href },
      { name: "陳小春", role: "書籍動畫", img: new URL('../assets/member/group17/3.jpg', import.meta.url).href },
      { name: "徐詩婷", role: "MR互動開發", img: new URL('../assets/member/group17/4.jpg', import.meta.url).href },
    ]
  },
  {
    id: 16,
    title: "SOZO",
    subtitle: "To Make Whole",
    concept: "一個關於聖餐的互動體驗——對救贖、醫治與釋放的深刻紀念。",
    images: [
        new URL('../assets/work/group16/1.png', import.meta.url).href,
        new URL('../assets/work/group16/2.png', import.meta.url).href,
        new URL('../assets/work/group16/3.png', import.meta.url).href,
    ],
    members: [
      { name: "賀小薇", role: "程式", img: new URL('../assets/member/group16/1.jpg', import.meta.url).href },
      { name: "吳佳麗", role: "3D建模、平面設計", img: new URL('../assets/member/group16/2.jpg', import.meta.url).href },
      { name: "譚雯雲", role: "3D建模、動畫", img: new URL('../assets/member/group16/3.jpg', import.meta.url).href },
    ]
  },
  {
    id: 15,
    title: "Pry",
    subtitle: "當批判者成為需求者，我們與紅線的距離是多少？",
    concept: "以有聲布料為核心媒介的感官互動裝置，透過觸覺與聽覺的生理介入，探討器官販賣中「人性道德邊界的拉扯」。",
    images: [
        new URL('../assets/work/group15/1.png', import.meta.url).href,
        new URL('../assets/work/group15/2.png', import.meta.url).href,
        new URL('../assets/work/group15/3.png', import.meta.url).href,
        new URL('../assets/work/group15/4.png', import.meta.url).href,
        new URL('../assets/work/group15/5.png', import.meta.url).href,
    ],
    members: [
      { name: "戴子容", role: "程式、音樂", img: new URL('../assets/member/group15/1.jpg', import.meta.url).href },
      { name: "李欣庭", role: "視覺、展場", img: new URL('../assets/member/group15/2.jpg', import.meta.url).href },
      { name: "李冠瑾", role: "視覺、展場", img: new URL('../assets/member/group15/3.jpg', import.meta.url).href },
    ]
  },
  {
    id: 14,
    title: "Reverie",
    subtitle: "轉動夢境，感知虛實。",
    concept: "以夢境為核心，並以繪本作為敘事框架的沉浸式 VR 體驗。透過 VR 技術結合實體旋鈕，引導使用者在虛實交織的場景中探索變化。",
    images: [
        new URL('../assets/work/group14/1.png', import.meta.url).href,
        new URL('../assets/work/group14/2.png', import.meta.url).href,
        new URL('../assets/work/group14/3.png', import.meta.url).href,
        new URL('../assets/work/group14/4.png', import.meta.url).href,
    ],
    members: [
      { name: "蔡昀潔", role: "美術", img: new URL('../assets/member/group14/1.jpg', import.meta.url).href },
      { name: "連子薰", role: "美術", img: new URL('../assets/member/group14/2.jpg', import.meta.url).href },
      { name: "林宸妘", role: "硬體程式", img: new URL('../assets/member/group14/3.jpg', import.meta.url).href },
      { name: "盧珮瑜", role: "軟體程式", img: new URL('../assets/member/group14/4.jpg', import.meta.url).href },
    ]
  },
  {
    id: 13,
    title: "V_V",
    subtitle: "光與影的演奏，突破虛實邊界。",
    concept: "整合 DJ 與 VJ 功能的「操作系統」與「演奏體驗」，透過 VR 頭盔和 MIDI pad 在虛擬空間中使用音效，演奏出完整的音樂並觸發特效。",
    images: [
        new URL('../assets/work/group13/1.png', import.meta.url).href,
        new URL('../assets/work/group13/2.png', import.meta.url).href,
        new URL('../assets/work/group13/3.png', import.meta.url).href,
        new URL('../assets/work/group13/4.png', import.meta.url).href,
        new URL('../assets/work/group13/5.png', import.meta.url).href,
    ],
    members: [
      { name: "陳維漢", role: "3D建模、音樂", img: new URL('../assets/member/group13/1.jpg', import.meta.url).href },
      { name: "周冠諭", role: "程式", img: new URL('../assets/member/group13/2.jpg', import.meta.url).href },
      { name: "柯欣慈", role: "2D美術", img: new URL('../assets/member/group13/3.jpg', import.meta.url).href },
      { name: "鍾鳴峻", role: "場景特效", img: new URL('../assets/member/group13/4.jpg', import.meta.url).href },
      { name: "武皓文", role: "硬體製作", img: new URL('../assets/member/group13/5.jpg', import.meta.url).href },
    ]
  },
  {
    id: 12,
    title: "平凡的我與「真．陰晴不定女孩」",
    subtitle: "心情放晴，天空也跟著放晴。",
    concept: "打造能「以心情控操天氣」的 IP，延伸出獨特的故事與養成遊戲，讓情緒化為晴雨雲，每個人都有著自己的小氣象臺。",
    images: [
        new URL('../assets/work/group12/1.png', import.meta.url).href,
        new URL('../assets/work/group12/2.png', import.meta.url).href,
        new URL('../assets/work/group12/3.png', import.meta.url).href,
        new URL('../assets/work/group12/4.png', import.meta.url).href,
        new URL('../assets/work/group12/5.png', import.meta.url).href,
        new URL('../assets/work/group12/6.png', import.meta.url).href,
    ],
    members: [
      { name: "吳東諺", role: "背景、人物動畫", img: new URL('../assets/member/group12/1.jpg', import.meta.url).href },
      { name: "許韶緯", role: "劇本、UIUX", img: new URL('../assets/member/group12/2.jpg', import.meta.url).href },
      { name: "盧昱澂", role: "角色人物、CG插畫", img: new URL('../assets/member/group12/3.jpg', import.meta.url).href },
      { name: "范姜昱任", role: "遊戲、程式", img: new URL('../assets/member/group12/4.jpg', import.meta.url).href },
      { name: "許冠裕", role: "影片、遊戲劇本", img: new URL('../assets/member/group12/5.jpg', import.meta.url).href },
      { name: "白可奈", role: "吉祥物", img: new URL('../assets/member/group12/6.jpg', import.meta.url).href },
    ]
  },
  {
    id: 11,
    title: "Morphogenesis",
    subtitle: "Where motion feels alive.",
    concept: "本作以黏菌為互動媒材，轉譯其最短路徑、環境回應與合併行為。觀者透過即時介入揭示人類干預自然後所引發的動態平衡。",
    images: [
        new URL('../assets/work/group11/1.png', import.meta.url).href,
        new URL('../assets/work/group11/2.png', import.meta.url).href,
        new URL('../assets/work/group11/3.png', import.meta.url).href,
    ],
    members: [
      { name: "後藤脩", role: "程式、美術", img: new URL('../assets/member/group11/1.jpg', import.meta.url).href },
      { name: "謝竣宇", role: "程式、美術", img: new URL('../assets/member/group11/2.jpg', import.meta.url).href },
      { name: "陳奕晴", role: "程式、美術", img: new URL('../assets/member/group11/3.jpg', import.meta.url).href },
    ]
  },
  {
    id: 10,
    title: "Brrrd",
    subtitle: "沒人會知道一隻鳥為什麼死在路邊。",
    concept: "專注「鳥類撞窗」議題，透過互動體驗模擬高樓窗戶對於鳥類的弊害，進而提升大眾對這項議題的認識與反思。",
    images: [
        new URL('../assets/work/group10/1.png', import.meta.url).href,
        new URL('../assets/work/group10/2.png', import.meta.url).href,
    ],
    members: [
      { name: "劉瀚謙", role: "美術、音樂", img: new URL('../assets/member/group10/1.jpg', import.meta.url).href },
      { name: "蔡姍珊", role: "程式、硬體", img: new URL('../assets/member/group10/2.jpg', import.meta.url).href },
      { name: "陳复任", role: "美術、3D", img: new URL('../assets/member/group10/3.jpg', import.meta.url).href },
      { name: "郭亦文", role: "程式、Unity整合", img: new URL('../assets/member/group10/4.jpg', import.meta.url).href },
    ]
  },
  {
    id: 9,
    title: "徊",
    subtitle: "虛實交織，生命軌跡於此縈繞",
    concept: "由 App 書寫生命故事，藉展場聲光裝置延續記憶，以溫和的互動引導大眾面對死亡。",
    images: [
        new URL('../assets/work/group9/1.png', import.meta.url).href,
        new URL('../assets/work/group9/2.png', import.meta.url).href,
        new URL('../assets/work/group9/3.png', import.meta.url).href,
        new URL('../assets/work/group9/4.png', import.meta.url).href,
        new URL('../assets/work/group9/5.png', import.meta.url).href,
    ],
        
    members: [
      { name: "賴冠廷", role: "統籌、概念", img: new URL('../assets/member/group9/1.jpg', import.meta.url).href },
      { name: "王閔慈", role: "電路、裝置", img: new URL('../assets/member/group9/2.jpg', import.meta.url).href },
      { name: "張家愷", role: "3D、展場", img: new URL('../assets/member/group9/3.jpg', import.meta.url).href },
      { name: "黃郁軒", role: "UI/UX", img: new URL('../assets/member/group9/4.jpg', import.meta.url).href },
    ]
  },
  {
    id: 8,
    title: "RRRR",
    subtitle: "咀嚼泡泡糖，建構自我發聲的狀聲詞。",
    concept: "本展覽以「咀嚼泡泡糖」連結創作歷程。象徵年輕世代敢於表達、不懼破格的創造力，呈現當代新銳如何在既有框架中實驗轉化。",
    images: [
        new URL('../assets/work/group8/1.png', import.meta.url).href,
        new URL('../assets/work/group8/2.png', import.meta.url).href,
        new URL('../assets/work/group8/3.png', import.meta.url).href,
        new URL('../assets/work/group8/4.png', import.meta.url).href,
        new URL('../assets/work/group8/5.png', import.meta.url).href,
        new URL('../assets/work/group8/6.png', import.meta.url).href,
    ],
    members: [
      { name: "王泳傑", role: "行政、視覺", img: new URL('../assets/member/group8/1.jpg', import.meta.url).href },
      { name: "呂宇絜", role: "行政、展場、攝影", img: new URL('../assets/member/group8/2.jpg', import.meta.url).href },
      { name: "翁翊珊", role: "影視、網頁", img: new URL('../assets/member/group8/3.jpg', import.meta.url).href },
      { name: "蔡姍珊", role: "網頁、硬體、公關", img: new URL('../assets/member/group8/4.jpg', import.meta.url).href },
      { name: "張家愷", role: "互動程式、3D、動態", img: new URL('../assets/member/group8/5.jpg', import.meta.url).href },
    ]
  },
  {
    id: 7,
    title: "WOOTIME",
    subtitle: "穿越雲霧與時間，走進魯凱的傳說故事。",
    concept: "透過虛實整合方式訴說魯凱文化傳說，踏上模擬鞦韆並戴上 VR，體驗魯凱傳統婚禮和慶典習俗。",
    images: [
        new URL('../assets/work/group7/1.png', import.meta.url).href,
        new URL('../assets/work/group7/2.png', import.meta.url).href,
        new URL('../assets/work/group7/3.png', import.meta.url).href,
        new URL('../assets/work/group7/4.png', import.meta.url).href,
        new URL('../assets/work/group7/5.png', import.meta.url).href,
    ],
    members: [
      { name: "柯靚妤", role: "動畫、角色、音效", img: new URL('../assets/member/group7/1.jpg', import.meta.url).href },
      { name: "江宇凡", role: "程式、流程、場景", img: new URL('../assets/member/group7/2.jpg', import.meta.url).href },
      { name: "胡淨涵", role: "音樂、音效、動作", img: new URL('../assets/member/group7/3.jpg', import.meta.url).href },
      { name: "陳芳宜", role: "美術、角色", img: new URL('../assets/member/group7/4.jpg', import.meta.url).href },
    ]
  },
  {
    id: 6,
    title: "DIONYSUS",
    subtitle: "於漬痕交織間，在虛實邊界重構自我。",
    concept: "以紅酒占卜為原型，營造介於現實與幻象之間的占卜儀式。漬痕交織成神秘符號，引導體驗者尋找自我的投影。",
    images: [
        new URL('../assets/work/group6/1.png', import.meta.url).href,
        new URL('../assets/work/group6/2.png', import.meta.url).href,
        new URL('../assets/work/group6/3.png', import.meta.url).href,
    ],
    members: [
      { name: "廖婕萮", role: "3D影像", img: new URL('../assets/member/group6/1.jpg', import.meta.url).href },
      { name: "林宣妮", role: "程式、Arduino", img: new URL('../assets/member/group6/2.jpg', import.meta.url).href },
      { name: "唐鳳翎", role: "影片、平面設計", img: new URL('../assets/member/group6/3.jpg', import.meta.url).href },
      { name: "洪心怡", role: "平面設計", img: new URL('../assets/member/group6/4.jpg', import.meta.url).href },
    ]
  },
  {
    id: 5,
    title: "晶簇韻律",
    subtitle: "音落幻詩，光語化實。",
    concept: "以水晶x音樂為主題打造的療癒節奏音樂遊戲。玩家將進入水晶國度，與水晶們一同旅行，享受沉浸心靈的音樂旅程。",
    images: [
        new URL('../assets/work/group5/1.png', import.meta.url).href,
        new URL('../assets/work/group5/2.png', import.meta.url).href,
        new URL('../assets/work/group5/3.png', import.meta.url).href,
        new URL('../assets/work/group5/4.png', import.meta.url).href,
        new URL('../assets/work/group5/5.png', import.meta.url).href,
        new URL('../assets/work/group5/6.png', import.meta.url).href,
        new URL('../assets/work/group5/7.png', import.meta.url).href,
    ],
    members: [
      { name: "王柏霓", role: "美術、動畫", img: new URL('../assets/member/group5/1.jpg', import.meta.url).href },
      { name: "胡浩華", role: "程式、美術", img: new URL('../assets/member/group5/2.jpg', import.meta.url).href },
      { name: "林昱嘉", role: "美術、展場規劃", img: new URL('../assets/member/group5/3.jpg', import.meta.url).href },
      { name: "林韋伯", role: "音樂、劇情", img: new URL('../assets/member/group5/4.jpg', import.meta.url).href },
    ]
  },
  {
    id: 4,
    title: "警戒深宵",
    subtitle: "夜幕降臨，異常潛伏──請睜大雙眼。",
    concept: "以監視與判斷為核心的 VR 恐怖遊戲。玩家化身夜間警備員，在 18 個監視畫面中分辨異常與偽人。",
    images: [
        new URL('../assets/work/group4/1.png', import.meta.url).href,
        new URL('../assets/work/group4/2.png', import.meta.url).href,
        new URL('../assets/work/group4/3.png', import.meta.url).href,
    ],
    members: [
      { name: "陳佩妤", role: "3D建模、平面設計", img: new URL('../assets/member/group4/1.jpg', import.meta.url).href },
      { name: "林郁儒", role: "程式", img: new URL('../assets/member/group4/2.jpg', import.meta.url).href },
      { name: "李煊橋", role: "動畫", img: new URL('../assets/member/group4/3.jpg', import.meta.url).href },
      { name: "陳卉淇", role: "平面設計、動畫", img: new URL('../assets/member/group4/4.jpg', import.meta.url).href },
    ]
  },
  {
    id: 3,
    title: "它/祂",
    subtitle: "IT PRESENCE ?",
    concept: "聚焦機械作為生命代理的狀態。透過零散器官在系統回饋中的行為反應，邀請觀眾反思 AI 與人類在控制與被控制關係中的存在。",
    images: [
        new URL('../assets/work/group3/1.png', import.meta.url).href,
        new URL('../assets/work/group3/2.png', import.meta.url).href,
        new URL('../assets/work/group3/3.png', import.meta.url).href,
        new URL('../assets/work/group3/4.png', import.meta.url).href,
        new URL('../assets/work/group3/5.png', import.meta.url).href,
        new URL('../assets/work/group3/6.png', import.meta.url).href,
        new URL('../assets/work/group3/7.png', import.meta.url).href,
    ],
    members: [
      { name: "李紹彰", role: "程式", img: new URL('../assets/member/group3/1.jpg', import.meta.url).href },
      { name: "林峻彣", role: "程式", img: new URL('../assets/member/group3/2.jpg', import.meta.url).href },
      { name: "金正洋", role: "美術", img: new URL('../assets/member/group3/3.jpg', import.meta.url).href },
      { name: "邱莉思", role: "美術", img: new URL('../assets/member/group3/4.jpg', import.meta.url).href },
    ]
  },
  {
    id: 2,
    title: "RE:ARM",
    subtitle: "現實壓彎你的脊樑，你在這裡練出肩膀。",
    concept: "肌肉速成班！但你要能活著走出去！這是一款第三人稱視角的PC遊戲，玩家將扮演一位瘦巴巴的上班族，偶然在街上看到健身房廣告後被傳送至甜點競技場，場內充斥著各式美食怪物，玩家必須使用武器，搭配特殊增益效果，努力擊倒怪物，獲得武器、積分以及肌肉能量。",
    images: [
        new URL('../assets/work/group2/1.png', import.meta.url).href,
        new URL('../assets/work/group2/2.png', import.meta.url).href,
        new URL('../assets/work/group2/3.png', import.meta.url).href,
        new URL('../assets/work/group2/4.png', import.meta.url).href,
        new URL('../assets/work/group2/5.png', import.meta.url).href,
        new URL('../assets/work/group2/6.png', import.meta.url).href,
        new URL('../assets/work/group2/7.png', import.meta.url).href,
    ],
    members: [
      { name: "康依萱", role: "3D武器\n場景建模", img: new URL('../assets/member/group2/1.jpg', import.meta.url).href },
      { name: "王藝樺", role: "程式", img: new URL('../assets/member/group2/2.jpg', import.meta.url).href },
      { name: "張芝淯", role: "3D角色建模\n動畫", img: new URL('../assets/member/group2/3.jpg', import.meta.url).href },
      { name: "李品禎", role: "3D角色建模\n動畫", img: new URL('../assets/member/group2/4.jpg', import.meta.url).href },
    ]
  },
  {
    id: 1,
    title: "C計畫",
    subtitle: "回到課桌前，再當一次冒險家！",
    concept: "小時候，我們曾將不同的文具組合成自己的專屬武器，在課桌之間展開只屬於自己的冒險。「C計劃」希望帶領玩家重返那段用文具建構的幻想時光，解鎖不同的武器形態，重現那些在中教室誕生的幻想時刻，讓想像力再次成為探索世界的起點。",
    images: [
      new URL('../assets/work/group1/1.png', import.meta.url).href,
      new URL('../assets/work/group1/2.png', import.meta.url).href,
      new URL('../assets/work/group1/3.png', import.meta.url).href,
      new URL('../assets/work/group1/4.png', import.meta.url).href,
      new URL('../assets/work/group1/5.png', import.meta.url).href,
      new URL('../assets/work/group1/6.png', import.meta.url).href,
      new URL('../assets/work/group1/7.png', import.meta.url).href,
    ],
    members: [
      { name: "央志寰", role: "特效", img: new URL('../assets/member/group1/1.jpg', import.meta.url).href },
      { name: "王劭褀", role: "3D美術", img: new URL('../assets/member/group1/2.jpg', import.meta.url).href },
      { name: "邱瑋柔", role: "2D美術", img: new URL('../assets/member/group1/3.jpg', import.meta.url).href },
      { name: "方萁萱", role: "程式", img: new URL('../assets/member/group1/4.jpg', import.meta.url).href },
    ]
  },
];