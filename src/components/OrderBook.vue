<template>
  <div class="flex flex-col bg-gray-900 px-3 py-1 h-full">
    <div class="flex justify-between">
      <span v-bind:class="[option === 'orderbook' ? activeClass : inActiveClass]" @click="onOrderbook"> Order Book</span>
      <span v-bind:class="[option === 'trades' ? activeClass : inActiveClass]" @click="onMarketTrades"> Market Trades</span>
    </div>
    <div v-if="option === 'orderbook'">
      <table class="table-auto w-full">
        <thead class="bg-gray-900">
          <tr class="text-right">
            <th scope="col" class="text-left py-2 text-xs font-medium tracking-wider text-gray-400 uppercase">Size({{ baseToken }})</th>
            <th scope="col" class="py-2 text-xs font-medium tracking-wider text-gray-400 uppercase">Price({{ quoteToken }})</th>
          </tr>
        </thead>
      </table>
      <div v-for="ask in askToDisplay" :key="ask.price" @click="onAskClick(ask)" class="w-full mt-0.5 relative bg-red-500 text-white h-5 flex text-left text-xs items-center">
        <span class="ml-0 bg-gray-900 h-5 text-white text-left text-xs items-center flex" :style="{ width: 100 - ask.sizePercent + '%' }">{{ ask.size }}</span>
        <span class="absolute right-0.5">{{ ask.price }}</span>
      </div>
      <div class="mt-2 mb-2 text-green-400 text-center text-xs" v-if="spread > 0">
        {{ spread }}
      </div>
      <div v-for="bid in bidToDisplay" :key="bid.price" @click="onAskClick(ask)" class="w-full mt-0.5 relative bg-green-500 text-white h-5 flex text-left text-xs items-center">
        <span class="ml-0 bg-gray-900 h-5 text-white text-left text-xs items-center flex" :style="{ width: 100 - bid.sizePercent + '%' }">{{ bid.size }}</span>
        <span class="absolute right-0.5">{{ bid.price }}</span>
      </div>
    </div>
    <div v-else>
      <MarketHistory :baseToken="orderbookMarket.split('-')[0]" :quoteToken="orderbookMarket.split('-')[1]" />
    </div>
  </div>
</template>

<script>
import { orderbook } from '../api/api.js'
import { formatNumber } from '../utils/token.js'
import MarketHistory from './MarketHistory.vue'
export default {
  data() {
    return {
      isVisible: false,
      bidToDisplay: [],
      askToDisplay: [],
      spread: 0,
      depth: 100,
      orderbookMarket: '',
      option: 'orderbook',
      selected: '',
      activeClass: 'text-gray-50',
      inActiveClass: 'text-gray-600',
    }
  },
  props: ['baseToken', 'quoteToken', 'market'],
  components: { MarketHistory },
  watch: {
    market: function (newVal, oldVal) {
      this.bidToDisplay = []
      this.askToDisplay = []
      this.spread = 0
      this.orderbookMarket = newVal
      console.log(`order book market change previous: ${oldVal}, now:${newVal}`)
    },
  },
  methods: {
    format(num) {
      return formatNumber(num)
    },
    tab(index) {
      this.num = index
    },
    onBidClick(bid) {
      this.$emit('updateBid', bid)
    },
    onAskClick(ask) {
      this.$emit('updateAsk', ask)
    },
    tick() {
      orderbook({
        marketID: this.orderbookMarket,
      })
        .then((ret) => {
          let asks = []
          ret.asks?.map((item) => asks.push({ size: Number(item[1]), price: Number(item[0]).toFixed(4) }))
          let bids = []
          ret.bids?.map((item) => bids.push({ size: Number(item[1]), price: Number(item[0]).toFixed(4) }))
          let mySum = (total, { _, size }, index) => (index < this.depth ? total + size : total)
          let totalSize = bids.reduce(mySum, 0) + asks.reduce(mySum, 0)
          let bidToDisplay = this.getCumulativeOrderbookSide(bids, totalSize, false)
          this.bidToDisplay = bidToDisplay
          let askToDisplay = this.getCumulativeOrderbookSide(asks, totalSize, true)
          this.askToDisplay = askToDisplay
          this.spread = formatNumber(askToDisplay[askToDisplay.length - 1]?.price - bidToDisplay[0]?.price, 4)
        })
        .catch((e) => console.error(e))
    },
    getCumulativeOrderbookSide(orders, totalSize, backwards) {
      let cumulative = orders.slice(0, this.depth).reduce((cumulative, { price, size }, i) => {
        const cumulativeSize = (cumulative[i - 1]?.cumulativeSize || 0) + size
        cumulative.push({
          price,
          size,
          cumulativeSize,
          sizePercent: Math.round((cumulativeSize / (totalSize || 1)) * 100),
        })
        return cumulative
      }, [])
      if (backwards) {
        cumulative = cumulative.reverse()
      }
      return cumulative
    },
    onOrderbook() {
      this.option = 'orderbook'
    },
    onMarketTrades() {
      this.option = 'trades'
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
.background {
  width: 100%;

  background-color: gray;
  z-index: 2;
}

.content {
  position: relative;
  z-index: 1;
  right: 0%;
  width: 100%;
  background-color: red;
  text-align: center;
  font-weight: bold;
  font-family: Arial, sans-serif;
}
</style>
