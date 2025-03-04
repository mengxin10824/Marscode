<script setup lang="ts">
import Web from "./components/web/Web.vue";
import Search from "./components/Search.vue";
import Inline from "./components/Inline.vue";

</script>

<template>
  <div class="bg-[#0b0b0b] w-vw h-dvh flex justify-center items-center">
    <span class="text-white text-5xl">MarsCode 寒假大项目汇总</span>
  </div>
  <div class="bg-[#0b0b0b] w-vw h-dvh flex justify-center items-center">
    <Search />
  </div>
  <div
    class="bg-[#0b0b0b] w-vw h-dvh flex justify-center items-center relative"
  >
    <Inline />
  </div>
  <div class="bg-black w-vw h-dvh flex flex-col justify-center items-center">
    <Web />
  </div>
</template>

