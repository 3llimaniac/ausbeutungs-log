<script setup lang="ts">
import { ref } from 'vue';

let entryDate = ref(new Date());
console.log(entryDate.value);
</script>

<template>
    <div @click="$emit('close')"
        class="absolute flex justify-center items-center w-full h-screen bg-black bg-opacity-90" style="z-index: 9999;">
        <div @click.stop
            class="flex rounded-lg top-44 h-100 w-1/3 mx-auto items-center justify-center place-items-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 p-3">
            <form name="logout-form" autocomplete="off" class="w-full rounded mx-auto px-5 bg-neutral-800">
                <div class="w-full mx-auto text-center px-10 text-4xl text-white font-bold pt-10 pb-10">
                    Tageseintrag
                </div>

                <div class="rounded py-3 mx-10 my-5 gap-3 text-white text-center font-bold text-xl bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 p-3">
                    {{ entryDate.toLocaleDateString("de-DE")}}
                </div>

                <div class="mb-3 mx-auto p-10 pt-0 pb-5 gap-3 w-full text-center">
                    <div class="text-center text-white text-lg mb-3 font-bold">Beginn</div>
                    <input type="time" class="al-login-input text-center" />
                </div>

                <div class="mb-3 mx-auto p-10 pt-0 pb-5 gap-3 w-full">
                    <div class="text-center text-white text-lg mb-3 font-bold">Ende</div>
                    <input type="time" class="al-login-input text-center" />
                </div>

                <div class="w-full mb-3 flex align-center justify-center drop-shadow-md">
                    <button
                        class="btn rounded text-white m-5 p-3 text-center bg-purple-400 hover:bg-purple-500 transition ease-in-out"
                        type="submit">Speichern</button>
                </div>
            </form>
        </div>
    </div>
</template>
