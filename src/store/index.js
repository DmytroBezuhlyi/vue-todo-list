import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: () => ({
        todoList: [],
        userList: [],
        isLoading: false,
        isAuth: false,
        isModalShow: false,
        currentUser: '',
        isMobile: false,
        admin: {
            username: 'admin@gmail.com',
            password: 'pass',
        },
        tempTodo: {}
    }),
    getters: {
        getTodoList: (state) => {
            return state.todoList
        },
        getTodoById: (state) => (id) => {
            return state.todoList.find(td => td.id === id);
        },
        getIsLoading: (state) => {
            return state.isLoading;
        },
        getIsAuth: (state) => {
            return state.isAuth
        },
        getUserList: (state) => {
            return state.userList;
        },
        getCurrentUser: (state) => {
            return state.currentUser;
        },
        getIsMobile: (state) => {
            return state.isMobile;
        },
        getTempTodo: (state) => {
            return state.tempTodo;
        },
        getIsModalShow: (state) => {
            return state.isModalShow;
        }
    },
    mutations: {
        setTodoList(state, list) {
            state.todoList = list;
        },
        setIsLoading(state, load) {
            state.isLoading = load;
        },
        setIsAuth(state, status) {
            state.isAuth = status;
        },
        setUserList(state, list) {
            state.userList = list;
        },
        setCurrentUser(state, user) {
            state.currentUser = user;
        },
        setIsMobile(state, status) {
            state.isMobile = status;
        },
        setTempToDo(state, todo) {
            state.tempTodo = todo;
        },
        setIsModalShow(state, status) {
            state.isModalShow = status;
        }
    },
    actions: {
        fetchList({commit}) {
            commit("setIsLoading", true);
            const list = localStorage.getItem('list')
            try {
                setTimeout(() => {
                    if (list && localStorage.getItem('list') !== 'undefined') {
                        commit("setTodoList", JSON.parse(list));
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
        fetchUserList({commit}) {
            const users = localStorage.getItem('users');
            try {
                setTimeout(() => {
                    if (users) {
                        commit("setUserList", JSON.parse(users));
                    }
                }, 100);
            } catch (e) {
                console.error(e);
            }
        },
        updateLocalStorage({state}) {
            localStorage.setItem('list', JSON.stringify(state.todoList));
        },
        updateLocalStorageUsers({state}) {
            localStorage.setItem('users', JSON.stringify(state.userList));
        },
        isMobile({commit}) {
            commit('setIsMobile', window.innerWidth < 767);
        }
    }
})
