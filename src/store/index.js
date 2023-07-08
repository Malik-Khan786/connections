import { createStore } from "vuex";

export default createStore({
    state : {
        countFun:false
    },
    mutations: {
        setCountFun(state,val){
            state.countFun = val;
        }
    },
    actions: {
        // addBook({commit},book){
        //     commit('addBook', book);
        // }
    },
    getters: {
        // getAllBooks(state){
        //     return state.books;
        // }
    }
})