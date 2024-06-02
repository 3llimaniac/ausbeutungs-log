<script setup lang="ts">
import DayEntryBox, { type DayEntry } from './DayEntryBox.vue';
import { ref } from 'vue';

const weekEntries = ref<DayEntry[]>([]);
console.log(weekEntries.value);
</script>

<template>
  <div
    class="grid grid-cols-5 font-bold text-lg px-6 place-items-center rounded-t w-full h-16 border-t-2 border-x-2 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
    <div>Montag</div>
    <div>Dienstag</div>
    <div>Mittwoch</div>
    <div>Donnerstag</div>
    <div>Freitag</div>
  </div>

  <div
    class="rounded-b mb-3 px-3 pb-3 h-3/4 border-x-2 border-b-2 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 drop-shadow-lg">
    <div class="grid grid-cols-5 h-full border-2 bg-neutral-900 gap-10 p-10">
      <DayEntryBox :dayEntry="weekEntries[entryIndex]" v-for="entryIndex in [...Array(5).keys()]" :key="entryIndex"
        @showModal="$emit('showModal')" />
    </div>
  </div>
</template>
