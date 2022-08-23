<template>
  <div class="px-1 pt-1 bg-gray-900 h-full">
    <div class="flex flex-col px-2 bg-gray-900 h-full trade-list">
      <div class="h-10 border-b border-gray-600">
        <ul class="flex">
          <li class="mr-2">
            <a href="#" class="inline-block py-2 text-sm font-medium text-center border-b-2 border-transparent" @click="toggleTabs(1)" v-bind:class="{ 'font-bold text-bold text-gray-50 border-gray-50 ': openTab === 1, 'text-gray-500': openTab !== 1 }">Open Orders</a>
          </li>
          <li class="mr-2">
            <a href="#" class="ml-3 inline-block py-2 text-sm font-medium text-center border-b-2 border-transparent" @click="toggleTabs(2)" v-bind:class="{ 'font-bold text-bold text-gray-50 border-gray-50 ': openTab === 2, 'text-gray-500': openTab !== 2 }">Recent Trade History</a>
          </li>
          <li class="mr-2">
            <a href="#" class="ml-3 inline-block py-2 text-sm font-medium text-center border-b-2 border-transparent" @click="toggleTabs(3)" v-bind:class="{ 'font-bold text-bold text-gray-50 border-gray-50 ': openTab === 3, 'text-gray-500': openTab !== 3 }">Fee Discount</a>
          </li>
        </ul>
      </div>
      <div class="flex flex-1 flex-col min-w-0 break-words w-full shadow-lg h-full" style="height: 80%">
        <div class="tab-content tab-space h-full">
          <div v-bind:class="{ hidden: openTab !== 1, block: openTab === 1 }" class="h-full">
            <!-- Component Start  -->
            <div class="flex flex-col w-full text-left h-full">
              <div class="flex flex-shrink-0 text-gray-400 uppercase text-xs py-2">
                <div class="flex items-center flex-grow w-0 h-6"><span>Market</span></div>
                <div class="flex items-center flex-grow w-0 h-6"><span>Size</span></div>
                <div class="flex items-center flex-grow w-0 h-6"><span>Filled </span></div>
                <div class="flex items-center flex-grow w-0 h-6"><span>Price </span></div>
                <div class="flex items-center flex-grow w-0 h-6 px-5"><span>Create Time</span></div>
                <div class="flex items-center flex-grow w-0 h-6"><span>Operation </span></div>
              </div>
              <div class="overflow-auto flex-1">
                <div v-if="openOrders.length == 0" class="text-gray-400 items-center text-center mt-5 text-xs">No Open Orders</div>
                <div v-for="order in openOrders" :key="order.Id" class="flex flex-shrink-0 text-xs text-gray-100 py-5">
                  <div class="flex items-center flex-grow w-0 h-6">
                    <span>{{ order.MarketId }}</span>
                  </div>
                  <div class="flex items-center flex-grow w-0 h-6">
                    <span>{{ order.Amount }}</span>
                  </div>
                  <div class="flex items-center flex-grow w-0 h-6">
                    <span>{{ order.ConfirmedAmount }}</span>
                  </div>
                  <div class="flex items-center flex-grow w-0 h-6">
                    <span>{{ order.Price }}</span>
                  </div>
                  <div class="flex items-center flex-grow w-0 h-6 px-5">
                    <span class="">{{ order.CreatedAt }}</span>
                  </div>
                  <div class="flex items-center flex-grow w-0 h-6"><button class="font-medium text-xs text-blue-600 hover:text-blue-200" @click="onCancelOrder(order)">Cancel</button></div>
                </div>
              </div>
            </div>
            <!-- Component End  -->
          </div>
          <div v-bind:class="{ hidden: openTab !== 2, block: openTab === 2 }" class="h-full">
            <!-- Component Start  -->
            <div class="flex flex-col w-full text-left h-full">
              <div class="flex flex-shrink-0 text-gray-400 uppercase text-xs">
                <div class="flex items-center flex-grow w-0 h-6"><span>Market</span></div>
                <div class="flex items-center flex-grow w-0 h-6"><span>Type</span></div>
                <div class="flex items-center flex-grow w-0 h-6"><span>Side</span></div>
                <div class="flex items-center flex-grow w-0 h-6"><span>Size</span></div>
                <div class="flex items-center flex-grow w-0 h-6"><span>Role </span></div>
                <div class="flex items-center flex-grow w-0 h-6"><span>Price </span></div>
                <div class="flex items-center flex-grow w-0 h-6"><span>Time</span></div>
              </div>
              <div class="overflow-auto">
                <div v-if="tradeOrders.length == 0" class="text-gray-400 items-center text-center mt-5 text-xs">No Trade History</div>
                <div v-for="order in tradeOrders" :key="order.Id" class="flex flex-shrink-0 text-xs text-gray-100">
                  <div class="flex items-center flex-grow w-0 h-6">
                    <span>{{ order.MarketId }}</span>
                  </div>
                  <div class="flex items-center flex-grow w-0 h-6">
                    <span>{{ 'Limit' }}</span>
                  </div>
                  <div class="flex items-center flex-grow w-0 h-6">
                    <span v-if="order.Taker == account"> {{ order.TakerSide }} </span>
                    <span v-else>{{ order.TakerSide == 'buy' ? 'sell' : 'buy' }}</span>
                  </div>
                  <div class="flex items-center flex-grow w-0 h-6">
                    <span>{{ format(order.Amount) }}</span>
                  </div>
                  <div class="flex items-center flex-grow w-0 h-6">
                    <span v-if="order.Maker == account">maker</span>
                    <span v-else>taker</span>
                  </div>
                  <div class="flex items-center flex-grow w-0 h-6">
                    <span>{{ format(order.Price) }}</span>
                  </div>
                  <div class="flex items-center flex-grow w-0 h-6">
                    <span>{{ order.CreatedAt }}</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- Component End  -->
          </div>

          <div v-bind:class="{ hidden: openTab !== 3, block: openTab === 3 }">
            <!-- Component Start  -->
            <div class="flex flex-col w-full h-60 text-left">
              <div class="flex flex-shrink-0 text-gray-400 uppercase text-xs">
                <div class="flex items-center flex-grow w-0 h-6"><span>Fee Tier</span></div>
                <div class="flex items-center flex-grow w-0 h-6"><span>Taker</span></div>
                <div class="flex items-center flex-grow w-0 h-6"><span>Maker </span></div>
                <div class="flex items-center flex-grow w-0 h-6"><span>Balance </span></div>
              </div>
              <div class="overflow-auto">
                <div v-for="fee in feeTier" :key="fee.id" class="flex flex-shrink-0 text-xs text-gray-100">
                  <div class="flex items-center flex-grow w-0 h-6">
                    <span>Tier {{ fee.id }}</span>
                  </div>
                  <div class="flex items-center flex-grow w-0 h-6">
                    <span>{{ fee.taker }}%</span>
                  </div>
                  <div class="flex items-center flex-grow w-0 h-6">
                    <span>{{ fee.maker }}</span>
                  </div>
                  <div class="flex items-center flex-grow w-0 h-6">
                    <span>{{ fee.balance }} NDX</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- Component End  -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { myOrders } from '../api/api'
import UseWallet from '../wallet'
const { connect, web3, walletGlobal } = UseWallet()
import { cancelOrder } from '../api/api.js'
import { mapGetters } from 'vuex'
import { formatNumber } from '../utils/token'

export default {
  name: 'UserTrade',
  data() {
    return {
      openTab: 1,
      openOrders: [],
      tradeOrders: [],
      feeTier: [
        {
          id: 1,
          maker: 0,
          taker: 10,
          balance: 5,
        },
        {
          id: 2,
          maker: 0,
          taker: 15,
          balance: 8,
        },
        {
          id: 3,
          maker: 0,
          taker: 30,
          balance: 100000,
        },
        {
          id: 4,
          maker: 0,
          taker: 40,
          balance: 500000,
        },
        {
          id: 5,
          maker: 0,
          taker: 60,
          balance: 1000000,
        },
      ],
    }
  },
  props: ['market'],
  computed: {
    ...mapGetters(['isConnected', 'account']),
  },
  methods: {
    toggleTabs(tabNumber) {
      this.openTab = tabNumber
    },
    tick() {
      // console.log('userTrade tick', walletGlobal.account)
      myOrders({
        address: walletGlobal.account,
        marketID: this.market,
      })
        .then((ret) => {
          // console.log('myOrders ret', ret)
          this.openOrders = ret.openOrder.filter((order) => {
            return order.Status != 'full_filled'
          })

          this.tradeOrders = ret.tradeOrders
        })
        .catch((e) => console.error(e))
    },
    onCancelOrder(order) {
      let { Id, MarketId } = order
      console.log('onCancelOrder', order, MarketId)
      cancelOrder({
        marketID: MarketId,
        orderID: Id,
      })
    },
    format(val) {
      return formatNumber(val, 5)
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
  height: 6px;
  /* background-color: transparent; */
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset000pxrgba(240, 240, 240, 0.5);
  background-color: rgba(240, 240, 240, 0.5);
}

.fixTableHead {
  overflow-y: auto;
  height: 110px;
}
.fixTableHead thead th {
  position: sticky;
  top: 0;
  background-color: black;
}
.trade-list {
  height: 35vh;
}
</style>
