<script setup lang="ts">
import DialogBox from "./src/dialogBox.vue";
import InputBox from "./src/inputBox.vue";
import { Message } from "../model/Message";
import { Model } from "../model/Model";
import { ref } from "vue";

const messages = ref<Message[]>([]);
const model = new Model(
  undefined,
  "Bot",
  "data:image/webp;base64,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",
  "Qwen/Qwen2-1.5B-Instruct",
  import.meta.env.VITE_FALLBACK_API_KEY
);
const userImg =
  "data:image/jpeg;base64,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";

function deleteMessage(message: Message) {
  const index = messages.value.indexOf(message);
  if (index >= 0) {
    messages.value.splice(index, 1);
  }
}

const sendMessage = (message: Message) => {
  messages.value.push(message);
};

const receiveMessage = (message: Message) => {
  messages.value.push(message);
};

const updateMessage = (messageId: string, content: string) => {
  const message = messages.value.find((msg) => msg.id === messageId);
  if (message) {
    message.content += content;
  }
};
</script>

<template>
  <div
    class="flex flex-col bg-black text-white rounded-2xl w-150 h-[80dvh] border-2 border-gray-800 p-4 gap-4"
  >
    <div class="flex justify-between p-2 items-start">
      <!-- 关闭 -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
      >
        <mask
          id="a"
          width="16"
          height="16"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
          style="mask-type: luminance"
        >
          <path fill="#fff" fill-rule="evenodd" d="M0 0h16v16H0V0Z" clip-rule="evenodd" />
        </mask>
        <g mask="url(#a)">
          <path
            fill="#969696"
            d="M.8 17-1 15.2 6.2 8-1 .8.8-1 8 6.2 15.2-1 17 .8 9.8 8l7.2 7.2-1.8 1.8L8 9.8.8 17Z"
          />
        </g>
      </svg>

      <!-- Icon -->
      <div class="flex flex-col gap-2 items-center">
        <img :src="model.icon" class="size-9 aspect-square rounded-full bg-amber-50" />
        <span>Ghost</span>
      </div>

      <!-- 放大 -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="none"
        viewBox="0 0 18 18"
      >
        <path
          fill="#969696"
          fill-rule="evenodd"
          d="M10.7 0H18v7.3l-2.8-2.8-3.4 3.4-1.7-1.7 3.4-3.4L10.7 0ZM18 10.7V18h-7.3l2.8-2.8-3.4-3.4 1.7-1.7 3.4 3.4 2.8-2.8ZM0 18h7.3l-2.8-2.8 3.4-3.4-1.7-1.7-3.4 3.4L0 10.7V18ZM0 7.3V0h7.3L4.5 2.8l3.4 3.4-1.7 1.7-3.4-3.4L0 7.3Z"
          clip-rule="evenodd"
        />
      </svg>
    </div>

    <div class="overflow-y-scroll no-scrollbar flex-grow">
      <DialogBox
        :messages="[]"
        :model="{
          id: '',
          name: '',
          icon: '',
          url: '',
          apiKey: '',
          supportsAttach: false,
          settings: {},
          getFullKey: () => '',
        }"
        :userImg="userImg"
        @addToFavorite=""
        @deleteMessage="deleteMessage"
      />
    </div>

    <InputBox
      :isToolBar="false"
      @sendMessage="sendMessage"
      @updateMessage="updateMessage"
      @receiveMessage="receiveMessage"
    />
  </div>
</template>
