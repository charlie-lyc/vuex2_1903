import axios from 'axios';

/**
 * [modules] in [store]
 * 1. 'state'
 * 2. 'getters'
 * 3. 'actions'
 * 4. 'mutations'
 */
// const state = {}
// const getters = {}
// const actions = {}
// const mutations = {}
// export default {
//     state,
//     getters,
//     actions,
//     mutations,
// }

/////////////////////////////////////

const state = {
    todos: [
        // {
        //     id: 1,
        //     title: 'Item One'
        //     completed: true,
        // },
        // {
        //     id: 2,
        //     title: 'Item Two'
        //     completed: false,
        // },
    ],
}

const getters = {
    allTodos: (state) => state.todos,

}

const actions = {
    async fetchTodos({ commit }) {
        // const res = await axios.get('https://jsonplaceholder.typicode.com/todos')
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=30')
        // console.log(res.data);
        commit('setTodos', res.data)
    },
    async addTodo({ commit }, title) {
        const res = await axios.post('https://jsonplaceholder.typicode.com/todos', { title, completed: false })
        // console.log(res.data)
        commit('newTodo', res.data)
    },
    async deleteTodo({ commit }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        commit('removeTodo', id)
    },
    async filterTodos({ commit }, e) {
        // console.log(e)
        const res = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${e.target.value}`)
        // console.log(res.data)
        commit('setTodos', res.data)
    },
    async updateTodo({ commit }, todo) {
        /* JsonPlaceHolder API 특성상 id 201 까지만 생성 (즉, 1개만 더 생성되는 것 처럼 작동) */
        if (todo.id <= 200) {
            const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo)
            // console.log(res.data)
            commit('updTodo', res.data)
        } else {
            commit('updTodo', todo)
        }
    },

}

const mutations = {
    setTodos: (state, todos) => state.todos = todos,
    newTodo: (state, todo) => state.todos.unshift(todo),
    removeTodo: (state, id) => state.todos = state.todos.filter((item) => item.id !== id),
    // updTodo: (state, todo) => {
    //     const index = state.todos.findIndex(todo => todo.id === updTodo.id);
    //     if (index !== -1) {
    //       state.todos.splice(index, 1, updTodo);
    //     }
    // },
    updTodo: (sate, todo) => state.todos = state.todos.map((item) => {
        if (item.id === todo.id) return todo
        return item
    }),

}

export default {
    state,
    getters,
    actions,
    mutations,

}