<script setup lang="ts">
import { ref, defineEmits } from "vue";

const emit = defineEmits(["close"]);

const systemPrompt = ref("");
const selectedModel = ref("gpt-3.5-turbo");
const temperature = ref(0.7);
const maxTokens = ref(2048);
const topP = ref(0.7);
const topK = ref(50);
const frequency_penalty = ref(0.5);

function saveSettings() {
  // Save settings
  emit("close");
}

let allModels = ref([
  {
    id: 1,
    name: "GPT-3.5 Turbo",
    url: "https://api.openai.com/v1/engines",
    model: "gpt-3.5-turbo",
    apiKey: "Bearer sk-1234567890",
  },
  {
    id: 2,
    name: "GPT-3.5 Turbo",
    url: "https://api.openai.com/v1/engines",
    model: "gpt-3.5-turbo",
    apiKey: "Bearer sk-1234567890",
  },
  {
    id: 3,
    name: "GPT-3.5 Turbo",
    url: "https://api.openai.com/v1/engines",
    model: "gpt-3.5-turbo",
    apiKey: "Bearer sk-1234567890",
  },
]);
</script>

<template>
  <div
    class="fixed w-full h-full left-0 top-0 flex items-center justify-center backdrop-blur-sm z-99"
  >
    <div class="w-full max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-white mb-6">模型设置</h2>

      <div class="space-y-8 text-gray-300">
        <div class="mb-4">
          <label class="block text-gray-300 mb-2">System Prompt</label>
          <input
            type="text"
            v-model="systemPrompt"
            class="w-full bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mb-4 space-y-1">
          <label class="block t mb-2">选择模型</label>
          <select
            v-model="selectedModel"
            class="w-full bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option
              v-for="model in allModels"
              :key="model.id"
              v-bind:value="model.id"
            >
              {{ model.name }}
            </option>
          </select>
          <p>在添加模型中可以自定义模型。</p>
        </div>

        <div class="mb-4">
          <label class="block mb-2">Temperature（温度）: {{ temperature }} </label>
          <input
            type="range"
            v-model="temperature"
            min="0"
            max="2"
            step="0.1"
            class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-2"> topP: {{ topP }} </label>
          <input
            type="range"
            v-model="topP"
            min="0.1"
            max="1"
            step="0.1"
            class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-2"> topK: {{ topK }} </label>
          <input
            type="range"
            v-model="topK"
            min="0"
            max="100"
            step="0.1"
            class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div class="mb-4">
          <label class="block mb-2">
            Requency Penalty（频率惩罚）: {{ frequency_penalty }}
          </label>
          <input
            type="range"
            v-model="frequency_penalty"
            min="-2.0"
            max="2.0"
            step="0.1"
            class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-300 mb-2">最大 Tokens</label>
          <input
            type="number"
            v-model="maxTokens"
            min="1"
            max="16384"
            class="w-full bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          @click="saveSettings"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          保存设置
        </button>
      </div>
    </div>
  </div>
</template>
