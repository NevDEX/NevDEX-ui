<template>
  <div class="flex justify-items-center items-center">
    <router-link to="" @click="onConnectWallet" v-if="showBtn">
      <span class="px-4 py-1 rounded mr-4 text-gray-50 hover:text-white hover:bg-gray-500 font-bold">{{ formatAddress(account) }}</span>
    </router-link>
    <WalletModal v-if="showModal" @close="showModal = false" />
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
      this.showBtn = false
      if (to.fullPath === '/trade') {
        this.showBtn = true
      }
    },
  },
  methods: {
    onConnectWallet() {
      this.showModal = true
    },
    // async connectWallet() {
    //   window.ethereum.request({
    //     method: 'wallet_addEthereumChain',
    //     params: [
    //       {
    //         chainId: '0xa869',
    //         chainName: 'AVAX Fuji Testnet',
    //         rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    //         iconUrls: [''],
    //         blockExplorerUrls: ['https://testnet.snowtrace.io'],
    //         nativeCurrency: {
    //           name: 'AAVX',
    //           symbol: 'AAVX',
    //           decimals: 18,
    //         },
    //       },
    //     ],
    //   })
    // },
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
