<script setup lang="ts">
import type { AbsenceEntry } from '@/types/day-entry'
import { PencilSquareIcon } from '@heroicons/vue/24/solid';
import { NoSymbolIcon } from '@heroicons/vue/24/solid';

const props = defineProps<{ entry: AbsenceEntry }>()

defineEmits(['showEntryModal'])
</script>

<template>
  <div class="flex flex-col place-content-center place-items-center rounded bg-neutral-800 text-white text-xl font-bold transition-all ease-in-out p-10 px-5 select-none">
    <div class="w-full h-full">
      <div class="flex justify-center place-items-center mx-5 mb-5 text-center">
        {{ props.entry.workDay.toLocaleDateString('de-DE') }}
      </div>

      <div class="flex justify-center place-items-center text-center mx-auto w-full h-3/4 text-white">
        <div class="grid grid-rows-2 gap-3">
          <NoSymbolIcon class="al-icon-entry text-purple-400" />
          {{ props.entry.reason }}
        </div>
      </div>
    </div>

    <div class="flex flex-col justify-end place-content-end align-bottom place-items-center rounded bg-neutral-800 w-full mb-5">
      <div @click="$emit('showEntryModal')" class="al-icon">
        <PencilSquareIcon class="al-icon-button" />
      </div>
    </div>
  </div>
</template>
