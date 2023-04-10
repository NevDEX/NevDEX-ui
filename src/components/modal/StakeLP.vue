<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0">
        <div class="flex min-h-full items-center justify-center px-4 text-center w-96 mx-auto">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
            <DialogPanel class="w-full max-w-md transform rounded bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                <div class="text-white">Stake LP</div>
                <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="crypto-modal" @click="onClose">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
              </DialogTitle>

              <div class="flex justify-center text-white py-4">Deposit fee is:0%</div>

              <div>
                <div class="mt-4 flex justify-between text-white">
                  <div class="py-4">Stake</div>
                  <div class="py-4">Balance: {{ $format(lpAmount, 4) }}</div>
                </div>
              </div>

              <div>
                <div class="mt-4 flex justify-between text-white items-center">
                  <div class="py-4">
                    <input type="number" class="sm:text-sm text-gray-50 border-none text-center bg-gray-900" step="0.001" v-model="stakeAmount" :min="0" oninput="if(value<0)value=0" />
                  </div>
                  <button class="py-1 px-3 rounded-lg bg-slate-900" @click="onMax">Max</button>
                  <span class="text-sm">NDX-CKB </span>
                </div>
              </div>

              <div class="flex justify-evenly space-x-1 w-full mt-5">
                <SpinnerButtonCls cls="px-5 py-3 text-white w-1/2 bg-blue-700 hover:bg-blue-800 text-center items-center flex justify-center" @click="onConfirm" normalTxt="Stake" loadingTxt="Staking" ref="stakeButton" />
                <button class="bg-slate-200 px-5 py-3 w-1/2" @click="onClose">Cancel</button>
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
import { getGovToken, getLPAmount, depositPool } from '../../farm'
import SpinnerButtonCls from '../SpinnerButtonCls.vue'
export default {
  name: 'StakeLP',
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
  props: ['isOpen', 'farm'],
  data() {
    return {
      lpAmount: 0,
      stakeAmount: 0,
    }
  },
  created() {},
  async created() {
    let lpAmount = await getLPAmount(this.account, this.farm.lpAddress)
    // console.log('33333333333333', this.farm.lpAddress, lpAmount)
    this.lpAmount = lpAmount
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
    onMax() {
      this.stakeAmount = this.$format(this.lpAmount, 4)
    },
    async onConfirm() {
      try {
        this.$refs.stakeButton.isLoading = true
        await depositPool(this.farm.pid, this.stakeAmount)
        this.$refs.stakeButton.isLoading = false
        // console.log('onConfirm', 'pid', this.farm.pid, 'stakeAmount', this.stakeAmount)
        await this.$store.dispatch('loadFarms', this.account)
      } catch (error) {
        this.$refs.stakeButton.isLoading = false
        console.error('Stake LP error', error)
      }
    },
  },
}
</script>

<style scoped>
.button {
  position: relative;
  padding: 8px 16px;
  background: #009579;
  border: none;
  outline: none;
  border-radius: 2px;
  cursor: pointer;
}

.button:active {
  background: #007a63;
}

.button__text {
  transition: all 0.2s;
}

.button--loading .button__text {
  visibility: hidden;
  opacity: 0;
}

.button--loading::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 4px solid transparent;
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: button-loading-spinner 1s ease infinite;
}

@keyframes button-loading-spinner {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}
</style>
