<script setup lang="ts">
import { useUserStore } from '@/stores/auth'
import router from '@/router'
import { useEntryStore } from '@/stores/week-entries'
import { ref, type Ref } from 'vue'
import AbsenceModal from '../modal-components/AbsenceModal.vue'
import SettingModal from '../modal-components/SettingModal.vue'

const userStore = useUserStore()

const entryStore = useEntryStore()

const isAbsentModalShown: Ref<boolean> = ref(false)

const isSettingModalShown: Ref<boolean> = ref(false)

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

    <div v-if="isSettingModalShown" class="relative">
      <SettingModal @close="isSettingModalShown = false" />
    </div>

    <div>
      <div class="text-center w-full mt-10 text-white font-bold text-2xl">AusbeutungsLog</div>

      <button @click="isSettingModalShown = true" class="w-full m-auto flex justify-center text-center pt-10">
        <i class="icon pi pi-user mx-auto text-white bg-gradient-to-r border-2 from-indigo-400 via-purple-400 to-pink-400 p-4 rounded-full hover:ring-4 hover:ring-neutral-700" style="font-size: 2rem"></i>
      </button>

      <div class="w-full font-bold text-xl text-center text-white mt-3">{{ userStore.user.username }}</div>
    </div>

    <div class="select-none">
      <div class="grid grid-rows-1 grid-cols-3 gap-3 mx-10 text-center mt-24 text-white font-bold text-lg">
        <div @click="() => entryStore.updateYearNumber(entryStore.yearNumber - 1)" class="flex place-content-center justify-center hover:scale-110 active:scale-90 transition-transform ease-in-out">
          <i class="icon pi pi-angle-left" style="font-size: 1.8rem"></i>
        </div>

        <div>{{ entryStore.yearNumber }}</div>

        <div @click="() => entryStore.updateYearNumber(entryStore.yearNumber + 1)" class="flex place-content-center justify-center hover:scale-110 active:scale-90 transition-transform ease-in-out">
          <i class="icon pi pi-angle-right" style="font-size: 1.8rem"></i>
        </div>
      </div>

      <div class="grid grid-cols-4 place-items-stretch gap-2 text-white mt-3 mx-10">
        <div @click="entryStore.weekGroup = currWeekGroup" v-for="currWeekGroup in 4" :key="currWeekGroup" class="bg-neutral-800 rounded text-center p-2 border-2 hover:bg-neutral-600 active:bg-indigo-600 transition-all ease-in-out" :class="[entryStore.weekGroup == currWeekGroup ? 'border-indigo-400' : 'border-neutral-600']">
          {{ currWeekGroup * 13 }}
        </div>
      </div>

      <div class="grid grid-cols-4 place-items-stretch gap-2 text-white mt-10 mx-10">
        <div
          @click="() => entryStore.updateWeekNumber(weekNumb + 13 * (entryStore.weekGroup - 1))"
          v-for="weekNumb in 13"
          :key="weekNumb"
          class="bg-neutral-700 hover:bg-neutral-500 active:bg-pink-600 rounded text-center p-2 border-2 transition-all ease-in-out"
          :class="[entryStore.weekNumber == weekNumb + 13 * (entryStore.weekGroup - 1) ? 'border-pink-400' : 'border-neutral-500']"
        >
          {{ weekNumb + 13 * (entryStore.weekGroup - 1) }}
        </div>
      </div>
    </div>

    <div class="w-full flex-grow flex flex-col items-center px-5 text-white text-base">
      <button @click="isAbsentModalShown = true" class="rounded w-full mx-3 p-3 my-10 border-2 bg-neutral-900 border-neutral-700 hover:bg-neutral-700 active:bg-neutral-800 active:border-neutral-800 transition-all">Fehltage eintragen</button>
    </div>

    <div class="w-full flex-grow flex flex-col justify-end items-center px-5 gap-5 text-white text-base">
      <button class="al-side">
        <i class="icon pi pi-file-import pr-5" style="font-size: 1.6rem"></i>

        Daten importieren
      </button>

      <button class="al-side">
        <i class="icon pi pi-file-export pr-5" style="font-size: 1.6rem"></i>

        Daten exportieren
      </button>

      <button @click="onLogOut" class="al-logout">
        <i class="icon pi pi-sign-out pr-5" style="font-size: 1.5rem"></i>

        Logout
      </button>
    </div>
  </div>
</template>

<style>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.2s opacity ease;
}

.al-side {
  @apply flex items-center text-left rounded w-full mx-3 p-3 bg-neutral-900 hover:bg-neutral-700 active:bg-neutral-500 transition-all;
}

.al-logout {
  @apply flex items-center text-left rounded w-full mx-3 mb-10 p-3 border-2 border-red-500 bg-gradient-to-t from-red-600 to-red-500 hover:bg-gradient-to-b transition-all;
}
</style>
