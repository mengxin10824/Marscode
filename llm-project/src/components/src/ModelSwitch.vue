<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { Model } from "../../model/Model";

defineProps({
  currentModel: {
    type: Model,
    require: true,
  },
  models: {
    type: Array<Model>,
    require: true,
  },
});

const emit = defineEmits(["modelChange"])

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
          v-for="model in models"
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
