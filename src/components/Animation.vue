<template>
  <div class="mb-12 lg:mb-20">
    <div class="container lg:p-20 mt-6 overflow-hidden p-12 relative">
      <div class="flex animate absolute left-0">
        <div class="logo" v-for="crypto in getCrypto.slice(0, 100)" :key="crypto.id">
          <a href="#" class="ml-5 block p-6 w-60 bg-gray-800 rounded-lg shadow-md">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-400 uppercase">{{ crypto.symbol }}</h5>
            <p class="font-normal text-gray-200">Price $ {{ crypto.current_price }}</p>
          </a>
        </div>
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
@keyframes marquee {
  0% {
    left: 0;
  }
  100% {
    left: -900%;
  }
}
.animate {
  width: 1800%;
  animation: marquee 5s linear infinite;
  top: 50%;
  transform: translate(0, -50%);
}
.logo a {
  width: 80px;
  -webkit-transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}
@screen lg {
  @keyframes marquee {
    0% {
      left: 0;
    }
    100% {
      left: -375%;
    }
  }
  .animate {
    width: 750%;
    animation: marquee 200s linear infinite;
    top: 50%;
    transform: translate(0, -50%);
  }
  .logo a {
    width: 240px;
    -webkit-transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  }
}

.animate:hover {
  animation-play-state: paused;
}

.logo a:hover {
  transform: scale(1.1);
}
</style>