<script setup lang="ts"></script>

<template>
  <div class="p-3 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 rounded">
    <div class="text-center gap-10 p-3 justify-items-center rounded bg-neutral-900 drop-shadow-md select-none">
      <div id="title" class="font-bold p-2 text-3xl text-purple-500 animate-pulse">AusbeutungsLog</div>

      <div class="grid grid-rows-1 grid-cols-3 text-white gap-10 p-3 justify-items-center select-none">
        <div class="hover:scale-110 active:scale-90 transition-transform ease-in-out">
          <i class="icon pi pi-angle-left" style="font-size: 2rem"></i>
        </div>

        <div class="font-bold text-2xl">2024: 35/52</div>

        <div class="hover:scale-110 active:scale-90 transition-transform ease-in-out">
          <i class="icon pi pi-angle-right" style="font-size: 2rem"></i>
        </div>
      </div>
    </div>
  </div>
</template>
