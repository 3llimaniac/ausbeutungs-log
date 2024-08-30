<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="flex gap-3 justify-center items-center absolute text-white bg-red-400 py-3 w-1/4 rounded-lg">
    <ExclamationCircleIcon class="size-8" />
    <span>Benutzername oder Passwort nicht korrekt</span>
  </div>
</template>
