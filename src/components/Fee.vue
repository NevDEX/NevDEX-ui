<template>
  <ul class="text-gray-300 flex flex-col text-xs justify-between space-y-1.5">
    <li class="flex flex-row justify-between">
      <div class=" ">
        <span class=" "
          >Fee <span class="text-gray-500">({{ fee * 100 }}%)</span></span
        >
        <!-- <div class=" "><span class=" ">Rebate</span></div> -->
      </div>
      <div class=" ">
        <span class=" ">{{ side == 'buy' ? (isNaN($format(+total * fee, 4)) ? 0 : $format(+total * fee, 4)) : isNaN($format(+total * +price * fee, 4)) ? 0 : $format(+total * +price * fee, 4) }} {{ side == 'buy' ? baseToken : quoteToken }}</span>
      </div>
    </li>
    <li class="flex flex-row justify-between">
      <div class=" "><span class=" ">Total</span></div>
      <div class="">
        <span class=" ">{{ isNaN($format(+total * price, 4)) ? 0 : $format(total * price, 4) }} {{ quoteToken }}</span>
      </div>
    </li>
  </ul>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      baseToken: '',
      quoteToken: '',
      fee: 0.001,
    }
  },
  props: ['total', 'price', 'side'],
  computed: {
    ...mapGetters(['market']),
  },
  watch: {
    market: function (newVal, oldVal) {
      let arr = newVal.split('-')
      this.baseToken = arr[0]
      this.quoteToken = arr[1]
    },
  },
}
</script>

<style></style>
