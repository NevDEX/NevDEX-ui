<template>
  <div class="flex flex-row w-full h-full border-t border-black">
    <div class="left h-full px-2 pt-5 border-r border-black" style="width: 15%; height: 100%;">
      <aside class=" " aria-label="Sidebar">
        <div class="overflow-y-auto py-4 rounded bg-transparent">
          <ul class="space-y-2 w-full">
            <li>
              <a href="javascript:void(0)" class="flex items-center p-2 text-base font-normal text-gray-200 hover:bg-gray-800 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-blue-500">
                  <path d="M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875z" />
                  <path d="M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 001.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 001.897 1.384C6.809 12.164 9.315 12.75 12 12.75z" />
                  <path d="M12 16.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 001.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 001.897 1.384C6.809 15.914 9.315 16.5 12 16.5z" />
                  <path d="M12 20.25c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 001.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 001.897 1.384C6.809 19.664 9.315 20.25 12 20.25z" />
                </svg>
                <span class="ml-3">Asset</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
    <div class=" " style="width: 85%;">
      <p class="px-4 py-3 text-white text-2xl h-30 border-b border-black">Asset</p>

      <div class="overflow-x-auto relative p-2">
        <table class="w-full text-sm text-left text-gray-500 bg-gray-800">
          <thead class="text-xs uppercase bg-transparent">
            <tr class=" ">
              <th scope="col" class="py-3 px-6">Asset</th>
              <th scope="col" class="py-3 px-6">Available</th>
              <th scope="col" class="py-3 px-6">Locked</th>
              <th scope="col" class="py-3 px-6">Address</th>
              <th scope="col" class="py-3 px-6">Operation</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(token, idx) in tokens()" :key="idx" class="border-b bg-gray-900 border-gray-700">
              <th scope="row" class="flex flex-row items-center py-3 px-6 font-medium text-gray-500 whitespace-nowrap">
                <img class="h-6 mr-2" :src="getTokenConf(token.name).logoURI" alt="" />
                {{ token.name }}
              </th>
              <td class="py-3 px-6">
                {{ $format(balances[token.name]) }}
              </td>
              <td class="py-3 px-6">
                {{ $format(lockedBalances[token.name] / 10 ** 18) }}
              </td>
              <td class="py-3 px-6">
                {{ getTokenConf(token.name).address }}
              </td>
              <td class="py-3 px-6">Trade</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <TradeFooter class="absolute bottom-0 w-full" />
  </div>
</template>

<script>
import tokenList from '../config/tokenList'
import { getTokenAddress, getTokenCfg } from '../utils/token'
import { lockedBalance } from '../api/api'
import { mapGetters } from 'vuex'
import { getVaultBalance } from '../contract/contract'

export default {
  data() {
    return {
      balances: [],
      lockedBalances: [],
    }
  },
  computed: {
    ...mapGetters(['isConnected', 'account', 'assetBalance']),
  },
  methods: {
    getTokenConf(symbol) {
      return getTokenCfg(symbol)
    },

    tokens() {
      return tokenList.tokens.map((token, index) => {
        return {
          name: token.symbol,
          id: index,
        }
      })
    },
  },
  async mounted() {
    let list = tokenList.tokens.map((token, index) => {
      return {
        name: token.symbol,
        id: index,
      }
    })
    Promise.all(
      list.map(async (item) => {
        let tokenAddress = getTokenAddress(item.name)
        let balance = await getVaultBalance(tokenAddress, this.account)
        this.balances[item.name] = balance
      })
    )
    let lockedBalances = await lockedBalance({ address: this.account })
    this.lockedBalances = lockedBalances
  },
}
</script>

<style></style>
