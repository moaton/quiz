<template>
  <div class="modal__back" @click="$emit('hidelangmodal')"></div>
  <div class="change__lang--modal">
    <p v-if="currentLang.KZ">Тілді ауыстыру</p>
    <p v-else-if="currentLang.RU">Поменять язык</p>
    <p v-else-if="currentLang.ENG">Change language</p>
    <ul>
      <li @click="changeLang({ KZ: 1 }), $emit('hidelangmodal')">KZ</li>
      <li @click="changeLang({ RU: 2 }), $emit('hidelangmodal')">RU</li>
      <li @click="changeLang({ ENG: 3 }), $emit('hidelangmodal')">ENG</li>
    </ul>
  </div>

</template>

<script>
import {
    mapGetters
  } from 'vuex';
  export default {
    emits: ['hidelangmodal'],
     computed: {
      ...mapGetters([
        'currentLang'
      ]),
    },
    methods: {
      changeLang(lang) {
        this.$store.dispatch('changeLanguage', lang)
      }
    }
  }
</script>

<style lang="scss">
  
</style>