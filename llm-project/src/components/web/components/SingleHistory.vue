<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { Tab } from "../../../model/Tab";

let props = defineProps({
  historyItem: {
    type: Tab,
    required: true
  },
  isEditing: {
    type: Boolean,
    default: false
  },
});

const emit = defineEmits([
    "delete"
]);

const handleDelete = () => {
  if (props.isEditing) {
    emit('delete', props.historyItem.id); 
  }
};
</script>

<template>
  <div
    class="p-2 text-black rounded-xl text-sm w-full flex justify-between items-center hover:bg-blue-300 shadow-2xl transition-all"
    :class="[props.isEditing ? 'bg-blue-200 shake' : 'bg-white']"
  >
    <span>{{ props.historyItem.name }}</span>
    <div class="cursor-pointer" @click.stop="handleDelete">
      <svg
        v-if="props.isEditing"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        />
      </svg>
    </div>
  </div>
</template>

<style lang="css" scoped>
.shake {
  animation: shake 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97) infinite;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%, 30%, 50%, 70%, 90% {
    transform: translate3d(-1px, 0, 0) rotate(-1deg);
  }
  20%, 40%, 60%, 80% {
    transform: translate3d(1px, 0, 0) rotate(1deg);
  }
}
</style>