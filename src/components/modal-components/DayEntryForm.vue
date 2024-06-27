<script setup lang="ts">
import { DayEntry } from '@/types/day-entry'
import { ref, watch, type Ref } from 'vue'
import { isEntryCreated } from './EntryModal.vue'
import { updateWeekEntries } from '@/stores/week-entries'

const props = defineProps<{ entry: DayEntry }>()
const emit = defineEmits(['close'])

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
  let entry: DayEntry = {
    workDay: props.entry.workDay,
    arrival: props.entry.arrival,
    departure: props.entry.departure
  }

  entry.arrival = inputArrival.value
  entry.departure = inputDeparture.value

  const response = await fetch('http://localhost:3000/api/entry', {
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
        <i class="icon pi pi-save mr-1" style="font-size: 1rem"></i>
        {{ isEntryCreated ? 'Speichern' : 'Erstellen' }}
      </button>
    </div>
  </form>
</template>
