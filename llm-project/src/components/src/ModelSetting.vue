<script setup lang="ts">
import { ref, defineEmits, computed } from "vue";
import { ModelConfig } from "../../model/ModelConfig";

const emit = defineEmits(["close"]);

const systemPrompt = ref("");
const temperature = ref(0.7);
const maxTokens = ref(2048);
const topP = ref(0.7);
const topK = ref(50);
const frequency_penalty = ref(0.5);

const modelConfig = computed(() => {
  return new ModelConfig(
    systemPrompt.value,
    temperature.value,
    maxTokens.value,
    topP.value,
    topK.value,
    frequency_penalty.value
  );
});

function saveSettings() {
  // Save settings
  
  emit("close");
}

defineExpose<{
  modelConfig: ModelConfig;
}>();
</script>

<template>
  <div
    class="fixed w-full h-full left-0 top-0 flex items-center justify-center backdrop-blur-sm z-99"
  >
    <div class="w-full max-w-md mx-auto p-6 bg-gray-700 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-white mb-6">模型设置</h2>

      <div class="space-y-8 text-gray-300">
        <div class="mb-4">
          <label class="block text-gray-300 mb-2">System Prompt</label>
          <textarea
            v-model="systemPrompt"
            class="w-full bg-gray-800 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          >
          </textarea>
        </div>

        <div class="mb-4">
          <label class="block mb-2">Temperature（温度）: {{ temperature }} </label>
          <input
            type="range"
            v-model="temperature"
            min="0"
            max="2"
            step="0.1" 
            class="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
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
            class="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
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
            class="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
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
            class="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer"
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
