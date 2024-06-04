<script setup lang="ts">
import router from '@/router';
import CalendarBar from '../components/home-components/CalendarBar.vue';
import CalendarBox from '../components/home-components/CalendarBox.vue';
import SideBar from '../components/home-components/SideBar.vue';
import { storeUserData, isLoggedIn } from '@/stores/auth';
import EntryModal from '@/components/modal-components/EntryModal.vue';
import { onBeforeMount, ref } from 'vue';
import { updateWeekEntries } from '@/stores/week-entries';

let showModal = ref(false);
let isWeekView = ref(true);
const isLoading = ref(true);

if (!isLoggedIn()) {
  if (!document.cookie.includes('access_token')) {
    router.push("/login");
  }

  try {
    storeUserData();
  } catch (error) {
    router.push("/login");
  }
}

onBeforeMount(async () => {
  await updateWeekEntries();
  isLoading.value = false;
});
</script>

<template>
  <EntryModal v-if="showModal" @close="showModal = false" />

  <div class="grid grid-cols-7 h-full overflow-hidden">
    <SideBar />

    <div class="flex justify-center col-span-6 items-center h-screen overflow-hidden bg-neutral-800">
      <div v-if="isLoading"
        class="flex place-items-center justify-center align-center w-full h-full text-center text-white font-bold text-2xl">
        Data is loading...
      </div>

      <div v-else class=" bg-neutral-800 h-5/6 mb-10 w-10/12">
        <div class="flex justify-center text-center text-white gap-20">
          <button @click="isWeekView = true" class="al-view"
            :class="[isWeekView ? 'al-view-clicked' : 'al-view-not-clicked']">Wochenansicht</button>

          <button @click="isWeekView = false" class="al-view"
            :class="[!isWeekView ? 'al-view-clicked' : 'al-view-not-clicked']">Tagesansicht</button>
        </div>

        <div v-if="isWeekView" class="h-full">
          <CalendarBar />
          <CalendarBox @showModal="showModal = true" />
        </div>

        <div v-else class="text-white">
          incoming...
        </div>
      </div>
    </div>
  </div>
</template>
