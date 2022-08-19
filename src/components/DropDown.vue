<template>
  <div class="w-full">
    <div class="relative inline-flex align-middle w-full">
      <button class="text-gray-50 bg-gray-900 outline-none border-none shadow hover:shadow-lg ease-linear transition-all duration-150 font-normal px-6 py-3 capitalize w-full" type="button" v-on:click="toggleDropdown()" ref="btnDropdownRef">
        <div class="flex flex-row h-6 justify-center">
          <img class="px-2" :src="tokenLogoURI" alt="" />
          <span class="ml-1"> {{ market }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="default-transition h-6 w-6 rotate-360 transform ml-4"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </div>
      </button>
      <div v-bind:class="{ hidden: !dropdownPopoverShow, block: dropdownPopoverShow }" class="bg-gray-800 text-base z-50 float-left list-none text-left shadow-lg min-w-full" ref="popoverDropdownRef">
        <div v-for="item in marketList" :key="item.id" href="#" class="flex flex-row justify-center items-center py-3 hover:bg-gray-700" @click="selectMarket(item.market)">
          <img class="h-6" :src="getTokenLogo(item.market)" alt="" />
          <a href="#" class="ml-4 text-gray-50" @click="selectMarket(item.market)"> {{ item.market }} </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core'
import marketList from '../config/market_list.json'
import { mapActions, mapGetters } from 'vuex'
import { getTokenCfg } from '../utils/token'
export default {
  name: 'dropdown',
  data() {
    return {
      dropdownPopoverShow: false,
      market: 'BTC-USDT',
      marketList: null,
      tokenLogoURI: '',
    }
  },
  mounted() {
    this.$emit('selectMarket', this.market)
    this.marketList = marketList
    // console.log('marketList', marketList)
    this.updateMarket(this.market)
    this.tokenLogoURI = getTokenCfg(this.market.split('-')[0]).logoURI
  },
  methods: {
    ...mapActions(['updateMarket']),
    selectMarket(market) {
      this.dropdownPopoverShow = false
      this.market = market
      // console.log('selectMarket', market)
      this.updateMarket(market)
      this.tokenLogoURI = getTokenCfg(market.split('-')[0]).logoURI
    },
    getTokenLogo(market) {
      return getTokenCfg(market.split('-')[0]).logoURI
    },
    toggleDropdown: function () {
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false
      } else {
        this.dropdownPopoverShow = true
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: 'bottom-start',
        })
      }
    },
  },
  beforeUnmount() {
    this.updateMarket('')
  },
}
</script>
