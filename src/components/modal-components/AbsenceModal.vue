<script setup lang="ts">
import apiConfig from '@/config/api-config'
import { useEntryStore } from '@/stores/week-entries'
import { Reason } from '@/types/day-entry'
import { ArrowLongRightIcon, MinusIcon } from '@heroicons/vue/24/solid'
import { computed, ref, watch, type ComputedRef, type Ref } from 'vue'
import ModalBase from './ModalBase.vue'

const emit = defineEmits(['close'])

const entryStore = useEntryStore()

const currentDate = new Date()

// general ref variables
const currSelection: Ref<Reason> = ref(Reason.Krankheit)
const inputBeginning: Ref<string> = ref(currentDate.toISOString().split('T')[0])
const inputEnding: Ref<string> = ref(new Date(currentDate.getTime() + 86400000).toISOString().split('T')[0]) // +1 day

// computed ref variables
const dateBeginning: ComputedRef<Date> = computed(() => new Date(inputBeginning.value))
const dateEnding: ComputedRef<Date> = computed(() => new Date(inputEnding.value))
const dateDifference: ComputedRef<number> = computed(() => (dateEnding.value.getTime() - dateBeginning.value.getTime()) / (1000 * 60 * 60 * 24))

// checks whether the difference between the dates is positive
watch(inputEnding, (newVal: string, oldVal: string) => {
  if (dateDifference.value > 0) {
    inputEnding.value = newVal
  } else {
    inputEnding.value = oldVal
  }
})

async function onSubmit() {
  const response = await fetch(apiConfig.ABSENCES, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstDate: new Date(inputBeginning.value),
      lastDate: new Date(inputEnding.value),
      reason: currSelection.value
    })
  })

  if (response) {
    await entryStore.getEntries()
    emit('close')
  }
}
</script>

<template>
  <ModalBase modalTitle="Fehltrage eintragen" @close="$emit('close')">
    <div
      class="flex justify-center items-center gap-3 rounded mx-10 my-10 text-white text-center font-bold text-xl p-3 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 border-2 border-white"
    >
      <span>{{ dateBeginning.toLocaleDateString('de-DE') }}</span>
      <MinusIcon class="size-6" />
      <span>{{ dateDifference }} {{ dateDifference > 1 ? 'Tage' : 'Tag' }}</span>
      <ArrowLongRightIcon class="size-6" />
      <span>{{ dateEnding.toLocaleDateString('de-DE') }}</span>
    </div>

    <form @submit.prevent="onSubmit" name="multiple-absences-form" autocomplete="off">
      <div class="mb-3 mx-auto px-10 pb-5 pt-0 gap-3 w-full">
        <div class="text-center text-white mb-3">Grund</div>

        <select class="al-login-input text-center" v-model="currSelection">
          <option value="Krankheit">Krankheit</option>
          <option value="Urlaub">Urlaub</option>
          <option value="Termin">Termin</option>
          <option value="Sonstiges">Sonstiges</option>
        </select>
      </div>

      <div class="mb-3 mx-auto px-10 pt-0 pb-5 gap-3 w-full text-center">
        <div class="text-center text-white mb-3">Beginn</div>
        <input type="date" v-model="inputBeginning" class="al-login-input text-center" />
      </div>

      <div class="mb-5 mx-auto px-10 pt-0 gap-3 w-full">
        <div class="text-center text-white mb-3">Ende</div>
        <input type="date" v-model="inputEnding" class="al-login-input text-center" />
      </div>

      <div class="w-full mb-3 flex align-center justify-center drop-shadow-md">
        <button class="al-submit" type="submit">Speichern</button>
      </div>
    </form>
  </ModalBase>
</template>
