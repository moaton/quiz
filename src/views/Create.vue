<template>
  <div id="create">
    <div class="container">
      <form @submit.prevent="post">
        <div class="row">
          <div class="col-12 d-flex justify-content-between align-content-center mb-4">
            <label>Категория:</label>
            <select v-model="selectedCategory" id="category" required>
              <option value="" disabled selected>Выберите категорию</option>
              <option v-for="category in categories" :key="category" :value="category.id">{{ category.name }}</option>
            </select>
          </div>
        </div>
        <div v-if="selectedCategory === 1000">
          <div class="row">
            <div class="col-12 d-flex justify-content-between align-content-center mb-4">
              <label>Вопрос:</label>
              <input type="text" v-model="question" placeholder="Вопрос" required>
            </div>
            <div class="col-12 d-flex justify-content-between align-content-center mb-4">
              <label>Уровень:</label>
              <input v-model="level" type="range" min="1" max="10">
              <p>LVL: {{ level }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-12 mb-4">
              <label>Варианты:</label>
              <div class="optionsFlag d-flex flex-column justify-content-end mt-2">
                <div class="optionsFlag__item d-flex flex-column justify-content-end">
                  <input v-model="optionsFlag[0].img" type="text" placeholder="URL адрес" required>
                  <input v-model="optionsFlag[0].desc" type="text" placeholder="Чей флаг?" required>
                  <div>
                    <p>Правильный ответ?</p>
                    <p>Да: <input type="checkbox" v-model="optionsFlag[0].correct" name="correct"
                        @click="onlyOne(optionsFlag[0].id)"></p>
                  </div>
                </div>
                <div class="optionsFlag__item d-flex flex-column justify-content-end">
                  <input v-model="optionsFlag[1].img" type="text" placeholder="URL адрес" required>
                  <input v-model="optionsFlag[1].desc" type="text" placeholder="Чей флаг?" required>
                  <div>
                    <p>Правильный ответ?</p>
                    <p>Да: <input type="checkbox" v-model="optionsFlag[1].correct" name="correct"
                        @click="onlyOne(optionsFlag[1].id)"></p>
                  </div>
                </div>
                <div class="optionsFlag__item d-flex flex-column justify-content-end">
                  <input v-model="optionsFlag[2].img" type="text" placeholder="URL адрес" required>
                  <input v-model="optionsFlag[2].desc" type="text" placeholder="Чей флаг?" required>
                  <div>
                    <p>Правильный ответ?</p>
                    <p>Да: <input type="checkbox" v-model="optionsFlag[2].correct" name="correct"
                        @click="onlyOne(optionsFlag[2].id)"></p>
                  </div>
                </div>
                <div class="optionsFlag__item d-flex flex-column justify-content-end">
                  <input v-model="optionsFlag[3].img" type="text" placeholder="URL адрес" required>
                  <input v-model="optionsFlag[3].desc" type="text" placeholder="Чей флаг?" required>
                  <div>
                    <p>Правильный ответ?</p>
                    <p>Да: <input type="checkbox" v-model="optionsFlag[3].correct" name="correct"
                        @click="onlyOne(optionsFlag[3].id)"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 d-flex flex-column justify-content-between align-content-center mb-4">
              <label>Описание:</label>
              <textarea v-model="description" placeholder="Немного о стране" cols="30" rows="10" required></textarea>
            </div>
          </div>
          <div class="row">
            <div class="col-12 d-flex justify-content-end">
              <button type="submit">Добавить</button>
            </div>
          </div>
        </div>

        <div v-else-if="selectedCategory === 4000 || selectedCategory === 2000">
          <div class="row">
            <div class="col-12 d-flex flex-column justify-content-start align-content-center mb-4">
              <label>Вопрос:</label>
              <input type="text" v-model="question" placeholder="Вопрос" required>
            </div>
          </div>
          <div class="row">
            <div class="col-12 mb-4">
              <label>Варианты:</label>
              <div class="options d-flex flex-column justify-content-end mt-2">
                <div class="options__item d-flex flex-column justify-content-end">
                  <input v-model="optionsGeneral[0].answer" type="text" placeholder="Ответ" required>
                  <div>
                    <p>Правильный ответ?</p>
                    <p>Да: <input type="checkbox" v-model="optionsGeneral[0].correct" name="correct"
                        @click="onlyOne(optionsGeneral[0].id)"></p>
                  </div>
                </div>
                <div class="options__item d-flex flex-column justify-content-end">
                  <input v-model="optionsGeneral[1].answer" type="text" placeholder="Ответ" required>
                  <div>
                    <p>Правильный ответ?</p>
                    <p>Да: <input type="checkbox" v-model="optionsGeneral[1].correct" name="correct"
                        @click="onlyOne(optionsFlag[1].id)"></p>
                  </div>
                </div>
                <div class="options__item d-flex flex-column justify-content-end">
                  <input v-model="optionsGeneral[2].answer" type="text" placeholder="Ответ" required>
                  <div>
                    <p>Правильный ответ?</p>
                    <p>Да: <input type="checkbox" v-model="optionsGeneral[2].correct" name="correct"
                        @click="onlyOne(optionsGeneral[2].id)"></p>
                  </div>
                </div>
                <div class="options__item d-flex flex-column justify-content-end">
                  <input v-model="optionsGeneral[3].answer" type="text" placeholder="Ответ" required>
                  <div>
                    <p>Правильный ответ?</p>
                    <p>Да: <input type="checkbox" v-model="optionsGeneral[3].correct" name="correct"
                        @click="onlyOne(optionsGeneral[3].id)"></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 d-flex flex-column justify-content-between align-content-center mb-4">
              <label>Описание:</label>
              <textarea v-model="description" placeholder="Подробности" cols="30" rows="10" required></textarea>
            </div>
          </div>
          <div class="row">
            <div class="col-12 d-flex justify-content-end">
              <button type="submit">Добавить</button>
            </div>
          </div>
        </div>
        <div class="row text-center" v-else>
          <h2>Выберите категорию</h2>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        categories: [],
        selectedCategory: "",
        question: "",
        level: 1,
        description: "",
        optionsFlag: [
          {
            "id": 0,
            "img": "",
            "desc": "",
            "correct": false
          },
          {
            "id": 1,
            "img": "",
            "desc": "",
            "correct": false
          },
          {
            "id": 2,
            "img": "",
            "desc": "",
            "correct": false
          },
          {
            "id": 3,
            "img": "",
            "desc": "",
            "correct": false
          }
        ],
        optionsGeneral: [
          {
            "id": 0,
            "answer": "",
            "correct": false
          },
          {
            "id": 1,
            "answer": "",
            "correct": false
          },
          {
            "id": 2,
            "answer": "",
            "correct": false
          },
          {
            "id": 3,
            "answer": "",
            "correct": false
          }
        ]
      }
    },
    mounted() {
      this.getCategory()
    },
    methods: {
      async getCategory() {
        await this.axios.get('http://localhost:3000/category').then(res => {
          res.data.forEach(el => this.categories.push(el))
        })
      },
      onlyOne(id) {
        if(this.selectedCategory === 1000){
          this.optionsFlag.forEach(element => {
          if (element.id != id) {
            element.correct = false
          }
        });
        }
        else if(this.selectedCategory === 4000){
          this.optionsGeneral.forEach(element => {
          if (element.id != id) {
            element.correct = false
          }
        });
        }
        
      },
      async post() {
        try {
          let obj
          if (this.selectedCategory === 1000) {
            obj = {
              "level": this.level,
              "category": this.selectedCategory,
              "question": this.question,
              "optionsFlag": this.optionsFlag,
              "description": this.description
            }
          }
          else if(this.selectedCategory === 4000 || this.selectedCategory === 2000){
            obj = {
              "category": this.selectedCategory,
              "question": this.question,
              "options": this.optionsGeneral,
              "description": this.description
            }
          }

          await this.axios.post('http://localhost:3000/' + this.selectedCategory, obj)

          this.level = this.question = this.description = ""
          this.optionsGeneral = [
            {
            "id": 0,
            "answer": "",
            "correct": false
          },
          {
            "id": 1,
            "answer": "",
            "correct": false
          },
          {
            "id": 2,
            "answer": "",
            "correct": false
          },
          {
            "id": 3,
            "answer": "",
            "correct": false
          }
          ]
          this.optionsFlag = [
            {
              "id": 0,
              "img": "",
              "desc": "",
              "correct": false
            },
            {
              "id": 1,
              "img": "",
              "desc": "",
              "correct": false
            },
            {
              "id": 2,
              "img": "",
              "desc": "",
              "correct": false
            },
            {
              "id": 3,
              "img": "",
              "desc": "",
              "correct": false
            }
          ]
        } catch (error) {
          console.log(error);
        }
      }
    },
  }
</script>

<style lang="scss">
  #create {
    padding: 30px 0;
    color: #fff;

    #category {
      margin-left: 20px;
    }

    .options {
      .options__item {
        margin-bottom: 20px;
      }
    }
  }
</style>