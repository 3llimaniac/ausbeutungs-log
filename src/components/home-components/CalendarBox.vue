<script setup lang="ts">
import { weekEntries } from '@/stores/week-entries'
import DayEntryBox from '../entry-components/DayEntryBox.vue'
import EntryModal, { updateModalDayEntry } from '../modal-components/EntryModal.vue'
import { ref } from 'vue'
import { AbsenceEntry, DayEntry, Entry } from '@/types/day-entry'
import NoEntryBox from '../entry-components/NoEntryBox.vue'
import AbsenceEntryBox from '../entry-components/AbsenceEntryBox.vue'
</script>

<script lang="ts">
export let isModalShown = ref(false)
export let isAbsent = ref(false);

function onAddEntryClick(entry: Entry) {
  updateModalDayEntry(entry)
  isAbsent.value = entry instanceof AbsenceEntry
  isModalShown.value = true
}
</script>

<template>
  <div v-if="isModalShown" class="relative">
    <EntryModal @close="isModalShown = false" :isAbsent="isAbsent" />
  </div>

  <div class="w-full h-full">
    <div class="grid grid-cols-5 place-items-center w-full px-6 py-4 font-bold text-black text-base rounded-t border-t-2 border-x-2 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      <div>Montag</div>
      <div>Dienstag</div>
      <div>Mittwoch</div>
      <div>Donnerstag</div>
      <div>Freitag</div>
    </div>

    <div class="rounded-b mb-3 px-3 pb-3 h-3/4 border-x-2 border-b-2 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 drop-shadow-lg">
      <div class="grid grid-cols-5 h-full border-2 bg-neutral-900 gap-10 p-10">
        <template v-for="(entry, index) in weekEntries" :key="index">
          <DayEntryBox v-if="DayEntry.isDayEntry(entry)" :entry="entry as DayEntry" @showEntryModal="onAddEntryClick(entry)" />
          <AbsenceEntryBox v-else-if="AbsenceEntry.isAbsenceEntry(entry)" :entry="entry as AbsenceEntry" @showEntryModal="onAddEntryClick(entry)" />
          <NoEntryBox v-else @showEntryModal="onAddEntryClick(entry)" />
        </template>
      </div>
    </div>
  </div>
</template>
