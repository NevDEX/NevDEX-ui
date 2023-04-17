<template>
  <nav class="flex justify-between bg-transparent z-10">
    <div class="flex ml-5">
      <div class="w-12" style="">
        <img src="../assets/logo.png" />
      </div>
      <div class="ml-10 hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
        <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 font-bold">
          <li v-for="(item, index) in navItems" :key="index">
            <router-link v-if="item.link !== ''" :to="item.link">
              <a class="block py-2 pr-4 pl-3 text-gray-50 hover:bg-gray-50 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 border-b-2 border-transparent"
                v-bind:class="{ ['border-blue-600 border-b-2']: index === selected }" @click="selected = index">{{
                  item.label }}</a>
            </router-link>
            <VTooltip v-if="item.link === ''">
              <a class="text-gray-50 border-gray-100 cursor-pointer">{{ item.label }}</a>
              <template #popper>Coming soon ! </template>
            </VTooltip>
          </li>
        </ul>
      </div>
      <span
        class="hidden md:block ml-3 self-center text-2xl font-semibold whitespace-nowrap text-gray-50 cursor-pointer   text-transparent   bg-clip-text bg-gradient-to-r from-blue-400 to-blue-900"
        @click="$router.push('/'); selected = -1">NevDEX</span>
    </div>
    <div class="flex flex-row space-x-2">
      <SwitchNetwork />
      <ConnectWallet />
    </div>
    <div class="md:hidden flex items-center pr-3">
      <button class="outline-none mobile-menu-button" @click="toggleMenu">
        <svg class="w-6 h-6" :class="{ 'text-blue-500': menuVisible, 'text-gray-500': !menuVisible }" x-show="!showMenu"
          fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
          stroke="currentColor">
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
  </nav>
  <div v-if="menuVisible" id="mobile-menu"
    class="origin-top-right right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
    role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
    <ul>
      <li v-for="item in navItems" :key="item.label">
        <router-link :to="item.link">
          <a class="block px-4 py-2 text-md font-bold text-gray-200 hover:bg-gray-700 hover:text-white" role="menuitem"
            tabindex="-1" id="user-menu-item-0">{{ item.label }}</a>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import ConnectWallet from './ConnectWallet.vue'
import SwitchNetwork from './SwitchNetwork.vue'
export default {
  data() {
    return {
      isVisible: false,
      menuVisible: false,
      navItems: [
        { label: 'Trade', link: '/trade' },
        { label: 'Farm', link: '/farm' },
        { label: 'NFT', link: '/nft' },
        { label: 'Asset', link: '/asset' },
        { label: 'Faucet', link: '/faucet' },
      ],
      selected: '',
    }
  },
  components: {
    ConnectWallet, SwitchNetwork,
  },
  created() { },
  methods: {
    tab(index) {
      this.num = index
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible
    },
  },
  watch: {
    $route(to, _) {
      if (to.fullPath === '/trade') {
        this.selected = 0
      }
    },
  },
}
</script>

<style scoped>
#mobile-menu {
  top: 49px;
  z-index: 1;
  width: 100%;
}
</style>
