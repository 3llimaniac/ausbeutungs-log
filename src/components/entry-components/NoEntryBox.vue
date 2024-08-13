<script setup lang="ts">
defineEmits(['showEntryModal'])
import { PlusIcon } from "@heroicons/vue/24/solid"
</script>

<template>
  <div class="flex place-content-center place-items-center rounded bg-neutral-800">
    <div @click="$emit('showEntryModal')" class="al-icon">
      <PlusIcon class="al-icon-button" />
    </div>
  </div>
</template>
