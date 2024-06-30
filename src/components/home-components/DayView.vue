<script setup lang="ts">
import { weekEntries } from '@/stores/week-entries'
import type { Entry } from '@/types/day-entry'

const currentDay: Date = new Date()
</script>

<template>
  <div class="grid grid-rows-12 text-center mt-10 p-3 text-white h-screen w-full">
    <div class="font-bold text-xl">{{ currentDay.toLocaleDateString('de-DE') }}</div>

    <div class="row-span-11 grid grid-row-2 place-items-stretch mt-10 gap-10 h-2/4">
      <div class="al-box-bubble">
        <div class="flex text-center place-items-center justify-center bg-pink-500">
          <i class="pi pi-stopwatch text-center" style="font-size: 2rem"></i>
        </div>

        <div class="al-box-text bg-pink-400">
          <div class="text-left px-3 mb-5 w-full">Beginn:</div>
          <div class="text-left px-3 w-full">{{ currentDay.toString() }} Uhr</div>
        </div>
      </div>

      <div class="al-box-bubble">
        <div class="flex text-center place-items-center justify-center bg-indigo-500">
          <i class="pi pi-stopwatch text-center" style="font-size: 2rem"></i>
        </div>

        <div class="al-box-text bg-indigo-400">
          <div class="text-left px-3 mb-5 w-full">Beginn:</div>
          <div class="text-left px-3 w-full">{{ currentDay.toString() }} Uhr</div>
        </div>
      </div>
    </div>
  </div>
</template>
