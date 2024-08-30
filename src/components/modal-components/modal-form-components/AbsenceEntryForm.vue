<script setup lang="ts">
import { AbsenceEntry, DayEntry, Reason } from '@/types/day-entry'
import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { useEntryStore } from '@/stores/week-entries'
import apiConfig from '@/config/api-config';

const emit = defineEmits(['close'])
const props = defineProps<{ entry: AbsenceEntry }>()
const currSelection: Ref<Reason> = ref(props.entry.reason || Reason.Krankheit)

const entryStore = useEntryStore()

const isEntryCreated: ComputedRef<boolean> = computed(() => props.entry instanceof DayEntry || props.entry instanceof AbsenceEntry)

async function onSubmit() {
  // delete previous entry if it exists
  if (props.entry instanceof DayEntry) {
    await fetch(apiConfig.ENTRY, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ workDay: props.entry.workDay })
    })
  }

  const entry: AbsenceEntry = {
    workDay: props.entry.workDay,
    reason: props.entry.reason
  }

  entry.reason = currSelection.value as Reason

  const response = await fetch(apiConfig.ABSENCE, {
    method: isEntryCreated.value && !(props.entry instanceof DayEntry) ? 'PUT' : 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(entry)
  })

  if (response.ok) {
    await entryStore.getEntries()
    emit('close')
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
        {{ isEntryCreated ? 'Speichern' : 'Erstellen' }}
      </button>
    </div>
  </form>
</template>
