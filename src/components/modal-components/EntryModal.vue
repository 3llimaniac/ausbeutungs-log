<script setup lang="ts">
import { useEntryStore } from '@/stores/week-entries'
import { AbsenceEntry, DayEntry, type Entry } from '@/types/day-entry'
import { ref, type Ref, computed, type ComputedRef, watch } from 'vue'
import DayEntryForm from './modal-form-components/DayEntryForm.vue'
import AbsenceEntryForm from './modal-form-components/AbsenceEntryForm.vue'
import { createPinia, setActivePinia } from 'pinia'

const entryStore = useEntryStore()

// first state of isAbsent
const props = defineProps<{ isAbsent: boolean }>()
defineEmits(['close'])

let isAbsentLocal: Ref<boolean> = ref(props.isAbsent || entryStore.selectedEntry.workDay > new Date())

watch(isAbsentLocal, (newVal: boolean, oldVal: boolean) => {
  if (newVal || entryStore.selectedEntry.workDay > new Date()) {
    isAbsentLocal.value = true
  } else {
    isAbsentLocal.value = false
  }
})
</script>

<template>
  <div @click="$emit('close')" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 bg-clip-padding" style="z-index: 9999">
    <div @click.stop class="flex flex-col rounded-lg max-h-screen w-full max-w-3xl mx-auto items-center justify-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 p-3 overflow-y-auto">
      <div class="w-full rounded mx-auto px-5 bg-neutral-800">
        <div class="w-full mx-auto text-center px-10 text-3xl text-white font-bold pt-10 pb-10">Tageseintrag</div>

        <div class="gap-5 rounded py-3 mx-10 mb-10 text-white text-center font-bold text-xl p-3 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 border-2 border-white">
          <div class="p">
            <i class="icon pi pi-calendar mr-1" style="font-size: 1.2rem"></i>
            {{ entryStore.selectedEntry.workDay.toLocaleDateString('de-DE') }}
          </div>
        </div>

        <div class="flex justify-center border-b-2 border-b-neutral-700 mb-10 text-white gap-5 mx-5">
          <button v-if="entryStore.selectedEntry.workDay < new Date()" type="button" @click="isAbsentLocal = false" :class="[isAbsentLocal ? 'al-entry-modal-tab-not-clicked' : 'al-entry-modal-tab-clicked']">
            <i class="icon pi pi-calendar-plus mr-1" style="font-size: 1rem"></i>
            Arbeitszeit
          </button>

          <button type="button" @click="isAbsentLocal = true" :class="[isAbsentLocal || entryStore.selectedEntry.workDay > new Date() ? 'al-entry-modal-tab-clicked' : 'al-entry-modal-tab-not-clicked']">
            <i class="icon pi pi-calendar-minus mr-1" style="font-size: 1rem"></i>
            Fehlzeit
          </button>
        </div>

        <div v-if="isAbsentLocal">
          <AbsenceEntryForm @close="$emit('close')" :entry="entryStore.selectedEntry as AbsenceEntry" />
        </div>

        <div v-else>
          <DayEntryForm @close="$emit('close')" :entry="entryStore.selectedEntry as DayEntry" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ensure the inner modal is scrollable if it overflows */
.max-h-screen {
  max-height: 100vh;
}

.al-entry-modal-tab-not-clicked {
  @apply p-3 border-neutral-800 border-b-4 rounded-t hover:border-b-neutral-600 transition-all ease-in-out;
}

.al-entry-modal-tab-clicked {
  @apply p-3 border-b-gray-300 bg-neutral-600 rounded-t border-b-4 transition-all ease-in-out;
}
</style>
