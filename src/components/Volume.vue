<template>
  <div class="mt-0.5 h-12 bg-gray-900">
    <div class="flex flex-row p-1 items-center px-3">
      <div class="w-2/3 flex flex-row">
        <div class="flex flex-col text-white">
          <span class="text-gray-400 text-xs">Low Price</span> <span class="mt-1 text-xs">{{ low24h }}</span>
        </div>
        <div class="flex flex-col text-white ml-10">
          <span class="text-gray-400 text-xs">High Price</span><span class="mt-1 text-xs">{{ high24h }}</span>
        </div>
        <div class="flex flex-col text-white ml-10">
          <span class="text-gray-400 text-xs">24h Price Change</span><span class="mt-1 text-xs text-red-400" v-bind:class="{ 'text-green-400': price_change_percentage_24h > 0 }"> {{ price_change_percentage_24h }}%</span>
        </div>
        <div class="flex flex-col text-white ml-10">
          <span class="text-gray-400 text-xs">24h Volume ({{ baseToken }})</span><span class="mt-1 text-xs">{{ volume }}</span>
        </div>
      </div>
      <div class="w-1/3"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { getTokenCfg, formatNumber } from '../utils/token'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      high24h: 0,
      low24h: 0,
      currentPrice: 0,
      volume: 0,
      symbol: '',
      price_change_24h: 0,
      price_change_percentage_24h: 0,
      baseToken: '',
    }
  },
  computed: {
    ...mapGetters(['market']),
  },
  watch: {
    market: async function (newVal, oldVal) {
      let baseToken = newVal.split('-')[0]
      this.baseToken = baseToken
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${getTokenCfg(baseToken).id}`)
        let { data } = response
        console.log('volume==>', data)
        this.high24h = formatNumber(data[0].high_24h, 4)
        this.low24h = formatNumber(data[0].low_24h, 4)
        this.currentPrice = formatNumber(data[0].current_price, 4)
        this.price_change_24h = formatNumber(data[0].price_change_24h, 4)
        this.price_change_percentage_24h = formatNumber(data[0].price_change_percentage_24h, 4)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
