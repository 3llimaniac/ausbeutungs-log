<script setup lang="ts">
import type { HolidayEntry } from '@/stores/holiday';

const props = defineProps<{ holidayEntry: HolidayEntry }>()
</script>

<template>
  <div class="flex flex-col place-content-center place-items-center rounded bg-neutral-800 text-white text-xl font-bold transition-all ease-in-out p-10 px-5 select-none">
    <div class="w-full h-full">
      <div class="flex justify-center place-items-center mx-5 mb-5 text-center">{{ props.holidayEntry.date.toLocaleDateString('de-DE') }}</div>

      <div class="flex justify-center place-items-center text-center mx-auto w-full h-3/4 text-neutral-400">
        <div class="grid grid-rows-2 gap-3">
          <i class="pi pi-home" style="font-size: 1.5rem"></i>
          {{ props.holidayEntry.fname }}
        </div>
      </div>
    </div>
  </div>
</template>
