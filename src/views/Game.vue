<template>
  <div id="game" v-if="start">
    <div class="container">
      <div class="header row">
        <div class="col-12 d-flex justify-content-end align-items-center">
          <!-- <i class="update update__active fas fa-redo"></i> -->
          <i id="next__level" class="next fas fa-chevron-circle-right" @click="nextLevel"></i>
        </div>
      </div>

      <div class="finish" v-if="isEnd">
        <div class="finish__backdrop"></div>
        <div class="finish__content">
          <div class="text-center mb-3">
            <p v-if="currentLang.KZ">Құттықтаймыз</p>
            <p v-else-if="currentLang.RU">Поздравляем</p>
            <p v-else-if="currentLang.ENG">Congratulations</p>
          </div>
          <div>
            <p v-if="currentLang.KZ">Сіздің ұпайыңыз: <span>{{ points }}</span> ұпай</p>
            <p v-else-if="currentLang.RU">Ваш счет: <span>{{ points }}</span> баллов</p>
            <p v-else-if="currentLang.ENG">Your score: <span>{{ points }}</span> points</p>
          </div>
          <div class="d-flex justify-content-center">
            <button class="btn start mt-4 mb-0" @click="$router.push({name: 'Home'})">OK</button>
          </div>
        </div>
      </div>

      <div class="level row text-center mt-3">
        <h2>Level {{ level + 1}}</h2>
      </div>
      <div class="question row text-center mt-4" v-if="quiz.length > 0">
        <p v-if="currentLang.KZ">{{ quiz[level].question.KZ }}</p>
        <p v-else-if="currentLang.RU">{{ quiz[level].question.RU }}</p>
        <p v-else-if="currentLang.ENG">{{ quiz[level].question.ENG }}</p>
      </div>
      <div class="options row justify-content-between align-items-center mt-4">
        <div :id="option.id"
          class="options__item d-flex justify-content-center align-items-center border text-center text-white"
          v-for="option in displayQuiz" :key="option.id" @click="choice(option)">
          <img :src="option.img" alt="Флаг" v-if="quiz[level].category === 1000">
          <div v-else>
            <p v-if="currentLang.KZ">{{ option.answer.KZ }}</p>
            <p v-else-if="currentLang.RU">{{ option.answer.RU }}</p>
            <p v-else-if="currentLang.ENG">{{ option.answer.ENG }}</p>
          </div>

        </div>
      </div>
      <div class="row m-1 mt-3">
        <div class="description text-center" :class="{ description__open: choiceMade }">
          <div v-if="choiceMade">
            <p v-if="currentLang.KZ">{{ quiz[level].description.KZ }}</p>
            <p v-else-if="currentLang.RU">{{ quiz[level].description.RU }}</p>
            <p v-else-if="currentLang.ENG">{{ quiz[level].description.ENG }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex';
  export default {
    data() {
      return {
        quiz: [],
        level: 0,
        choiceMade: false,
        isEnd: false
      }
    },
    mounted() {
      if (!this.start) {
        this.$router.push('/')
      } else {
        this.getQuestions()
      }

    },
    computed: {
      ...mapGetters([
        'start', 'currentLang', 'points'
      ]),
      displayQuiz() {
        if (this.level < this.quiz.length) {
          return this.quiz[this.level].options
        }
      },
    },
    methods: {
      nextLevel() {
        if (this.choiceMade) {
          for (let i = 0; i < 4; i++) {
            if (document.getElementById(i).classList.contains('option__incorrect')) {
              document.getElementById(i).classList.toggle('option__incorrect')
            }
            if (document.getElementById(i).classList.contains('option__correct')) {
              document.getElementById(i).classList.toggle('option__correct')
            }
          }
          if (this.level < this.quiz.length - 1) {
            this.level++
          } else {
            this.isEnd = true
          }
          this.choiceMade = false
          document.getElementById('next__level').classList.toggle('next__active')
        }
      },
      choice(option) {
        if (!this.choiceMade) {
          if (option.correct) {
            document.getElementById(option.id).classList.toggle('option__correct')
            this.$store.dispatch('addPoint')
          } else {
            let correctId = this.quiz[this.level].options.findIndex(el => el.correct === true)
            document.getElementById(correctId).classList.toggle('option__correct')
            document.getElementById(option.id).classList.toggle('option__incorrect')
          }
        }
        this.choiceMade = true
        document.getElementById('next__level').classList.toggle('next__active')
      },
      shuffle() {
        if (this.quiz.length > 0) {
          let currentIndex = this.quiz.length,
            temporaryValue, randomIndex;

          while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = this.quiz[currentIndex];
            this.quiz[currentIndex] = this.quiz[randomIndex];
            this.quiz[randomIndex] = temporaryValue;
          }
        }
      },
      async getQuestions() {
        try {
          await this.axios.get("http://localhost:3000/" + this.$store.getters.currentCategory).then(res => {
            let data = res.data
            if (this.$store.getters.currentCategory === 1000) {
              data = res.data.sort((a, b) => {
                if (a.level < b.level) {
                  return -1;
                }
                if (a.level > b.level) {
                  return 1;
                }
                return 0;
              })
            }

            data.forEach(element => {
              this.quiz.push(element)
            });
            this.shuffle()
          })
        } catch (error) {
          console.log(error);
        }
      }
    },
  }
</script>

<style lang="scss">
  #game {
    position: relative;
    padding: 30px 0;
    overflow: hidden;

    .header {
      .update {
        font-size: 18px;
        color: #fff;
      }

      .update__active {
        animation: update infinite ease 3s;
      }

      @keyframes update {
        from {
          transform: rotate();
        }

        to {
          transform: rotate(360deg);
        }
      }

      .next {
        font-size: 26px;
        color: #f4a361ab;
      }

      .next__active {
        animation: nextLevel infinite linear 3s;
      }

      @keyframes nextLevel {
        from {
          transform: scale(1);
          color: #f4a361ab;
        }

        50% {
          color: #F4A261;
          transform: scale(1.15);
        }

        to {
          color: #f4a361ab;
          transform: scale(1);
        }
      }

    }

    .finish {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10;

      .finish__backdrop {
        height: 100%;
        width: 100%;
        backdrop-filter: blur(2px);
      }

      .finish__content {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 300px;
        padding: 20px;
        border-radius: 12px;
        background: linear-gradient(180deg, rgba(42,157,143,1) 0%, rgba(38,70,83,1) 100%);
        border: 1px solid #fff;
        transform: translate(-50%, -50%);       
        z-index: 15;
        div:first-child>p{
          font-size: 21px;
        }
        div>p{
          color: #fff;
          span{
            font-size: 27px;
          }
        }
      }
    }

    .level {
      h2 {
        font-size: 24px;
        font-weight: 900;
        letter-spacing: 0.2rem;
        color: #E9C46A;
      }
    }

    .question {
      p {
        color: #fff;
        font-size: 18px;
        font-weight: 300;
      }
    }

    .options {

      .options__item {
        width: 50%;
        height: 180px;
        padding: 10px;
        background: #264653;
        transition: all .5s ease;
      }

      .option__correct {
        background: rgb(47, 155, 71, .5);
      }

      .option__incorrect {
        background: rgb(230, 57, 70, .5);
      }
    }

    .description {
      min-height: 100px;
      padding: 5px;
      border-radius: 15px;
      transform: translateY(40px);
      opacity: 0;
      color: #fff;
      background: #C88C5D;
      transition: all .5s ease;
    }

    .description__open {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>