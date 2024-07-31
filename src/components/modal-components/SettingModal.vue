<script setup lang="ts">
import { useUserStore } from '@/stores/auth';
import { ref, type Ref } from 'vue';

const emit = defineEmits(['close'])
const userStore = useUserStore();

const inputWeekHours: Ref<number> = ref(userStore.user.hours)

async function onSubmit() {}
</script>

<template>
  <div @click="$emit('close')" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 bg-clip-padding" style="z-index: 9999">
    <div @click.stop class="flex flex-col rounded-lg max-h-screen w-full max-w-3xl mx-auto items-center justify-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 p-3 overflow-y-auto">
      <div class="w-full rounded mx-auto px-5 bg-neutral-800">
        <div class="w-full mx-auto text-center px-10 text-3xl text-white font-bold pt-10 pb-10">Einstellungen</div>

        <div class="gap-5 rounded py-3 mx-10 mb-10 text-white text-center font-bold text-xl p-3 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 border-2 border-white">{{ userStore.user.username }}</div>

        <form @submit.prevent="onSubmit" name="user-setting-form" autocomplete="off">
          <div class="mb-3 mx-auto px-10 pt-0 pb-5 gap-3 w-full text-center">
            <div class="text-center text-white mb-3">Anzahl der Wochenstunden</div>
            <input type="number" v-model="inputWeekHours" class="al-login-input text-center" />
          </div>

          <div class="w-full mb-3 flex align-center justify-center drop-shadow-md">
            <button class="al-submit" type="submit">
              <i class="icon pi pi-save mr-1" style="font-size: 1rem"></i>
              Speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
