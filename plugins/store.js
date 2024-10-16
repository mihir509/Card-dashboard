import axios from "axios";
import { createStore } from "vuex";

const base_url = "";


const store = createStore({
    state(){
        return {
            cardList:[
                {
                    name: "Mihir",
                    bankName: "HDFC",
                    cardType: "Credit Card",
                    cardNumber: "9898 9898 9898 9898",
                    validTill: "11/25",
                    cvv: "123",
                    isDefault: false,
                    isGpay: false,
                    isArchived: false,
                    isLocked: false,
                    showNumber: false
                },
                {
                    name: "Nikhil",
                    bankName: "HDFC",
                    cardType: "Credit Card",
                    cardNumber: "9898 9898 9898 9797",
                    validTill: "11/25",
                    cvv: "123",
                    isDefault: false,
                    isGpay: false,
                    isArchived: false,
                    isLocked: false,
                    showNumber: false
                },
                {
                    name: "IshitParekh",
                    bankName: "HDFC",
                    cardType: "Debit Card",
                    cardNumber: "9898 9898 9898 9696",
                    validTill: "11/25",
                    cvv: "123",
                    isDefault: false,
                    isGpay: false,
                    isArchived: false,
                    isLocked: false,
                    showNumber: false
                }
            ]
        }
    },
    mutations:{
        SET_CARD(state , response){
            console.error(response)
            state.cardList.push(response)
        },
        UPDATE_CARD(state, updatedCard) {
            const index = state.cardList.findIndex(c => c.name === updatedCard.name);
            if (index !== -1) {
              state.cardList.splice(index, 1, updatedCard); // Replace the card with the updated one
            }
          },
          GET_CARDS(state , response){
            state.cardList = response
          }
    },
    actions:{
        addCard({commit}, formdata){
        commit('SET_CARD', formdata)
        },
        updateCard({ commit }, updatedCard) {
            commit('UPDATE_CARD', updatedCard); // Commit the mutation
        },
        getCardList({commit, state}){
            commit("GET_CARDS", state.cardList)
        }
        
    }
})

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
});