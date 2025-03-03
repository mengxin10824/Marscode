<script lang="ts" setup>
import { defineProps, withDefaults } from "vue";
import { Message, MessageType } from "../../model/Message";
import { Model } from "../../model/Model";
import SingleMessage from "./SingleMessage.vue";
import MarkdownIt from "markdown-it";
import { streamChatCompletion } from "../../services/aiService";
import { ref, nextTick, computed, onMounted } from "vue";
import { generateUUID } from "../../model/UUID";
import { getNow } from "../../model/Time";
import type { StreamChunk } from "../../services/aiService";

const tabList = ref<Message[]>([]);

/**
 * @param messages 未排序的 Messages 集合，会根据 sendTime 排序
 * @param model 当前 Model
 * @param userImg 用户显示的头像
 */
interface Props {
  messages: Message[];
  model: Model;
  userImg: string;
}

const props = withDefaults(defineProps<Props>(), {
  messages: () => [],
  userImg: "https://example.com/default-avatar.png",
});

const md = new MarkdownIt();
const formatContent = (content: string) => {
  return md.render(content);
};

const messages = ref<Message[]>([]);

const handleSend = async (content: string) => {
  if (!content.trim()) return;

  const userMsg = new Message(
    generateUUID(), // id
    content, // content
    MessageType.USER, // sender
    getNow() // sendTime
  );
  messages.value.push(userMsg);

  const aiMsg = new Message(
    generateUUID(), // id
    "", // content (初始为空)
    MessageType.BOT, // sender
    getNow() // sendTime
  );
  aiMsg.isStreaming = true;
  messages.value.push(aiMsg);

  try {
    await streamChatCompletion(
      [userMsg],
      (chunk) => {
        handleStreamResponse(chunk.content, (content) => {
          aiMsg.updateContent(content); // 更新 aiMsg 的内容
        });
      },
      (messageId, content) => {
        // 如果需要处理消息更新，可以在这里添加逻辑
        if (messageId === aiMsg.id) {
          aiMsg.updateContent(content); // 更新 aiMsg 的内容
          console.log("更新了消息内容", messageId, content);
        } else {
          // 处理其他消息的更新逻辑
        }
      }
    );
  } finally {
    aiMsg.isStreaming = false;
  }
};

const copyCode = (code: string) => {
  navigator.clipboard
    .writeText(code)
    .then(() => {
      // 显示复制成功提示
    })
    .catch(() => {
      // 显示复制失败提示
    });
};

const handleStreamResponse = (chunk: string, onData: (content: string) => void) => {
  const lines = chunk
    .split("\n")
    .filter((line) => line.trim() && line.startsWith("data: "));

  let combinedContent = ""; // 用于组合分块的 content

  lines.forEach((line) => {
    const data = line.replace("data: ", "").trim();
    if (data === "[DONE]") {
      console.log("Stream completed with [DONE] marker."); // 打印流式传输完成标志
      return; // 遇到 [DONE] 标志，直接返回
    }

    try {
      // const data = JSON.parse(line.replace("data: ", "")) as StreamChunk;
      // const content = data.choices[0].delta.content || "";

      const parsedData = JSON.parse(data) as StreamChunk;
      const content = parsedData.choices[0].delta.content || "";
      combinedContent += content; // 将分块的 content 组合起来
      console.log("Received chunk:", content); // 打印每个分块的内容，用于调试目的
    } catch (error) {
      console.error("Error parsing stream chunk:", error);
    }
  });

  onData(combinedContent); // 将组合后的 content 传递给回调函数
  console.log("Combined content:", combinedContent); // 打印组合后的完整内容，用于调试目的
};

const activeMessages = computed(() => props.messages);

const someFunction = () => {
  console.log(activeMessages.value);
};

const codeContent = ref(
  'import Foundation\nstruct TodoItem: Identifiable {\n    var id = UUID()\n    var title: String = "Default Event Example for long text todo item"\n    var isCompleted: Bool\n}'
);

defineExpose({
  handleSend,
});

nextTick(() => {
  // DOM 更新后的逻辑
});

onMounted(() => {
  someFunction();
});
</script>

<template>
  <div class="w-full flex flex-col items-stretch gap-8 h-full text-white px-4 py-8">
    <!-- User -->
    <div
      :class="[
        'h-fit',
        'flex',
        'flex-row-reverse',
        'items-start',
        'justify-start',
        'gap-2',
      ]"
    >
      <img src="" alt="" class="size-10 aspect-square rounded-full bg-amber-50" />
      <div class="rounded-2xl p-2 max-w-[90%] bg-gray-800">
        <p class="text-pretty break-words">
          你好，AI！我想创建一个简单的TodoApp，展示我的个人信息。你能帮我设计一个基本的结构吗？我希望能包括我的名字、照片和一些兴趣爱好。
        </p>
      </div>
    </div>

    <!-- AI -->
    <div class="h-fit flex items-start justify-start gap-2">
      <img src="" alt="" class="size-10 aspect-square rounded-full bg-amber-50" />
      <div class="rounded-2xl bg-gray-800 p-2 max-w-[90%]">
        <p class="text-pretty break-words">
          当然可以！创建一个待办事项应用是一个很好的SwiftUI项目。首先，您需要确保您的开发环境已经设置好，包括Xcode和SwiftUI的基本知识。
        </p>

        <p class="text-pretty break-words mt-2">
          1.
          创建项目：打开Xcode，选择"创建新项目"，选择"App"，然后命名您的项目，例如"TodoApp"。
        </p>

        <p class="text-pretty break-words mt-2">
          2.
          定义数据模型：我们需要一个简单的模型来表示待办事项。可以创建一个TodoItem结构，包含任务的标题和完成状态。
        </p>

        <!-- 重点处理Code部分 -->
        <div class="w-fit overflow-x-hidden bg-gray-800 rounded-2xl h-fit my-2">
          <div
            class="w-full flex justify-between items-center bg-slate-500 px-4 py-1 text-sm"
          >
            <span>Swift</span>
            <button @click="copyCode(codeContent)">Copy</button>
          </div>
          <pre
            class="p-2 bg-gray-900"
          ><code class="inline- block no-scrollbar text-sm break-words whitespace-pre-wrap">import Foundation
struct TodoItem: Identifiable {
    var id = UUID()
    var title: String = "Default Event Example for long text todo item efault Event Example for long text todo item efault Event Example for long text todo item efault Event Example for long text todo item" 
    var isCompleted: Bool
}</code></pre>
        </div>
      </div>
    </div>
    <div v-for="msg in tabList" :key="msg.id">
      <div
        v-if="msg.sender === MessageType.USER"
        class="h-fit flex flex-row-reverse items-start justify-start gap-2"
      >
        <img
          :src="userImg"
          alt="User"
          class="size-10 aspect-square rounded-full bg-amber-50"
        />
        <div class="rounded-2xl p-2 max-w-[90%] bg-gray-800">
          <p class="text-pretty break-words">{{ msg.content }}</p>
        </div>
      </div>
      <div
        v-if="msg.sender === MessageType.BOT"
        class="h-fit flex items-start justify-start gap-2"
      >
        <img
          :src="model.icon"
          alt="AI"
          class="size-10 aspect-square rounded-full bg-amber-50"
        />
        <div class="rounded-2xl bg-gray-800 p-2 max-w-[90%]">
          <p class="text-pretty break-words">{{ msg.content }}</p>
        </div>
      </div>
    </div>

    <div v-for="msg in messages" :key="msg.id">
      <div v-if="msg.isStreaming" class="typing-indicator">
        <!-- 加载动画 -->
      </div>
      <div v-html="formatContent(msg.content)"></div>
    </div>
    <SingleMessage
      :model="model"
      v-for="message in activeMessages"
      :message="message"
      :img="message.sender === MessageType.BOT ? model.icon : userImg"
      :name="message.sender === MessageType.BOT ? model.name : 'User'"
      :key="message.sendTime"
    />
  </div>
</template>
