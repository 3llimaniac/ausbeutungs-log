<script setup lang="ts">
import { authState } from '@/stores/auth.ts';
console.log(authState.value.user);

</script>

<template>
    <div @click="$emit('close')"
        class="absolute flex justify-center items-center w-full h-screen bg-black bg-opacity-90" style="z-index: 9999;">
        <div @click.stop
            class="flex rounded-lg top-44 h-100 w-1/3 mx-auto items-center justify-center place-items-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 p-3">
            <form name="logout-form" autocomplete="off" class="w-full rounded mx-auto px-5 bg-neutral-800">
                <div class="w-full mx-auto text-center px-10 text-4xl text-white font-bold pt-10">
                    User
                </div>

                <div class="flex mb-3 mx-auto p-10 pb-0 gap-3 w-full">
                    <input readonly id="username" class="al-login-input bg-neutral-600 border-none"
                        :placeholder="authState.user.username" type="text" />
                </div>

                <div class="flex mb-3 mx-auto p-10 pb-0 gap-3 w-full">
                    <input id="first-name" class="al-login-input" :placeholder="authState.user.firstname" type="text" />
                </div>

                <div class="flex mb-3 mx-auto p-10 gap-3 w-full">
                    <input id="last-name" class="al-login-input" :placeholder="authState.user.lastname" type="text" />
                </div>

                <div class="flex justify-center items-center gap-4 pb-3"><button
                        class="btn rounded w-1/6 text-white m-5 p-3 text-center bg-purple-500 hover:bg-purple-700 transition ease-in-out"
                        type="submit">Save</button>

                    <button
                        class="btn rounded w-1/6 text-white m-5 p-3 text-center bg-pink-500 hover:bg-pink-700 transition ease-in-out"
                        type="submit">
                        Logout
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
