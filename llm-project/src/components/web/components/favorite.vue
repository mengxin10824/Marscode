<script lang="ts" setup>
import { Message } from '../../../model/Message';
import SingleFavorite from './SingleFavorite.vue';

defineEmits(["close"]);
defineProps({
  favorites: {
    type: Array<Message>,
    required: true
  }
});
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
        <SingleFavorite
          v-for="favorite, index in favorites"
          :key="favorite.id"
          :favoriteIndex="index"
          :favoriteContent="favorite.content"
        />
      </div>
    </div>
  </div>
</template>
