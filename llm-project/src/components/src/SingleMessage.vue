<script lang="ts" setup>
import { defineProps, computed } from "vue";
import { Message, MessageType } from "../../model/Message";

import MarkdownIt from "markdown-it";

let props = defineProps({
  message: {
    type: Message,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

md.renderer.rules.paragraph_open = () => '<p class="text-pretty break-words">';
md.renderer.rules.paragraph_close = () => "</p>";

// 自定义代码块规则
md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx];
  const lang = token.info.trim();
  const codeContent = md.utils.escapeHtml(token.content);
  const uniqueId = `code-${Math.random().toString(36).slice(2, 11)}`;

  return `
    <div class="w-fit overflow-x-hidden bg-gray-800 rounded-2xl h-fit my-2 min-w-50">
      <div class="w-full flex justify-between items-center bg-slate-500 px-4 py-1 text-sm">
        <span>${lang || "text"}</span>
        <button 
          class="copy-btn hover:text-blue-300 transition-colors"
        >
          Copy
        </button>
      </div>
      <pre class="p-2 bg-gray-900"><code 
        id="${uniqueId}"
        class="inline-block no-scrollbar text-sm break-words whitespace-pre-wrap"
      >${codeContent}</code></pre>
    </div>
  `;
};

const renderedContent = computed(() => {
  return md.render(props.message.content);
});

const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Code copied to clipboard");
    })
    .catch((err) => {
      console.error("Failed to copy code: ", err);
    });
};
</script>

<template>
  <div
    class="flex items-start justify-start gap-2 group py-2"
    :class="
      message.sender === MessageType.BOT ? 'flex-row' : 'flex-row-reverse'
    "
  >
    <img
      :src="img"
      :alt="name"
      class="size-10 aspect-square rounded-full bg-amber-50"
    />
    <div class="relative">
      <div
        class="rounded-2xl p-2 max-w-[90%] bg-gray-800 text-white"
        id="message"
        v-html="renderedContent"
      ></div>

      <!-- Hover-Tool -->
      <div
        class="absolute h-6 bg-gray-700 w-fit top-full mt-1 rounded-2xl py-1 px-2 text-gray-300 gap-2 hidden group-hover:flex z-1"
        :class="message.sender === MessageType.BOT ? '-right-10' : '-left-10'"
      >
        <!-- 删除 -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"
          />
        </svg>
        <!-- 收藏 -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M11.172 2a3 3 0 0 1 2.121.879l7.71 7.71a3.41 3.41 0 0 1 0 4.822l-5.592 5.592a3.41 3.41 0 0 1-4.822 0l-7.71-7.71A3 3 0 0 1 2 11.172V6a4 4 0 0 1 4-4h5.172ZM7.5 5.5a2 2 0 0 0-1.995 1.85L5.5 7.5a2 2 0 1 0 2-2Z"
          />
        </svg>
        <!-- 复制 -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" @click="copyToClipboard(props.message.content)">
          <g fill="currentColor">
            <path
              d="M15.2 2h-3.9l-4.2.1c-1.1.2-2 .5-2.8 1.2-.7.8-1 1.7-1.2 2.8L3 10.4v5.8a4 4 0 0 0 2.2 3.4V8c.2-1 .5-1.8 1.2-2.6.8-.7 1.7-1 2.6-1.1l3.3-.1h6.3A3.6 3.6 0 0 0 15.2 2Z"
            />
            <path
              d="M6.6 11.4c0-2.7 0-4 .8-5 .9-.8 2.2-.8 5-.8h2.8c2.8 0 4.1 0 5 .9.8.8.8 2.2.8 4.9v4.8c0 2.7 0 4.1-.8 5-.9.8-2.2.8-5 .8h-2.8c-2.8 0-4.1 0-5-.8-.8-.9-.8-2.3-.8-5v-4.8Z"
            />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>
