<script lang="ts" setup>
import { ref } from 'vue';

const favoriteList = ref([]);

const loadFavorites = () => {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
        favoriteList.value = JSON.parse(favorites);
    }
}

const saveFavorite = (message: Message) => {
    favoriteList.value.push(message);
    localStorage.setItem('favorites', JSON.stringify(favoriteList.value));
}

defineEmits(["close"]);
</script>

<template>
  <div
    class="absolute right-0 w-full pr-5 h-dvh flex flex-col gap-2 p-4 rounded-2xl bg-[#333333] -mr-2 max-w-2xs"
  >
    <div class="flex flex-col gap-5 p-5 items-end">
      <div class="p-1 bg-white text-black rounded-2xl text-sm w-fit" @click="$emit('close')">
        收起 &rightarrow;
      </div>
    </div>

    <div
      class="flex flex-col mx-2 gap-2 border-2 border-white rounded-2xl bg-gray-800 text-sm font-black text-black overflow-hidden grow"
    >
      <!-- Toolbar -->
      <div class="p-2 w-full flex justify-between items-center bg-white">
        <span>所有收藏</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z" />
        </svg>
      </div>

      <!-- 收藏记录 -->
      <div class="flex flex-col gap-4 justify-start p-4">
        <div
          class="flex-col text-black rounded-xl text-sm w-full flex justify-between bg-white hover:bg-blue-300"
        >
          <div
            class="p-2 text-black rounded-xl text-sm w-full flex justify-between items-center"
          >
            <span>收藏对话1</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="#000"
                d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm-4.5 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
              />
            </svg>
          </div>

          <!-- 收藏信息 -->
          <div class="p-2 border-t-2 border-black overflow-hidden line-clamp-5">
            放娘升畫帽英，火辛刀誰合拉高布大米兒卜天誰海視目工孝乾，口又定海課京，課尾苦寫語樹尾；占足南再貓村屋金高水休都草才坡，乙蝴英波馬姊英彩林：哥葉唱做人木老視遠像可蛋旦姐候雨正。口由功，目面來習拉。師斗午着福首教：拍前住現己念。能吹她蛋位水帶和前時田連；跑毛戊甲毛波才止飛「飽叫個左朵尺百汗物」。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
