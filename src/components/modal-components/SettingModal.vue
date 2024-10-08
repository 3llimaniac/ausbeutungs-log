<script setup lang="ts">
import apiConfig from '@/config/api-config'
import { useUserStore } from '@/stores/auth'
import { useEntryStore } from '@/stores/week-entries'
import { ref, type Ref } from 'vue'
import ModalBase from './ModalBase.vue';

const emit = defineEmits(['close'])
const userStore = useUserStore()
const entryStore = useEntryStore()
const inputWeekHours: Ref<number> = ref(userStore.user.hours)

async function onSubmit() {
  const fetchResult = await fetch(apiConfig.USER, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: userStore.user.username,
      weekHours: inputWeekHours.value
    })
  })

  const fetchObject = await fetchResult.json()

  if (fetchResult.ok) {
    userStore.setAccessToken(fetchObject.accessToken, fetchObject.user)
    await entryStore.getEntries()
    emit('close')
  }
}
</script>

<template>
  <ModalBase modalTitle="Einstellungen" @close="$emit('close')">
    <div class="gap-5 rounded py-3 mx-10 my-10 text-white text-center font-bold text-xl p-3 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 border-2 border-white">
      {{ userStore.user.username }}
    </div>

    <form @submit.prevent="onSubmit" name="user-setting-form" autocomplete="off">
      <div class="mb-3 mx-auto px-10 pt-0 pb-5 gap-3 w-full text-center">
        <div class="text-center text-white mb-3">Anzahl der Wochenstunden</div>
        <input type="number" min="0" max="100" v-model="inputWeekHours" class="al-login-input text-center" />
      </div>

      <div class="w-full mb-3 flex align-center justify-center drop-shadow-md">
        <button class="al-submit" type="submit">Speichern</button>
      </div>
    </form>
  </ModalBase>
</template>
