<script lang="ts" setup>
import { defineProps } from "vue";
import { Message, MessageType } from "../../model/Message";
import { Model } from "../../model/Model";

import SingleMessage from "./SingleMessage.vue";

/**
 * @param messages 未排序的 Messages 集合，会根据 sendTime 排序
 * @param model 当前 Model 
 * @param userImg 用户显示的头像
 */
defineProps({
  messages: {
    type: Array<Message>,
    required: true,
  },
  model: {
    type: Model,
    required: true,
  },
  userImg: {
    type: String,
    required: true,
  },
});

defineEmits<{
  (e: "deleteMessage", message: Message): void;
  (e: "addToFavorite", message: Message): void;
}>();
</script>

<template>
  <div
    class="w-full flex flex-col items-stretch gap-8 h-full text-white px-4 py-8"
  >
    <SingleMessage 
      :model="model"
      v-for="message in messages"
      :message="message"
      :img="message.sender === MessageType.BOT ? model.img : userImg"
      :name="message.sender === MessageType.BOT ? model.name : 'User'"
      :key="message.sendTime"

      @deleteMessage="$emit('deleteMessage', message)"
      @addToFavorite="$emit('addToFavorite', message)"
    />
  </div>
</template>
