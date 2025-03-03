<script lang="ts" setup>
import { ref, type Ref } from "vue";
import { Model } from "../../model/Model";

const models = ref<Model[]>(getModelsFromLocalStorage());
const currentModel: Ref<Model> = ref(models.value[0]);

const showAddForm = ref(false);
const newModelName = ref("");
const newModelUrl = ref("");
const newModelImg = ref("");
const newModelApiKey = ref("");

function confirmAdd() {
  const trimmedName = newModelName.value.trim();
  const trimmedUrl = newModelUrl.value.trim();

  if (trimmedName && trimmedUrl) {
    const newModel = new Model(
      undefined,
      trimmedName,
      newModelImg.value.trim(),
      trimmedUrl,
      newModelApiKey.value.trim()
    );
    models.value.push(newModel);
    newModelName.value = "";
    newModelUrl.value = "";
    newModelImg.value = "";
    newModelApiKey.value = "";
    showAddForm.value = false;
  }

  saveModelsToLocalStorage();
}

function cancelAdd() {
  newModelName.value = "";
  newModelUrl.value = "";
  newModelImg.value = "";
  newModelApiKey.value = "";
  showAddForm.value = false;
}

function removeModel(modelToRemove: Model) {
  models.value = models.value.filter((m) => m.id !== modelToRemove.id);
  
  saveModelsToLocalStorage();
}

function selectModel(selectedModel: Model) {
  currentModel.value = selectedModel;
}

function getModelsFromLocalStorage(): Model[] {
  let storedModels: Model[] = JSON.parse(localStorage.getItem("models") || "[]");
  if (!storedModels || storedModels.length === 0) {
    storedModels = [new Model(undefined, "Qwen/Qwen2-1.5B-Instruct", "https://mintlify.s3.us-west-1.amazonaws.com/siliconflow-4a6a0801/logo/siliconflow.png", "https://api.siliconflow.cn/v1/chat/completions", "sk-nmvvpbnaqdmjibntjdohqqcpyassoipapjhuravcfvbipuda")]
  }
  return storedModels;
}

function saveModelsToLocalStorage() {
  localStorage.setItem("models", JSON.stringify(models.value));
}

defineExpose({
  currentModel
})
</script>
<template>
  <div
    class="absolute bottom-6/5 left-2 w-64 flex flex-col items-center gap-4 border-2 border-gray-800 bg-gray-800 p-4 text-sm font-medium rounded-2xl text-white"
  >
    <!-- 模型列表 -->
    <div class="w-full bg-gray-800 rounded-lg shadow-lg">
      <div class="space-y-1 p-2">
        <div
          v-for="(model, index) in models"
          :key="model.id"
          class="group relative flex justify-between items-center w-full p-1 hover:bg-gray-700 rounded cursor-pointer"
          :class="{ 'bg-blue-100': currentModel?.id === model.id }"
          @click="selectModel(model)"
        >
          <span class="text-gray-500">{{ index + 1 }}</span>
          <button
            class="flex items-center gap-2 w-full p-0 text-white text-sm text-left"
          >
            <img
              :src="model.img"
              class="w-6 h-6 rounded-full mr-2"
              :alt="model.name"
            />
            <span class="truncate">{{ model.name }}</span>
          </button>
          <button
            class="text-red-300 hover:text-red-700 text-lg"
            @click.stop="removeModel(model)"
          >
            ×
          </button>
        </div>
      </div>
    </div>
    <!-- 添加模型表单 -->
    <div v-if="showAddForm" class="w-full space-y-2">
      <input
        v-model="newModelName"
        placeholder="模型名称（必填）"
        class="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 outline-none"
      />
      <input
        v-model="newModelUrl"
        placeholder="模型地址（必填）"
        class="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 outline-none"
      />
      <input
        v-model="newModelImg"
        placeholder="模型图片地址"
        class="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 outline-none"
      />
      <input
        v-model="newModelApiKey"
        placeholder="API密钥"
        class="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 outline-none"
      />
      <div class="flex gap-2">
        <button
          class="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          @click="confirmAdd"
        >
          确认
        </button>
        <button
          class="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
          @click="cancelAdd"
        >
          取消
        </button>
      </div>
    </div>
    <button
      v-else
      class="w-full p-2 mt-2 text-white hover:bg-gray-700 rounded-lg border-gray-800"
      @click.stop="showAddForm = true"
    >
      + 添加模型
    </button>
  </div>
</template>
