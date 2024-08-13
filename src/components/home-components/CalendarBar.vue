<script setup lang="ts">
import { useEntryStore } from '@/stores/week-entries';
import 'primeicons/primeicons.css'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';

const entryStore = useEntryStore()

</script>

<template>
  <div class="grid grid-rows-1 grid-cols-3 text-white gap-10 mt-10 p-3 pb-5 justify-items-center select-none">
    <div class="hover:scale-110 active:scale-90 transition-transform ease-in-out">
      <ChevronLeftIcon @click="() => entryStore.updateWeekNumber(entryStore.weekNumber - 1)" class="al-icon-bar" />
    </div>

    <div class="font-bold text-xl">{{ entryStore.weekEntries[0].workDay.toLocaleDateString("de-DE") }}...{{ entryStore.weekEntries[4].workDay.toLocaleDateString("de-DE") }}</div>

    <div class="hover:scale-110 active:scale-90 transition-transform ease-in-out">
      <ChevronRightIcon @click="() => entryStore.updateWeekNumber(entryStore.weekNumber + 1)" class="al-icon-bar" />
    </div>
  </div>
</template>
