<script lang="ts" setup>
import DialogBox from "../src/dialogBox.vue";
import History from "./components/history.vue";
import Favorite from "./components/favorite.vue";
import InputBox from "../src/inputBox.vue";
import { ref, computed, onMounted } from "vue";
import TabBar from "./components/TabBar.vue";
import { Model } from "../../model/Model";
import { Tab } from "../../model/Tab";
import { Message } from "../../model/Message";

const tabList = ref<Message[]>([]);
const isHistoryOpen = ref(true);
const isFavoriteOpen = ref(true);

const loadTabs = () => {
  const tabs = sessionStorage.getItem("tabs");
  if (tabs) {
    tabList.value = JSON.parse(tabs);
  }
};

const saveTab = (message: Message) => {
  tabList.value.push(message);
  sessionStorage.setItem("tabs", JSON.stringify(tabList.value));
};

const toggleHistory = () => {
  isHistoryOpen.value = !isHistoryOpen.value;
};

const toggleFavorite = () => {
  isFavoriteOpen.value = !isFavoriteOpen.value;
};

// 状态管理
const isShowFavorite = ref(false);
const isShowHistory = ref(false);
const tabs = ref<Tab[]>([new Tab(undefined, "New Tab", true, undefined)]);

// 模型和用户信息
const model = new Model(
  undefined,
  "Bot",
  "https://cdn.jsdelivr.net/gh/linonetwo/linonetwo.github.io/assets/img/robot.png",
  "gpt-3.5-turbo",
  "Bearer sk-1234567890"
);
const userImg =
  "https://cdn.jsdelivr.net/gh/linonetwo/linonetwo.github.io/assets/img/user.png";

// 计算属性
const activeMessages = computed(() => {
  const activeTab = tabs.value.find((tab) => tab.isActive);
  return activeTab ? activeTab.messages : [];
});

// 标签页操作
function addNewTab(newTab?: Tab) {
  if (!newTab) {
    newTab = new Tab(undefined, "New Tab", false, undefined);
  }
  tabs.value.push(newTab);
  activateTab(newTab);
}

function activateTab(selectedTab: Tab) {
  tabs.value.forEach((tab) => {
    tab.isActive = tab.id === selectedTab.id;
  });
}

function deleteTab(tabToDelete: Tab) {
  const index = tabs.value.findIndex((tab) => tab.id === tabToDelete.id);
  if (index === -1) return;

  const wasActive = tabToDelete.isActive;
  tabs.value = tabs.value.filter((tab) => tab.id !== tabToDelete.id);

  if (wasActive && tabs.value.length > 0) {
    const newIndex = Math.min(index, tabs.value.length - 1);
    activateTab(tabs.value[newIndex]);
  }
}

const handleSendMessage = (message: Message) => {
  saveTab(message);
  // 其他处理逻辑
};

onMounted(() => {
  loadTabs();
  addNewTab();
});
</script>
<template>
  <div class="flex flex-col gap-2 w-full h-dvh overflow-hidden text-white relative">
    <!-- Menu Button -->
    <div class="w-full flex justify-between items-start p-4 md:absolute md:top-15">
      <div
        class="py-1 px-2 bg-white text-black rounded-2xl text-sm"
        @click="toggleHistory"
      >
        &leftarrow; 历史
      </div>
      <div
        class="py-1 px-2 bg-white text-black rounded-2xl text-sm"
        @click="toggleFavorite"
      >
        收藏 &rightarrow;
      </div>
    </div>

    <!-- Dialog -->
    <div
      class="border-2 border-white rounded-2xl shadow-2xl grow overflow-hidden mx-2 flex flex-col md:mx-0 md:rounded-tl-none md:rounded-tr-none md:rounded-br-2xl md:rounded-bl-2xl md:border-0"
    >
      <!-- Tab Bar -->
      <TabBar
        :tabs="tabs"
        @addTab="addNewTab(undefined)"
        @activateTab="activateTab"
        @deleteTab="deleteTab"
      />

      <!-- Chat -->
      <div class="grow w-full text-white md:px-14">
        <DialogBox :messages="activeMessages" :model="model" :userImg="userImg" />
      </div>
    </div>

    <!-- Input Box -->
    <div class="relative min-h-40">
      <InputBox :isToolBar="true" @send="handleSendMessage" />
    </div>

    <Favorite v-if="isShowFavorite" @close="isShowFavorite = false" />
    <History v-if="isShowHistory" @close="isShowHistory = false" />
  </div>
</template>

<style scoped></style>
