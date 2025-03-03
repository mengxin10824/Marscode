<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Message } from '@/model/Message';

// 历史记录列表
const historyList = ref<Message[]>([]);

// 加载历史记录
const loadHistory = () => {
    const history = localStorage.getItem('chatHistory');
    if (history) {
        historyList.value = JSON.parse(history);
    }
}

// 保存历史记录
const saveHistory = (message: Message) => {
    historyList.value.push(message);
    localStorage.setItem('chatHistory', JSON.stringify(historyList.value));
}

// 选择历史记录
const selectHistory = (item: Message) => {
    emit('select', item);
}

onMounted(() => {
    loadHistory();
});

// 定义事件
const emit = defineEmits(['select']);

defineExpose({
  historyList,
  saveHistory
});
</script>

<template>
  <div
    class="absolute left-0 w-full pr-5 h-dvh flex flex-col gap-2 p-4 rounded-2xl bg-[#333333] -ml-2 max-w-2xs justify-start"
  >
    <div class="flex flex-col gap-5 p-5">
      <div class="p-1 bg-white text-black rounded-2xl text-sm w-fit" @click="$emit('close')">
        &leftarrow; 收起
      </div>

      <img
        src=""
        alt=""
        class="size-15 aspect-square rounded-full bg-amber-50"
      />
    </div>

    <div
      class="flex flex-col mx-2 gap-2 border-2 border-white rounded-2xl bg-gray-800 text-sm font-black text-black overflow-hidden grow"
    >
      <!-- Toolbar -->
      <div class="p-2 w-full flex justify-between items-center bg-white">
        <span>所有历史</span>

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

      <!-- 历史记录 -->
      <div class="history-container">
        <div v-for="(item, index) in historyList" :key="index" class="history-item" @click="selectHistory(item)">
          <div class="history-content">{{ item.content }}</div>
          <div class="history-time">{{ item.timestamp }}</div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4 p-4 items-center">
      <div
        class="flex items-center p-2 gap-5 w-fit bg-white font-black text-black rounded-xl text-sm hover:bg-blue-300"
      >
        <span>历史编辑</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            fill="currentColor"
            d="M13.3 8.4a.7.7 0 0 1 0-.8l.8-1a.7.7 0 0 0 .1-.8l-1.3-2.3a.7.7 0 0 0-.7-.3l-1.3.2a.7.7 0 0 1-.8-.4l-.4-1.2a.7.7 0 0 0-.6-.5H6.4a.7.7 0 0 0-.6.5L5.4 3a.7.7 0 0 1-.8.4l-1.3-.2a.7.7 0 0 0-.6.3L1.3 5.8a.7.7 0 0 0 .1.8l.8 1a.7.7 0 0 1 0 .8l-.8 1a.7.7 0 0 0 0 .8l1.3 2.3a.7.7 0 0 0 .7.3l1.2-.2a.7.7 0 0 1 .8.4l.4 1.2a.7.7 0 0 0 .7.5H9a.7.7 0 0 0 .7-.5l.4-1.2a.7.7 0 0 1 .7-.4l1.3.2a.7.7 0 0 0 .7-.3l1.3-2.3a.7.7 0 0 0 0-.8l-1-1Zm-1 1 .5.5-.8 1.5-.8-.1a2 2 0 0 0-2.3 1.3l-.3.7H7l-.2-.7a2 2 0 0 0-2.3-1.4l-.8.2-.9-1.5.5-.6a2 2 0 0 0 0-2.6L2.7 6l.9-1.5.8.2a2 2 0 0 0 2.3-1.4l.2-.7h1.7l.3.7a2 2 0 0 0 2.3 1.4l.8-.2.8 1.5-.5.6a2 2 0 0 0 0 2.6Zm-4.5-4a2.7 2.7 0 1 0 0 5.3 2.7 2.7 0 0 0 0-5.4Zm0 4a1.3 1.3 0 1 1 0 2.7 1.3 1.3 0 0 1 0-2.6Z"
          />
        </svg>
      </div>
      <div
        class="flex items-center p-2 gap-5 w-fit bg-white font-black text-black rounded-xl text-sm hover:bg-blue-300"
      >
        <span>模型设置</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            fill="#000"
            d="M13.267 8.44a.667.667 0 0 1 0-.88l.853-.96a.667.667 0 0 0 .08-.78l-1.333-2.307a.667.667 0 0 0-.714-.32l-1.253.254a.667.667 0 0 1-.767-.44l-.406-1.22a.667.667 0 0 0-.634-.454H6.427a.667.667 0 0 0-.667.454l-.373 1.22a.667.667 0 0 1-.767.44l-1.287-.254a.667.667 0 0 0-.666.32L1.333 5.82a.667.667 0 0 0 .067.78l.847.96a.667.667 0 0 1 0 .88L1.4 9.4a.667.667 0 0 0-.067.78l1.334 2.307a.667.667 0 0 0 .713.32l1.253-.254a.667.667 0 0 1 .767.44l.407 1.22a.667.667 0 0 0 .666.454H9.14a.667.667 0 0 0 .633-.454l.407-1.22a.667.667 0 0 1 .767-.44l1.253.254a.667.667 0 0 0 .713-.32l1.334-2.307a.667.667 0 0 0-.08-.78l-.9-.96Zm-.994.893.534.6-.854 1.48-.786-.16a2 2 0 0 0-2.3 1.334l-.254.746H6.907l-.24-.76a2 2 0 0 0-2.3-1.333l-.787.16-.867-1.473.534-.6a2 2 0 0 0 0-2.667l-.534-.6.854-1.467.786.16a2 2 0 0 0 2.3-1.333l.254-.753h1.706l.254.76a2 2 0 0 0 2.3 1.333l.786-.16.854 1.48-.534.6a2 2 0 0 0 0 2.653Zm-4.513-4a2.667 2.667 0 1 0 0 5.334 2.667 2.667 0 0 0 0-5.334Zm0 4a1.333 1.333 0 1 1 0-2.666 1.333 1.333 0 0 1 0 2.666Z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history-container {
  max-height: 400px;
  overflow-y: auto;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.history-item {
  padding: 8px 12px;
  margin-bottom: 8px;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.history-item:hover {
  background-color: #f0f0f0;
}

.history-content {
  font-size: 14px;
  color: #333;
}

.history-time {
  font-size: 12px;
  color: #666;
  margin-top: 4px;
}
</style>
