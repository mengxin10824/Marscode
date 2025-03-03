<script lang="ts" setup>
import DialogBox from "../src/DialogBox.vue";
import History from "./components/History.vue";
import Favorite from "./components/Favorite.vue";
import InputBox from "../src/InputBox.vue";
import TabBar from "./components/TabBar.vue";

import { ref } from "vue"; 
import { Tab } from "../../model/Tab";
import type { Message } from "../../model/Message";

let isShowFavorite = ref(false);
let isShowHistory = ref(false);

let userImg = ref<string>("/src/icon.png");

let tabBarRef = ref<InstanceType<typeof TabBar> | null>(null)
let historyRef = ref<InstanceType<typeof History> | null>(null)
let favoriteRef = ref<InstanceType<typeof Favorite> | null>(null)
let inputBoxRef = ref<InstanceType<typeof InputBox> | null>(null)

function addTab(newTab: Tab | undefined) {
  if (!newTab) {
    newTab = new Tab(undefined, "New Tab", true, undefined);
  }
  historyRef.value?.addHistory(newTab);
  tabBarRef.value?.addTab(newTab);
}

function activateTab(selectedTab: Tab) {
  tabBarRef.value?.activateTab(selectedTab);
  historyRef.value?.addHistory(selectedTab);
}

function deleteTab(tab: Tab) {
  tabBarRef.value?.deleteTab(tab);
}

function addHistory(newHistory: Tab | undefined) {
  if (!newHistory) {
    newHistory = new Tab(undefined, "New Tab", true, undefined);
  }
  tabBarRef.value?.addTab(newHistory);
  historyRef.value?.addHistory(newHistory);

  isShowHistory.value = false;
}

function deleteHistory(history: Tab) {
  historyRef.value?.deleteHistory(history);
  tabBarRef.value?.deleteTab(history);
}

function addFavorite(newFavorite: Message) {
  favoriteRef.value?.addFavorite(newFavorite);
}

function deleteFavorite(favorite: Message) {
  favoriteRef.value?.deleteFavorite(favorite);
}

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
      <TabBar
        ref="tabBarRef"
        @addTab="addTab"
        @activateTab="activateTab"
        @deleteTab="deleteTab"
      />

      <!-- Chat -->
      <div class="grow w-full text-white md:px-14">
        <DialogBox
          :messages="tabBarRef?.activedTab?.messages ?? []"
          :model="inputBoxRef?.selectedModel!"
          :userImg="userImg"
        />
      </div>
    </div>

    <!-- Input Box -->
    <div class="relative min-h-40">
      <InputBox
        ref="inputBoxRef"
        :isToolBar="true"
      />
    </div>

    <History
        v-show="isShowHistory"
        @close="isShowHistory = false"
        @addHistory="addHistory"
        @deleteHistory="deleteHistory"
        ref="historyRef"
        :img="userImg"
    />
    <Favorite
        v-show="isShowFavorite"
        @close="isShowFavorite = false"
        @addFavorite="addFavorite"
        @deleteFavorite="deleteFavorite"
        ref="favoriteRef"
    />
    
  </div>

</template>