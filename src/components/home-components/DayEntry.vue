<script setup lang="ts">
import 'primeicons/primeicons.css'

const props = defineProps({
  showModalFunction: {
    type: Function
  }
})
</script>

<template>
  <div class="flex place-content-center place-items-center rounded bg-neutral-800 m-10 pb-3">
    <div @click="$emit('showModal')"
      class="flex p-3 place-content-center rounded bg-purple-400 hover:bg-purple-500 active:scale-95 active:bg-purple-500 transition ease-in-out">
      <i class="icon pi pi-plus" style="font-size: 1.5rem"></i>
    </div>
  </div>
</template>
