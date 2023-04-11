<template>
  <div class="section bg-gray-900 px-20 my-[6pem] text-white py-20">
    <div class="title">
      <h2 class="text-center text-[3rem]">NFT Marketplace</h2>
      <p class="text-center">Explore the NFTs in the most featured categories.</p>
    </div>

    <div class="marketPlaceTypes flex justify-center gap-7 py-10">
      <button class="h-2 px-6 py-4 bg-slate-300 rounded-md" />
      <button class="h-2 px-6 py-4 bg-slate-300 rounded-md" />
      <button class="h-2 px-6 py-4 bg-slate-300 rounded-md" />
      <button class="h-2 px-6 py-4 bg-slate-300 rounded-md" />
      <button class="h-2 px-6 py-4 bg-slate-300 rounded-md" />
    </div>

    <div class="marketPlaces mx-auto grid grid-cols-4 gap-y-10">
      <div v-for="(nft, index) in marketPlaceData" :key="index" class="mx-auto my-auto" @click="onItemClick">
        <div class="image">
          <img :src="nft.image" alt="marketplace" />
        </div>
        <div class="name">
          <h4>{{ nft.name }}</h4>
          <!-- <BsThreeDots /> -->
        </div>
        <h6 class="username">@koolkishansheth</h6>
        <div class="price-container">
          <h5 class="price">5.5ETH</h5>
          <!-- <FaEthereum /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    }
  },
  methods: {
    onItemClick() {
      // this.$router.push({ name: 'nft_collection', params: { id: 1 } })
      this.$router.push({ name: 'nft_detail', params: { id: 1 } })
      console.log('onItemClick')
    },
  },
}
</script>

<style scoped>
</style>