<template>
  <div class="flex flex-col h-full">
    <div class="overflow-auto bg-gray-900 px-1">
      <table class="w-full border-separate border-spacing-y-1">
        <thead class="">
          <tr>
            <th scope="col" class="text-xs font-medium tracking-wider text-left text-gray-400 uppercase">Price({{ quoteToken }})</th>
            <th scope="col" class="text-xs font-medium tracking-wider text-center text-gray-400 uppercase">Size({{ baseToken }})</th>
            <th scope="col" class="text-xs font-medium tracking-wider text-right text-gray-400 uppercase">Time</th>
          </tr>
        </thead>
        <tbody>
          <tr class="" v-for="item in history" :key="item.id">
            <td class="text-xs whitespace-nowrap text-left" v-bind:class="{ 'text-green-400': item.TakerSide === 'buy', 'text-red-500': item.TakerSide === 'sell' }">{{ item.PriceInDecimal }}</td>
            <td class="text-xs text-gray-300 whitespace-nowrap text-center">{{ item.AmountInDecimal }}</td>
            <td class="text-xs text-gray-500 whitespace-nowrap text-right">{{ dateTime(item.CreateTime) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { marketHistory } from '../api/api.js'
import moment from 'moment'

export default {
  props: ['baseToken', 'quoteToken'],
  data() {
    return {
      history: null,
    }
  },
  methods: {
    tick() {
      marketHistory({
        marketID: `${this.baseToken}-${this.quoteToken}`,
      }).then((ret) => {
        console.log('==> marketHistory ret:', ret)
        this.history = ret
      })
    },
    dateTime(value) {
      return moment(value * 1000).format('MM-DD HH:mm:ss')
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
  /* background-color: transparent; */
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset000pxrgba(240, 240, 240, 0.5);
  background-color: rgba(240, 240, 240, 0.5);
}
</style>
