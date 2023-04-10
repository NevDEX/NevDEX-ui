<template>
  <div class="section bg-gray-900 mx-0 my-[6pem]">
    <div class="title">
      <h2 class="mb-[4rem] text-center text-[3rem] text-white">Create and Sell Your NFTs</h2>
    </div>

    <div class="container p-[5rem] bg-[#232835] mx-auto rounded">
      <div class="ellipse"></div>
      <div class="content flex gap-[3rem]">
        <div v-for="(section, index) in sections" :key="{ index }"
          class="createAndSell p-[2rem] bg-[#ffffff34] space-y-6 rounded-md ">
          <div className="image">
            <!-- <img src="{image}" alt="create and sell" /> -->
          </div>
          <h3>{{ section.title }}</h3>
          <p>{{ section.description }}</p>

          <button class="bg-white px-[2rem] py-[1rem] border-none rounded-md" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sections: [
        {
          image: 'sell1',
          title: 'Create your collection',
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.',
          buttonText: 'Create',
        },
        {
          image: 'sell2',
          title: 'Add your NFTs',
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.',
          buttonText: 'Add NFT',
        },
        {
          image: 'sell3',
          title: 'List them for sale',
          description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.',
          buttonText: 'Sell Now',
        },
      ],
    }
  },
}
</script>

<style scoped>
.createAndSell {
  gap: 1rem;
}
</style>