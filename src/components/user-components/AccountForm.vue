<script setup lang="ts">
import 'primeicons/primeicons.css'
import { ref } from "vue";
import router from '@/router';
import { setAccessToken } from "../../stores/auth.ts"
const props = defineProps({ signUp: Boolean })

let invalidUsername = ref(false);
let invalidUsernameMessage = ref('Bitte geben Sie einen Benutzernamen ein');

let invalidPassword = ref(false);
let invalidPasswordMessage = ref('Bitte geben Sie ein Passwort ein');

const formData = ref({
    username: '',
    password: ''
});

interface ErrorObject {
    statusCode: number,
    message: string,
    code: string
}

interface ErrorMapEntry {
    invalidField: 'invalidUsername' | 'invalidPassword';
    message: string;
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
};

async function onSubmit() {
    const fetchResult = await fetch("http://localhost:3000/api/users/" + (props.signUp ? "register" : "login"), {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData.value)
    });

    const fetchObject = await fetchResult.json();

    if (fetchResult.ok) {
        setAccessToken(fetchObject.accessToken, fetchObject.user);
        console.log("Bin reingekommen");
        router.push('/').catch(failure => {
            console.log(failure);
        })
    } else {
        checkErrors(fetchObject)
    }
}

async function checkErrors(fetchObject: ErrorObject) {
    const error = errorMap[fetchObject.message];

    if (error) {
        if (error.invalidField === 'invalidUsername') {
            invalidUsername.value = true;
            invalidUsernameMessage.value = error.message;
        } else if (error.invalidField === 'invalidPassword') {
            invalidPassword.value = true;
            invalidPasswordMessage.value = error.message;
        }
        return;
    }

    invalidUsername.value = formData.value.username.length == 0;
    invalidPassword.value = formData.value.password.length < 6;

    if (invalidUsername.value) {
        invalidUsernameMessage.value = 'Bitte geben Sie einen Benutzernamen ein';
    }

    if (invalidPassword.value) {
        invalidPasswordMessage.value = 'Ein Passwort muss mindestens sechs Zeichen lang sein';
    }
}
</script>

<template>
    <form name="user-form" @submit.prevent="onSubmit" autocomplete="off"
        class="w-full rounded mx-auto px-5 bg-neutral-800">
        <div class="w-full mx-auto text-center px-10 text-4xl text-white font-bold pt-10">
            {{ signUp ? "Konto erstellen" : "Login" }}
        </div>

        <div class="w-full px-10 mx-auto text-center font-light italic text-lg text-gray-300 pt-6">
            “Die Proletarier dieser Welt haben nichts zu verlieren als ihre Ketten. Sie haben eine Welt zu gewinnen.
            Proletarier aller Länder, vereinigt euch!”
        </div>

        <!-- Username -->
        <div class="mb-3 mx-auto p-10 gap-3 w-full">
            <input v-model="formData.username" id="username" class="al-login-input"
                :class="[invalidUsername ? 'border-3 border-red-400' : '']" placeholder="Benutzername" type="text" />

            <div v-if="invalidUsername" class="text-white mt-3">
                <i class="icon pi pi-exclamation-circle pr-1 text-red-400" style="font-size: 1rem"></i>
                {{ invalidUsernameMessage }}
            </div>
        </div>

        <!-- Password -->
        <div class="mb-3 px-10">
            <input v-model="formData.password" id="password" class="al-login-input"
                :class="[invalidPassword ? 'border-3 border-red-400' : '']" placeholder="Kennwort" type="password" />

            <div v-if="invalidPassword" class="text-white mt-3">
                <i class="icon pi pi-exclamation-circle pr-1 text-red-400" style="font-size: 1rem"></i>
                {{ invalidPasswordMessage }}
            </div>
        </div>

        <!-- Buttons -->
        <div class="w-full mb-3 flex align-center justify-center drop-shadow-md">
            <button
                class="btn rounded text-white m-5 p-3 text-center bg-purple-400 hover:bg-purple-500 transition ease-in-out"
                type="submit">
                {{ signUp ? 'Konto erstellen' : 'Login' }}
            </button>
        </div>

        <div class="w-full text-white pb-10 flex align-center justify-center drop-shadow-md">
            <router-link v-if="!signUp" to="/signup">Noch kein Konto? Hier klicken</router-link>
            <router-link v-else to="/login">Konto bereits erstellt? Hier klicken</router-link>
        </div>
    </form>
</template>
