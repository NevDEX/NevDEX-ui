<template>
  <main>
    <div class="container flex flex-col mx-auto">
      <div class="h-1/6 relative">
        <img alt="Banner Image" class="object-cover h-60 min-w-full" :src="bannerImg" style="object-fit: cover" />
        <div class="absolute pos" style="width: 120px; height: 120px">
          <img alt="" class="inline-block rounded-full" :src="coverImg" style="object-fit: cover" />
        </div>
      </div>
      <span class="title text-center text-5xl mt-20">{{ title }}</span>
      <span class="title text-center text-gray-500 text-sm mt-5">{{ description }}</span>
      <div v-if="loaded">
        <div class="pb-10 h-5/6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 mt-10">
          <div v-for="item in nfts" :key="item.id">
            <NFTItem :item="item" @click="$router.push({ name: 'Sell', params: item })" />
          </div>
          <div v-if="showCreate"
            class="bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 h-96"
            style="width: auto">
            <div class="px-8 flex flex-col justify-center text-center">
              <div class="font-bold text-xl py-5">Create New NFT</div>
              <div class="mt-1 flex justify-center pt-2 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="text-center">
                  <svg class="mx-auto h-40 w-20 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"
                    aria-hidden="true">
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
              </div>
              <div class="py-4 mt-2">
                <button class="mt-4 px-2 py-3 bg-blue-400 text-white rounded"
                  @click="$router.push({ name: 'create_nft', params: { contractAddress: contractAddress } })">Create New
                  NFT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="pb-10 h-5/6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 mt-10">
          <div class="h-96 bg-gray-300 animate-pulse rounded-md"></div>
          <div class="h-96 bg-gray-300 animate-pulse rounded-md"></div>
          <div class="h-96 bg-gray-300 animate-pulse rounded-md"></div>
          <div class="h-96 bg-gray-300 animate-pulse rounded-md"></div>
          <div class="h-96 bg-gray-300 animate-pulse rounded-md"></div>
          <div class="h-96 bg-gray-300 animate-pulse rounded-md"></div>
          <div class="h-96 bg-gray-300 animate-pulse rounded-md"></div>
          <div class="h-96 bg-gray-300 animate-pulse rounded-md"></div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  data() {
    return {
      bannerImg: "https://cloudflare-ipfs.com/ipfs/QmNmnJrPNCScbHpyHssMcbxzoLUbbT9AR4USGYDsE86ji4"
    }
  },
  mounted() {
    console.log(this.$route.params)
  },
}
</script>

<style scoped></style>