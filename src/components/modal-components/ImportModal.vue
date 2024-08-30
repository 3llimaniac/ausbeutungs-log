<script setup lang="ts">
import ModalBase from './ModalBase.vue';

</script>

<template>
  <ModalBase modalTitle="Daten importieren" @close="$emit('close')">
    <div class="w-full px-10 mx-auto text-center font-light italic text-lg text-gray-300 pt-6 pb-6">
      Falls du über eine Datei verfügst, die deine vergangenen Arbeitszeiten enthält, kannst du diese hier einreichen und deine Daten werden übernommen. Bitte beachte, dass die Daten die oben beschriebene Struktur besitzt
    </div>

    <form>
      <div class="mb-3 mx-auto px-10 pt-0 pb-5 gap-3 w-full text-center">
        <div class="text-center text-white mb-3">Import-Datei</div>
        <input type="file" class="al-login-input text-center border-2 border-neutral-400" />
      </div>
      
      <div class="w-full mb-3 flex align-center justify-center drop-shadow-md">
        <button class="al-submit" type="submit">Speichern</button>
      </div>
    </form>
  </ModalBase>
</template>
