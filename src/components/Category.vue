<template>
  <div class="modal__back" @click="$emit('hidecategorymodal')"></div>
  <div class="change__lang--modal category">
    <p v-if="currentLang.KZ">Санатты таңдаңыз</p>
    <p v-else-if="currentLang.RU">Выберите категорию</p>
    <p v-else-if="currentLang.ENG">Select a category</p>
    <ul v-if="currentLang.KZ">
      <li @click="choice(1000)">Елдің тулары</li>
      <li @click="choice(3000)" style="color: gray">Ғылым</li>
      <li @click="choice(2000)">Жылды болжаңыз</li>
      <li @click="choice(4000)">Жалпы сұрақтар</li>
    </ul>
    <ul v-else-if="currentLang.RU">
      <li @click="choice(1000)">Флаги стран</li>
      <li @click="choice(3000)" style="color: gray">Наука</li>
      <li @click="choice(2000)">Угадай год</li>
      <li @click="choice(4000)">Общие вопросы</li>
    </ul>
    <ul v-else-if="currentLang.ENG">
      <li @click="choice(1000)">Country flags</li>
      <li @click="choice(3000)" style="color: gray">The science</li>
      <li @click="choice(2000)">Guess the year</li>
      <li @click="choice(4000)">General issues</li>
    </ul>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  export default {
    emits: ['hidecategorymodal', 'start'],
    computed: {
      ...mapGetters([
        'currentLang'
      ]),
    },
    methods: {
      choice(category){
        setTimeout(() => {
          this.$store.dispatch('categorySelected', category)
          this.$emit('start')
          this.$emit('hidecategorymodal')

          
        }, 300)
      }
    }
  }
</script>

<style lang="scss">
  .category{
    ul{
      display: block;
      li{
        border-radius: 12px;
        margin: 10px 0;
      }
      li:hover{
        background: rgba(244, 163, 97, 0.5);
      }
    }
  }
</style>