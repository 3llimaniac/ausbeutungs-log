<script setup lang="ts">
defineEmits(['showEntryModal'])
</script>

<template>
  <div class="flex place-content-center place-items-center rounded bg-neutral-800">
    <div @click="$emit('showEntryModal')" class="al-icon">
      <i class="pi pi-plus" style="font-size: 1rem"></i>
    </div>
  </div>
</template>
