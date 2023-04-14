<template>
  <ul class="text-gray-400 flex flex-col text-xs justify-between">
    <li class="flex flex-row justify-between">
      <div class=" ">
        <span class=" ">Fee</span>
        <!-- <div class=" "><span class=" ">Rebate</span></div> -->
      </div>
      <div class=" ">
        <span class=" ">{{ $format(+total * 0.002, 4) }} {{ quoteToken }}</span>
      </div>
    </li>
    <li class="flex flex-row justify-between">
      <div class=" "><span class=" ">Total</span></div>
      <div class="">
        <span class=" ">{{ $format(total, 4) }} {{ quoteToken }}</span>
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
    }
  },
  props: ['total', 'fee'],
  computed: {
    ...mapGetters(['market']),
  },
  watch: {
    market: async function (newVal, oldVal) {
        console.log('111111 fee', newVal)
      let arr = newVal.split('-')
      this.baseToken = arr[0]
      this.quoteToken = arr[1]
    },
  },
}
</script>

<style></style>