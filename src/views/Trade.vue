<template>
  <div class="flex h-full w-full flex-col">
    <TradeBar />
    <div class="flex h-full w-full gap-12 md:gap-0">
      <div class="flex flex-1 flex-col-reverse md:flex-row">
        <div class="w-full border-r border-black md:w-1/5 2xl:w-1/6">
          <div class="flex h-full flex-col px-0.5">
            <div class="h-full bg-gray-900">
              <div class="h-full bg-gray-900 p-2">
                <ul class="flex divide-gray-200 rounded-lg shadow sm:flex">
                  <li class="w-full">
                    <button
                      class="relative inline-block w-full bg-slate-800 py-2 px-4 text-center text-sm font-medium text-gray-50 hover:bg-gray-600 hover:text-gray-700 focus:bg-green-300"
                      @click="toggleSide('buy')" v-bind:class="{ 'bg-green-300': side === 'buy' }">BUY</button>
                  </li>
                  <li class="w-full">
                    <button
                      class="relative inline-block w-full bg-slate-800 py-2 px-4 text-center text-sm font-medium text-gray-50 hover:bg-gray-600 hover:text-gray-700 focus:bg-red-400"
                      @click="toggleSide('sell')" v-bind:class="{ 'bg-red-400': side === 'sell' }">SELL</button>
                  </li>
                </ul>

                <!-- order type -->
                <div class="border-b border-gray-600 pt-2 text-center text-sm font-medium text-gray-500">
                  <ul class="-mb-px flex flex-wrap">
                    <li class="mr-2">
                      <a href="javascript:void(0)"
                        class="inline-block rounded-t-lg border-b-2 border-transparent p-2 hover:border-blue-600 hover:text-gray-300"
                        @click="tabOrderType('market')"
                        v-bind:class="{ 'border-blue-600 text-gray-300': orderType === 'market' }">Market</a>
                    </li>
                    <li class="mr-2">
                      <a href="javascript:void(0)"
                        class="inline-block rounded-t-lg border-b-2 border-transparent p-2 hover:border-blue-600 hover:text-gray-300"
                        @click="tabOrderType('limit')"
                        v-bind:class="{ 'border-blue-600 text-gray-300': orderType === 'limit' }">Limit</a>
                    </li>
                  </ul>
                </div>
                <!-- order type -->

                <!-- market order tab  -->
                <div v-if="orderType === 'market'">
                  <div class="mt-3 flex items-center rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <span class="w-3/12 rounded-l border border-gray-600 py-2 text-center text-gray-200 sm:text-sm"> Price
                    </span>
                    <div class="relative flex w-9/12 items-center">
                      <input type="text"
                        class="-top-4.5 absolute block w-full border border-gray-500 bg-slate-800 pr-12 text-center text-gray-50 sm:text-sm"
                        disabled :placeholder="orderbookPrice" />
                      <div class="absolute -top-2.5 right-2 text-sm text-gray-400">{{ quoteToken.name }}</div>
                    </div>
                  </div>

                  <div class="mt-3 flex items-center rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <span v-if="side === 'buy'"
                      class="w-3/12 rounded-l border border-gray-600 py-2 text-center text-gray-200 sm:text-sm"> Total
                    </span>
                    <span v-else
                      class="w-3/12 rounded-l border border-gray-600 py-2 text-center text-gray-200 sm:text-sm"> Size
                    </span>
                    <div class="relative flex w-9/12 items-center">
                      <input type="number"
                        class="-top-4.5 absolute block w-full border border-gray-500 bg-slate-800 pr-12 text-center text-gray-50 sm:text-sm"
                        step="0.001" :min="0" oninput="if(value<0)value=0" :value="total"
                        @input="onMarketAmountChange($event.target.value)" />
                      <div class="absolute -top-2.5 right-2 text-sm text-gray-400">{{ side === 'buy' ? quoteToken.name :
                        baseToken.name }}</div>
                    </div>
                  </div>
                </div>
                <!-- market order tab  -->

                <!-- limit order tab  -->
                <div v-if="orderType === 'limit'">
                  <div class="mt-3 flex items-center rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <span class="w-3/12 rounded-l border border-gray-600 py-2 text-center text-gray-200 sm:text-sm"> Price
                    </span>
                    <div class="relative flex w-9/12 items-center">
                      <input type="number"
                        class="-top-4.5 absolute block w-full border border-gray-500 bg-slate-800 pr-12 text-center text-gray-50 sm:text-sm"
                        step="0.001" v-model="price" :min="0" oninput="if(value<0)value=0" />
                      <div class="absolute -top-2.5 right-2 text-sm text-gray-400">{{ quoteToken.name }}</div>
                    </div>
                  </div>
                  <div class="mt-3 flex items-center rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <span class="w-3/12 rounded-l border border-gray-600 py-2 text-center text-gray-200 sm:text-sm"> Size
                    </span>
                    <div class="relative flex w-9/12 items-center">
                      <input type="number"
                        class="-top-4.5 absolute block w-full border border-gray-500 bg-slate-800 pr-12 text-center text-gray-50 sm:text-sm"
                        step="0.001" :min="0" oninput="if(value<0)value=0" :value="total"
                        @input="onLimitAmountChange($event.target.value)" />
                      <div class="absolute -top-2.5 right-2 text-sm text-gray-400">{{ baseToken.name }}</div>
                    </div>
                  </div>
                </div>
                <!-- limit order tab  -->

                <RangeSlider @sliderPercentUpdate="updatePercent" ref="slider" />
                <!-- <RangeSliderNew/> -->
                <Fee :total="total" :price="price" :side="side" />
                <div class="mt-2 flex items-center justify-center">
                  <button class="w-full bg-slate-800 py-2 text-gray-50 hover:bg-gray-600" @click="onTrade">{{ opBtnTxt
                  }}</button>
                </div>
                <Assets />
              </div>
            </div>
          </div>
        </div>

        <div class="h-full w-full border-r border-black bg-gray-900 md:w-1/5 2xl:w-1/6">
          <OrderBook @updateBid="onBidUpdate" @updateAsk="onAskUpdate" :baseToken="baseToken.name"
            :quoteToken="quoteToken.name" :market="market" />
        </div>

        <div class="flex h-full w-full flex-col bg-gray-900 md:w-3/5 2xl:w-4/6">
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
import Fee from '../components/Fee.vue'
import { buildOrder, placeOrder } from '../api/api.js'
import { ethers } from 'ethers'
import { mapActions, mapGetters } from 'vuex'
import { createToast } from 'mosha-vue-toastify'
import CreateOrderModal from '../components/CreateOrderModal.vue'
import { getTokenAddress } from '../utils/token'
import { getVaultBalance } from '../contract/contract'
import { orderbookMarketPrice } from '../api/api.js'

export default {
  name: 'Trade',
  components: { TradingView, TradeTab, RangeSlider, OrderBook, TradeFooter, WalletModal, Volume, Assets, TradeBar, CreateOrderModal, RangeSliderNew, Fee },
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
          this.initialAmount = this.$format((await this.getQuoteAmount()) / (1 + 0.0) / price, 4)
          this.total = this.$format((await this.getQuoteAmount()) / (1 + 0.0) / price, 4)
        }
        console.log('1111111111111111 price watch')
        console.log(this.total)
      } else {
        // limit order sell
      }
    },
    account: async function (account, _) {
      this.initialAmount = await this.getQuoteAmount()
    },
  },
  methods: {
    ...mapActions(['updateOrderType']),
    onMarketAmountChange(amount) {
      console.log('onMarketAmountChange', amount)
      this.total = amount
      console.log('222222222222222')
      let percent = +amount / +this.initialAmount
      this.$refs.slider.setPercent(percent * 100)
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
      this.opBtnTxt = side === 'buy' ? 'BUY' : 'SELL'
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
