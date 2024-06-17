<script setup lang="ts">
import { weekEntries } from '@/stores/week-entries'
import type { DayEntry } from '@/types/day-entry'
import { ref, defineEmits, watch, type Ref } from 'vue'

const isAttendant = ref(true)
const emit = defineEmits(['close'])

async function onSubmit() {
  const entry: DayEntry = modalDayEntry.value
  entry.arrival = inputArrival.value
  entry.departure = inputDeparture.value

  const response = await fetch('http://localhost:3000/api/entry', {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(modalDayEntry.value)
  })

  if (response.ok) {
    modalDayEntry.value.arrival = inputArrival.value
    modalDayEntry.value.departure = inputDeparture.value
    emit('close')
  }
}

const isTimeValidFunction = (isArrival: Boolean) => {
  const inputElement: Ref<string> = isArrival ? inputArrival : inputDeparture

  return async (newVal: string, oldVal: string) => {
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

    inputElement.value = oldVal;
  }
}

watch(inputDeparture, async (newVal: string, oldVal: string) => {
  if (!newVal || !inputArrival.value) {
    return
  }

  const departureNumbers: number[] = newVal.split(':').map((e) => Number(e))
  const arrivalNumbers: number[] = inputArrival.value.split(':').map((e) => Number(e))

  if (Number(arrivalNumbers[0]) < Number(departureNumbers[0])) {
    return
  } else if (Number(arrivalNumbers[0]) == Number(departureNumbers[0])) {
    if (Number(arrivalNumbers[1]) < Number(departureNumbers[1])) {
      return
    }
  }

  inputDeparture.value = oldVal
})

watch(inputArrival, async (newVal: string, oldVal: string) => {
  if (!newVal || !inputDeparture.value) {
    return
  }

  const arrivalNumbers: number[] = newVal.split(':').map((e) => Number(e))
  const departureNumbers: number[] = inputDeparture.value.split(':').map((e) => Number(e))

  if (Number(arrivalNumbers[0]) < Number(departureNumbers[0])) {
    return
  } else if (Number(arrivalNumbers[0]) == Number(departureNumbers[0])) {
    if (Number(arrivalNumbers[1]) < Number(departureNumbers[1])) {
      return
    }
  }

  inputArrival.value = oldVal
})
</script>

<script lang="ts">
const modalDayEntry = ref(weekEntries.value[0])
const inputArrival = ref(modalDayEntry.value.arrival)
const inputDeparture = ref(modalDayEntry.value.departure)

export async function updateModalDayEntry(dayEntry: DayEntry) {
  modalDayEntry.value = dayEntry
  inputArrival.value = dayEntry.arrival
  inputDeparture.value = dayEntry.departure
}
</script>

<template>
  <div @click="$emit('close')" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 bg-clip-padding" style="z-index: 9999">
    <div @click.stop class="flex flex-col rounded-lg max-h-screen w-full max-w-3xl mx-auto items-center justify-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 p-3 overflow-y-auto">
      <form @submit.prevent="onSubmit" name="logout-form" autocomplete="off" class="w-full rounded mx-auto px-5 bg-neutral-800">
        <div class="w-full mx-auto text-center px-10 text-3xl text-white font-bold pt-10 pb-10">Tageseintrag</div>

        <div class="gap-5 rounded py-3 mx-10 mb-10 text-white text-center font-bold text-xl p-3 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 border-2 border-white">
          <div class="p">
            <i class="icon pi pi-calendar mr-1" style="font-size: 1.2rem"></i>
            {{ modalDayEntry.workDay.toLocaleDateString('de-DE') }}
          </div>
        </div>

        <div class="flex justify-center border-b-2 border-b-neutral-700 mb-10 text-white gap-5 mx-5">
          <button type="button" @click="isAttendant = true" :class="[isAttendant ? 'al-entry-modal-tab-clicked' : 'al-entry-modal-tab-not-clicked']">
            <i class="icon pi pi-calendar-plus mr-1" style="font-size: 1rem"></i>
            Arbeitszeit
          </button>

          <button type="button" @click="isAttendant = false" :class="[!isAttendant ? 'al-entry-modal-tab-clicked' : 'al-entry-modal-tab-not-clicked']">
            <i class="icon pi pi-calendar-minus mr-1" style="font-size: 1rem"></i>
            Fehlzeit
          </button>
        </div>

        <div v-if="isAttendant">
          <div class="mb-3 mx-auto p-10 pt-0 pb-5 gap-3 w-full text-center">
            <div class="text-center text-white mb-3">Beginn</div>
            <input type="time" v-model="inputArrival" class="al-login-input text-center" />
          </div>

          <div class="mb-5 mx-auto px-10 pt-0 gap-3 w-full">
            <div class="text-center text-white mb-3">Ende</div>
            <input type="time" v-model="inputDeparture" class="al-login-input text-center" />
          </div>
        </div>

        <div v-else>
          <div class="mb-5 mx-auto px-10 pt-0 gap-3 w-full">
            <div class="text-center text-white mb-3">Grund</div>
            <select class="al-login-input text-center">
              <option>Krank</option>
              <option>Urlaub</option>
            </select>
          </div>
        </div>

        <div class="w-full mb-3 flex align-center justify-center drop-shadow-md">
          <button class="al-submit" type="submit">
            <i class="icon pi pi-save" style="font-size: 1rem"></i>
            Speichern
          </button>
        </div>
      </form>
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
