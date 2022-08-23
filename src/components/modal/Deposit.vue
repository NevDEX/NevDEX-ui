<template>
  <div tabindex="-1" aria-hidden="false" class="overflow-x-hidden overflow-y-auto inset-0 fixed z-50 h-modal justify-center items-center pt-40">
    <div class="relative w-auto my-6 mx-auto max-w-sm">
      <div class="relative rounded-lg shadow bg-gray-800">
        <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="crypto-modal" @click="onClose">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>

        <div class="py-4 px-6 rounded-t border-b border-gray-600">
          <h3 class="text-base font-semibold text-gray-200 lg:text-xl">Deposit</h3>
        </div>

        <div class="pt-4 pb-6 px-6">
          <div class="text-white">Wallet Asset</div>
          <dropdown class="my-dropdown-toggle" :options="tokens" :selected="selectedToken" v-on:updateOption="onDropDownSelect" :placeholder="''" :closeOnOutsideClick="boolean"> </dropdown>
          <div class="text-white mb-7">Amount</div>

          <div class="relative flex items-center">
            <input ref="depositInput" type="text" placeholder="0" class="w-full absolute block -top-4.5 border sm:text-sm text-gray-50 border-gray-500 text-left bg-gray-800" v-model="selectedToken.maxBalance" />
            <span class="absolute -top-2.5 right-12 text-blue-400 text-sm" @click="onMax">Max</span>
            <span class="absolute -top-2.5 right-2 text-gray-400 text-sm">{{ selectedToken.name }}</span>
          </div>
        </div>

        <div class="flex flex-row justify-between">
          <div class="px-6 text-white text-xs">Wallet Balance</div>
          <div class="px-6 text-white text-xs">{{ selectedToken.balance }} {{ selectedToken.name }}</div>
        </div>

        <div class="mt-10 px-6 flex justify-center items-center pb-4">
          <button class="py-2 w-full bg-gray-500 hover:bg-gray-400 text-gray-50" @click="onDeposit">Deposit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dropdown from './DropDown.vue'
import { getTokenAddress } from '../../utils/token'
import { getBalance, onAttemptToApprove } from '../../contract'
import UseWallet from '../../wallet'
import { createToast } from 'mosha-vue-toastify'
import 'mosha-vue-toastify/dist/style.css'
import { mapGetters } from 'vuex'
const { walletGlobal } = UseWallet()

export default {
  data() {
    return {
      tokens: [
        {
          name: 'BTC',
          id: 0,
        },
        {
          name: 'BNB',
          id: 1,
        },
        {
          name: 'CKB',
          id: 2,
        },
        {
          name: 'USDT',
          id: 2,
        },
      ],
      selectedToken: {
        name: 'BTC',
        balance: '',
        maxBalance: '',
      },
    }
  },
  components: {
    dropdown: dropdown,
  },
  computed: {
    ...mapGetters(['isConnected', 'account']),
  },
  props: ['depositToken'],
  created() {
    this.selectedToken.name = this.depositToken
  },
  methods: {
    async onDropDownSelect(object) {
      this.selectedToken.name = object.name
      let tokenAddress = getTokenAddress(this.selectedToken.name)
      let balance = await getBalance(tokenAddress, this.account)
      this.selectedToken.balance = balance
      this.selectedToken.maxBalance = ''
    },
    onClose() {
      this.$emit('close')
    },
    async onDeposit() {
      // createToast(
      //   { title: 'insufficient!', description: 'insufficient of token' },
      //   {
      //     type: 'danger',
      //     showIcon: true,
      //     position: 'top-center',
      //     timeout: 8000,
      //   }
      // )
      let tokenAddress = getTokenAddress(this.selectedToken.name)
      console.log('onDeposit tokenAddress:', tokenAddress, 'token:', this.selectedToken.name, 'amount:', this.$refs.depositInput.value)
      // await approve(tokenAddress, this.$refs.depositInput.value, walletGlobal.account)
      // await deposit(tokenAddress, this.$refs.depositInput.value, walletGlobal.account)

      let deadline = 2656860541
      await onAttemptToApprove(this.$refs.depositInput.value, tokenAddress, deadline, walletGlobal.account)
    },
    async onMax() {
      this.selectedToken.maxBalance = this.selectedToken.balance
    },
  },
}
</script>

<style scoped>
.my-dropdown-toggle {
  
}
</style>
