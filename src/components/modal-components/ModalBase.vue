<script setup lang="ts">
const props = defineProps<{ modalTitle: string }>()
</script>

<template>
  <div @click="$emit('close')" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 bg-clip-padding" style="z-index: 9999">
    <div @click.stop class="flex flex-col rounded-lg max-h-screen w-full max-w-3xl mx-auto items-center justify-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 p-3 overflow-y-auto">
      <div class="w-full rounded mx-auto px-5 bg-neutral-800">
        <div class="w-full mx-auto text-center px-10 text-3xl text-white font-bold pt-10">{{ props.modalTitle }}</div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
