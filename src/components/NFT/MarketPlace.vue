<template>
  <div class="container mx-auto bg-[#131a29] px-20 my-[6pem] text-white py-40">
    <div class="title">
      <h2 class="text-center text-[3rem]">NFT Marketplace</h2>
      <p class="text-center">Explore the NFTs in the most featured categories.</p>
    </div>

    <div class="marketPlaceTypes flex justify-center gap-7 py-10">
      <Button v-for="(txt, index) in tags" :key="index" :text="txt"></Button>
    </div>

    <div class="marketPlaces mx-auto grid grid-cols-4 gap-y-10">
      <div v-for="(nft, index) in marketPlaceData" :key="index"
        class="mx-auto my-auto border-[0.5px] border-stone-600 rounded-xl">

        <div class="image">
          <img :src="nft.image" alt="marketplace" @click="onItemClick" />
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
    </div>
  </div>

  <BuyNFT v-if="showBuyNFT" :isOpen="showBuyNFT" :farm="farm" @close="showBuyNFT = false" ref="buyNFT" />
</template>

<script>
import BuyNFT from "./modal/BuyNFT.vue"
import Button from "./Button.vue"
export default {
  components: { BuyNFT, Button },
  data() {
    return {
      marketPlaceData: [
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
        {
          image: '/src/assets/nft/marketplace6.png',
          name: 'Hoang-l-p-solan',
        },
        {
          image: '/src/assets/nft/marketplace7.png',
          name: 'Joshua-jay',
        },
        {
          image: '/src/assets/nft/marketplace8.png',
          name: 'Joshua-jay',
        },
      ],
      tags: [
        "All",
        "Art",
        "Common",
        "Trading",
        "Rare",
      ],
      showBuyNFT: false,
    }
  },
  methods: {
    onItemClick() {
      // this.$router.push({ name: 'nft_collection', params: { id: 1 } })
      this.$router.push({ name: 'nft_detail', params: { id: 1 } })
      console.log('onItemClick')
    },
    onBuy() {
      console.log('onBuy')
      this.showBuyNFT = true
    }
  },
}
</script>

<style scoped></style>