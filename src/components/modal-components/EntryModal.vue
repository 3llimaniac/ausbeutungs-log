<script setup lang="ts">
import { weekEntries } from '@/stores/week-entries';
import { DayEntry } from '@/types/day-entry';
import { ref } from 'vue';

const isAttendant = ref(true);
</script>

<script lang="ts">
    export const modalDayEntry = ref(weekEntries.value[0])
</script>

<template>
    <div @click="$emit('close')"
        class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 bg-clip-padding" style="z-index: 9999;">
        <div @click.stop
            class="flex flex-col rounded-lg max-h-screen w-full max-w-3xl mx-auto items-center justify-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 p-3 overflow-y-auto">
            <form name="logout-form" autocomplete="off" class="w-full rounded mx-auto px-5 bg-neutral-800">
                <div class="w-full mx-auto text-center px-10 text-3xl text-white font-bold pt-10 pb-10">
                    Tageseintrag
                </div>

                <div
                    class="gap-5 rounded py-3 mx-10 mb-10 text-white text-center font-bold text-xl p-3 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 border-2 border-white">
                    <div class="p">
                        <i class="icon pi pi-calendar mr-1" style="font-size: 1.2rem"></i>
                        {{ modalDayEntry.workDay.toLocaleDateString("de-DE") }}
                    </div>
                </div>

                <div class="flex justify-center border-b-2 border-b-neutral-700 mb-10 text-white gap-5 mx-5">
                    <button type="button" @click="isAttendant = true"
                        :class="[isAttendant ? 'al-entry-modal-tab-clicked' : 'al-entry-modal-tab-not-clicked']">
                        <i class="icon pi pi-calendar-plus mr-1" style="font-size: 1.0rem"></i>
                        Arbeitszeit
                    </button>
                    
                    <button type="button" @click="isAttendant = false"
                        :class="[!isAttendant ? 'al-entry-modal-tab-clicked' : 'al-entry-modal-tab-not-clicked']">
                        <i class="icon pi pi-calendar-minus mr-1" style="font-size: 1.0rem"></i>
                        Fehlzeit
                    </button>
                </div>

                <div v-if="isAttendant" class="">
                    <div class="mb-3 mx-auto p-10 pt-0 pb-5 gap-3 w-full text-center">
                        <div class="text-center text-white mb-3">Beginn</div>
                        <input type="time" :value="modalDayEntry.arrival" class="al-login-input text-center" />
                    </div>

                    <div class="mb-5 mx-auto px-10 pt-0 gap-3 w-full">
                        <div class="text-center text-white mb-3">Ende</div>
                        <input type="time" :value="modalDayEntry.departure" class="al-login-input text-center" />
                    </div>
                </div>

                <div v-else>
                    <div class="mb-5 mx-auto px-10 pt-0 gap-3 w-full">
                        <div class="text-center text-white mb-3">Grund</div>
                        <select class="al-login-input text-center">
                            <option>Krank</option>
                            <option>Urlaub</option>
                        </select>
                    </div>
                </div>

                <div class="w-full mb-3 flex align-center justify-center drop-shadow-md">
                    <button class="al-submit" type="submit">
                        <i class="icon pi pi-save" style="font-size: 1.0rem"></i>
                        Speichern
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
/* Ensure the inner modal is scrollable if it overflows */
.max-h-screen {
    max-height: 100vh;
}
</style>
