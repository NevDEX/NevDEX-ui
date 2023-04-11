import axios from 'axios'
import { createStore } from 'vuex'
import { getBalance } from '../api/api.js'
import farm from "./farm";
import { getVaultBalance, getBalance as getDexBalance } from "../contract/contract"

export default createStore({
  state: {
    crypto: [],
    assetBalance: {},
    market: '',
    account: 'Connect Wallet',
    walletBalance: {
      base: 1,
      quote: 12
    },
    accountBalance: {
      base: 1,
      quote: 12,
    },
    marketVolume: '',
    balance: {
      "address": { "wallet": 0, "account": 1 }
    },
    orderType: '',
    signer: null,
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
    async fetchBalance({ commit }, account) {
      if (account === "Connect Wallet") {
        return
      }
      try {
        const resp = await getBalance({
          address: account
        })
        commit('setAssetBalance', resp)
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
    async updateAccountBalance({ commit }, payload) {
      commit('setAccountBalance', payload)
    },
    async updateMarketVolume({ commit }, payload) {
      commit('setMarketVolume', payload)
    },
    async updateBalance({ commit, state }, address) {
      let account = await getVaultBalance(address, state.account)
      let wallet = await getDexBalance(address, state.account)
      commit('setBalance', { "address": address, "wallet": wallet, "account": account })
    },
    async updateOrderType({ commit }, payload) {
      commit('setOrderType', payload)
    },
    async updateSinger({ commit }, payload) {
      commit('setSigner', payload)
    },
  },
  mutations: {
    setCrypto: (state, payload) => {
      state.crypto = payload
    },
    setAssetBalance: (state, payload) => {
      state.assetBalance = payload
    },
    setAccount: (state, payload) => {
      state.account = payload
    },
    setWalletBalance: (state, payload) => {
      state.walletBalance = payload
    },
    setAccountBalance: (state, payload) => {
      state.accountBalance = payload
    },
    setMarket: (state, payload) => {
      state.market = payload
    },
    setMarketVolume: (state, payload) => {
      state.marketVolume = payload
    },
    setBalance: (state, payload) => {
      state.balance = payload
    },
    setOrderType: (state, payload) => {
      state.orderType = payload
    },
    setSigner: (state, payload) => {
      state.signer = payload
    },
  },
  getters: {
    getCrypto: (state) => state.crypto,
    assetBalance: (state) => state.assetBalance,
    market: (state) => state.market,
    account: (state) => state.account,
    accountBalance: (state) => state.accountBalance,
    walletBalance: (state) => state.walletBalance,
    marketVolume: (state) => state.marketVolume,
    balance: (state) => state.balance,
    orderType: (state) => state.orderType,
    signer: (state) => state.signer,
  },
  modules: {
    farm,
  },
})
