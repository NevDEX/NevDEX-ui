<template>
  <div class="bg-gradient-to-b from-gray-900 to-gray-800 pt-10">
    <div class="container m-auto">
      <div class="grid grid-cols-2 gap-8 py-6 px-6 md:grid-cols-4">
        <div>
          <div class="w-[80px] md:ml-20 -mt-2" style="">
            <img src="../../assets/logo.png" />
          </div>
          <span class="text-gray-400 text-sm w-30 flex-wrap"
            >A decentralized exchange platform built
            <br />
            on Nervos Blockchain.
          </span>
        </div>
        <div>
          <h2 class="mb-6 text-sm font-semibold text-gray-400 uppercase">PRODUCTS</h2>
          <ul class="text-gray-300">
            <li class="mb-4">
              <a href="https://docs.nevdex.tech/products/exchange" target="_blank" class="hover:underline">Exchange</a>
            </li>
            <li class="mb-4">
              <a href="javascript:void(0)" class="hover:underline">Farm</a>
            </li>
            <li class="mb-4">
              <a href="javascript:void(0)" class="hover:underline">NFT Store </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="mb-6 text-sm font-semibold text-gray-400 uppercase">RESOURCES</h2>
          <ul class="text-gray-300">
            <li class="mb-4">
              <a href="https://docs.nevdex.tech/" target="_blank" class="hover:underline">Docs</a>
            </li>
            <li class="mb-4">
              <a href="https://github.com/NevDEX" target="_blank" class="hover:underline">GitHub</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 class="mb-6 text-sm font-semibold text-gray-400 uppercase">FOLLOW US</h2>
          <ul class="text-gray-300">
            <li class="mb-4">
              <a href="https://twitter.com/NevDEX_" target="_blank" class="hover:underline">Twitter</a>
            </li>
            <li class="mb-4">
              <a href="https://discord.gg/U5S86gJePS" target="_blank" class="hover:underline">Discord</a>
            </li>
            <li class="mb-4">
              <a href="https://medium.com/@NevDEX" target="_blank" class="hover:underline">Medium</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="py-4 px-4 bg-transparent md:flex md:items-center ">
        <span class="text-sm text-gray-300 sm:text-center">© {{ this.year }} <a href="#">NevDEX™</a>. All Rights Reserved. </span>
         
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      year: '',
    }
  },
  mounted() {
    this.year = new Date().getFullYear()
  },
}
</script>

<style></style>
