<template>
  <div class="flex flex-row m-auto container h-screen px-20">
    <div class="absolute inset-x-0 md:top-10 min-h-0 pl-20 flex overflow-hidden z-0 py-60 pt-20"><span class="block bg-[#ef233c] w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96"></span><span class="block bg-[#04868b] w-72 h-72 -ml-20 mt-40 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96 nc-animation-delay-2000"></span></div>
    <div class="grid grid-cols-1 md:grid-cols-2 md:px-0 w-full z-10">
      <div class="text-white items-center mt-40 flex-inline flex-col">
        <div class="text-5xl font-semibold md:text-4xl xl:text-5xl text-neutral-100 flex flex-col space-y-2 w-full">
          <span> The leading</span>
          <span> NFT Marketplace</span>
          <span> on Godwoken</span>
        </div>
        <p class="text-base xl:text-lg text-gray-400 mt-10">
          Mint & Trade the most outstanding NTFs in all topics of<br />
          life with $NDX
        </p>
        <div class="flex justify-items-start w-full mt-10 space-x-6 z-10">
          <Button text="Create" @click="onCreate()"></Button>
          <Button text="Explore" @click="onExplore()"></Button>
        </div>
      </div>

      <div class="mt-40 px-2">
        <BannerGroup />
        <!-- <div class="h-[5px] mt-3 flex justify-center space-x-3">
                    <span class="bg-gray-600 h-full w-5 rounded block"></span>
                    <span class="bg-gray-600 h-full w-5 rounded block"></span>
                    <span class="bg-gray-600 h-full w-5 rounded block"></span>
                    <span class="bg-gray-600 h-full w-5 rounded block"></span>
                    <span class="bg-gray-600 h-full w-5 rounded block"></span>
                </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onCreate() {
      console.log('onCreate')
      const position = document.getElementById('create').offsetTop
      window.scrollTo({ top: position, behavior: 'smooth' })
      this.$nextTick(function () {
        window.scrollTo({ behavior: 'smooth', top: position })
      })
    },
    onExplore() {
      const position = document.getElementById('market').offsetTop
      // smooth scroll
      window.scrollTo({ top: position, behavior: 'smooth' })
      this.$nextTick(function () {
        window.scrollTo({ behavior: 'smooth', top: position })
      })
    },
  },
}
</script>

<style></style>
