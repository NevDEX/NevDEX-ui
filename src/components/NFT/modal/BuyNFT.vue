<template>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" class="relative z-10">
        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
          leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>
  
        <div class="fixed inset-0">
          <div class="flex min-h-full items-center justify-center px-4 text-center w-96 mx-auto">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95">
              <DialogPanel
                class="w-full max-w-md transform rounded-sm bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  <div class="text-white">Buy NFT</div>
                  <button type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                    data-modal-toggle="crypto-modal" @click="onClose">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </button>
                </DialogTitle>
              
  
                <div>
                  <div class="mt-4 flex justify-between text-white">
                    <div class="py-4">Total Price</div>
                    <div class="py-4">Balance: {{ $format(lpAmount, 4) }}</div>
                  </div>
                </div>
  
                <div>
                 
                </div>
  
                <div class="flex justify-evenly space-x-1 w-full mt-5">
                  <SpinnerButtonCls
                    cls="px-5 py-3 text-white w-full bg-blue-700 hover:bg-blue-800 text-center items-center flex justify-center"
                    @click="onConfirm" normalTxt="Confirm" loadingTxt="Confirming" ref="unStakeButton" />
                
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script>
  import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
  import { mapGetters } from 'vuex'
  import SpinnerButtonCls from '../../SpinnerButtonCls.vue'
  import { ethers } from 'ethers';
  
  export default {
    name: 'BuyNFT',
    components: {
      TransitionRoot,
      TransitionChild,
      Dialog,
      DialogPanel,
      DialogTitle,
      SpinnerButtonCls,
    },
    computed: {
      ...mapGetters(['account']),
    },
    props: ['isOpen'],
    data() {
      return {
        
      }
    },
  
    async mounted() {
     
    },
    async created() {
      // console.log('unstake mounted', this.farm)
      // let ret = await getPoolUserInfo(this.farm.pid, this.account)
      // console.log('userInfo rewardDebt', Number(ret.rewardDebt) / 10 ** 18)
      // console.log(Number(ret.amount))
      // this.lpAmount = Number(ret.amount) / 10 ** 18
      // this.withdrawPercent = await withdrawFeePercent(this.farm.pid)
    },
    methods: {
      onClose() {
        this.$emit('close')
      },
      onMax() {
        this.amount = this.$format(this.lpAmount, 4)
      },
      async onConfirm() {
      
      },
    },
  }
  </script>
  