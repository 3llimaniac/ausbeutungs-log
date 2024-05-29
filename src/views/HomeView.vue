<script setup lang="ts">

import router from '@/router';
import CalendarBar from '../components/home-components/CalendarBar.vue';
import CalendarBox from '../components/home-components/CalendarBox.vue';
import SideBar from '../components/home-components/SideBar.vue'
import { isLoggedIn } from '@/stores/auth';
import EntryModal from '@/components/modal-components/EntryModal.vue';
import { ref } from 'vue';

let showModal = ref(true);

if (!isLoggedIn()) {
  router.push("/login");
}
</script>

<template>
  <EntryModal v-if="showModal" @close="showModal = false" />

  <div class="grid grid-cols-7 h-full">
    <SideBar />

    <div class="flex justify-center col-span-6 items-center h-screen overflow-hidden bg-neutral-800">
      <div class=" bg-neutral-800 h-5/6 mb-20 w-11/12">
        <CalendarBar />
        <CalendarBox @showModal="showModal = true" />
      </div>
    </div>
  </div>
</template>
