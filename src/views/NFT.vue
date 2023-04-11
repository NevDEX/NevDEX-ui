<template>
  <div class="container max-h-full flex flex-row mx-auto mt-20  ">
    <div class="absolute inset-x-0 md:top-10 min-h-0 pl-20 flex overflow-hidden z-0 py-60 pt-20 my-auato"><span
        class="block bg-[#ef233c] w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96"></span><span
        class="block bg-[#04868b] w-72 h-72 -ml-20 mt-40 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96 nc-animation-delay-2000"></span>
    </div>
    <div class="text-white h-full items-center justify-center flex flex-col my-auto ">
      <div class="text-3xl font-semibold md:text-4xl xl:text-5xl text-neutral-100   flex flex-col space-y-2">
        <span> The leading</span>
        <span> NFT Marketplace</span>
        <span> on Nervos Godwoken</span>
      </div>
      <p class=" mt-5 text-base xl:text-lg text-gray-400 max-w-lg">Mint & Trade the most outstanding NTFs in all
        topics of
        life with $NDX</p>
    </div>

    <div class="mx-auto "><img class="w-full" src="../assets/about-hero-right.png" alt="" /></div>
  </div>
  <CreateAndSell />
  <MarketPlace />
  <Footer />
</template>

<script>
import CreateAndSell from '../components/NFT/CreateAndSell.vue'
import MarketPlace from '../components/NFT/MarketPlace.vue'
import Footer from '../components/footer/Footer.vue'
export default {
  name: 'nft',
  components: { CreateAndSell, MarketPlace, Footer },
  data() {
    return {}
  },
}
</script>

<style></style>
