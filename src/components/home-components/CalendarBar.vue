<script setup lang="ts">
import { updateWeekNumber, weekEntries, weekNumber } from '@/stores/week-entries';
import 'primeicons/primeicons.css'

</script>

<template>
  <div class="grid grid-rows-1 grid-cols-3 text-white gap-10 mt-10 p-3 justify-items-center select-none">
    <div class="hover:scale-110 active:scale-90 transition-transform ease-in-out">
      <i @click="() => updateWeekNumber(weekNumber - 1)" class="icon pi pi-angle-left" style="font-size: 2rem"></i>
    </div>

    <div class="font-bold text-xl">{{ weekEntries[0].workDay.toLocaleDateString("de-DE") }}...{{ weekEntries[4].workDay.toLocaleDateString("de-DE") }}</div>

    <div class="hover:scale-110 active:scale-90 transition-transform ease-in-out">
      <i @click="() => updateWeekNumber(weekNumber + 1)" class="icon pi pi-angle-right" style="font-size: 2rem"></i>
    </div>
  </div>
</template>
