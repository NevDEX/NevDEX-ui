<template>
  <nav class="flex justify-between items-center px-4 absolute z-40 h-12">
    <div class="w-12" style="">
      <img src="../assets/logo.png" />
    </div>
    <span class="ml-3 self-center text-2xl font-semibold whitespace-nowrap text-gray-50 cursor-pointer" @click="$router.push('/')">NevDEX</span>
    <ul class="ml-10 flex flex-col md:flex-row md:space-x-8 md:mt-0 font-bold">
      <li>
        <router-link to="/trade"><a class="block py-2 pr-4 pl-3 text-gray-50 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Trade</a></router-link>
      </li>
      <li>
        <a class="block py-2 pr-4 pl-3 text-gray-50 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Farm</a>
      </li>
      <li>
        <a class="block py-2 pr-4 pl-3 text-gray-50 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">NFT</a>
      </li>
      <li>
        <router-link to="/faucet"><a class="block py-2 pr-4 pl-3 text-gray-50 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Faucet</a></router-link>
      </li>
    </ul>
  </nav>
  <ConnectWallet class="absolute right-0 top-3" />
</template>

<script>
import UseWallet from '../wallet'
const { connect, web3, walletGlobal } = UseWallet()
import ConnectWallet from './ConnectWallet.vue'
export default {
  data() {
    return {
      btnTxt: 'Connect Wallet',
      isVisible: false,
    }
  },
  components: {
    ConnectWallet,
  },
  created() {},
  methods: {
    async onConnectWallet() {
      await connect()
      this.btnTxt = walletGlobal.account
    },
    tab(index) {
      this.num = index
    },
  },
}
</script>
