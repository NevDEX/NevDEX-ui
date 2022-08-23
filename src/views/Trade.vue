<template>
  <div class="flex flex-col w-full h-full">
    <TradeBar />
    <div class="flex flex-1 bg-gray-900 md:flex-row flex-col-reverse md:gap-0 gap-12">
      <div class="md:w-1/5 w-full border-black border-r">
        <div class="flex flex-col px-0.5 h-full">
          <div class="bg-gray-900 h-full">
            <div class="p-2 bg-gray-900 h-full">
              <ul class="flex rounded-lg divide-gray-200 shadow sm:flex">
                <li class="w-full">
                  <button class="inline-block relative py-2 px-4 w-full text-sm font-medium text-center text-gray-50 bg-gray-800 hover:text-gray-700 hover:bg-gray-600 focus:bg-green-300" @click="toggleTabs('buy')" v-bind:class="{ 'bg-green-300': tab === 'buy' }">BUY</button>
                </li>
                <li class="w-full">
                  <button class="inline-block relative py-2 px-4 w-full text-sm font-medium text-center text-gray-50 bg-gray-800 hover:text-gray-700 hover:bg-gray-600 focus:bg-red-400" @click="toggleTabs('sell')" v-bind:class="{ 'bg-red-400': tab === 'sell' }">SELL</button>
                </li>
              </ul>

              <div class="mt-3 flex items-center rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                <span class="w-3/12 text-gray-200 border border-gray-600 bg-transparent border-transparent py-2 sm:text-sm rounded-l text-center"> Price </span>
                <div class="relative w-9/12 flex items-center">
                  <input type="number" name="price" id="price" class="w-full absolute block pr-12 -top-4.5 border sm:text-sm text-gray-50 border-gray-500 text-center bg-gray-800" step="0.001" v-model="price" :min="0" oninput="if(value<0)value=0" />
                  <div class="absolute -top-2.5 right-2 text-gray-400 text-sm">{{ quoteToken.name }}</div>
                </div>
              </div>

              <div class="mt-3 flex items-center rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                <span class="w-3/12 text-gray-200 border border-gray-600 bg-transparent border-transparent py-2 sm:text-sm rounded-l text-center"> Size </span>
                <div class="relative w-9/12 flex items-center">
                  <input type="number" name="price" id="price" class="w-full absolute block pr-12 -top-4.5 border sm:text-sm text-gray-50 border-gray-500 text-center bg-gray-800" step="0.001" v-model="amount" :min="0" oninput="if(value<0)value=0" />
                  <div class="absolute -top-2.5 right-2 text-gray-400 text-sm">{{ baseToken.name }}</div>
                </div>
              </div>

              <div class="flex justify-center mt-3 mb-2">
                <RangeSlider />
              </div>

              <div class="flex justify-between mt-2 mb-2 px-2 text-gray-50 text-xs">
                <div>Vol</div>
                <div>0 USDT</div>
              </div>
              <!-- <div class="flex justify-between mt-2 mb-2 px-1 text-gray-50 text-xs">
                <div>Fee:</div>
                <div>
                  Taker 0.10 % , Maker: 0.10 %
                </div>
              </div> -->
              <div class="mt-2 flex justify-center items-center">
                <button class="py-2 w-full bg-gray-800 hover:bg-gray-600 text-gray-50" @click="onMarketTrade">{{ opBtnTxt }}</button>
              </div>
              <div class="mt-3 flex justify-center items-center">
                <button class="py-2 w-full bg-gray-800 hover:bg-gray-600 text-gray-50" @click="onLimitTrade">{{ limitBtnTxt }}</button>
              </div>
              <Assets />
            </div>
          </div>
        </div>
      </div>

      <div class="md:w-1/5 w-full border-black border-r">
        <OrderBook @updateBid="onBidUpdate" @updateAsk="onAskUpdate" :baseToken="baseToken.name" :quoteToken="quoteToken.name" :market="market" />
      </div>

      <div class="flex flex-col md:w-3/5 w-full h-full">
        <TradingView :market="market" class="" />
        <TradeTab :market="market" class="flex-1" />
      </div>
    </div>
    <Wallet v-if="showWallet" @close="showWallet = false" />
    <TradeFooter />
  </div>
</template>

<script>
import TradingView from '../components/TradingView.vue'
import TradeTab from '../components/UserTrade.vue'
import RangeSlider from '../components/RangeSlider.vue'
import DropDown from '../components/DropDown.vue'
import OrderBook from '../components/OrderBook.vue'
import TradeFooter from '../components/footer/TradeFooter.vue'
import WalletModal from '../components/WalletModal.vue'
import Volume from '../components/Volume.vue'
import Assets from '../components/Assets.vue'
import TradeBar from '../components/TradeBar.vue'
import { buildOrder, placeOrder } from '../api/api.js'
import { ethers } from 'ethers'
import UseWallet from '../wallet'
const { walletGlobal } = UseWallet()
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Trade',
  components: { TradingView, TradeTab, RangeSlider, DropDown, OrderBook, TradeFooter, WalletModal, Volume, Assets, TradeBar },
  computed: {
    ...mapGetters(['market']),
  },
  data() {
    return {
      tab: 'buy',
      pools: [],
      opBtnTxt: 'BUY',
      limitBtnTxt: 'LIMIT BUY',
      price: 0,
      amount: 0,
      timer: '',
      baseToken: {
        name: '',
        walletBalance: 0,
        unsettledBalance: 0,
      },
      quoteToken: {
        name: '',
        walletBalance: 0,
        unsettledBalance: 0,
      },
      showWallet: false,
    }
  },
  watch: {
    market: async function (newVal, oldVal) {
      this.baseToken.name = newVal.split('-')[0]
      this.quoteToken.name = newVal.split('-')[1]
      this.market = newVal
    },
  },
  methods: {
    trade(side, orderType) {
      console.log('account', walletGlobal.account)
      if (this.price == 0 || this.amount == 0) {
        console.log('price or amount 0')
        return
      }

      buildOrder({
        marketID: this.market,
        side: side,
        orderType: orderType,
        price: this.price.toString(),
        amount: this.amount.toString(),
        expires: 3600,
        address: walletGlobal.account,
      })
        .then(async (resp) => {
          let { id } = resp
          console.log('id', id)
          // Create a wallet to sign the message with
          const { ethereum } = window
          const provider = new ethers.providers.Web3Provider(ethereum)
          const wallet = provider.getSigner()
          let messageHashBytes = ethers.utils.arrayify(id)
          let signature = await wallet.signMessage(messageHashBytes)
          const orderSignature = '0x' + signature.slice(130) + '0'.repeat(62) + signature.slice(2, 130)
          // var sig = ethers.utils.splitSignature(signature)
          placeOrder({
            address: walletGlobal.account,
            orderID: resp.id,
            signature: orderSignature,
          })
            .then((ret) => console.log('==> placeOrder', ret))
            .catch((err) => console.error('==> placeOrder', err))
        })
        .catch((err) => console.error(err))
    },
    onMarketTrade() {
      // console.log('market order :price', this.price, 'amount', this.amount)
      if (this.tab == 'buy') {
        console.log('BUY')
        this.trade('buy', 'market')
      } else {
        console.log('SELL')
        this.trade('sell', 'market')
      }
    },
    onLimitTrade() {
      // console.log('limit order :price', this.price, 'amount', this.amount)
      if (this.tab == 'buy') {
        this.trade('buy', 'limit')
      } else {
        this.trade('sell', 'limit')
      }
    },
    toggleTabs(tab) {
      this.tab = tab
      if (tab == 'buy') {
        this.opBtnTxt = 'BUY'
        this.limitBtnTxt = 'LIMIT BUY'
      } else {
        this.opBtnTxt = 'SELL'
        this.limitBtnTxt = 'LIMIT SELL'
      }
    },
    updateSelectMarket(market) {
      // console.log('updateSelectMarket', market)
      this.market = market
      let tokens = market.split('-')
      console.log(tokens)

      this.baseToken.name = tokens[0]
      this.quoteToken.name = tokens[1]
    },
    onBidUpdate(bid) {
      // console.log('onBidUpdate', bid)
      this.price = bid.price
      this.amount = bid.size
    },
    onAskUpdate(ask) {
      // console.log('onAskUpdate', ask)
      this.price = ask.price
      this.amount = ask.size
    },
  },
  async created() {},
}
</script>
<style scoped>
.tradingView {
  /* margin-top: -1px; */
  height: 55vh;
}

.chart {
  margin-top: -2px;
}
</style>
