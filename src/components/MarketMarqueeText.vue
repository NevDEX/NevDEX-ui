<template>
  <MarqueeText :repeat="13" :paused="isPaused" class="py-2 bg-dark text-white mt-2">
    <!-- <span v-for="crypto in getCrypto.slice(0, 100)" :key="crypto.id" class=" "> -->

    <div class="flex felx felx-row">
      <a href="javascript:void(0)" class="ml-5 block p-12 w-60 bg-gray-800 rounded-lg shadow-md">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-400 uppercase">{{ USDT }}</h5>
        <p class="font-normal text-gray-200">Price ${{ 23 }}</p>
      </a>

      <a href="javascript:void(0)" class="ml-5 block p-12 w-60 bg-gray-800 rounded-lg shadow-md">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-400 uppercase">{{ USDT }}</h5>
        <p class="font-normal text-gray-200">Price ${{ 23 }}</p>
      </a>
      <a href="javascript:void(0)" class="ml-5 block p-12 w-60 bg-gray-800 rounded-lg shadow-md">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-400 uppercase">{{ USDT }}</h5>
        <p class="font-normal text-gray-200">Price ${{ 23 }}</p>
      </a>
    </div>

    <!-- <span class="badge badge-success ml-2">0,38%</span> ATX <span class="badge badge-danger ml-2">0,16%</span> DAX <span class="badge badge-success ml-2">0,04%</span> TecDax <span class="badge badge-danger ml-2">0,19%</span> MDAX <span class="badge badge-success ml-2">0,03%</span> ESTX50 <span class="badge badge-info ml-2">0,00%</span> NIKKEI
    <span class="badge badge-success ml-2">0,03%</span> EUR/CHF -->
  </MarqueeText>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import MarqueeText from './MarqueeText.vue'
export default {
  components: { MarqueeText },

  methods: {
    ...mapActions(['fetchCrypto']),
  },
  mounted() {
    this.fetchCrypto()
  },
  computed: {
    ...mapGetters(['getCrypto']),
  },
}
</script>
<style></style>
