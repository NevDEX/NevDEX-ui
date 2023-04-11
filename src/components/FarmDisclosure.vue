<template>
  <div class="py-2 px-[47px] hidden lg:block">
    <Disclosure>
      <DisclosureButton class="py-8 w-full bg-gray-900 hover:shadow hover:shadow-blue-700" @click="onClick">
        <div class="wrap flex-row justify-center items-center text-white w-full px-20 lg:grid lg:grid-cols-8 hidden gap-1">
          <div class="flex">
            <img class="ml-10 h-[32px] z-0 rounded-full bg-gray-200" src="../assets/NDX.png" alt="" />
            <img class="h-8 z-10 rounded-ful" :src="getPairTokenImg(farm.pair)" alt="" />
          </div>

          <div class="flex flex-col items-start">
            <p class="font-bold text-gray-300">{{ farm.pair }}</p>
            <a :href="farm.link" target="_blank" class="text-xs text-gray-300 text-left underline"> {{ farm.pair }} LP</a>
          </div>
          <div class="flex flex-col text-gray-300 w-full text-sm text-left">
            Earned
            <span v-if="account !== 'Connect Wallet'" class="text-gray-500 font-bold text-xs">{{ $format(pending, 4) }} NDX</span>
            <span v-else class="text-gray-500">-</span>
          </div>
          <div class="flex flex-col text-gray-300 w-full text-sm text-left">
            APR
            <span class="text-gray-500 font-bold">{{ $format(apr, 2) }}%</span>
          </div>
          <div class="flex flex-col text-gray-300 w-full text-sm text-left">
            Liquidity
            <span class="text-gray-500 font-bold">${{ $format(poolLiquidityUsd, 4) }}</span>
          </div>
          <div class="flex flex-col text-gray-300 w-full text-sm text-left">
            Emission Rate
            <span class="text-gray-500 font-bold flex flex-row items-center">
              {{ $format(emissionRate, 0) }}
              <VTooltip>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-5 outline-none">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
                <template #popper>The amount of NDX generated per minute. </template>
              </VTooltip>
            </span>
          </div>
          <div class="flex flex-col text-gray-300 text-sm text-left">
            Multiplier
            <span class="text-gray-500 font-bold flex flex-row items-center">
              {{ multiplier }}x
              <VTooltip>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-5 outline-none">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
                <template #popper>
                  The Multiplier represents the proportion of NDX <br />
                  rewards each farm receives, as a proportion of the NDX<br />
                  produced each second. For example, if a 1x farm received <br />
                  1 NDX per second, a 40x farm would receive 40 NDX per second.<br />
                </template>
              </VTooltip>
            </span>
          </div>

          <div v-if="on" class="mx-auto w-full">
            <div class="h-5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-auto w-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </div>
          </div>
          <div v-else class="mx-auto w-full">
            <div class="h-5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-auto w-5 rotate-180">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </div>
          </div>
        </div>
      </DisclosureButton>
      <DisclosurePanel class="flex flex-row text-gray-900 items-center justify-center h-40 bg-gray-900">
        <div v-if="account !== 'Connect Wallet'">
          <div v-if="enabled" class="flex flex-row space-x-20 justify-center">
            <!-- <div class="flex flex-col text-gray-300 py-8">
              Unlocked
              <span class="text-gray-500">1000%</span>
            </div>
            <div class="flex flex-col text-gray-300 py-8">
              Locked
              <span class="text-gray-500">$200,000.00</span>
            </div> -->
            <div class="flex text-gray-300 items-center outline-gray-800 outline outline-[0.5px] px-6 py-8 shrink-0">
              <div class="flex flex-col w-full">
                <p class="text-left"><span class="text-blue-800 font-bold">NDX</span> EARNED</p>
                <span class="text-gray-500 font-bold"> {{ $format(pending, 4) }}</span>
              </div>
              <button class="ml-20 px-4 bg-gradient-to-r from-blue-500" @click="harvest">Harvest</button>
            </div>
            <div class="flex text-gray-300 outline-gray-800 outline outline-[0.5px] px-10 py-8">
              <div class="flex flex-col px-10 items-center my-auto">
                LP Staked
                <span>{{ $format(lpAmount, 4) }}</span>
              </div>
              <div class="flex flex-col px-10 h-full space-y-2">
                <button class="bg-gradient-to-r from-blue-500 w-8 h-8 rounded-full" @click="stake">+</button>
                <button class="bg-gradient-to-r from-blue-500 w-8 h-8 rounded-full" @click="unStake">-</button>
              </div>
            </div>
          </div>
          <div v-else class="flex flex-row space-x-20 justify-center">
            <div class="flex text-gray-300 items-center outline-gray-800 outline outline-[0.5px] px-10 py-8">
              <SpinnerButtonCls cls="px-10 bg-gradient-to-r h-10 w-40 from-blue-500 items-center flex justify-center" @click="onEnable" normalTxt="Enable" loadingTxt="Enabling" ref="enableButton" />
            </div>
          </div>
        </div>
        <div v-else class="flex flex-row space-x-20 justify-center">
          <div class="flex text-gray-300 items-center outline-gray-800 outline outline-[0.5px] px-10 py-8">
            <FarmConnectWallet />
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <StakeLP v-if="showStakeLP" :isOpen="showStakeLP" :farm="farm" @close="showStakeLP = false" ref="stake" />
    <UnStakeLP v-if="showUnStake" :isOpen="showUnStake" :farm="farm" @close="showUnStake = false" ref="unStake" />
  </div>

  <!-- mobile  -->
  <div class="lg:hidden mx-auto w-full pb-10 sm:px-[45px]">
    <div class="px-1">
      <Disclosure>
        <DisclosureButton class="py-3 w-full bg-gray-900 hover:shadow hover:shadow-blue-700" @click="onClick">
          <div class="px-4">
            <div class="flex flex-row text-left text-white items-center"><img class="h-5 z-0 rounded-full bg-gray-200" src="../assets/NDX.png" alt="" /> <img class="h-5 z-10 rounded-ful" :src="getPairTokenImg(farm.pair)" alt="" /><span class="ml-2">YOK-CKB</span></div>
            <div class="grid grid-cols-3 lg:hidden mt-1 text-gray-600">
              <div class="flex flex-col justify-center text-left">
                Earned
                <span>{{ $format(pending, 4) }}</span>
              </div>
              <div class="flex flex-col justify-center text-left">
                APR
                <span>{{ $format(apr, 2) }}%</span>
              </div>
              <div class="flex flex-col justify-center">
                <div v-if="on" class="mx-auto w-full">
                  <div class="h-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-auto w-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                  </div>
                </div>
                <div v-else class="mx-auto w-full">
                  <div class="h-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mx-auto w-5 rotate-180">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DisclosureButton>
        <DisclosurePanel class="flex flex-col text-gray-900 items-center justify-center bg-gray-900 space-y-6 py-4">
          <div class="flex text-gray-300 items-center outline-gray-800 outline outline-[0.5px] px-6 py-6 shrink-0 mt-2">
            <div class="flex flex-col w-full">
              <p class="text-left"><span class="text-blue-800 font-bold">NDX</span> EARNED</p>
              <span class="text-gray-500 font-bold"> {{ $format(pending) }}</span>
            </div>
            <button class="ml-20 px-4 bg-gradient-to-r from-blue-500" @click="harvest">Harvest</button>
          </div>

          <div class="flex text-gray-300 outline-gray-800 outline outline-[0.5px] py-4 px-10 mx-auto justify-between w-[88%]">
            <div class="flex flex-col items-center my-auto">
              LP Staked
              <span class="px-4">{{ $format(lpAmount, 4) }}</span>
            </div>
            <div class="flex flex-col">
              <button class="bg-gradient-to-r from-blue-500 w-8 h-8 rounded-full" @click="stake">+</button>
              <button class="bg-gradient-to-r from-blue-500 w-8 h-8 rounded-full" @click="unStake">-</button>
            </div>
          </div>

          <div class="flex text-gray-300 items-center outline-gray-800 w-full shrink-0 mt-2 px-8 flex-col space-y-1">
            <div class="flex text-white justify-between w-full">
              <span>APR </span>
              <span>{{ $format(apr, 2) }}%</span>
            </div>
            <div class="flex text-white justify-between w-full">
              <span>Multiplier </span>
              <span>{{ multiplier }}x</span>
            </div>
            <div class="flex text-white justify-between w-full">
              <span>Emission Rate </span>
              <span>{{ $format(emissionRate, 0) }} </span>
            </div>
            <div class="flex text-white justify-between w-full">
              <span>Liquidity </span>
              <span>${{ $format(poolLiquidityUsd, 4) }}</span>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>
<script>
import { getTokenCfg } from '../utils/token'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import StakeLP from './modal/StakeLP.vue'
import UnStakeLP from './modal/UnStakeLP.vue'
import { claimReward, approveMaster, getMasterAllowAllowance, getPoolUserInfo, pendingReward, getPoolInfo } from '../contract/farm'
import { mapGetters } from 'vuex'
import SpinnerButtonCls from './SpinnerButtonCls.vue'
import FarmConnectWallet from './FarmConnectWallet.vue'
export default {
  name: 'FarmDisclosure',
  components: [Disclosure, DisclosureButton, DisclosurePanel, StakeLP, UnStakeLP, SpinnerButtonCls, FarmConnectWallet],
  data() {
    return {
      tab: 'USDT',
      showStakeLP: false,
      showUnStake: false,
      enabled: false,
      lpAmount: 0,
      pending: 0,
      poolLiquidityUsd: 0,
      multiplier: 0,
      emissionRate: 0,
      apr: 0,
      on: false,
    }
  },
  watch: {
    async account(account, _) {
      await this.loadUserData()
    },
    farms(newVal, _) {
      let { enabled, lpAmount, pending } = newVal[this.farm.pid]
      this.enabled = enabled
      if (this.enabled) {
        this.lpAmount = lpAmount
        this.pending = pending
      }
    },
  },
  computed: {
    ...mapGetters(['account', 'farms']),
  },
  props: ['farm'],
  async mounted() {},
  async created() {
    console.log('farm', this.farm)
    await this.loadPoolData()
    if (this.account != 'Connect Wallet') {
      await this.loadUserData()
    }
  },
  methods: {
    async loadUserData() {
      let { lpAmount, pending, enabled } = this.farm
      this.enabled = enabled
      if (enabled) {
        this.lpAmount = lpAmount
        this.pending = pending
      }
    },
    async loadPoolData() {
      let { apr, poolLiquidityUsd, multiplier, emissionRate } = this.farm
      this.apr = apr ? apr : 0
      this.poolLiquidityUsd = poolLiquidityUsd
      this.multiplier = multiplier
      this.emissionRate = emissionRate
    },
    getPairTokenImg(lp) {
      return getTokenCfg(lp.split('-')[1])?.logoURI
    },
    stake() {
      this.showStakeLP = true
    },
    unStake() {
      this.showUnStake = true
    },
    async onEnable() {
      try {
        this.$refs.enableButton.isLoading = true
        await approveMaster(this.farm.lpAddress, this.account, 100000000000)
        await this.$store.dispatch('loadFarms', this.account)
        this.$refs.enableButton.isLoading = false
      } catch (error) {
        this.$refs.enableButton.isLoading = false
      }
    },
    async harvest() {
      await claimReward(this.farm.pid, this.account)
    },
    onClick() {
      this.on = !this.on
    },
    onConnectWallet() {},
  },
}
</script>

<style scoped></style>
