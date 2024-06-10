<script setup lang="ts">
import type { DayEntry } from '@/types/day-entry';
import 'primeicons/primeicons.css';

const props = defineProps<{ dayEntry: DayEntry; }>();
</script>

<template>
  <div v-if="dayEntry && dayEntry.arrival"
    class="flex flex-col place-content-center place-items-center rounded bg-neutral-800 text-white text-xl font-bold transition-all ease-in-out p-10 px-5 select-none">

    <div class="w-full h-full">
      <div class="flex justify-center place-items-center mx-5 mb-5 text-center">
        {{ props.dayEntry.workDay.toLocaleDateString("de-DE") }}
      </div>

      <div class="grid grid-rows-2 grid-cols-1 gap-10 place-items-stretch mx-auto w-full h-2/3 rounded">
        <div class="al-box-bubble border-pink-200">
          <div class="flex text-center place-items-center justify-center bg-pink-500">
            <i class="pi pi-stopwatch text-center" style="font-size: 1.0rem"></i>
          </div>

          <div class="al-box-text bg-pink-400">
            <div class="text-left px-3 mb-5 w-full">Beginn: </div>
            <div class="text-left px-3 w-full">{{ props.dayEntry.arrival.toString() }} Uhr</div>
          </div>
        </div>

        <div class="al-box-bubble border-indigo-200">
          <div class="al-box-icon bg-indigo-500">
            <i class="pi pi-stopwatch text-center" style="font-size: 1.0rem"></i>
          </div>

          <div class="al-box-text bg-indigo-400">
            <div class="text-left px-3 mb-5 w-full">Ende:</div>
            <div class="text-left px-3 w-full">{{ props.dayEntry.departure.toString() }} Uhr</div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex flex-col justify-end place-content-end align-bottom place-items-center rounded bg-neutral-800 w-full mb-5">
      <div @click="$emit('showEntryModal')" class="al-icon">
        <i class="pi pi-pencil" style="font-size: 1.0rem"></i>
      </div>
    </div>
  </div>

  <div v-else class="flex place-content-center place-items-center rounded bg-neutral-800">
    <div @click="$emit('showEntryModal')" class="al-icon">
      <i class="pi pi-plus" style="font-size: 1.0rem"></i>
    </div>
  </div>
</template>

<style>
.al-box-bubble {
  /* @apply flex place-content-stretch place-items-center */
  @apply grid grid-cols-6 place-items-stretch justify-center rounded w-full border-2
}

.al-box-icon {
  @apply flex text-center place-items-center justify-center
}

.al-box-text {
  @apply col-span-5 flex flex-col text-center place-items-center justify-center
}

.al-icon {
  @apply flex p-3 place-content-center rounded text-neutral-500 bg-neutral-800 border-2 border-neutral-700 hover:text-neutral-400 hover:bg-neutral-700 active:scale-95 transition ease-in-out
}
</style>
