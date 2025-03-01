<script lang="ts" setup>
defineProps({
  favoriteIndex: {
    type: Number,
    required: true
  },
  favoriteContent: {
    type: String,
    required: true
  }
});
</script>
<template>
  <div
    class="flex-col text-black rounded-xl text-sm w-full flex justify-between bg-white hover:bg-blue-300"
  >
    <div
      class="p-2 text-black rounded-xl text-sm w-full flex justify-between items-center"
    >
      <span> 历史记录 {{ favoriteIndex }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="#000"
          d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm-4.5 6.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
        />
      </svg>
    </div>
    <div class="p-2 border-t-2 border-black overflow-hidden line-clamp-5">
      {{ favoriteContent }}
    </div>
  </div>
</template>

