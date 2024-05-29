<script setup lang="ts">
import 'primeicons/primeicons.css'
import AccountForm from '../components/user-components/AccountForm.vue'
</script>

<template>
  <div class="h-screen flex justify-center items-center p-32 pt-10 bg-gradient-to-br from-neutral-900 via-neutral-900 to-purple-950 overflow-hidden">
        <div class="flex rounded-lg top-44 h-100 w-1/3 mx-auto items-center justify-center place-items-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 p-3">
           <AccountForm signUp />
        </div>
    </div>
</template>