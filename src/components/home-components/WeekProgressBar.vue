<script setup lang="ts">
import { useEntryStore } from '@/stores/week-entries'
import { computed } from 'vue'

const entryStore = useEntryStore()

const computedWidth = computed<number>(() => {
  const hours: number = entryStore.weekHours
  const worked: number = Number(entryStore.workedHours)

  if (hours === 0) {
    return 0
  }

  return (worked / hours) * 100
})
</script>

<template>
  <div class="w-full h-full">
    <div class="text-white text-xl text-center font-bold pb-3">{{ entryStore.workedHours }}/{{ entryStore.weekHours }} Stunden</div>
    <div class="flex items-center border-4 w-full bg-gray-200 rounded-full mx-2 dark:bg-gray-700">
      <div class="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 h-3 rounded-full" :style="{ width: computedWidth + '%' }"></div>
    </div>
    <div class="text-white text-xl text-center font-bold pt-3">Überstunden: {{ entryStore.overtimeHours }} Stunden</div>
  </div>
</template>
