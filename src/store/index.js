import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
  state: {
    crypto: [],
    market: '',
    account: 'Connect Wallet',
    walletBalance: {
      base: 1,
      quote: 12,
    },
    accountBalance: {
      base: 1,
      quote: 12,
    },
  },
  actions: {
    async fetchCrypto({ commit }) {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true')
        console.log(response)
        commit('setCrypto', response.data)
      } catch (error) {
        console.log(error)
      }
    },
    async updateMarket({ commit }, payload) {
      commit('setMarket', payload)
    },
    async updateAccount({ commit }, payload) {
      commit('setAccount', payload)
    },
    async updateWalletBalance({ commit }, payload) {
      commit('setWalletBalance', payload)
    },
    async updateAccountBalance({ commit }, payload) {
      commit('setAccountBalance', payload)
    },
  },
  mutations: {
    setCrypto: (state, payload) => {
      state.crypto = payload
    },
    setMarket: (state, payload) => {
      // console.log('setMarket', payload)
      state.market = payload
    },
    setAccount: (state, payload) => {
      // console.log('setAccount', payload)
      state.account = payload
    },
    setWalletBalance: (state, payload) => {
      // console.log('setWalletBalance', payload)
      state.walletBalance = payload
    },
    setAccountBalance: (state, payload) => {
      // console.log('setAccountBalance', payload)
      state.accountBalance = payload
    },
  },
  getters: {
    getCrypto: (state) => state.crypto,
    market: (state) => state.market,
    account: (state) => state.account,
    accountBalance: (state) => state.accountBalance,
    walletBalance: (state) => state.walletBalance,
  },
  modules: {},
})
