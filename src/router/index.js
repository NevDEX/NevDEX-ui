import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Trade from '../views/Trade.vue'
import Faucet from '../views/Faucet.vue'
import Farm from '../views/Farm.vue'
import Asset from '../views/Asset.vue'
import NFT from '../views/NFT.vue'
import NFTCollection from '../components/NFT/NFTCollection.vue'
import NFTDetail from '../components/NFT/NFTDetail.vue'
import CreateCollection from '../components/NFT/CreateCollection.vue'
import CreateNFT from '../components/NFT/CreateNFT.vue'
import NFTSell from '../components/NFT/NFTSell.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/trade',
    name: 'trade',
    component: Trade,
  },
  {
    path: '/faucet',
    name: 'faucet',
    component: Faucet,
  },
  {
    path: '/farm',
    name: 'farm',
    component: Farm,
  },
  {
    path: '/asset',
    name: 'asset',
    component: Asset,
  },
  {
    path: '/nft',
    name: 'nft',
    component: NFT,
  },
  {
    path: '/nft/collection',
    name: 'nft_collection',
    component: NFTCollection,
  },
  {
    path: '/nft/detail',
    name: 'nft_detail',
    component: NFTDetail,
  },
  {
    path: '/nft/create_collection',
    name: 'create_collection',
    component: CreateCollection,
  },
  {
    path: '/nft/create',
    name: 'create_nft',
    component: CreateNFT,
  },
  {
    path: '/nft/sell',
    name: 'sell_nft',
    component: NFTSell,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to, from, next) => {
  window, scrollTo(0, 0)
})

export default router
