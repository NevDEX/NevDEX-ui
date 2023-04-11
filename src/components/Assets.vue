<template>
  <div v-if="account !== 'Connect Wallet'">
    <div class="md:mt-10 mt-10">
      <h2 class="text-center">
        <span class="bg-gray-900 text-gray-400 font-semibold"> Balance </span>
      </h2>

      <div class="flex text-white w-full text-xs">
        <span class="w-1/3">Asset</span>
        <span class="w-1/3 text-center">Wallet</span>
        <span class="w-1/3 text-right">Account</span>
      </div>
      <div class="flex w-full text-xs text-gray-400 mt-2">
        <span class="w-1/3"> {{ baseToken }}</span>
        <span class="w-1/3 text-center">{{ baseAmountWallet }}</span>
        <span class="w-1/3 text-right"> {{ baseAmount }}</span>
      </div>
      <div class="flex w-full text-xs text-gray-400 mt-2">
        <span class="w-1/3"> {{ quoteToken }}</span>
        <span class="w-1/3 text-center">{{ quoteAmountWallet }}</span>
        <span class="w-1/3 text-right"> {{ quoteAmount }}</span>
      </div>
    </div>

    <div class="mt-[40px] flex justify-between w-full space-x-3">
      <div class="button w-1/2">
        <button class="py-1 bg-transparent border-gray-600 border text-white text-sm w-full" @click="depositQuote">Deposit</button>
      </div>
      <div class="button w-1/2">
        <button class="py-1 border-gray-600 border text-white text-sm w-full" @click="withdrawQuote">Withdraw</button>
      </div>
    </div>

    <DialogDeposit :isOpen="showDeposit" @close="showDeposit = false" :depositToken="depositToken" ref="deposit" />
    <DialogWithdraw :isOpen="showWithdraw" @close="showWithdraw = false" :withdrawToken="withdrawToken" ref="withdraw" />
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
  <WalletModal :showWallet="showModal" @close="showModal = false" />
</template>

<script>
import WalletModal from './WalletModal.vue'
import { getTokenAddress } from '../utils/token'
import { getBalance, getVaultBalance } from '../contract/contract'
import { mapActions, mapGetters } from 'vuex'
import { lockedBalance } from '../api/api.js'
import DialogDeposit from './modal/DialogDeposit.vue'
import DialogWithdraw from './modal/DialogWithdraw.vue'

export default {
  components: {
    WalletModal,
    DialogDeposit,
    DialogWithdraw,
  },
  data() {
    return {
      showDeposit: false,
      depositToken: '',
      showWithdraw: false,
      withdrawToken: '',
      baseAmount: null,
      quoteAmount: null,
      baseAmountWallet: null,
      quoteAmountWallet: null,
      baseToken: '',
      quoteToken: '',
      isConnected: false,
      showModal: false,
      isOpen: false,
      refreshCls: 'ml-2 h-5 w-5 cursor-pointer',
      refreshCls1: 'ml-2 h-5 w-5 cursor-pointer',
    }
  },
  computed: {
    ...mapGetters(['market', 'account', 'balance']),
  },
  watch: {
    market: async function (newVal, oldVal) {
      let arr = newVal.split('-')
      this.baseToken = arr[0]
      this.quoteToken = arr[1]
      let tokenAddress = getTokenAddress(this.baseToken)
      this.baseAmount = this.$format(await getVaultBalance(tokenAddress, this.account), 4)
      this.baseAmountWallet = this.$format(await getBalance(tokenAddress, this.account), 4)
      {
        let tokenAddress = getTokenAddress(this.quoteToken)
        this.quoteAmount = this.$format(await getVaultBalance(tokenAddress, this.account), 4)
        this.quoteAmountWallet = this.$format(await getBalance(tokenAddress, this.account), 4)
      }

      await lockedBalance({
        marketID: newVal,
        address: this.account,
      })
    },
    account: async function (newVal, oldVal) {
      this.isConnected = true
      let arr = this.market.split('-')
      this.baseToken = arr[0]
      this.quoteToken = arr[1]
      let tokenAddress = getTokenAddress(this.baseToken)
      this.baseAmount = this.$format(await getVaultBalance(tokenAddress, this.account), 4)
      this.baseAmountWallet = this.$format(await getBalance(tokenAddress, this.account), 4)
      {
        let tokenAddress = getTokenAddress(this.quoteToken)
        this.quoteAmount = this.$format(await getVaultBalance(tokenAddress, this.account), 4)
        this.quoteAmountWallet = this.$format(await getBalance(tokenAddress, this.account), 4)
      }
    },
    balance: async function (newVal, oldVal) {
      let { address, wallet, account } = newVal
      if (address == getTokenAddress(this.baseToken)) {
        this.baseAmountWallet = this.$format(wallet, 4)
        this.baseAmount = this.$format(account, 4)
      } else {
        this.quoteAmountWallet = this.$format(wallet, 4)
        this.quoteAmount = this.$format(account, 4)
      }
    },
  },
  methods: {
    ...mapActions(['fetchBalance']),
    depositQuote() {
      // console.log('depositQuote', this.quoteToken)
      this.depositToken = this.quoteToken
      this.showDeposit = true
    },
    depositBase() {
      // console.log('depositBase', this.baseToken)
      this.depositToken = this.baseToken
      this.showDeposit = true
      this.$refs.deposit.selectedToken.name = this.baseToken
    },
    withdrawQuote() {
      this.withdrawToken = this.quoteToken
      this.showWithdraw = true
    },
    withdrawBase() {
      this.withdrawToken = this.baseToken
      this.showWithdraw = true
      this.$refs.withdraw.selectedToken.name = this.baseToken
    },
    onConnectWallet() {
      this.showModal = true
    },
    async onRefreshBaseAmount() {
      this.baseAmount = this.$format(await getVaultBalance(getTokenAddress(this.baseToken), this.account), 4)
    },
    async onRefreshQuoteAmount() {
      this.quoteAmount = this.$format(await getVaultBalance(getTokenAddress(this.quoteToken), this.account), 4)
    },
    async tick() {
      await this.fetchBalance(this.account)
      await this.onRefreshBaseAmount()
      await this.onRefreshQuoteAmount()
    },
  },
  mounted() {
    this.timer = setInterval(this.tick, 2000)
  },
  beforeUnmount() {
    clearTimeout(this.timer)
  },
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
