<script setup lang="ts">
import router from '@/router'
import { useUserStore } from '@/stores/auth'
import AbsenceModal from '../modal-components/AbsenceModal.vue'
import { ref, type Ref } from 'vue'
import ImportModal from '../modal-components/ImportModal.vue';

const isAbsentModalShown: Ref<boolean> = ref(false)
const isImportModalShown: Ref<boolean> = ref(false)

const userStore = useUserStore()

function onLogOut() {
  userStore.clear()
  router.push('/login').catch(() => (window.location.href = '/'))
}
</script>

<template>
    <div v-if="isAbsentModalShown" class="relative">
      <AbsenceModal @close="isAbsentModalShown = false" />
    </div>

    <div v-if="isImportModalShown" class="relative">
      <ImportModal @close="isImportModalShown = false"  />
    </div>

    <div class="w-full flex-grow flex flex-col items-center px-5 text-white text-base">
      <button
        @click="isAbsentModalShown = true"
        class="rounded w-full mx-3 p-3 my-10 border-2 bg-neutral-900 border-neutral-700 hover:bg-neutral-700 active:bg-neutral-800 active:border-neutral-800 transition-all"
      >
        <span>Fehltage eintragen</span>
      </button>
    </div>

    <div class="w-full flex-grow flex flex-col justify-end items-center px-5 gap-5 text-white text-base">
      <button class="al-side" @click="isImportModalShown = true">
        <i class="icon pi pi-file-import pr-5" style="font-size: 1.6rem"></i>
        <span>Daten importieren</span>
      </button>

      <!-- <button class="al-side">
        <i class="icon pi pi-file-export pr-5" style="font-size: 1.6rem"></i>
        <span>Daten exportieren</span>
      </button> -->

      <button @click="onLogOut" class="al-logout">
        <i class="icon pi pi-sign-out pr-5" style="font-size: 1.5rem"></i>
        <span>Logout</span>
      </button>
    </div>
</template>

<style>
.al-side {
  @apply flex items-center text-left rounded w-full mx-3 p-3 bg-neutral-900 hover:bg-neutral-700 active:bg-neutral-500 active:ring-2 ring-neutral-300 transition-all;
}

.al-logout {
  @apply flex items-center text-left rounded w-full mx-3 mb-10 p-3 border-2 border-red-500 bg-gradient-to-t from-red-600 to-red-500 hover:bg-gradient-to-b active:ring-2 ring-red-300 transition-all;
}
</style>