<template>
  <div class="section bg-gray-900 pb-40">
    <div class="title text-white">
      <h2 class="mb-[4rem] text-center text-[3rem] mt-[30rem] py-20 font-bold">Create and Sell Your NFTs</h2>
    </div>

    <div class="container p-[5rem] bg-[#0e131f] mx-auto rounded ">
      <div class="ellipse"></div>
      <div class="content gap-[3rem] grid grid-cols-1 md:grid-cols-3 ">
        <div v-for="(section, index) in sections" :key="{ index }" class=" p-[2rem] bg-gray-900 space-y-6 rounded-md ">
          <div className="image">
            <!-- <img src="{image}" alt="create and sell" /> -->
          </div>
          <h3 class="text-white font-bold">{{ section.title }}</h3>
          <p>{{ section.description }}</p>
          <Button :text="section.buttonText" @click="onClick(section.buttonText)"></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue"
export default {
  components: { Button },
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
  methods: {
    onClick(button) {
      console.log('onclick', button)
      switch (button) {
        case "Create": this.$router.push({ name: 'create_collection', params: { id: 1 } })
        case "Add NFT":
        case "Sell Now":
      }
    }
  }
}
</script>



<style scoped>
.section {
  margin-top: 100px;
}

.createAndSell {
  gap: 1rem;
}
</style>