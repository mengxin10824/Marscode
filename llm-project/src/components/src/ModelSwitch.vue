<script lang="ts">
import { defineProps, defineEmits, ref } from "vue";
import { Model } from "../../model/Model";

defineProps<{
  currentModel: Model;
  models: Model[];
}>();

const emit = defineEmits<{
  (e: 'update:modelChange', model: Model): void;
}>();

const isOpen = ref(false);

const handleModelSelect = (model: Model) => {
  emit('update:modelChange', model);
};
</script>

<template>
  <div class="relative">
    <!-- 当前选中的模型按钮 -->
    <button
      @click="isOpen = !isOpen"
      class="flex items-center justify-between w-full px-4 py-2 bg-white dark:bg-gray-800 border rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700"
    >
      <span class="flex items-center">
        <img
          :src="currentModel.avatar"
          class="w-6 h-6 rounded-full mr-2"
          :alt="currentModel.name"
        />
        <span class="text-gray-700 dark:text-gray-200">{{ currentModel.name }}</span>
      </span>
      <svg
        class="w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <!-- 下拉菜单 -->
    <div
      v-if="isOpen"
      class="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      <div class="py-1">
        <button
          v-for="model in models"
          :key="model.id"
          @click="handleModelSelect(model)"
          class="flex items-center w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <img
            :src="model.avatar"
            class="w-6 h-6 rounded-full mr-2"
            :alt="model.name"
          />
          <span class="text-gray-700 dark:text-gray-200">{{ model.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
