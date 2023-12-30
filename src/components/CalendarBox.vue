<script setup lang="ts">
  import DayEntry from './DayEntry.vue';
</script>

<template>
  <div class="grid grid-cols-5 font-bold text-lg gap-3 place-items-center rounded-t w-full h-20 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      <div>Montag</div>
      <div>Dienstag</div>
      <div>Mittwoch</div>
      <div>Donnerstag</div>
      <div>Freitag</div>
    </div>

  <div class="rounded-b mb-3 h-4/6 bg-white drop-shadow-lg">
    <div class="grid grid-cols-5 row-span-4 h-5/6">
        <DayEntry />
        <DayEntry />
        <DayEntry />
        <DayEntry />
        <DayEntry />
    </div>
  </div>
</template>
