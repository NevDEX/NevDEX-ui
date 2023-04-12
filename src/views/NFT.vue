<template>
  <div class="container max-h-full flex flex-row mx-auto mt-20  ">
    <div class="absolute inset-x-0 md:top-10 min-h-0 pl-20 flex overflow-hidden z-0 py-60 pt-20 my-auato"><span
        class="block bg-[#ef233c] w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96"></span><span
        class="block bg-[#04868b] w-72 h-72 -ml-20 mt-40 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96 nc-animation-delay-2000"></span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 px-4 md:px-0">
      <div class="text-white h-full items-center justify-center flex flex-col my-auto ">
        <div class="text-5xl font-semibold md:text-4xl xl:text-5xl text-neutral-100 flex flex-col space-y-2 w-full">
          <span> The leading</span>
          <span> NFT Marketplace</span>
          <span> on Nervos Godwoken</span>
        </div>
        <p class="mt-5 text-base xl:text-lg text-gray-400 w-full">Mint & Trade the most outstanding NTFs in all
          topics of
          life with $NDX
        </p>
        <div class="flex justify-items-start w-full mt-4 space-x-6">
          <Button text="Create" @click="onClick(section.buttonText)"></Button>
          <Button text="Explore" @click="onClick(section.buttonText)"></Button>
        </div>
      </div>
      <div class="mx-auto mt-28 md:mt-0 ">
        <BannerGroup />

        <div class="h-[5px] mt-2 flex justify-center space-x-3">
          <span class="bg-gray-300 h-full w-5 rounded block"></span>
          <span class="bg-gray-300 h-full w-5 rounded block"></span>
          <span class="bg-gray-300 h-full w-5 rounded block"></span>
          <span class="bg-gray-300 h-full w-5 rounded block"></span>
          <span class="bg-gray-300 h-full w-5 rounded block"></span>
          
        </div>
        <!-- <img class="w-full" src="../assets/about-hero-right.png" alt="" /> -->
      </div>
    </div>
  </div>
  <CreateAndSell />
  <MarketPlace />
  <Footer />
</template>

<script>
import CreateAndSell from '../components/NFT/CreateAndSell.vue'
import MarketPlace from '../components/NFT/MarketPlace.vue'
import Footer from '../components/footer/Footer.vue'
import Button from '../components/NFT/Button.vue'
import BannerGroup from '../components/NFT/BannerGroup.vue'

export default {
  name: 'nft',
  components: { CreateAndSell, MarketPlace, Footer, Button, BannerGroup },
  data() {
    return {}
  },
}
</script>

<style  scoped>
.swiper-pagination {
  position: absolute;
  text-align: center;
  transform: translateZ(0);
  transition: opacity .3s;
  z-index: 10;
}

.swiper-pagination-bullet {
  height: 200px;
  background-color: bisque;
}
</style>
