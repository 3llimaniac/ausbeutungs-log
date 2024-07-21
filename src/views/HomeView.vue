<script setup lang="ts">
import router from '@/router'
import CalendarBar from '../components/home-components/CalendarBar.vue'
import CalendarBox from '../components/home-components/CalendarBox.vue'
import SideBar from '../components/home-components/SideBar.vue'
import { storeUserData, isLoggedIn } from '@/stores/auth'
import { onBeforeMount, ref } from 'vue'
import { updateWeekEntries } from '@/stores/week-entries'
import WeekProgressBar from '@/components/home-components/WeekProgressBar.vue'

const isLoading = ref(true)

if (!isLoggedIn()) {
  if (!document.cookie.includes('access_token')) {
    router.push('/login')
  }

  try {
    storeUserData()
  } catch (error) {
    router.push('/login')
  }
}

onBeforeMount(async () => {
  await updateWeekEntries()
  isLoading.value = false
})
</script>

<template>
  <div class="grid grid-cols-7 h-full overflow-hidden">
    <SideBar />

    <div class="flex justify-center col-span-6 items-center h-screen overflow-hidden bg-neutral-800">
      <div v-if="isLoading" class="flex place-items-center justify-center align-center w-full h-full text-center text-white font-bold text-2xl">Data is loading...</div>

      <div v-else class="grid grid-rows-10 gap-5 h-5/6 bg-neutral-800 mb-10 w-10/12">
        <div class="row-span-9">
          <CalendarBar />
          <CalendarBox />
        </div>

        <WeekProgressBar />
      </div>
    </div>
  </div>
</template>

<style>
.al-view {
  @apply rounded bg-neutral-600 p-3 w-1/6;
}

.al-view-not-clicked {
  @apply hover:bg-neutral-700 active:bg-neutral-900 transition-all border-2 border-neutral-500;
}

.al-view-clicked {
  @apply bg-neutral-900 border-2 border-neutral-700;
}
</style>
