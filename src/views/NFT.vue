<template>
  <NFTHero />
  <CreateAndSell />
  <MarketPlace />
  <Footer /> 
</template>

<script>
import NFTHero from '../components/NFT/NFTHero.vue'
import CreateAndSell from '../components/NFT/CreateAndSell.vue'
import MarketPlace from '../components/NFT/MarketPlace.vue'
import Footer from '../components/footer/Footer.vue'
import Button from '../components/NFT/Button.vue'
import BannerGroup from '../components/NFT/BannerGroup.vue'

export default {
  name: 'nft',
  components: { NFTHero, CreateAndSell, MarketPlace, Footer, Button, BannerGroup },
  data() {
    return {}
  },
}
</script>

<style  scoped></style>
