<template>
  <swiper
    class="swiper bg-transparent h-[60%] 2xl:h-[50%]"
    :modules="modules"
    :space-between="20"
    :slides-per-view="3"
    :pagination="{ clickable: true }"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
  >
    <swiper-slide class=""><img class="object-cover w-full h-[90%] transition-all duration-300 m-auto rounded-3xl dark:border dark:border-gray-800" src="https://ipfs.bluemove.io/uploads/sui-bears/avatar1.gif" /></swiper-slide>
    <swiper-slide class=""><img class="object-cover w-full h-[90%] transition-all duration-300 m-auto rounded-3xl dark:border dark:border-gray-800" src="https://ipfs.bluemove.io/uploads/sui-bunnies/avatar.gif" /></swiper-slide>
    <swiper-slide class=""><img class="object-cover w-full h-[90%] transition-all duration-300 m-auto rounded-3xl dark:border dark:border-gray-800" src="https://ipfs.bluemove.io/uploads/sui-punks/avatar.gif" /></swiper-slide>
    <swiper-slide class=""><img class="object-cover w-full h-[90%] transition-all duration-300 m-auto rounded-3xl dark:border dark:border-gray-800" src="https://ipfs.bluemove.io/uploads/gozi-kong/avatar1.gif" /></swiper-slide>
    <!-- <swiper-slide class=""><img class="object-cover w-full h-[90%] transition-all duration-300 m-auto rounded-3xl dark:border dark:border-gray-800" src="/src/assets/nft/marketplace4.png" /></swiper-slide>
    <swiper-slide class=""><img class="object-cover w-full h-[90%] transition-all duration-300 m-auto rounded-3xl dark:border dark:border-gray-800" src="/src/assets/nft/marketplace5.png" /></swiper-slide>
    <swiper-slide class=""><img class="object-cover w-full h-[90%] transition-all duration-300 m-auto rounded-3xl dark:border dark:border-gray-800" src="/src/assets/nft/marketplace6.png" /></swiper-slide> -->
  </swiper>
</template>
  
<script  >
import { defineComponent } from 'vue'
import { Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'

export default defineComponent({
  name: 'swiper-example-multiple-slides-per-biew',
  title: 'Multiple slides per view',
  url: import.meta.url,
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination, Autoplay],
    }
  },
})
</script>
<style scoped>
</style>