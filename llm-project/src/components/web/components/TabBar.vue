<script lang="ts" setup>
import { computed, ref } from "vue";
import { Tab } from "../../../model/Tab";

let tabs = ref<Tab[]>(initTabs());
const activedTab = computed(() => tabs.value.find(tab => tab.isActive));

function addTab(newTab: Tab) {
  tabs.value.push(newTab);
  activateTab(newTab);
  
  saveTabsToSessionStorage(tabs.value);
}

function activateTab(selectedTab: Tab) {
  tabs.value = tabs.value.map((tab) => ({
    ...tab, 
    isActive: tab.id === selectedTab.id, 
  }));

  saveTabsToSessionStorage(tabs.value);
}

function deleteTab(deletedTab: Tab) {
  const index = tabs.value.findIndex(tab => tab.id === deletedTab.id);
  if (index === -1) return;

  tabs.value.splice(index, 1);

  if (deletedTab.isActive && tabs.value.length > 0) {
    const newIndex = Math.min(index, tabs.value.length - 1);
    activateTab(tabs.value[newIndex]);
  }

  saveTabsToSessionStorage(tabs.value);
}

function initTabs() {
  const storedTabs: Tab[] = getTabsFromSessionStorage();

  if (!storedTabs || storedTabs.length === 0) {
    return [
      new Tab(undefined, "New Tab", true, undefined)
    ];
  }
  return storedTabs;
}

function getTabsFromSessionStorage() {
  const storedTabs: Tab[] = JSON.parse(sessionStorage.getItem("tabs") || "[]");
  return storedTabs;
}

function saveTabsToSessionStorage(tabs: Tab[]) {
  sessionStorage.setItem("tabs", JSON.stringify(tabs));
}

defineExpose({
  tabs,
  activedTab,
  activateTab,
  addTab,
  deleteTab
});

defineEmits<{
  (e: 'addTab', newTab: Tab | undefined): void;
  (e: 'activateTab', selectedTab: Tab): void;
  (e: 'deleteTab', tab: Tab): void;
}>();
</script>

<template>
  <div class="w-full bg-white flex justify-items-start gap-2 p-2 text-black overflow-x-scroll no-scrollbar">
    <!-- Tab Items -->
    <div
      v-for="tab in tabs"
      :key="tab.id"
      @click="$emit('activateTab', tab)"
      class="border-2 border-black border-solid py-1 px-2 text-sm w-fit flex items-center gap-2 rounded-2xl hover:bg-blue-300 shadow-2xl cursor-pointer transition-colors"
      :class="{ 'bg-blue-200': tab.isActive }"
    >
      <span class="font-bold text-nowrap">{{ tab.name }}</span>
      
      <!-- Delete Button -->
      <svg
        @click.stop="deleteTab(tab)"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        class="hover:bg-gray-400 rounded-full transition-colors"
      >
        <path
          fill="currentColor"
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        />
      </svg>
    </div>

    <!-- Add Button -->
    <div
      class="border-2 border-black border-solid py-1 px-2 text-sm w-fit flex items-center gap-2 rounded-2xl hover:bg-blue-300 shadow-2xl cursor-pointer transition-colors"
      @click="$emit('addTab', undefined)"
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
</template>