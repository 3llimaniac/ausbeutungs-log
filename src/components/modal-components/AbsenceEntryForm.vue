<script setup lang="ts">
import { AbsenceEntry, DayEntry, Entry, Reason } from '@/types/day-entry'
import { ref, type Ref } from 'vue'
import { isEntryCreated } from './EntryModal.vue'
import { updateWeekEntries } from '@/stores/week-entries'

const emit = defineEmits(['close'])
const props = defineProps<{ entry: AbsenceEntry }>()
const currSelection: Ref<Reason> = ref(props.entry.reason || Reason.Krankheit)

console.log(props.entry instanceof AbsenceEntry)
console.log(props.entry instanceof DayEntry)

async function onSubmit() {
  if (props.entry instanceof DayEntry) {
    // delete previous entry
  }

  const entry: AbsenceEntry = {
    workDay: props.entry.workDay,
    reason: props.entry.reason
  }

  entry.reason = currSelection.value as Reason
  console.log(entry)

  const response = await fetch('http://localhost:3000/api/entry/absence', {
    method: isEntryCreated.value ? 'PUT' : 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(entry)
  })

  if (response.ok) {
    await updateWeekEntries()
    emit('close')
  } else {
    console.log(response)
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit" name="absence-entry-form" autocomplete="off">
    <div class="mb-5 mx-auto px-10 pt-0 gap-3 w-full">
      <div class="text-center text-white mb-3">Grund</div>

      <select class="al-login-input text-center" v-model="currSelection">
        <option>Krankheit</option>
        <option>Urlaub</option>
        <option>Termin</option>
        <option>Sonstiges</option>
      </select>
    </div>

    <div class="w-full mb-3 flex align-center justify-center drop-shadow-md">
      <button class="al-submit" type="submit">
        <i class="icon pi pi-save mr-1" style="font-size: 1rem"></i>
        {{ isEntryCreated ? 'Speichern' : 'Erstellen' }}
      </button>
    </div>
  </form>
</template>
