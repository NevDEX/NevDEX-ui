<template>
  <swiper
    :pagination="{
      type: 'progressbar',
    }"
    :navigation="true"
    :modules="modules"
    class="flex flex-row w-full"
  >
    <swiper-slide class="bg-gray-300 h-80 w-60">
      <div v-for="(nft, index) in nfs" :key="index" class="mx-auto my-auto border-[0.5px] border-stone-600 rounded-xl shadow-xl hover:shadow-blue-600 h-[24rem] w-[17rem]">
        <div class="w-full">
          <img :src="nft.image" alt="marketplace" @click="onItemClick" class="w-full" />
        </div>
        <div class="m-[10px]">
          <div class="name">
            <h4>{{ nft.name }}</h4>
            <!-- <BsThreeDots /> -->
          </div>
          <h6 class="username">@koolkishansheth</h6>
          <div class="price-container flex flex-row justify-between">
            <h5 class="price">5.5 NDX</h5>
            <!-- <FaEthereum /> -->
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
          name: 'Aiboi-meta',
        },
        {
          image: '/src/assets/nft/marketplace2.png',
          name: 'Pedram-mohamm...',
        },
        {
          image: '/src/assets/nft/marketplace3.png',
          name: 'Eduardo-pena',
        },
        {
          image: '/src/assets/nft/marketplace4.png',
          name: 'Daeho-cha',
        },
        {
          image: '/src/assets/nft/marketplace5.png',
          name: 'Justine-florentino',
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
