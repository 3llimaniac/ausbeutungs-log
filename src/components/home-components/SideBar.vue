<script setup lang="ts">
import { authState, clearAuthData } from "@/stores/auth";
import router from "@/router";
import { updateWeekNumber, updateYearNumber, weekNumber, yearNumber } from "@/stores/week-entries";
import { ref } from "vue";

const currentWeekGroup = ref(Math.floor(weekNumber.value / 13) + 1);

function onLogOut() {
    clearAuthData();
    router.push("/login");
}
</script>

<template>
    <div class="flex flex-col w-full mx-auto h-full bg-neutral-900 overflow-hidden justify-center">
        <div>
            <div class="text-center w-full mt-10 text-white font-bold text-2xl">AusbeutungsLog</div>

            <div class="w-full m-auto flex justify-center text-center pt-10">
                <i class="icon pi pi-user mx-auto text-white bg-gradient-to-r border-2 from-indigo-400 via-purple-400 to-pink-400 p-4 rounded-full"
                    style="font-size: 2rem"></i>
            </div>

            <div class="w-full font-bold text-lg text-center text-white mt-3">{{ authState.user.username }}</div>
        </div>

        <div class="select-none">
            <div class="grid grid-rows-1 grid-cols-3 gap-3 mx-10 text-center mt-24 text-white font-bold text-lg ">
                <div @click="() => updateYearNumber(yearNumber - 1)"
                    class="flex place-content-center justify-center hover:scale-110 active:scale-90 transition-transform ease-in-out">
                    <i class="icon pi pi-angle-left" style="font-size: 1.8rem"></i>
                </div>

                <div>{{ yearNumber }}</div>

                <div @click="() => updateYearNumber(yearNumber + 1)"
                    class="flex place-content-center justify-center hover:scale-110 active:scale-90 transition-transform ease-in-out">
                    <i class="icon pi pi-angle-right" style="font-size: 1.8rem"></i>
                </div>
            </div>

            <div class="grid grid-cols-4 place-items-stretch gap-2 text-white mt-3 mx-10">
                <div @click="currentWeekGroup = weekGroup" v-for="weekGroup in 4" :key="weekGroup"
                    class="bg-neutral-800 rounded text-center p-2 border-2  hover:bg-neutral-600 active:bg-indigo-600 transition-all ease-in-out"
                    :class="[currentWeekGroup == weekGroup ? 'border-indigo-400' : 'border-neutral-600']">
                    {{ weekGroup * 13 }}
                </div>
            </div>

            <div class="grid grid-cols-4 place-items-stretch gap-2 text-white mt-10 mx-10">
                <div @click="() => updateWeekNumber(weekNumb + (13 * (currentWeekGroup - 1)))" v-for="weekNumb in 13"
                    :key="weekNumb"
                    class="bg-neutral-700 hover:bg-neutral-500 active:bg-pink-600 rounded text-center p-2 border-2 transition-all ease-in-out"
                    :class="[weekNumber == weekNumb + (13 * (currentWeekGroup - 1)) ? 'border-pink-400' : 'border-neutral-500']">
                    {{ weekNumb + (13 * (currentWeekGroup - 1)) }}
                </div>
            </div>
        </div>

        <div class="w-full flex-grow flex flex-col justify-end items-center px-5 gap-5 text-white text-base">
            <button class="al-side">
                <i class="icon pi pi-file-import pr-5" style="font-size: 1.6rem"></i>

                Daten importieren
            </button>

            <button class="al-side">
                <i class="icon pi pi-file-export pr-5" style="font-size: 1.6rem"></i>

                Daten exportieren
            </button>

            <button @click="onLogOut"
                class="flex items-center text-left rounded w-full mx-3 mb-10 p-3 border-2 border-red-300 bg-red-500 hover:bg-red-700 active:bg-red-900 transition-all">
                <i class="icon pi pi-sign-out pr-5" style="font-size: 1.5rem"></i>

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
