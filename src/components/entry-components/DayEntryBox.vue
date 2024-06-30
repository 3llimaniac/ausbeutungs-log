<script setup lang="ts">
import type { DayEntry } from '@/types/day-entry'
import 'primeicons/primeicons.css'

defineEmits(['showEntryModal'])
const props = defineProps<{ entry: DayEntry }>()
</script>

<template>
  <div class="flex flex-col place-content-center place-items-center rounded bg-neutral-800 text-white text-xl font-bold transition-all ease-in-out p-10 px-5 select-none">
    <div class="w-full h-full">
      <div class="flex justify-center place-items-center mx-5 mb-5 text-center">
        {{ props.entry.workDay.toLocaleDateString('de-DE') }}
      </div>

      <div class="grid grid-rows-2 grid-cols-1 gap-10 place-items-stretch mx-auto w-full h-2/3 rounded">
        <div v-if="entry.arrival" class="al-box-bubble border-pink-200">
          <div class="flex text-center place-items-center justify-center bg-pink-500">
            <i class="pi pi-stopwatch text-center" style="font-size: 1rem"></i>
          </div>

          <div class="al-box-text bg-pink-400">
            <div class="text-left px-3 mb-5 w-full">Beginn:</div>
            <div class="text-left px-3 w-full">{{ props.entry.arrival.toString() }} Uhr</div>
          </div>
        </div>

        <div v-if="entry.departure" class="al-box-bubble border-indigo-200">
          <div class="al-box-icon bg-indigo-500">
            <i class="pi pi-stopwatch text-center" style="font-size: 1rem"></i>
          </div>

          <div class="al-box-text bg-indigo-400">
            <div class="text-left px-3 mb-5 w-full">Ende:</div>
            <div class="text-left px-3 w-full">{{ props.entry.departure.toString() }} Uhr</div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col justify-end place-content-end align-bottom place-items-center rounded bg-neutral-800 w-full mb-5">
      <div @click="$emit('showEntryModal')" class="al-icon">
        <i class="pi pi-pencil" style="font-size: 1rem"></i>
      </div>
    </div>
  </div>
</template>
