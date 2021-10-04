import { createStore } from 'vuex'

export default createStore({
  state: {
    currentLang: { ENG: 3 },
    start: false,
    points: 0,
    category: 0
  },
  mutations: {
    CHANGE_LANGUAGE(state, lang){
      state.currentLang = lang
    },
    CATEGORY_SELECTED(state, id){
      state.category = id
    },
    START_GAME(state){
      state.start = true
    },
    ADD_POINT(state){
      state.points += 1
    }
  },
  actions: {
    changeLanguage({commit}, lang){
      commit('CHANGE_LANGUAGE', lang)
    },
    categorySelected({commit}, id){
      commit('CATEGORY_SELECTED', id)
    },
    startGame({commit}){
      commit('START_GAME')
    },
    addPoint({commit}){
      commit('ADD_POINT')
    }
  },
  getters: {
    currentLang: state =>{
      return state.currentLang
    },
    currentCategory: state =>{
      return state.category
    },
    start: state =>{
      return state.start
    },
    points: state =>{
      return state.points
    },
  }
})
