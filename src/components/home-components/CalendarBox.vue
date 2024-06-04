<script setup lang="ts">
import { weekEntries } from '@/stores/week-entries';
import DayEntryBox from './DayEntryBox.vue';
</script>

<template>
  <div class="w-full h-full">
    <div
      class="grid grid-cols-5 font-bold text-base px-6 place-items-center rounded-t w-full py-4 border-t-2 border-x-2 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      <div>Montag</div>
      <div>Dienstag</div>
      <div>Mittwoch</div>
      <div>Donnerstag</div>
      <div>Freitag</div>
    </div>

    <div
      class="rounded-b mb-3 px-3 pb-3 h-3/4 border-x-2 border-b-2 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 drop-shadow-lg">
      <div class="grid grid-cols-5 h-full border-2 bg-neutral-900 gap-10 p-10">
        <DayEntryBox v-for="(entry, index) in weekEntries" :key="index" :dayEntry="entry"
          @showModal="$emit('showModal')" />
      </div>
    </div>
  </div>
</template>
