<template>
  <div class="flex justify-items-center items-center">
    <router-link to="" @click="onConnectWallet" v-if="showBtn">
      <span class="px-4 py-1 mr-4 text-gray-50 bg-gradient-to-r from-blue-500 font-bold">{{ formatAddress(account) }}</span>
    </router-link>
    <WalletModal :showWallet="showModal" @close="showModal = false" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import WalletModal from './WalletModal.vue'
export default {
  name: 'ConnectWallet',
  data() {
    return {
      showBtn: true,
      btnTxt: 'Connect Wallet',
      showModal: false,
    }
  },
  components: {
    WalletModal,
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
    onConnectWallet() {
      this.showModal = true
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
