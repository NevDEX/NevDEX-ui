<template>
  <div class="mx-60 my-60">
    <h1 class="text-gray-200 text-3xl font-bold">More from this collection</h1>
    <div class="mt-8 grid grid-flow-col-dense gap-20">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  methods: {},
  mounted() {},
}
</script>

<style></style>
