export const todosModule = {
  state: () => ({
    todoList: [],
    todo: [],
    isLoading: false
  }),
  getters: {
    getTodoList(state) {
      return state.todoList;
    },
    getTodo(state) {
      return state.todo;
    }
  },
  mutations: {
    setTodoList(state, list) {
      state.todoList = list;
    },
    setTodo(state, todo) {
      state.todo = todo;
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
    },
    fetchTodo({state, commit}, todoId) {
      const todo = state.todoList.filter(t => t.id === +todoId);
      commit('setTodo', todo);
    }
  },
  namespaced: true
}