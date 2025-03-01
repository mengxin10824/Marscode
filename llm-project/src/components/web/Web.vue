<script lang="ts" setup>
import DialogBox from "../src/DialogBox.vue";
import History from "./components/History.vue";
import Favorite from "./components/Favorite.vue";
import InputBox from "../src/InputBox.vue";
import TabBar from "./components/TabBar.vue";

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
      <div class="py-1 px-2 bg-white text-black rounded-2xl text-sm" @click="isShowHistory = true">
        &leftarrow; 历史
      </div>
      <div class="py-1 px-2 bg-white text-black rounded-2xl text-sm" @click="isShowFavorite = true">
        收藏 &rightarrow;
      </div>
    </div>

    <!-- Dialog -->
    <div
      class="border-2 border-white rounded-2xl shadow-2xl grow overflow-hidden mx-2 flex flex-col md:mx-0 md:rounded-tl-none md:rounded-tr-none md:rounded-br-2xl md:rounded-bl-2xl md:border-0"
    >
      <!-- Tab Bar -->
      <TabBar />

      <!-- Chat -->
      <div class="grow w-full text-white md:px-14">
        <DialogBox
          
        />
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
