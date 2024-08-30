<script setup lang="ts">
import UserProfile from '../side-bar-components/UserProfile.vue'
import WeekSelector from '../side-bar-components/WeekSelector.vue'
import SideBarFunctions from "../side-bar-components/SideBarFunctions.vue"

</script>

<template>
  <div class="flex flex-col w-full mx-auto h-screen bg-neutral-900 overflow-y-auto justify-center">
    <UserProfile />
    <WeekSelector />
    <SideBarFunctions />
  </div>
</template>
