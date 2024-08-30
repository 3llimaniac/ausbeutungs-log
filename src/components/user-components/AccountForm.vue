<script setup lang="ts">
import 'primeicons/primeicons.css'
import { ref } from 'vue'
import { useUserStore } from '../../stores/auth.ts'
import apiConfig from '@/config/api-config.ts'
import { ArrowRightEndOnRectangleIcon, UserPlusIcon } from '@heroicons/vue/24/solid'
import UserError from './UserError.vue'

const props = defineProps({ signUp: Boolean })
const userStore = useUserStore()

const formData = ref({
  username: '',
  password: '',
  weekHours: 40
})

const invalidUsername = ref(true)
const invalidPassword = ref(true)
const invalidWeekHours = ref(false)

const isErrorMessageShown = ref(false);

// timeout for username search
let usernameTimeout: number = -1

function setUsernameTimeout(username: string) {
  clearTimeout(usernameTimeout)
  usernameTimeout = setTimeout(() => checkUsernameValidity(username), 250)
}

function showErrorMessage() {
  isErrorMessageShown.value = true
  setTimeout(() => isErrorMessageShown.value = false, 5000)
}

async function checkUsernameValidity(username: string) {
  if (username.length === 0) {
    invalidUsername.value = true
    return
  }

  const fetchResult = await fetch(apiConfig.USERNAME + `?username=${username}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  if (!fetchResult.ok) {
    return
  }

  const fetchObject = await fetchResult.json()
  invalidUsername.value = props.signUp ? !fetchObject : fetchObject
}

function checkPasswordValidity(password: string) {
  invalidPassword.value = password.length <= 5
}

function checkWeekHoursValidity(weekHours: number) {
  invalidWeekHours.value = weekHours < 1
}

async function onSubmit() {
  const fetchResult = await fetch(apiConfig.USER + (props.signUp ? '/register' : '/login'), {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData.value)
  })

  const fetchObject = await fetchResult.json()

  if (fetchResult.ok) {
    userStore.setAccessToken(fetchObject.accessToken, fetchObject.user)
    window.location.href = '/'
  } else {
    // checkErrors(fetchObject)
    showErrorMessage();
  }
}
</script>

<template>
  <div
    class="h-screen flex gap-5 justify-center items-center p-32 pt-10 bg-gradient-to-br from-neutral-900 via-neutral-900 to-purple-950 overflow-hidden"
  >
    <UserError v-if="isErrorMessageShown" class="bottom-24" />
    <div
      class="absolute flex rounded-lg h-100 w-1/3 mx-auto items-center justify-center place-items-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 p-3"
    >
      <form name="user-form" @submit.prevent="onSubmit" autocomplete="off" class="w-full rounded mx-auto px-5 bg-neutral-800">
        <div class="w-full mx-auto text-center px-10 text-3xl text-white font-bold pt-10">
          {{ signUp ? 'Konto erstellen' : 'Login' }}
        </div>

        <div class="w-full px-10 mx-auto text-center font-light italic text-lg text-gray-300 pt-6">
          “Die Proletarier dieser Welt haben nichts zu verlieren als ihre Ketten. Sie haben eine Welt zu gewinnen. Proletarier aller Länder, vereinigt
          euch!”
        </div>

        <!-- Username -->
        <div class="mb-3 mx-auto p-10 pb-5 gap-3 w-full">
          <div class="text-center text-white mb-3">Benutzername</div>
          <input @input="() => setUsernameTimeout(formData.username)" v-model="formData.username" id="username" class="al-login-input" type="text" />

          <div v-if="invalidUsername && formData.username.length > 0" class="text-white mt-3">
            <i class="icon pi pi-exclamation-circle pr-1 text-red-400" style="font-size: 1rem"></i>
            {{ props.signUp ? 'Benutzername ist vergeben' : 'Benutzer nicht vorhanden' }}
          </div>

          <div v-else-if="!invalidUsername && formData.username.length > 0" class="text-white mt-3">
            <i class="icon pi pi-check-circle pr-1 text-green-400" style="font-size: 1rem"></i>
            <span>{{ props.signUp ? 'Benutzername ist verfügbar' : 'Benutzer ist vorhanden' }}</span>
          </div>
        </div>

        <!-- Password -->
        <div class="mb-3 px-10">
          <div class="text-center text-white mb-3">Passwort</div>
          <input
            :disabled="invalidUsername"
            @input="() => checkPasswordValidity(formData.password)"
            v-model="formData.password"
            id="password"
            class="al-login-input"
            :class="[invalidUsername ? 'al-login-input-disabled' : '']"
            type="password"
          />

          <div v-if="invalidPassword && formData.password.length > 0" class="text-white mt-3">
            <i class="icon pi pi-exclamation-circle pr-1 text-red-400" style="font-size: 1rem"></i>
            <span>{{ 'Passwort muss mindestens sechs Zeichen lang sein' }}</span>
          </div>
        </div>

        <!-- Number -->
        <div v-if="signUp" class="pt-5 mb-3 px-10">
          <div class="text-center text-white mb-3">Anzahl der Wochenstunden</div>
          <input
            :disabled="invalidPassword || invalidUsername"
            @input="() => checkWeekHoursValidity(formData.weekHours)"
            v-model="formData.weekHours"
            type="number"
            placeholder="Anzahl der Wochenstunden"
            class="al-login-input"
            :class="invalidPassword ? 'al-login-input-disabled' : ''"
          />

          <div v-if="invalidWeekHours" class="text-white mt-3">
            <i class="icon pi pi-exclamation-circle pr-1 text-red-400" style="font-size: 1rem"></i>
            <span>Bitte Nummer eingeben</span>
          </div>
        </div>

        <!-- Buttons -->
        <div class="w-full mb-3 flex align-center justify-center drop-shadow-md">
          <button
            :disabled="invalidUsername || invalidPassword || invalidWeekHours"
            class="al-submit flex justify-center items-center gap-2"
            :class="invalidUsername || invalidPassword || invalidWeekHours ? 'al-submit-disabled' : ''"
            type="submit"
          >
            <ArrowRightEndOnRectangleIcon v-if="!signUp" class="al-icon-button" />
            <UserPlusIcon v-else class="al-icon-button" />
            {{ signUp ? 'Konto erstellen' : 'Login' }}
          </button>
        </div>

        <div class="w-full text-white pb-10 flex align-center justify-center drop-shadow-md">
          <router-link v-if="!signUp" to="/signup">Noch kein Konto? Hier klicken</router-link>
          <router-link v-else to="/login">Konto bereits erstellt? Hier klicken</router-link>
        </div>
      </form>
    </div>
  </div>
</template>
