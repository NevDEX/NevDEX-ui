<template>
  <div class="bg-gray-900 w-screen flex flex-col h-full">
    <div>
      <h1 class="bg-[#008000] pt-5 font-bold text-2xl text-white text-center bg-transparent">NevDEX Authenticated Faucet</h1>
    </div>
    <div class="mt-5 bg-gray-900 mx-auto flex-1 h-full">
      <div class="">
        <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500">
          <li class="mr-1">
            <a href="#" class="w-20 inline-block p-4 hover:text-gray-50" v-bind:class="{ 'text-gray-200': tab === 'USDT' }" @click="onTab('USDT')">USDT</a>
          </li>
          <li class="mr-1">
            <a href="#" class="w-20 inline-block p-4 hover:text-gray-50" v-bind:class="{ 'text-gray-200': tab === 'BTC' }" @click="onTab('BTC')">BTC</a>
          </li>
          <li class="mr-1">
            <a href="#" class="w-20 inline-block p-4 hover:text-gray-50" v-bind:class="{ 'text-gray-200': tab === 'BNB' }" @click="onTab('BNB')">BNB</a>
          </li>
          <li class="mr-1">
            <a href="#" class="w-20 inline-block p-4 hover:text-gray-50" v-bind:class="{ ' text-gray-200': tab === 'CKB' }" @click="onTab('CKB')">CKB</a>
          </li>
        </ul>
      </div>
      <div class="w-full">
        <div class="" style="width: 640px">
          <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
          <div class="relative">
            <input type="search" id="default-search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 focus:ring-blue-500" placeholder="Please paste your account address" required />
            <button class="text-white absolute right-2.5 bottom-2.5 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 bg-gray-800 hover:bg-gray-600 focus:ring-blue-800" @click="onFaucet">Give me Token</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mint } from '../contract'
import { getTokenCfg } from '../utils/token'
import UseWallet from '../wallet'
const { walletGlobal } = UseWallet()

export default {
  name: 'faucet',
  data() {
    return {
      tab: 'USDT',
    }
  },
  methods: {
    onTab(tab) {
      this.tab = tab
      console.log(tab)
    },
    async onFaucet() {
      let token = this.tab
      let tokenAddress = getTokenCfg(token).address
      await mint(tokenAddress, walletGlobal.account, '100')
    },
  },
}
</script>

<style scoped></style>
