<template>
  <div class="main d-flex flex-column justify-content-center align-items-center text-center">
    <div class="titles">
      <h2 v-if="currentLang.RU">Добро Пожаловать</h2>
      <h2 v-else-if="currentLang.ENG">Welcome</h2>
      <p v-if="currentLang.RU">в</p>
      <p v-else-if="currentLang.ENG">to</p>
      <h1>QUIZ</h1>
      <h2 v-if="currentLang.KZ">Қош келдіңіз</h2>
    </div>
    <div @click="start(), btnClicked = true" class="btn start" v-if="currentLang.KZ">Бастау</div>
    <div @click="start(), btnClicked = true" class="btn start" v-else-if="currentLang.RU">Старт</div>
    <div @click="start(), btnClicked = true" class="btn start" v-else-if="currentLang.ENG">START</div>
    <div class="change__lang d-flex align-items-center" @click="showLangModal = true">
      <i class="fas fa-globe"></i>
      <p v-if="currentLang.KZ">Тілді ауыстыру</p>
      <p v-else-if="currentLang.RU">Поменять язык</p>
      <p v-else-if="currentLang.ENG">Change language</p>
    </div>
    <div class="change__lang d-flex align-items-center" @click="showCategoryModal = true">
      <i class="fas fa-cube"></i>
      <p v-if="currentLang.KZ">Санатты таңдаңыз</p>
      <p v-else-if="currentLang.RU">Выберите категорию</p>
      <p v-else-if="currentLang.ENG">Select a category</p>
    </div>
    <ChangeLang @hidelangmodal="showLangModal = false" v-if="showLangModal" />
    <Category @hidecategorymodal="showCategoryModal = false" @start="start" v-if="showCategoryModal" />
  </div>
</template>

<script>
  // @ is an alias to /src
  import {
    mapGetters
  } from 'vuex';
  import ChangeLang from '@/components/ChangeLang.vue'
  import Category from '@/components/Category.vue'

  export default {
    name: 'Home',
    components: {
      ChangeLang,
      Category
    },
    data() {
      return {
        showLangModal: false,
        showCategoryModal: false,
        btnClicked: false,
      }
    },
    computed: {
      ...mapGetters([
        'currentLang',
      ]),
    },
    methods: {
      start() {
        if (this.$store.getters.currentCategory === 0) {
          this.showCategoryModal = true
          this.btnClicked = false
        } else if (this.$store.getters.currentCategory != 0 && this.btnClicked) {
          this.$store.dispatch('startGame')
          this.btnClicked = false
          this.$router.push({
            name: 'Game'
          })
        }

      }
    },
  }
</script>

<style lang="scss">
  .btn {
    padding: 5px 20px;
    border-radius: 15px;
    background: #fff;
    text-transform: uppercase;
  }

  .start {
    margin: 40px 0;
    color: #fff;
    font-size: 14px;
    font-weight: 900;
    border: 1px solid #F4A261;
    background: #E76F51;
  }

  .main {
    position: absolute;
    width: 100%;
    height: 100%;

    .titles {
      h2 {
        font-size: 24px;
        font-weight: 600;
        text-transform: uppercase;
        color: #fff;
      }

      p {
        font-size: 12px;
        font-weight: 300;
        color: #fff;
      }

      h1 {
        margin-top: 10px;
        font-size: 48px;
        font-weight: 900;
        text-transform: uppercase;
        color: #E9C46A;
      }
    }



    .change__lang {
      margin-bottom: 10px;

      i,
      p {
        font-size: 12px;
        color: rgba(233, 196, 106, 0.5);
      }

      p {
        margin-left: 5px;
      }
    }
  }
</style>