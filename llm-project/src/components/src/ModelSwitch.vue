<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { Model } from "../../model/Model";

// 定义支持的模型列表
const supportedModels = [
  new Model(
    "deepseek-ai/DeepSeek-V3",
    "DeepSeek-V3",
    "https://example.com/deepseek-icon.png", // 替换为实际图标 URL
    "https://api.siliconflow.cn/v1", // 替换为实际 API URL
    "Bearer sk-1234567890", // 替换为实际 API Key
    false
  ),
  new Model(
    "Qwen/Qwen2.5-72B-Instruct",
    "Qwen2.5-72B-Instruct",
    "https://example.com/qwen-icon.png",
    "https://api.siliconflow.cn/v1",
    "Bearer sk-1234567890",
    false
  ),
  new Model(
    "Qwen/Qwen2-VL-72B-Instruct",
    "Qwen2-VL-72B-Instruct",
    "https://example.com/qwen-vl-icon.png",
    "https://api.siliconflow.cn/v1",
    "Bearer sk-1234567890",
    true
  ),
  new Model(
    "THUDM/glm-4-9b-chat",
    "GLM-4-9B-Chat",
    "https://example.com/glm-icon.png",
    "https://api.siliconflow.cn/v1",
    "Bearer sk-1234567890",
    false
  ),
];

defineProps({
  currentModel: {
    type: Model,
    required: true,
  },
  models: {
    type: Array<Model>,
    required: true,
  },
});

const emit = defineEmits(["modelChange"]);

const handleModelSelect = (model: Model) => {
  emit("modelChange", model);
};
</script>

<template>
  <div class="absolute bottom-6/5 left-2 flex flex-col-reverse gap-2">
    <!-- 下拉菜单 -->
    <div class="z-10 w-full mt-2 bg-gray-800 rounded-lg shadow-lg">
      <div class="space-y-1 p-1">
        <button
          v-for="model in supportedModels"
          :key="model.id"
          @click="handleModelSelect(model)"
          class="flex items-center gap-2 w-full px-4 py-2 text-white text-sm hover:bg-gray-700 rounded-xl"
        >
          <img :src="model.icon" class="w-6 h-6 rounded-full mr-2" :alt="model.name" />
          <span class="text-white">{{ model.name }}</span>
          <span class="text-white">{{
            currentModel?.id === model.id ? "&#10003;" : ""
          }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
