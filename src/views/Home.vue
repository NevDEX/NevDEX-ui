<template>
  <Hero />
  <div class="container mx-auto">
    <div class="flex mt-20 h-full">
      <div class="w-2/3">
        <img class="px-20 drop-shadow-lg bg" src="../assets/screen_shot.png" alt="screen_shot" />
      </div>
      <div class="w-1/3 text-white my-auto">
        <div class="space-y-6">
          <div class="text-3xl">Unlock the full potential of on-chain trading</div>
          <div class="text-gray-500">NevDEX strives to meet the demands of both professional and newbie traders by combining the best of CeFi and DeFi in a single product.</div>
        </div>
      </div>
    </div>
    <!-- middle -->
    <div>
      <div class="pb-10 h-5/6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 mt-20 max-w-6xl mx-auto">
        <div class="p-6 max-w-sm bg-gray-800 rounded-lg border border-gray-900 shadow-md h-80">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          <a href="#">
            <h5 class="my-2 text-2xl font-bold tracking-tight text-gray-200">FOR TRADERS:</h5>
          </a>
          <p class="mb-2 font-normal text-gray-500">Instant Transactions</p>
          <p class="mb-2 font-normal text-gray-500">Order Book Matching</p>
          <p class="mb-2 font-normal text-gray-500">Deep Liquidity Low Fees</p>
        </div>
        <div class="p-6 max-w-sm bg-gray-800 rounded-lg border border-gray-900 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <a href="#">
            <h5 class="my-2 text-2xl font-bold tracking-tight text-gray-200">FOR MARKET MAKERS:</h5>
          </a>
          <p class="mb-2 font-normal text-gray-500">Fast API</p>
          <p class="mb-2 font-normal text-gray-500">Trade To Earn</p>
        </div>
        <div class="p-6 max-w-sm bg-gray-800 rounded-lg border border-gray-900 shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
          </svg>
          <a href="#">
            <h5 class="my-2 text-2xl font-bold tracking-tight text-gray-200">FOR NFT & DEFI LOVERS:</h5>
          </a>
          <p class="mb-2 font-normal text-gray-500">Utility NFT Collection</p>
          <p class="mb-2 font-normal text-gray-500">Mint and Trade</p>
          <p class="mb-2 font-normal text-gray-500">Yield Farming Program</p>
        </div>
      </div>
    </div>
    <Animation />
    <!-- middle end -->
    <div class="flex justify-center mb-20 mt-20 flex-col items-center">
      <span class="text-gray-50 font-bold text-3xl"> Our partners </span>
      <div class="mt-10">
        <img class="h-20 rounded-md" src="../assets/nervos_logo.jpg" alt="nervos_logo" />
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Footer from '../components/footer/Footer.vue'
import Animation from '../components/Animation.vue'
import Hero from '../components/Hero.vue'
export default {
  components: { Footer, Animation, Hero },
}
</script>

<style scoped></style>
