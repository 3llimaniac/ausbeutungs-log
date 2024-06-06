<script setup lang="ts">
import type { DayEntry } from '@/types/day-entry';
import 'primeicons/primeicons.css';

const props = defineProps<{ dayEntry: DayEntry; }>();
</script>

<template>
  <div v-if="dayEntry && dayEntry.arrival"
    class="flex place-content-center place-items-center rounded bg-neutral-800 text-white text-xl font-bold transition-all ease-in-out p-10 px-5 select-none">

    <div class="w-full h-full">
      <div @click="$emit('showEntryModal')"
        class="grid grid-rows-5 grid-cols-1 place-items-stretch mx-auto w-full h-full rounded border-2 border-neutral-500 bg-neutral-700 hover:bg-neutral-600 active:scale-95 transition ease-in-out">

        <div class="text-center mt-5">{{ props.dayEntry.workDay.toLocaleDateString("de-DE") }}</div>

        <div class="al-box-bubble">
          <div class="border-l-8 border-l-pink-400">
            <div class="text-left ml-3 mb-5">Beginn:</div>
            <div class="text-left ml-3">{{ props.dayEntry.arrival.toString() }} Uhr</div>
          </div>
        </div>

        <div class="al-box-bubble">
          <div class="border-l-8 border-l-indigo-400">
            <div class="text-left ml-3 mb-5">Ende:</div>
            <div class="text-left ml-3 ">{{ props.dayEntry.departure.toString() }} Uhr</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="flex place-content-center place-items-center rounded bg-neutral-800 py-10">
    <div @click="$emit('showEntryModal')"
      class="flex p-3 place-content-center rounded text-neutral-500 bg-neutral-800 border-2 border-neutral-700 hover:text-neutral-400 hover:bg-neutral-700 active:scale-95 transition ease-in-out">
      <i class="icon pi pi-plus" style="font-size: 1.0rem"></i>
    </div>
  </div>
</template>

<style>
.al-box-bubble {
  @apply row-span-2 flex place-content-stretch place-items-center mx-5
}
</style>
