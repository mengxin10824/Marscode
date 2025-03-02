<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Message, MessageType } from '../../../model/Message';
import SingleFavorite from './SingleFavorite.vue';

defineEmits<{
  (event: 'close'): void;
}>();
const favorites = ref<Array<Message>>([
  new Message(undefined, 'Hello', MessageType.USER, undefined, undefined)
]);

const getFavoritesFromLocalStorage = () => {
  const storedFavorites = localStorage.getItem('favorites');
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};

const saveFavoritesToLocalStorage = () => {
  localStorage.setItem('favorites', JSON.stringify(favorites.value));
};

const handleDelete = (message: Message) => {
  const index = favorites.value.findIndex((favorite) => favorite.id === message.id);
  if (index !== -1) {
    favorites.value.splice(index, 1);
    saveFavoritesToLocalStorage();
  }
};

onMounted(() => {
  if (favorites.value.length) {
    favorites.value = getFavoritesFromLocalStorage();
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
      </div>
      <!-- 收藏记录 -->
      <div class="flex flex-col gap-4 justify-start p-4">
        <SingleFavorite
          v-for="favorite, index in favorites"
          :key="favorite.id"
          :favoriteIndex="index"
          :favorite="favorite"
          @delete="handleDelete"
        />
      </div>
    </div>
  </div>
</template>
