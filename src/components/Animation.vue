<template>
  <div className="marquee-root mt-20 pb-42 hidden md:block">
    <div className="marquee-content flex flex-row">
      <div v-for="crypto in getCrypto.slice(0, 100)" :key="crypto.id">
        <a href="javascript:void(0)" class="ml-5 block p-6 w-60 bg-gray-800 rounded-lg shadow-md">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-400 uppercase">{{ crypto.symbol }}</h5>
          <p class="font-normal text-gray-200">Price ${{ $format(crypto.current_price, 4) }}</p>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
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

<style scoped>
@keyframes marqueeAnim {
  0% {
    transform: translateX(0vw);
  }
  100% {
    transform: translateX(-900%);
  }
}

.marquee-content {
  animation: marqueeAnim 250s linear 0s infinite;
}

.marquee-root {
  width: 100%;
  height: 100%;
  line-height: 30px;
  overflow: hidden;
}
</style>
