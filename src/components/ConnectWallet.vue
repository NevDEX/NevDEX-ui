<template>
  <div class="flex justify-items-center items-center">
    <router-link to="" @click="onClick" v-if="showBtn">
      <span class="px-4 py-1 rounded mr-4 text-gray-50 hover:text-white hover:bg-gray-500 font-bold">{{ formatAddress(account) }}</span>
    </router-link>
    <WalletModal :showWallet="showConnect" @close="showConnect = false" />
    <WalletDisconnectModal :show="showDisconnect" @close="showDisconnect = false" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import WalletModal from './WalletModal.vue'
import WalletDisconnectModal from './WalletDisconnectModal.vue'

export default {
  name: 'ConnectWallet',
  data() {
    return {
      showBtn: true,
      btnTxt: 'Connect Wallet',
      showConnect: false,
      showDisconnect: false,
    }
  },
  components: {
    WalletModal,
    WalletDisconnectModal,
  },
  computed: {
    ...mapGetters(['isConnected', 'account']),
  },
  created() {},
  watch: {
    $route(to, from) {
      this.showBtn = true
      if (to.fullPath === '/') {
        this.showBtn = false
      }
    },
  },
  methods: {
    onClick() {
      if (this.account == 'Connect Wallet') {
        this.showConnect = true
      } else {
        this.showDisconnect = true
      }
    },
    formatAddress(address) {
      if (address.includes('Connect')) {
        return address
      }
      return `${address.substring(0, 5)}...${address.substring(address.length - 5)}`
    },
    disConnect() {},
  },
}
</script>
<style scoped></style>
