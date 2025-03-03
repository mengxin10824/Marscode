<script lang="ts" setup>
import DialogBox from "../src/dialogBox.vue";
import History from "./components/history.vue";
import Favorite from "./components/favorite.vue";
import InputBox from "../src/inputBox.vue";
import { ref, computed, onMounted } from "vue";
import TabBar from "./components/TabBar.vue";
import { Model } from "../../model/Model";
import { Tab } from "../../model/Tab";
import { Message, MessageType } from "../../model/Message";
import MarkdownIt from "markdown-it";

const tabList = ref<Message[]>([]);
const isHistoryOpen = ref(true);
const isFavoriteOpen = ref(true);

const loadTabs = () => {
  const tabs = sessionStorage.getItem("tabs");
  if (tabs) {
    tabList.value = JSON.parse(tabs);
  }
};

const saveTab = (message: Message) => {
  sessionStorage.setItem("tabs", JSON.stringify(tabList.value));
};

const toggleHistory = () => {
  isHistoryOpen.value = !isHistoryOpen.value;
};

const toggleFavorite = () => {
  isFavoriteOpen.value = !isFavoriteOpen.value;
};

// 状态管理
const isShowFavorite = ref(false);
const isShowHistory = ref(false);
const tabs = ref<Tab[]>([new Tab(undefined, "New Tab", true, undefined)]);

// 模型和用户信息
const model = new Model(
  undefined,
  "Bot",
  "https://cdn.jsdelivr.net/gh/linonetwo/linonetwo.github.io/assets/img/robot.png",
  "gpt-3.5-turbo",
  "Bearer sk-1234567890"
);
const userImg =
  "https://cdn.jsdelivr.net/gh/linonetwo/linonetwo.github.io/assets/img/user.png";

// 计算属性
const activeMessages = computed(() => {
  const activeTab = tabs.value.find((tab) => tab.isActive);
  return activeTab ? activeTab.messages : [];
});

const md = new MarkdownIt();
const formatContent = (content: string) => {
  return md.render(content);
};

// 标签页操作
function addNewTab(newTab?: Tab) {
  if (!newTab) {
    newTab = new Tab(undefined, "New Tab", false, undefined);
  }
  tabs.value.push(newTab);
  activateTab(newTab);
}

function activateTab(selectedTab: Tab) {
  tabs.value.forEach((tab) => {
    tab.isActive = tab.id === selectedTab.id;
  });
}

function deleteTab(tabToDelete: Tab) {
  const index = tabs.value.findIndex((tab) => tab.id === tabToDelete.id);
  if (index === -1) return;

  const wasActive = tabToDelete.isActive;
  tabs.value = tabs.value.filter((tab) => tab.id !== tabToDelete.id);

  if (wasActive && tabs.value.length > 0) {
    const newIndex = Math.min(index, tabs.value.length - 1);
    activateTab(tabs.value[newIndex]);
  }
}

const handleSendMessage = (message: Message) => {
  tabList.value.push(message);
  saveTab(message);
};

const handleReceiveMessage = (message: Message) => {
  tabList.value.push(message);
  // saveTab(message);
};

const updateMessage = (messageId: string, content: string) => {
  const message = tabList.value.find((msg) => msg.id === messageId);
  if (message) {
    message.content += content;
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

const splitContent = (content: string) => {
  const parts = [];
  const regex = /```(\w*)\n([\s\S]*?)```/g; // 匹配代码块及其语言
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(content)) !== null) {
    // 添加普通文本部分
    if (match.index > lastIndex) {
      parts.push({
        isCode: false,
        content: content.slice(lastIndex, match.index),
      });
    }
    // 添加代码块部分
    const codeContent = match[2].trim(); // 去除代码块标记
    const lines = codeContent.split("\n");
    const minIndent = Math.min(
      ...lines
        .filter((line) => line.trim()) // 过滤掉空行
        .map((line) => line.match(/^\s*/)?.[0].length || 0) // 计算每行的缩进
    );
    const normalizedContent = lines
      .map((line, index) => (index === 0 ? line.trimStart() : line.slice(minIndent))) // 第一行去除所有前导空格，其他行去除公共缩进
      .join("\n"); // 重新组合为字符串

    parts.push({
      isCode: true,
      language: match[1] || "text", // 提取语言名称，默认为 "text"
      content: normalizedContent, // 去除多余缩进后的代码内容
    });
    lastIndex = match.index + match[0].length;
  }
  // 添加剩余的普通文本部分
  if (lastIndex < content.length) {
    parts.push({
      isCode: false,
      content: content.slice(lastIndex),
    });
  }
  return parts;
};

onMounted(() => {
  loadTabs();
  addNewTab();
});
</script>
<template>
  <div class="flex flex-col gap-2 w-full h-dvh overflow-hidden text-white relative">
    <!-- Menu Button -->
    <div class="w-full flex justify-between items-start p-4 md:absolute md:top-15">
      <div
        class="py-1 px-2 bg-white text-black rounded-2xl text-sm"
        @click="toggleHistory"
      >
        &leftarrow; 历史
      </div>
      <div
        class="py-1 px-2 bg-white text-black rounded-2xl text-sm"
        @click="toggleFavorite"
      >
        收藏 &rightarrow;
      </div>
    </div>

    <!-- Dialog -->
    <div
      class="border-2 border-white rounded-2xl shadow-2xl grow no-scrollbar overflow-hidden mx-2 flex flex-col md:mx-0 md:rounded-tl-none md:rounded-tr-none md:rounded-br-2xl md:rounded-bl-2xl md:border-0"
    >
      <!-- Tab Bar -->
      <TabBar
        :tabs="tabs"
        @addTab="addNewTab(undefined)"
        @activateTab="activateTab"
        @deleteTab="deleteTab"
      />

      <!-- Chat -->
      <div
        class="grow w-full text-white md:px-26 md:py-10 md:gap-5 md:flex md:flex-col overflow-y-auto h-[calc(100vh-200px)]"
        flex-grow
      >
        <!-- <DialogBox :messages="activeMessages" :model="model" :userImg="userImg" /> -->
        <div v-for="msg in tabList" :key="msg.id">
          <!-- <div v-for="msg in activeMessages" :key="msg.id"> -->
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
              <template v-for="(part, index) in splitContent(msg.content)" :key="index">
                <template v-if="part.isCode">
                  <div
                    class="w-full overflow-x-hidden bg-gray-800 rounded-2xl h-fit my-2"
                  >
                    <div
                      class="w-full flex justify-between items-center bg-slate-500 px-4 py-1 text-sm"
                    >
                      <span>{{ part.language }}</span>
                      <button @click="copyCode(part.content)">Copy</button>
                    </div>
                    <pre class="p-4 bg-gray-900">
                      <code>
                        {{ part.content }}
                      </code>
                    </pre>
                  </div>
                </template>
                <template v-else>
                  <p
                    class="text-pretty break-words"
                    v-html="formatContent(part.content)"
                  ></p>
                </template>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Box -->
    <div class="relative min-h-40">
      <InputBox
        :isToolBar="true"
        @sendMessage="handleSendMessage"
        @receiveMessage="handleReceiveMessage"
        @updateMessage="updateMessage"
      />
    </div>

    <Favorite v-if="isShowFavorite" @close="isShowFavorite = false" />
    <History v-if="isShowHistory" @close="isShowHistory = false" />
  </div>
</template>

<style scoped>
pre {
  padding: 0.5rem 1rem; /* 减少上下内边距 */
  margin: 0; /* 去除默认外边距 */
  width: 100%; /* 宽度一致 */
  overflow-x: auto; /* 允许水平滚动 */
  background-color: #1e1e1e; /* 深色背景 */
  border-radius: 0.5rem; /* 圆角 */
}

code {
  display: block; /* 确保代码块独占一行 */
  white-space: pre; /* 保留换行，但不自动换行 */
  overflow-wrap: break-word; /* 允许长单词换行 */
  font-size: 1rem; /* 字体大小 */
  font-weight: normal; /* 字体加粗 */
  letter-spacing: normal; /* 字母间距 */
  word-spacing: normal; /* 单词间距 */

  text-align: start; /* 文本对齐方式为左对齐 */
  /* color: #d4d4d4;  */
  font-family: "Consolas", "Monaco", monospace; /* 使用等宽字体 */
  line-height: 1.5; /* 行高 */
}

/* 添加语法高亮 */
code .keyword {
  color: #569cd6; /* 关键字颜色 */
}

code .string {
  color: #ce9178; /* 字符串颜色 */
}

code .comment {
  color: #6a9955; /* 注释颜色 */
}

code .number {
  color: #b5cea8; /* 数字颜色 */
}
</style>
