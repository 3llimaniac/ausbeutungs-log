<script setup lang="ts">
import type { DayEntry } from '@/types/day-entry';
import 'primeicons/primeicons.css';

const props = defineProps<{ dayEntry: DayEntry}>();
console.log(props.dayEntry.arrival);
</script>

<template>
  <div v-if="dayEntry && dayEntry.arrival"
    class="flex place-content-center place-items-center rounded bg-neutral-800 text-white text-2xl font-bold">
    <div class="grid grid-rows-2 grid-cols-1 place-items-stretch mx-auto w-full h-full">
      <div
        class="flex place-content-center place-items-center m-10 rounded bg-indigo-400 border-2 border-indigo-200 hover:bg-indigo-500 active:scale-95 transition ease-in-out select-none">

        <div>
          <div class="text-center mb-5">Beginn:</div>
          <div class="text-center">{{ props.dayEntry.arrival.toString() }} Uhr</div>
        </div>
      </div>

      <div
        class="flex place-content-center place-items-center m-10 rounded bg-pink-400 border-2 border-pink-200 hover:bg-pink-500 active:scale-95 transition ease-in-out select-none">
        <div>
          <div class="text-center mb-5">Ende:</div>
          <div class="text-center">{{ props.dayEntry.departure.toString() }} Uhr</div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="flex place-content-center place-items-center rounded bg-neutral-800 py-10">
    <div @click="$emit('showModal')"
      class="flex p-3 place-content-center rounded bg-purple-400 border-2 border-purple-200  hover:bg-purple-500 active:scale-95 active:bg-purple-500 transition ease-in-out">
      <i class="icon pi pi-plus" style="font-size: 1.5rem"></i>
    </div>
  </div>
</template>
