<script lang="ts" setup>
import DialogBox from "../src/DialogBox.vue";
import History from "./components/History.vue";
import Favorite from "./components/Favorite.vue";
import InputBox from "../src/InputBox.vue";

import { ref } from "vue";
let isShowFavorite = ref(false);
let isShowHistory = ref(false);

let inputContent = ref("");
</script>
<template>
  <div
    class="flex flex-col gap-2 w-full h-dvh overflow-hidden text-white relative"
  >
    <!-- Menu Button -->
    <div
      class="w-full flex justify-between items-start p-4 md:absolute md:top-15"
    >
      <div class="p-1 bg-white text-black rounded-2xl text-sm" @click="isShowHistory = true">
        &leftarrow; 历史
      </div>
      <div class="p-1 bg-white text-black rounded-2xl text-sm" @click="isShowFavorite = true">
        收藏 &rightarrow;
      </div>
    </div>

    <!-- Dialog -->
    <div
      class="border-2 border-white rounded-2xl shadow-2xl grow overflow-hidden mx-2 flex flex-col md:mx-0 md:rounded-tl-none md:rounded-tr-none md:rounded-br-2xl md:rounded-bl-2xl md:border-0"
    >
      <!-- Tab Bar -->
      <div
        class="w-full bg-white flex justify-items-start gap-2 p-2 text-black overflow-x-scroll no-scrollbar"
      >
        <div
          class="border-2 border-black border-solid py-1 px-2 text-sm w-fit flex items-center gap-2 rounded-2xl hover:bg-blue-300 shadow-2xl"
        >
          <span class="font-bold text-nowrap">历史对话1</span>
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

        <!-- currently selected tab -->
        <div
          class="border-2 bg-blue-200 border-solid py-1 px-2 text-sm w-fit flex items-center gap-2 rounded-2xl hover:bg-blue-300 shadow-2xl"
        >
          <span class="font-bold text-nowrap">历史对话1</span>
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

        <!-- Add Button -->
        <div
          class="border-2 border-black border-solid py-1 px-2 text-sm w-fit flex items-center gap-2 rounded-2xl hover:bg-blue-300 shadow-2xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="#000"
              d="M12 4a8 8 0 0 1 0 16 8 8 0 0 1 0-16Zm0-2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm5 9h-4V7h-2v4H7v2h4v4h2v-4h4v-2Z"
            />
          </svg>
        </div>
      </div>

      <!-- Chat -->
      <div class="grow w-full text-white md:px-14">
        <DialogBox />
      </div>
    </div>

    <!-- Input Box -->
    <div class="relative min-h-40">
      <InputBox 
        :isToolBar="true"
        :input-content="inputContent"
      />
    </div>

    <Favorite
        v-if="isShowFavorite"
        @close="isShowFavorite = false"
    />
    <History 
        v-if="isShowHistory"
        @close="isShowHistory = false"
    />
  </div>

</template>

<style scoped></style>
