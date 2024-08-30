<script setup lang="ts">
import { useEntryStore } from '@/stores/week-entries'
import { AbsenceEntry, DayEntry } from '@/types/day-entry'
import { ref, type Ref, watch } from 'vue'
import DayEntryForm from './modal-form-components/DayEntryForm.vue'
import AbsenceEntryForm from './modal-form-components/AbsenceEntryForm.vue'
import { CalendarIcon, BriefcaseIcon, HomeIcon } from '@heroicons/vue/24/solid'
import ModalBase from './ModalBase.vue'

const entryStore = useEntryStore()

// first state of isAbsent
const props = defineProps<{ isAbsent: boolean }>()
defineEmits(['close'])

let isAbsentLocal: Ref<boolean> = ref(props.isAbsent || entryStore.selectedEntry.workDay > new Date())

watch(isAbsentLocal, (newVal: boolean) => {
  if (newVal || entryStore.selectedEntry.workDay > new Date()) {
    isAbsentLocal.value = true
  } else {
    isAbsentLocal.value = false
  }
})
</script>

<template>
  <ModalBase modalTitle="Tageseintrag" @close="$emit('close')">
    <div class="gap-5 rounded py-3 mx-10 my-10 text-white text-center font-bold text-xl bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 border-2 border-white">
      <div class="flex justify-center items-center gap-3">
        <CalendarIcon class="al-icon-button" />
        <span>{{ entryStore.selectedEntry.workDay.toLocaleDateString('de-DE') }}</span>
      </div>
    </div>

    <div class="flex justify-center items-center border-b-2 border-b-neutral-700 mb-10 text-white gap-5 mx-5">
      <button
        class="flex justify-center items-center gap-2"
        v-if="entryStore.selectedEntry.workDay < new Date()"
        type="button"
        @click="isAbsentLocal = false"
        :class="[isAbsentLocal ? 'al-entry-modal-tab-not-clicked' : 'al-entry-modal-tab-clicked']"
      >
        <BriefcaseIcon class="al-icon-button" />
        <span>Arbeitszeit</span>
      </button>

      <button
        class="flex justify-center items-center gap-2"
        @click="isAbsentLocal = true"
        :class="[isAbsentLocal || entryStore.selectedEntry.workDay > new Date() ? 'al-entry-modal-tab-clicked' : 'al-entry-modal-tab-not-clicked']"
      >
        <HomeIcon class="al-icon-button" />
        Fehlzeit
      </button>
    </div>

    <div v-if="isAbsentLocal">
      <AbsenceEntryForm @close="$emit('close')" :entry="entryStore.selectedEntry as AbsenceEntry" />
    </div>

    <div v-else>
      <DayEntryForm @close="$emit('close')" :entry="entryStore.selectedEntry as DayEntry" />
    </div>
  </ModalBase>
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
