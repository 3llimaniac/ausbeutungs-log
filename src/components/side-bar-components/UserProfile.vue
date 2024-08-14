<script setup lang="ts">
import { useUserStore } from '@/stores/auth'
import { ref, type Ref } from 'vue'
import { UserIcon } from '@heroicons/vue/24/solid'
import { Cog6ToothIcon } from '@heroicons/vue/24/solid'
import SettingModal from '../modal-components/SettingModal.vue'

const userStore = useUserStore()

const isIconHovered: Ref<boolean> = ref(false)
const isSettingModalShown: Ref<boolean> = ref(false)
</script>

<template>
  <div v-if="isSettingModalShown" class="relative">
    <SettingModal @close="isSettingModalShown = false" />
  </div>

  <div>
    <div class="text-center w-full mt-10 text-white font-bold text-2xl">AusbeutungsLog</div>

    <button
      @mouseover="() => (isIconHovered = true)"
      @mouseleave="() => (isIconHovered = false)"
      @click="isSettingModalShown = true"
      class="relative m-auto flex justify-center text-center mt-10 hover:ring-4 rounded-full hover:ring-neutral-700 active:ring-neutral-500"
    >
      <div
        class="flex place-items-center text-white border-2 p-4 rounded-full transition-all ease-in-out"
        :class="[isIconHovered ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-purple-400' : 'bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400']"
      >
        <UserIcon v-if="!isIconHovered" class="size-10" />
        <Cog6ToothIcon v-else class="size-10" />
      </div>
    </button>

    <div class="w-full font-bold text-xl text-center text-white mt-3">{{ userStore.user.username }}</div>
  </div>
</template>
