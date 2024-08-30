<script setup lang="ts">
import { AbsenceEntry, DayEntry } from '@/types/day-entry'
import { computed, ref, watch, type ComputedRef, type Ref } from 'vue'
import { useEntryStore } from '@/stores/week-entries'
import apiConfig from '@/config/api-config';

const props = defineProps<{ entry: DayEntry }>()
const emit = defineEmits(['close'])

const entryStore = useEntryStore();

const isEntryCreated: ComputedRef<boolean> = computed(() => props.entry instanceof DayEntry)

const inputArrival: Ref<string> = ref(props.entry.arrival)
const inputDeparture: Ref<string> = ref(props.entry.departure)

// i know it's fucking ugly, but it's still less ugly than redundance
const timeValidationFunction = (isArrival: Boolean) => {
  const inputElement: Ref<string> = isArrival ? inputArrival : inputDeparture

  return async (newVal: string, oldVal: string) => {
    if (!inputDeparture.value || !inputArrival.value) {
      return
    }

    if (!newVal && (isArrival ? inputDeparture : inputArrival)) {
      return
    }

    const departureNumbers: number[] = isArrival ? inputDeparture.value.split(':').map((e) => Number(e)) : newVal.split(':').map((e) => Number(e))
    const arrivalNumbers: number[] = isArrival ? newVal.split(':').map((e) => Number(e)) : inputArrival.value.split(':').map((e) => Number(e))

    if (Number(arrivalNumbers[0]) < Number(departureNumbers[0])) {
      return
    } else if (Number(arrivalNumbers[0]) == Number(departureNumbers[0])) {
      if (Number(arrivalNumbers[1]) < Number(departureNumbers[1])) {
        return
      }
    }

    inputElement.value = oldVal
  }
}

watch(inputDeparture, timeValidationFunction(false))

watch(inputArrival, timeValidationFunction(true))

async function onSubmit() {
  // delete previous entry if it exists
  if (props.entry instanceof AbsenceEntry) {
    await fetch(apiConfig.ABSENCE, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ workDay: props.entry.workDay })
    })
  }

  const entry: DayEntry = {
    workDay: props.entry.workDay,
    arrival: props.entry.arrival,
    departure: props.entry.departure
  }

  entry.arrival = inputArrival.value
  entry.departure = inputDeparture.value

  const response = await fetch(apiConfig.ENTRY, {
    method: isEntryCreated.value && !(props.entry instanceof AbsenceEntry) ? 'PUT' : 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(entry)
  })

  // update UI
  if (response.ok) {
    await entryStore.getEntries()
    emit('close')
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit" name="day-entry-form" autocomplete="off">
    <div class="mb-3 mx-auto p-10 pt-0 pb-5 gap-3 w-full text-center">
      <div class="text-center text-white mb-3">Beginn</div>
      <input type="time" v-model="inputArrival" class="al-login-input text-center" />
    </div>

    <div class="mb-5 mx-auto px-10 pt-0 gap-3 w-full">
      <div class="text-center text-white mb-3">Ende</div>
      <input type="time" v-model="inputDeparture" class="al-login-input text-center" />
    </div>

    <div class="w-full mb-3 flex align-center justify-center drop-shadow-md">
      <button class="al-submit" type="submit">
        {{ isEntryCreated ? 'Speichern' : 'Erstellen' }}
      </button>
    </div>
  </form>
</template>

<style></style>
