<script setup lang="ts">
import DialogBox from "./src/DialogBox.vue";
import InputBox from "./src/InputBox.vue";

import { ref } from "vue";
let inputContent = ref("");
</script>

<template>
  <div
    class="flex flex-col bg-black text-white rounded-2xl w-150 h-[80dvh] border-2 border-gray-300 p-4 gap-4"
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
          <path
            fill="#fff"
            fill-rule="evenodd"
            d="M0 0h16v16H0V0Z"
            clip-rule="evenodd"
          />
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
        <img
          src=""
          alt=""
          class="size-9 aspect-square rounded-full bg-amber-50"
        />
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

    <div class="overflow-y-scroll">
      <DialogBox />
    </div>

    <InputBox 
      :input-content="inputContent"
    />
  </div>
</template>
