<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import { Message, MessageType } from '../../model/Message';

import MarkdownIt from 'markdown-it';

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
    required: true
  },
});


const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

md.renderer.rules.paragraph_open = () => '<p class="text-pretty break-words">';
md.renderer.rules.paragraph_close = () => '</p>';

// 自定义代码块规则
md.renderer.rules.fence = (tokens, idx) => {
  const token = tokens[idx];
  const lang = token.info.trim();
  const codeContent = md.utils.escapeHtml(token.content);
  const uniqueId = `code-${Math.random().toString(36).slice(2, 11)}`;

  return `
    <div class="w-fit overflow-x-hidden bg-gray-800 rounded-2xl h-fit my-2 min-w-50">
      <div class="w-full flex justify-between items-center bg-slate-500 px-4 py-1 text-sm">
        <span>${lang || 'text'}</span>
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
</script>

<template>
  <div
    class="h-fit flex items-start justify-start gap-2"
    :class="message.sender === MessageType.BOT ? 'flex-row' : 'flex-row-reverse'"
  >
    <img
      :src="img"
      :alt="name"
      class="size-10 aspect-square rounded-full bg-amber-50"
    />
    <div class="rounded-2xl p-2 max-w-[90%] bg-gray-800" id="message" v-html="renderedContent">
    </div>
  </div>
</template>
