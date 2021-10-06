import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({
    todoList: [],
    isLoading: false
  }),
  getters: {
    getTodoList: (state) => {
      return state.todoList
    },
    getTodoById: (state) => (id) => {
      return state.todoList.find(td => td.id === id);
    }
  },
  mutations: {
    setTodoList(state, list) {
      state.todoList = list;
    },
    setIsLoading(state, load) {
      state.isLoading = load;
    }
  },
  actions: {
    fetchList({commit}) {
      commit("setIsLoading", true);
      try {
        setTimeout(() => {
          if (localStorage.getItem('list') && localStorage.getItem('list') !== 'undefined') {
            const list = JSON.parse(localStorage.getItem('list'));
            commit("setTodoList", list);
            commit("setIsLoading", false);
          }
        }, 1000);
      } catch (e) {
        console.error(e);
      } finally {
        setTimeout(() => {
          commit("setIsLoading", false);
        }, 1500);
      }
    },
    updateLocalStorage({state}) {
      localStorage.setItem('list', JSON.stringify(state.todoList));
    }
  }
})
