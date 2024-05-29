<script setup lang="ts">
import { ref } from "vue";
import { authState, clearAuthData } from "@/stores/auth";
import router from "@/router";

function onLogOut() {
    clearAuthData();
    router.push("/login");
}

</script>

<template>
    <div class="w-full mx-auto h-full bg-neutral-900 overflow-hidden flex flex-col justify-center">
        <div class="text-center w-full mt-10 text-white font-bold text-2xl">AusbeutungsLog</div>
        <div class="w-full m-auto flex justify-center text-center pt-10">
            <i class="icon pi pi-user mx-auto text-white bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 p-4 rounded-full"
                style="font-size: 2rem"></i>
        </div>
        <div class="w-full font-bold text-xl text-center text-white mt-3">{{ authState.user.username }}</div>

        <div class="w-full flex-grow flex flex-col justify-end items-center px-5 gap-5 py-20 text-white text-base">
            <button
                class="flex justify-left items-center text-left rounded w-full mx-3 p-3 bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-950">
                <i class="icon pi pi-file-import pr-5" style="font-size: 1.6rem"></i>

                Daten importieren
            </button>

            <button
                class="flex justify-left items-center text-left rounded w-full mx-3 p-3 bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-950">
                <i class="icon pi pi-file-export pr-5" style="font-size: 1.6rem"></i>

                Daten exportieren
            </button>

            <button @click="onLogOut"
                class="flex justify-left items-center text-left rounded w-full mx-3 p-3 bg-red-900 hover:bg-red-800 active:bg-red-950">
                <i class="icon pi pi-sign-out pr-5" style="font-size: 1.6rem"></i>

                Logout
            </button>
        </div>
    </div>
</template>

<style>
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: 0.2s opacity ease;
}
</style>
