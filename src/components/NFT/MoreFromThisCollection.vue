<template>
  <h1 class="text-gray-200 text-3xl font-bold my-10 mx-10">More from this collection</h1>
  <swiper
    :pagination="{
      type: 'progressbar',
    }"
    :navigation="true"
    :modules="modules"
    class="flex flex-row mx-10"
  >
    <swiper-slide class="h-[24rem] w-[17rem]">
      <div v-for="(nft, index) in nfs" :key="index" class="mx-auto my-auto border-[0.5px] border-stone-600 rounded-xl shadow-xl">
        <div class="w-full">
          <img :src="nft.image" alt="marketplace" @click="onItemClick" class="w-full" />
        </div>
        <div class="m-[10px]">
          <div class="name text-left">
            <h4>{{ nft.name }}</h4>
          </div>
          <h6 class="username"></h6>
          <div class="price-container flex flex-row justify-between">
            <h5 class="price">5.5 NDX</h5>
            <button @click="onBuy">buy</button>
          </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide class="bg-gray-300 h-80 w-60">Slide 3</swiper-slide>
    <swiper-slide class="bg-gray-300 h-80 w-60">Slide 4</swiper-slide>
    <swiper-slide class="bg-gray-300 h-80 w-60">Slide 5</swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'

import { Pagination, Navigation } from 'swiper'
export default {
  components: { Pagination, Navigation, Swiper, SwiperSlide },
  data() {
    return {
      modules: [Pagination, Navigation],
      nfs: [
        {
          image: '/src/assets/nft/marketplace1.png',
          name: 'SUIHEROES #447',
        },
        {
          image: '/src/assets/nft/marketplace2.png',
          name: 'SUIHEROES #448',
        },
        {
          image: '/src/assets/nft/marketplace3.png',
          name: 'SUIHEROES #449',
        },
        {
          image: '/src/assets/nft/marketplace4.png',
          name: 'SUIHEROES #450',
        },
        {
          image: '/src/assets/nft/marketplace5.png',
          name: 'SUIHEROES #451',
        },
      ],
    }
  },
  methods: {},

  setup() {
    return {
      modules: [Pagination, Navigation],
    }
  },
}
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 30%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
