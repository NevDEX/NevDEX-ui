<template>
  <div class="flex flex-col w-full h-full">
    <TradeBar />
    <div class="flex md:gap-0 gap-12 h-full w-full">
      <div class="flex flex-col-reverse md:flex-row flex-1">
        <div class="md:w-1/5 2xl:w-1/6 w-full border-black border-r">
          <div class="flex flex-col px-0.5 h-full">
            <div class="bg-gray-900 h-full">
              <div class="p-2 bg-gray-900 h-full">
                <ul class="flex rounded-lg divide-gray-200 shadow sm:flex">
                  <li class="w-full">
                    <button
                      class="inline-block relative py-2 px-4 w-full text-sm font-medium text-center text-gray-50 bg-gray-800 hover:text-gray-700 hover:bg-gray-600 focus:bg-green-300"
                      @click="toggleSide('buy')" v-bind:class="{ 'bg-green-300': side === 'buy' }">BUY</button>
                  </li>
                  <li class="w-full">
                    <button
                      class="inline-block relative py-2 px-4 w-full text-sm font-medium text-center text-gray-50 bg-gray-800 hover:text-gray-700 hover:bg-gray-600 focus:bg-red-400"
                      @click="toggleSide('sell')" v-bind:class="{ 'bg-red-400': side === 'sell' }">SELL</button>
                  </li>
                </ul>

                <!-- order type -->
                <div class="pt-2 text-sm font-medium text-center text-gray-500 border-b border-gray-600">
                  <ul class="flex flex-wrap -mb-px">
                    <li class="mr-2">
                      <a href="javascript:void(0)"
                        class="inline-block p-2 rounded-t-lg border-b-2 border-transparent hover:text-gray-300 hover:border-blue-600"
                        @click="tabOrderType('market')"
                        v-bind:class="{ 'border-blue-600 text-gray-300': orderType === 'market' }">Market</a>
                    </li>
                    <li class="mr-2">
                      <a href="javascript:void(0)"
                        class="inline-block p-2 rounded-t-lg border-b-2 border-transparent hover:text-gray-300 hover:border-blue-600"
                        @click="tabOrderType('limit')"
                        v-bind:class="{ 'border-blue-600 text-gray-300': orderType === 'limit' }">Limit</a>
                    </li>
                  </ul>
                </div>
                <!-- order type -->

                <!-- market order tab  -->
                <div v-if="orderType === 'market'">
                  <div class="mt-3 flex items-center rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    <span class="w-3/12 text-gray-200 border border-gray-600 py-2 sm:text-sm rounded-l text-center"> Price
                    </span>
                    <div class="relative w-9/12 flex items-center">
                      <input type="text"
                        class="w-full absolute block pr-12 -top-4.5 border sm:text-sm text-gray-50 border-gray-500 text-center bg-gray-800"
                        disabled :placeholder="orderbookPrice" />
                      <div class="absolute -top-2.5 right-2 text-gray-400 text-sm">{{ quoteToken.name }}</div>
                    </div>
                  </div>

                  <div class="mt-3 flex items-center rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    <span v-if="side === 'buy'"
                      class="w-3/12 text-gray-200 border border-gray-600 py-2 sm:text-sm rounded-l text-center"> Total
                    </span>
                    <span v-else
                      class="w-3/12 text-gray-200 border border-gray-600 py-2 sm:text-sm rounded-l text-center"> Size
                    </span>
                    <div class="relative w-9/12 flex items-center">
                      <input type="number"
                        class="w-full absolute block pr-12 -top-4.5 border sm:text-sm text-gray-50 border-gray-500 text-center bg-gray-800"
                        step="0.001" :min="0" oninput="if(value<0)value=0" :value="total"
                        @input="onMarketAmountChange($event.target.value)" />
                      <div class="absolute -top-2.5 right-2 text-gray-400 text-sm">{{ side === 'buy' ? quoteToken.name :
                        baseToken.name }}</div>
                    </div>
                  </div>
                </div>
                <!-- market order tab  -->

                <!-- limit order tab  -->
                <div v-if="orderType === 'limit'">
                  <div class="mt-3 flex items-center rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    <span class="w-3/12 text-gray-200 border border-gray-600 py-2 sm:text-sm rounded-l text-center"> Price
                    </span>
                    <div class="relative w-9/12 flex items-center">
                      <input type="number"
                        class="w-full absolute block pr-12 -top-4.5 border sm:text-sm text-gray-50 border-gray-500 text-center bg-gray-800"
                        step="0.001" v-model="price" :min="0" oninput="if(value<0)value=0" />
                      <div class="absolute -top-2.5 right-2 text-gray-400 text-sm">{{ quoteToken.name }}</div>
                    </div>
                  </div>
                  <div class="mt-3 flex items-center rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                    <span class="w-3/12 text-gray-200 border border-gray-600 py-2 sm:text-sm rounded-l text-center"> Size
                    </span>
                    <div class="relative w-9/12 flex items-center">
                      <input type="number"
                        class="w-full absolute block pr-12 -top-4.5 border sm:text-sm text-gray-50 border-gray-500 text-center bg-gray-800"
                        step="0.001" :min="0" oninput="if(value<0)value=0" :value="total"
                        @input="onLimitAmountChange($event.target.value)" />
                      <div class="absolute -top-2.5 right-2 text-gray-400 text-sm">{{ baseToken.name }}</div>
                    </div>
                  </div>
                </div>
                <!-- limit order tab  -->

                <div class="flex justify-center mt-3 mb-2">
                  <RangeSlider @sliderPercentUpdate="updatePercent" />
                </div>
                <div class="mt-2 flex justify-center items-center">
                  <button class="py-2 w-full bg-gray-800 hover:bg-gray-600 text-gray-50" @click="onTrade">{{ opBtnTxt
                  }}</button>
                </div>
                <Assets />
              </div>
            </div>
          </div>
        </div>

        <div class="md:w-1/5 2xl:w-1/6 w-full border-black border-r h-full bg-gray-900">
          <OrderBook @updateBid="onBidUpdate" @updateAsk="onAskUpdate" :baseToken="baseToken.name"
            :quoteToken="quoteToken.name" :market="market" />
        </div>

        <div class="flex flex-col md:w-3/5 2xl:w-4/6 w-full h-full bg-gray-900">
          <TradingView :market="market" class="h-[50vh]" />
          <TradeTab :market="market" class="h-[28vh] 2xl:h-[32vh]" />
        </div>
      </div>
    </div>
    <TradeFooter />
  </div>
</template>

<script>
import TradingView from '../components/TradingView.vue'
import TradeTab from '../components/UserTrade.vue'
import RangeSlider from '../components/RangeSlider.vue'
import RangeSliderNew from '../components/RangeSliderNew.vue'
import OrderBook from '../components/OrderBook.vue'
import TradeFooter from '../components/footer/TradeFooter.vue'
import WalletModal from '../components/WalletModal.vue'
import Volume from '../components/Volume.vue'
import Assets from '../components/Assets.vue'
import TradeBar from '../components/TradeBar.vue'
import { buildOrder, placeOrder } from '../api/api.js'
import { ethers } from 'ethers'
import { mapActions, mapGetters } from 'vuex'
import { createToast } from 'mosha-vue-toastify'
import CreateOrderModal from '../components/CreateOrderModal.vue'
import { getTokenAddress } from '../utils/token'
import { getVaultBalance } from '../contract'
import { orderbookMarketPrice } from '../api/api.js'

export default {
  name: 'Trade',
  components: { TradingView, TradeTab, RangeSlider, OrderBook, TradeFooter, WalletModal, Volume, Assets, TradeBar, CreateOrderModal, RangeSliderNew },
  computed: {
    ...mapGetters(['market', 'account']),
  },
  data() {
    return {
      side: 'buy',
      pools: [],
      opBtnTxt: 'BUY',
      price: 0,
      amount: 0,
      orderType: 'market',
      timer: '',
      baseToken: {
        name: '',
      },
      quoteToken: {
        name: '',
      },
      showCreateOrder: false,
      volume: 0,
      fee: 0,
      gas: 0,
      totalCost: 0,
      marketPrice: 0,
      orderbookPrice: 0,
      initialAmount: 0,
      total: 0,
    }
  },
  watch: {
    market: async function (newVal, _) {
      this.baseToken.name = newVal.split('-')[0]
      this.quoteToken.name = newVal.split('-')[1]
      this.market = newVal
      this.price = 0
      this.amount = 0
      this.volume = 0
      await this.getInitialAmount()
      this.orderbookPrice = this.$format(await orderbookMarketPrice({ marketID: newVal }), 4)
    },
    price: async function (price, _) {
      if (this.side == 'buy') {
        // limit order buy
        if (this.orderType == 'market') {
          // (total * price)(1+2%)= usdt
          // total = (usdt/(1+2%)/price)
          this.initialAmount = this.$format(await this.getQuoteAmount(), 4)
          this.total = this.$format(this.initialAmount, 4)
        } else {
          this.initialAmount = this.$format(await this.getQuoteAmount() / (1 + 0.02) / price, 4)
          this.total = this.$format(await this.getQuoteAmount() / (1 + 0.02) / price, 4)
        }
        console.log('1111111111111111')
        console.log(this.total)
      } else {
        // limit order sell

      }
    },
    account: async function (account, _) {
      this.initialAmount = await this.getQuoteAmount()
    }
  },
  methods: {
    ...mapActions(['updateOrderType']),
    onMarketAmountChange(amount) {
      console.log('onMarketAmountChange', amount)
      this.total = amount
      console.log('222222222222222')
      // this.initialAmount = amount
    },
    onLimitAmountChange(amount) {
      this.total = amount
      console.log('33333333333333333')
      // this.initialAmount = amount
    },
    getFeePercent() {
      return Number(0.02)
    },
    async getBaseAmount() {
      return await getVaultBalance(getTokenAddress(this.baseToken.name), this.account)
    },
    async getQuoteAmount() {
      return await getVaultBalance(getTokenAddress(this.quoteToken.name), this.account)
    },
    updateTotalCost() {
      this.totalCost = Number(this.volume) + Number(this.volume * this.getFeePercent())
      if (this.totalCost > 0) {
        this.totalCost += Number(0.01)
      }
    },
    async trade(side, orderType) {
      if (orderType === 'market') {
        if (this.total == 0) {
          createToast(
            { title: '', description: 'Please input amount' },
            {
              type: 'danger',
              showIcon: true,
              position: 'top-center',
              timeout: 5000,
            }
          )
          return
        }
      } else {
        if (this.price == 0) {
          createToast(
            { title: '', description: 'Please input price' },
            {
              type: 'danger',
              showIcon: true,
              position: 'top-center',
              timeout: 5000,
            }
          )
          return
        }

        if (this.total == 0) {
          createToast(
            { title: '', description: 'Please input amount' },
            {
              type: 'danger',
              showIcon: true,
              position: 'top-center',
              timeout: 5000,
            }
          )
          return
        }
      }

      let price = this.orderType == 'market' ? this.orderbookPrice : this.price
      console.log('build order ==> price:', this.price, 'amount:', this.total)
      buildOrder({
        marketID: this.market,
        side: side,
        orderType: orderType,
        price: price.toString(),
        amount: this.total.toString(),
        expires: 3600,
        address: this.account,
      })
        .then(async (resp) => {
          let { id } = resp
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const wallet = provider.getSigner()
          let messageHashBytes = ethers.utils.arrayify(id)
          let signature = await wallet.signMessage(messageHashBytes)
          const orderSignature = '0x' + signature.slice(130) + '0'.repeat(62) + signature.slice(2, 130)
          placeOrder({
            address: this.account,
            orderID: resp.id,
            signature: orderSignature,
          })
            .then(() => {
              createToast('Order placed', {
                type: 'success',
                position: 'top-center',
                showIcon: true,
                timeout: 5000,
              })
            })
            .catch((err) => console.error('==>!!!!!!! placeOrder', err))
        })
        .catch((err) => console.error('eeeee ==>', err))
    },
    async onTrade() {
      if (this.account === '') {
        createToast(
          { title: '', description: 'Please connect wallet first' },
          {
            type: 'danger',
            showIcon: true,
            position: 'top-center',
            timeout: 5000,
          }
        )
        return
      }

      this.trade(this.side, this.orderType)
    },
    async toggleSide(side) {
      this.side = side
      this.price = 0
      this.amount = 0
      this.opBtnTxt = side === 'buy' ? 'BUY' : "SELL"
      await this.getInitialAmount()
    },
    async tabOrderType(orderType) {
      this.price = 0
      this.amount = 0
      this.updateOrderType(orderType)
      this.orderType = orderType
      await this.getInitialAmount()
    },
    onBidUpdate(bid) {
      console.log('onBidUpdate', bid.price, bid.size)
      if (this.orderType == 'market') {
        if (this.side == 'buy') {
          this.total = 0
        } else {
          this.total = bid.size

          console.log('4444444444444444444')
          this.initialAmount = bid.size
        }
      } else {
        this.price = bid.price
        this.total = bid.size

        console.log('5555555555555555555')
      }
    },
    onAskUpdate(ask) {
      if (this.orderType == 'market') {
        if (this.side == 'buy') {
          console.log('6666666666666666666')
        } else {
          console.log('6666666666666666666aaaa')
        }
      } else {
        this.price = ask.price
        console.log('7777777777777777777')
      }
    },
    async updatePercent(percent) {
      if (this.orderType === 'market') {
        if (this.side === 'buy') {
          let balance = this.initialAmount
          this.amount = this.$format((balance * percent) / 100, 4)
          this.total = this.$format((balance * percent) / 100, 4)
        } else {
          this.total = this.$format((this.initialAmount * percent) / 100, 4)
        }
      } else {
        this.total = this.$format((this.initialAmount * percent) / 100, 4)
      }

      console.log('updatePercent 11111 =>', this.total)
    },
    async getInitialAmount() {
      // market buy
      if (this.orderType == 'market' && this.side == 'buy') {
        this.initialAmount = await this.getQuoteAmount()
        return
      }

      if (this.orderType == 'limit' && this.side == 'buy') {
        if (this.price == 0) {
          this.initialAmount = await this.getBaseAmount()
          console.log('xxxxxxxxxxxxxxxxxxx', this.initialAmount)
          return
        } else {
          console.log('yyyyyyyyyyyyyyyyyyy', this.initialAmount)
          let quoteAmount = await this.getQuoteAmount()
          this.initialAmount = quoteAmount / (1 + 0.02) / this.pirce
          console.log('initialAmount 11111 =>', this.initialAmount)
          return
        }
      }
      this.initialAmount = this.side == 'buy' ? await this.getQuoteAmount() : await this.getBaseAmount()
    },
    async tick() {
      this.orderbookPrice = this.$format(await orderbookMarketPrice({ marketID: this.market }), 4)
    },
  },
  async mounted() {
    let tokens = this.market.split('-')
    this.baseToken.name = tokens[0]
    this.quoteToken.name = tokens[1]
    this.timer = setInterval(this.tick, 2000)
    this.initialAmount = await this.getQuoteAmount()
  },
  beforeUnmount() {
    clearTimeout(this.timer)
  },
}
</script>
<style scoped></style>
