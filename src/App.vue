<script setup lang="ts">
import UserBox from './components/UserBox.vue'
import NavBar from './components/NavBar.vue'
import CalendarBar from './components/CalendarBar.vue'
import CalendarBox from './components/CalendarBox.vue'
</script>

<template>
  <div class="h-screen p-32 pt-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
    <UserBox />
    <NavBar />
    <CalendarBar />
    <CalendarBox />
  </div>
</template>
