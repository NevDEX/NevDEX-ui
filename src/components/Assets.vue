<template>
  <div v-if="account !== 'Connect Wallet'">
    <div class="md:mt-20 mt-10">
      <h2 class="text-center">
        <span class="bg-gray-900 text-gray-400 font-semibold"> Balance </span>
      </h2>
      <div class="flex mt-5 text-gray-400 justify-between">
        <span class="text-gray-400 text-xs flex items-center">
          {{ baseToken }}
        </span>
        <div class="text-gray-400 text-xs flex flex-row items-center">
          {{ baseAmount }}
          <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
      <div class="mt-2 flex justify-end">
        <div class="button">
          <button class="py-1 px-3 border-gray-600 border text-white text-xs" @click="depositBase">Deposit</button>
        </div>

        <div class="button ml-5">
          <button class="py-1 px-3 border-gray-600 border text-white text-xs" @click="withdrawBase">Withdraw</button>
        </div>
      </div>
    </div>

    <div class="token">
      <div class="flex mt-5 text-gray-400 justify-between">
        <span class="text-gray-400 text-xs">
          {{ quoteToken }}
        </span>
        <div class="text-gray-400 text-xs flex flex-row items-center">
          {{ quoteAmount }}
          <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
      <div class="mt-2 flex justify-end">
        <div class="button">
          <button class="py-1 px-3 bg-transparent border-gray-600 border text-white text-xs" @click="depositQuote">Deposit</button>
        </div>
        <div class="button ml-5">
          <button class="py-1 px-3 border-gray-600 border text-white text-xs" @click="withdrawQuote">Withdraw</button>
        </div>
      </div>
    </div>
    <Deposit v-if="showDeposit" @close="showDeposit = false" :depositToken="depositToken" />
    <Withdraw v-if="showWithdraw" @close="showWithdraw = false" :withdrawToken="withdrawToken" />
  </div>
  <div v-else class="text-gray-50 bg-gray-900 text-center py-3 flex flex-col mt-10 justify-center items-center">
    <div class="mb-1 h-6 w-6 text-th-primary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
    </div>
    Connect Wallet
    <div>
      <button class="bg-gray-800 px-20 py-2 mt-3 hover:bg-gray-600" @click="onConnectWallet">Connect</button>
    </div>
  </div>
  <WalletModal v-if="showModal" @close="showModal = false" />
</template>

<script>
import Deposit from './modal/Deposit.vue'
import Withdraw from './modal/Withdraw.vue'
import UseWallet from '../wallet'
import WalletModal from './WalletModal.vue'
import { getTokenAddress, formatNumber } from '../utils/token'
import { getVaultBalance } from '../contract'
const { walletGlobal } = UseWallet()
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    Deposit,
    Withdraw,
    WalletModal,
  },
  data() {
    return {
      showDeposit: false,
      depositToken: '',
      showWithdraw: false,
      withdrawToken: '',
      baseAmount: null,
      quoteAmount: null,
      baseToken: '',
      quoteToken: '',
      isConnected: false,
      showModal: false,
    }
  },
  computed: {
    ...mapGetters(['market', 'account']),
  },
  watch: {
    market: async function (newVal, oldVal) {
      let arr = newVal.split('-')
      this.baseToken = arr[0]
      this.quoteToken = arr[1]
      let tokenAddress = getTokenAddress(this.baseToken)
      let balance = formatNumber(await getVaultBalance(tokenAddress, walletGlobal.account), 4)
      // console.log(` ==> base:${tokenAddress}, balance:${balance}`)
      this.baseAmount = balance
      {
        let tokenAddress = getTokenAddress(this.quoteToken)
        let balance = formatNumber(await getVaultBalance(tokenAddress, walletGlobal.account), 4)
        // console.log(` ==> quote:${tokenAddress}, balance:${balance}`)
        this.quoteAmount = balance
      }
    },
    account: async function (newVal, oldVal) {
      this.isConnected = true
      let arr = this.market.split('-')
      this.baseToken = arr[0]
      this.quoteToken = arr[1]
      let tokenAddress = getTokenAddress(this.baseToken)
      let balance = formatNumber(await getVaultBalance(tokenAddress, walletGlobal.account), 4)
      this.baseAmount = balance
      {
        let tokenAddress = getTokenAddress(this.quoteToken)
        let balance = formatNumber(await getVaultBalance(tokenAddress, walletGlobal.account), 4)
        this.quoteAmount = balance
      }
    },
  },
  methods: {
    depositQuote() {
      this.depositToken = this.quoteToken
      this.showDeposit = true
    },
    depositBase() {
      this.depositToken = this.baseToken
      this.showDeposit = true
    },
    withdrawQuote() {
      this.withdrawToken = this.quoteToken
      this.showWithdraw = true
    },
    withdrawBase() {
      this.withdrawToken = this.baseToken
      this.showWithdraw = true
    },
    onConnectWallet() {
      this.showModal = true
    },
  },
  mounted() {},
}
</script>

<style scoped>
h2 {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid rgb(75 85 99);
  line-height: 0.1em;
  margin: 10px 0 20px;
  font: bold;
  font-size: 15px;
}

h2 span {
  padding: 0 10px;
}
</style>
