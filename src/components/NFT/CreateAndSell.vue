<template>
  <div class=" bg-[#0e131f]">
    <div class="text-white container mx-auto pb-40 px-20">
      <div class="title text-white py-20">
        <h2 class="  text-[3rem] font-bold bzxyHv">Create and Sell Your NFTs</h2>
      </div>
      <div class="bg-gray-90 rounded w-full mx-auto">
        <div class=" gap-[3rem] grid grid-cols-1 md:grid-cols-3 ">
          <div v-for="(section, index) in sections" :key="{ index }" class=" p-[2rem] bg-gray-900 space-y-6 rounded-md ">
            <div className="image">

            </div>
            <h3 class="text-white font-bold">{{ section.title }}</h3>
            <p>{{ section.description }}</p>
            <Button :text="section.buttonText" @click="onClick(section.buttonText)"></Button>
          </div>
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
        case "Create":
          this.$router.push({ name: 'create_collection', params: { id: 1 } })
          break
        case "Add NFT":
          this.$router.push({ name: 'create_nft', params: { id: 1 } })
          break
        case "Sell Now":
      }
    }
  }
}
</script>



<style scoped>
.bzxyHv {
  line-height: 1;
  position: relative;
  margin: 0.1rem .5rem 1rem;
  font-size: 2.5rem;
  display: block;
  text-decoration: none;
  color: inherit;
  font-weight: 900;
  text-align: left;
  width: fit-content;
  transition: color 0.1s ease 0s, transform 0.1s ease 0s;
  padding: 0.2rem;
  text-shadow: -0.2rem 0.1rem 0 var(--app-theme-primary);
}

.bzxyHv::before {
  content: "";
  height: 100%;
  width: 120%;
  background-image: radial-gradient(rgba(187, 187, 195, 0.35) 0.75px, transparent 0.75px);
  background-size: calc(7.5px) calc(7.5px);
  z-index: 0;
  position: absolute;
  transform: translate(-0.75rem, 0.75rem);
}
</style>