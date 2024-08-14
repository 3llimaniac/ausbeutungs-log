<script setup lang="ts">
import { useUserStore } from '@/stores/auth'
import router from '@/router'
import { ref, type Ref } from 'vue'
import AbsenceModal from '../modal-components/AbsenceModal.vue'
import UserProfile from '../side-bar-components/UserProfile.vue'
import WeekSelector from '../side-bar-components/WeekSelector.vue'

const userStore = useUserStore()
const isAbsentModalShown: Ref<boolean> = ref(false)

function onLogOut() {
  userStore.clear()
  router.push('/login').catch(() => (window.location.href = '/'))
}
</script>

<template>
  <div class="flex flex-col w-full mx-auto h-screen bg-neutral-900 overflow-y-auto justify-center">
    <div v-if="isAbsentModalShown" class="relative">
      <AbsenceModal @close="isAbsentModalShown = false" />
    </div>

    <UserProfile />
    <WeekSelector />

    <div class="w-full flex-grow flex flex-col items-center px-5 text-white text-base">
      <button
        @click="isAbsentModalShown = true"
        class="rounded w-full mx-3 p-3 my-10 border-2 bg-neutral-900 border-neutral-700 hover:bg-neutral-700 active:bg-neutral-800 active:border-neutral-800 transition-all"
      >
        <span>Fehltage eintragen</span>
      </button>
    </div>

    <div class="w-full flex-grow flex flex-col justify-end items-center px-5 gap-5 text-white text-base">
      <button class="al-side">
        <i class="icon pi pi-file-import pr-5" style="font-size: 1.6rem"></i>
        <span>Daten importieren</span>
      </button>

      <button class="al-side">
        <i class="icon pi pi-file-export pr-5" style="font-size: 1.6rem"></i>
        <span>Daten exportieren</span>
      </button>

      <button @click="onLogOut" class="al-logout">
        <i class="icon pi pi-sign-out pr-5" style="font-size: 1.5rem"></i>
        <span>Logout</span>
      </button>
    </div>
  </div>
</template>

<style>
.al-side {
  @apply flex items-center text-left rounded w-full mx-3 p-3 bg-neutral-900 hover:bg-neutral-700 active:bg-neutral-500 transition-all;
}

.al-logout {
  @apply flex items-center text-left rounded w-full mx-3 mb-10 p-3 border-2 border-red-500 bg-gradient-to-t from-red-600 to-red-500 hover:bg-gradient-to-b transition-all;
}
</style>
