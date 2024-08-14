<script setup lang="ts">
import { useHolidayStore } from '@/stores/holiday';
import { useEntryStore } from '@/stores/week-entries';

const entryStore = useEntryStore()
const holidayStore = useHolidayStore()

function onYearClick(nextYear: boolean = true) {
  const newYearNumber = nextYear ? entryStore.yearNumber + 1 : entryStore.yearNumber - 1
  entryStore.updateYearNumber(newYearNumber)
  holidayStore.getEntries(newYearNumber)
}
</script>

<template>
    <div class="select-none">
      <div class="grid grid-rows-1 grid-cols-3 gap-3 mx-10 text-center mt-24 text-white font-bold text-lg">
        <div @click="() => onYearClick(false)" class="flex place-content-center justify-center hover:scale-110 active:scale-90 transition-transform ease-in-out">
          <i class="icon pi pi-angle-left" style="font-size: 1.8rem"></i>
        </div>

        <div>{{ entryStore.yearNumber }}</div>

        <div @click="() => onYearClick()" class="flex place-content-center justify-center hover:scale-110 active:scale-90 transition-transform ease-in-out">
          <i class="icon pi pi-angle-right" style="font-size: 1.8rem"></i>
        </div>
      </div>

      <div class="grid grid-cols-4 place-items-stretch gap-2 text-white mt-3 mx-10">
        <div
          @click="entryStore.weekGroup = currWeekGroup"
          v-for="currWeekGroup in 4"
          :key="currWeekGroup"
          class="bg-neutral-800 rounded text-center p-2 border-2 hover:bg-neutral-600 active:bg-indigo-600 transition-all ease-in-out"
          :class="[entryStore.weekGroup == currWeekGroup ? 'border-indigo-400' : 'border-neutral-600']"
        >
          {{ currWeekGroup * 13 }}
        </div>
      </div>

      <div class="grid grid-cols-4 place-items-stretch gap-2 text-white mt-10 mx-10">
        <div
          @click="() => entryStore.updateWeekNumber(weekNumb + 13 * (entryStore.weekGroup - 1))"
          v-for="weekNumb in 13"
          :key="weekNumb"
          class="bg-neutral-700 hover:bg-neutral-500 active:bg-pink-600 rounded text-center p-2 border-2 transition-all ease-in-out"
          :class="[
            entryStore.weekNumber == weekNumb + 13 * (entryStore.weekGroup - 1) ? 'border-pink-400' : 'border-neutral-500',
            new Date().getWeek() == weekNumb + 13 * (entryStore.weekGroup - 1) && new Date().getFullYear() === entryStore.yearNumber ? 'border-purple-400' : ''
          ]"
        >
          {{ weekNumb + 13 * (entryStore.weekGroup - 1) }}
        </div>
      </div>
    </div>
</template>