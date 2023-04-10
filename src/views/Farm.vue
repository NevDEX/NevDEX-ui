<template>
  <div class="mt-10 w-full text-center rounded-lg shadow-md sm:p-8 bg-[#0e131f] container mx-auto mb-40 px-4">
    <h5 class="pt-5 md:pt-0 mb-2 text-3xl font-bold text-white text-left">Dash board</h5>
    <div class="flex flex-row mb-10">
      <img class="" src="https://farms.idex.io/static/media/flame.a7bbadef769772788e08f7f034fa4945.svg" alt="" />
      <p class="pl-3 text-base text-gray-500 sm:text-lg dark:text-gray-400 text-left">Stake LP tokens and earn token
        rewards</p>
    </div>

    <div class="mx-auto grid lg:grid-cols-2">
      <div class="h-[450px] flex flex-col text-2xl rounded-lg text-white">
        <div class="mx-1 sm:mx-12 py-12 space-y-10 bg-[#111827] h-full">
          <div class="px-12 flex justify-between text-gray-400">
            <span>NDX Price</span>
            <span v-if="account !== 'Connect Wallet'" class="font-bold">${{ $format(ndx.price || 0, 4) }}</span>
            <span v-else class=" ">-</span>
          </div>
          <div class="px-12 flex flex-col text-gray-400 space-y-2">
            <span class="text-left">NDX to Harvest</span>

            <div class="flex justify-between items-center">
              <span v-if="account !== 'Connect Wallet'" class="text-xl">{{ $format(ndx.toHarvest || 0, 4) }}</span>
              <span v-else class=" ">-</span>
              <span v-if="account !== 'Connect Wallet'" class="text-sm">${{ $format(ndx.toHarvest * ndx.price || 0, 4)
              }}</span>
              <span v-else class=" ">-</span>
            </div>
          </div>
          <div class="px-12 flex flex-col text-gray-400 space-y-2">
            <span class="text-left">NDX in Wallet</span>
            <div class="flex justify-between items-center">
              <span v-if="account !== 'Connect Wallet'" class="text-xl">{{ $format(ndx.inWallet || 0) }}</span>
              <span v-else class=" ">-</span>
              <span v-if="account !== 'Connect Wallet'" class="text-sm">${{ $format(ndx.inWallet * ndx.price || 0, 4)
              }}</span>
              <span v-else class=" ">-</span>
            </div>
          </div>
          <div class="py-2 px-20">
            <SpinnerButtonCls
              cls="bg-gradient-to-r w-full from-blue-700 text-gray-50 hover:bg-slate-200 flex items-center py-2 mx-auto justify-center"
              @click="onHarvest" normalTxt="Harvest" loadingTxt="Harvesting" ref="btnHarvest"></SpinnerButtonCls>
          </div>
        </div>
      </div>

      <div class="h-[450px] flex flex-col text-2xl rounded-lg text-white mt-10 lg:mt-0">
        <div class="mx-1 sm:mx-12 py-12 space-y-10 bg-[#111827] h-full">
          <div class="px-12 flex flex-col text-gray-400 space-y-2">
            <span class="text-left">Locked Balance</span>
            <div class="flex justify-between items-center">
              <span v-if="account !== 'Connect Wallet'" class="text-xl">{{ $format(ndx.locked || 0, 4) }}</span>
              <span v-else class=" "></span>
              <span v-if="account !== 'Connect Wallet'" class="text-sm">${{ $format(ndx.locked * ndx.price || 0, 4)
              }}</span>
              <span v-else class=" ">-</span>
            </div>
          </div>

          <div class="px-12 flex flex-col text-gray-400 space-y-2">
            <span class="text-left">UnLocked Balance</span>
            <div class="flex justify-between items-center">
              <span v-if="account !== 'Connect Wallet'" class="text-xl">{{ ndx.unlocked || 0 }}</span>
              <span v-else class=" "></span>
              <span v-if="account !== 'Connect Wallet'" class="text-sm">${{ $format(ndx.unlocked * ndx.price || 0, 4)
              }}</span>
              <span v-else class=" ">-</span>
            </div>
          </div>

          <div class="pt-[80px] px-20 py-2">
            <SpinnerButtonCls
              cls="bg-gradient-to-r w-full from-blue-700 text-gray-50 hover:bg-slate-200 flex items-center py-2 mx-auto justify-center"
              @click="onClaim" normalTxt="Claim" loadingTxt="Claim" ref="btnClaim"></SpinnerButtonCls>
          </div>
        </div>
      </div>
    </div>

    <div v-if="farms.length > 0" class="mt-10">
      <div class="" v-for="(farm, index) in farms" :key="index">
        <FarmDisclosure :farm="farm" />
      </div>
    </div>
    <div v-else>
      <div class="h-60 flex justify-center items-center text-white">
        <svg class="mr-3 h-5 w-5 animate-spin text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
          </path>
        </svg>
      </div>
    </div>
  </div>
  <TradeFooter />
</template>
<script>
import FarmDisclosure from '../components/FarmDisclosure.vue'
import TradeFooter from '../components/footer/TradeFooter.vue'
import { CONFIG } from '../config/config'
import { getNDXAmount, claimReward, claimRewards } from '../farm'
import { ethers } from 'ethers'
import { Contract, Provider, setMulticallAddress } from 'ethers-multicall'
import { mapGetters } from 'vuex'
import MasterGardener from '../abi/MasterGardener.json'
import SpinnerButtonCls from '../components/SpinnerButtonCls.vue'
export default {
  name: 'faucet',
  components: [FarmDisclosure, TradeFooter, SpinnerButtonCls],
  computed: {
    ...mapGetters(['market', 'account', 'farms', 'ndx']),
  },
  data() {
    return {
      farmCfg: CONFIG.Farms,
      ndxAmount: 0,
      toHarvest: 0,
      locked: 0,
      unlocked: 0,
    }
  },
  watch: {
    async account(account, _) {
      console.log('Farm account', this.account)
      await this.$store.dispatch('loadFarms', this.account)
      await this.loadData()
    },
    farms(newVal, oldVal) {
      console.log('Farm.vue farms changed', newVal, oldVal)
    },
  },
  async created() {
    this.$store.dispatch('loadFarms', this.account)
    setMulticallAddress(71401, CONFIG.MultiCallAddress)
    await this.loadData()
  },
  methods: {
    async loadData() {
      const { ethereum } = window
      const provider = new ethers.providers.Web3Provider(ethereum)
      const multiCall = new Provider(provider, 71401)
      await multiCall.init() // Only required when `chainId` is not provided in the `Provider` constructor

      this.toHarvest = Number(0)
      let calls = []
      const master = new Contract(CONFIG.MasterGardener, MasterGardener.abi)
      for (let i = 0; i < this.farms.length; i++) {
        calls.push(master.pendingReward(this.farms[i].pid, this.account))
      }
      this.toHarvest = Number(ethers.utils.formatEther((await multiCall.all(calls)).reduce((partialSum, a) => partialSum + Number(a), 0)))

      let { inWallet, locked, unlocked } = await getNDXAmount(this.account)
      this.ndxAmount = Number(ethers.utils.formatEther(inWallet))
      this.locked = Number(ethers.utils.formatEther(locked))
     this.unlocked = Number(ethers.utils.formatEther(unlocked))
    },
    async onHarvest() {
      try {
        let pids = [0]
        this.$refs.btnHarvest.isLoading = true
        await claimRewards(pids)
        this.$refs.btnHarvest.isLoading = false
        await this.$store.dispatch('loadFarms', this.account)
        await this.loadData()
      } catch (error) {
        this.$refs.btnHarvest.isLoading = false
      }
    },
    async onClaim() {
      try {
        this.$refs.btnClaim.isLoading = true
        await claimReward(0, this.account)
        this.$refs.btnClaim.isLoading = false
      } catch (error) {
        this.$refs.btnClaim.isLoading = false
      }
    },
  },
}
</script>

<style scoped></style>
