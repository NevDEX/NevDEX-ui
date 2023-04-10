<template>
  <div class="flex flex-col bg-gray-900 px-3 py-1 h-[80vh] 2xl:h-[86vh] w-full">
    <div class="flex justify-between">
      <span v-bind:class="[option === 'orderbook' ? activeClass : inActiveClass]" @click="onOrderbook"> Order Book</span>
      <span v-bind:class="[option === 'trades' ? activeClass : inActiveClass]" @click="onMarketTrades"> Market Trades</span>
    </div>
    <div v-if="option === 'orderbook'" class="overflow-auto" style="">
      <table class="table-auto w-full">
        <thead class="bg-gray-900">
          <tr class="text-right">
            <th scope="col" class="text-left py-2 text-xs font-medium tracking-wider text-gray-400 uppercase">Size({{ baseToken }})</th>
            <th scope="col" class="py-2 text-xs font-medium tracking-wider text-gray-400 uppercase">Price({{ quoteToken }})</th>
          </tr>
        </thead>
      </table>

      <div v-for="(ask, index) in askToDisplay" :key="index" @click="onAskClick(ask)" class="w-full mt-0.5 h-[18px] relative bg-red-600 text-white flex text-left text-xs items-center">
        <OrderRow :row="ask" :color="red" :ref="`row${index}`" />
      </div>
      <div class="mt-2 mb-2 text-[#61F3AE] text-center text-xs" v-if="spread > 0">
        {{ spread }}
      </div>
      <div v-for="bid in bidToDisplay" :key="bid.price" @click="onBidClick(bid)" class="w-full mt-0.5 relative bg-green-500 text-white h-[18px] flex text-left text-xs items-center">
        <OrderRow :row="bid" :color="green" :ref="`row${index}`" />
      </div>
    </div>
    <div v-else style="" class="overflow-y-auto h-full w-full">
      <MarketHistory :baseToken="orderbookMarket.split('-')[0]" :quoteToken="orderbookMarket.split('-')[1]" />
    </div>
  </div>
</template>

<script>
import { orderbook } from '../api/api.js'
import MarketHistory from './MarketHistory.vue'
import OrderRow from './OrderRow.vue'
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
  components: { MarketHistory, OrderRow },
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
          let before = JSON.parse(JSON.stringify(this.askToDisplay))
          // console.log('before', before)
          let askToDisplay = this.getCumulativeOrderbookSide(asks, totalSize, true)
          this.askToDisplay = askToDisplay
          this.spread = this.$format(askToDisplay[askToDisplay.length - 1]?.price - bidToDisplay[0]?.price, 4)

          if (JSON.stringify(before) != JSON.stringify(this.askToDisplay)) {
            let cnt = askToDisplay.length > before.length ? askToDisplay.length : before.length
            for (let i = 0; i < cnt; i++) {
              if (before[i].size != this.askToDisplay[i].size) {
                // console.log('orderRow update', i, JSON.stringify(before[i]), JSON.stringify(this.askToDisplay[i]))
                this.$refs[`row${i}`][0].update()
              }
            }
          }
          // console.log('after', this.askToDisplay)
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
::-webkit-scrollbar {
  width: 6px;
  height: 1px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset000pxrgba(240, 240, 240, 0.5);
  background-color: rgba(240, 240, 240, 0.5);
  background-color: transparent;
}
</style>
