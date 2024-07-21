<script setup lang="ts">
import 'primeicons/primeicons.css'
import { ref } from 'vue'
import { setAccessToken } from '../../stores/auth.ts'
const props = defineProps({ signUp: Boolean })

let invalidUsername = ref(false)
let invalidUsernameMessage = ref('Bitte geben Sie einen Benutzernamen ein')

let invalidPassword = ref(false)
let invalidPasswordMessage = ref('Bitte geben Sie ein Passwort ein')

let invalidWeekHours = ref(false)
let invalidWeekHoursMessage = ref('Bitte geben Sie ein Passwort ein')

const formData = ref({
  username: '',
  password: '',
  weekHours: 40
})

interface ErrorObject {
  statusCode: number
  message: string
  code: string
}

interface ErrorMapEntry {
  invalidField: 'invalidUsername' | 'invalidPassword'
  message: string
}

const errorMap: { [key: string]: ErrorMapEntry } = {
  'User not found': {
    invalidField: 'invalidUsername',
    message: 'Benutzer konnte nicht gefunden werden'
  },
  'User already exists with this username': {
    invalidField: 'invalidUsername',
    message: 'Benutzername bereits vergeben'
  },
  'Invalid password': {
    invalidField: 'invalidPassword',
    message: 'Falsches Passwort'
  }
}

async function onSubmit() {
  const fetchResult = await fetch('http://localhost:3000/api/user/' + (props.signUp ? 'register' : 'login'), {
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
    setAccessToken(fetchObject.accessToken, fetchObject.user)
    window.location.href = '/'
  } else {
    checkErrors(fetchObject)
  }
}

async function checkErrors(fetchObject: ErrorObject) {
  const error = errorMap[fetchObject.message]

  if (error) {
    if (error.invalidField === 'invalidUsername') {
      invalidUsername.value = true
      invalidUsernameMessage.value = error.message
    } else if (error.invalidField === 'invalidPassword') {
      invalidPassword.value = true
      invalidPasswordMessage.value = error.message
    } else if (error.invalidField === 'invalidWeekHours') {
      invalidWeekHours.value = true
      invalidWeekHoursMessage.value = error.message
    }
    return
  }

  invalidUsername.value = formData.value.username.length == 0
  invalidPassword.value = formData.value.password.length < 6

  if (invalidUsername.value) {
    invalidUsernameMessage.value = 'Bitte geben Sie einen Benutzernamen ein'
  }

  if (invalidPassword.value) {
    invalidPasswordMessage.value = 'Ein Passwort muss mindestens sechs Zeichen lang sein'
  }
}
</script>

<template>
  <form name="user-form" @submit.prevent="onSubmit" autocomplete="off" class="w-full rounded mx-auto px-5 bg-neutral-800">
    <div class="w-full mx-auto text-center px-10 text-3xl text-white font-bold pt-10">
      {{ signUp ? 'Konto erstellen' : 'Login' }}
    </div>

    <div class="w-full px-10 mx-auto text-center font-light italic text-lg text-gray-300 pt-6">“Die Proletarier dieser Welt haben nichts zu verlieren als ihre Ketten. Sie haben eine Welt zu gewinnen. Proletarier aller Länder, vereinigt euch!”</div>

    <!-- Username -->
    <div class="mb-3 mx-auto p-10 pb-5 gap-3 w-full">
      <div class="text-center text-white mb-3">Benutzername</div>
      <input v-model="formData.username" id="username" class="al-login-input" :class="[invalidUsername ? 'border-3 border-red-400' : '']" type="text" />

      <div v-if="invalidUsername" class="text-white mt-3">
        <i class="icon pi pi-exclamation-circle pr-1 text-red-400" style="font-size: 1rem"></i>
        {{ invalidUsernameMessage }}
      </div>
    </div>

    <!-- Password -->
    <div class="mb-3 px-10">
      <div class="text-center text-white mb-3">Passwort</div>
      <input v-model="formData.password" id="password" class="al-login-input" :class="[invalidPassword ? 'border-3 border-red-400' : '']" type="password" />

      <div v-if="invalidPassword" class="text-white mt-3">
        <i class="icon pi pi-exclamation-circle pr-1 text-red-400" style="font-size: 1rem"></i>
        {{ invalidPasswordMessage }}
      </div>
    </div>

    <!-- Number -->
    <div v-if="signUp" class="pt-5 mb-3 px-10">
      <div class="text-center text-white mb-3">Anzahl der Wochenstunden</div>
      <input v-model="formData.weekHours" type="number" placeholder="Anzahl der Wochenstunden" class="al-login-input" />

      <div v-if="invalidWeekHours" class="text-white mt-3">
        <i class="icon pi pi-exclamation-circle pr-1 text-red-400" style="font-size: 1rem"></i>
        {{ invalidWeekHoursMessage }}
      </div>
    </div>

    <!-- Buttons -->
    <div class="w-full mb-3 flex align-center justify-center drop-shadow-md">
      <button class="al-submit" type="submit">
        <i v-if="!signUp" class="icon pi pi-sign-in mr-2" style="font-size: 1rem"></i>
        <i v-else class="icon pi pi-user-plus mr-2" style="font-size: 1rem"></i>
        {{ signUp ? 'Konto erstellen' : 'Login' }}
      </button>
    </div>

    <div class="w-full text-white pb-10 flex align-center justify-center drop-shadow-md">
      <router-link v-if="!signUp" to="/signup">Noch kein Konto? Hier klicken</router-link>
      <router-link v-else to="/login">Konto bereits erstellt? Hier klicken</router-link>
    </div>
  </form>
</template>
