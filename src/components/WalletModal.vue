<template>
  <TransitionRoot appear :show="showWallet" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center text-center w-96 mx-auto">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                <div class="text-white">Connect wallet</div>
                <button type="button"
                  class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded text-sm p-1.5 ml-auto inline-flex items-center"
                  data-modal-toggle="crypto-modal" @click="onClose">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"></path>
                  </svg>
                </button>
              </DialogTitle>
              <div class="p-6">
                <ul class="my-4 space-y-3">
                  <li @click="onConnect">
                    <a href="#"
                      class="flex items-center justify-center p-3 text-base font-bold text-gray-900 bg-gray-600 rounded hover:bg-gray-100 group hover:shadow">
                      <svg class="h-4" viewBox="0 0 40 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M39.0728 0L21.9092 12.6999L25.1009 5.21543L39.0728 0Z" fill="#E17726"></path>
                        <path d="M0.966797 0.0151367L14.9013 5.21656L17.932 12.7992L0.966797 0.0151367Z" fill="#E27625">
                        </path>
                        <path d="M32.1656 27.0093L39.7516 27.1537L37.1004 36.1603L27.8438 33.6116L32.1656 27.0093Z"
                          fill="#E27625"></path>
                        <path d="M7.83409 27.0093L12.1399 33.6116L2.89876 36.1604L0.263672 27.1537L7.83409 27.0093Z"
                          fill="#E27625"></path>
                        <path
                          d="M17.5203 10.8677L17.8304 20.8807L8.55371 20.4587L11.1924 16.4778L11.2258 16.4394L17.5203 10.8677Z"
                          fill="#E27625"></path>
                        <path
                          d="M22.3831 10.7559L28.7737 16.4397L28.8067 16.4778L31.4455 20.4586L22.1709 20.8806L22.3831 10.7559Z"
                          fill="#E27625"></path>
                        <path d="M12.4115 27.0381L17.4768 30.9848L11.5928 33.8257L12.4115 27.0381Z" fill="#E27625"></path>
                        <path d="M27.5893 27.0376L28.391 33.8258L22.5234 30.9847L27.5893 27.0376Z" fill="#E27625"></path>
                        <path d="M22.6523 30.6128L28.6066 33.4959L23.0679 36.1282L23.1255 34.3884L22.6523 30.6128Z"
                          fill="#D5BFB2"></path>
                        <path d="M17.3458 30.6143L16.8913 34.3601L16.9286 36.1263L11.377 33.4961L17.3458 30.6143Z"
                          fill="#D5BFB2"></path>
                        <path d="M15.6263 22.1875L17.1822 25.4575L11.8848 23.9057L15.6263 22.1875Z" fill="#233447"></path>
                        <path d="M24.3739 22.1875L28.133 23.9053L22.8184 25.4567L24.3739 22.1875Z" fill="#233447"></path>
                        <path d="M12.8169 27.0049L11.9606 34.0423L7.37109 27.1587L12.8169 27.0049Z" fill="#CC6228"></path>
                        <path d="M27.1836 27.0049L32.6296 27.1587L28.0228 34.0425L27.1836 27.0049Z" fill="#CC6228"></path>
                        <path
                          d="M31.5799 20.0605L27.6165 24.0998L24.5608 22.7034L23.0978 25.779L22.1387 20.4901L31.5799 20.0605Z"
                          fill="#CC6228"></path>
                        <path
                          d="M8.41797 20.0605L17.8608 20.4902L16.9017 25.779L15.4384 22.7038L12.3988 24.0999L8.41797 20.0605Z"
                          fill="#CC6228"></path>
                        <path d="M8.15039 19.2314L12.6345 23.7816L12.7899 28.2736L8.15039 19.2314Z" fill="#E27525"></path>
                        <path d="M31.8538 19.2236L27.2061 28.2819L27.381 23.7819L31.8538 19.2236Z" fill="#E27525"></path>
                        <path
                          d="M17.6412 19.5088L17.8217 20.6447L18.2676 23.4745L17.9809 32.166L16.6254 25.1841L16.625 25.1119L17.6412 19.5088Z"
                          fill="#E27525"></path>
                        <path
                          d="M22.3562 19.4932L23.3751 25.1119L23.3747 25.1841L22.0158 32.1835L21.962 30.4328L21.75 23.4231L22.3562 19.4932Z"
                          fill="#E27525"></path>
                        <path
                          d="M27.7797 23.6011L27.628 27.5039L22.8977 31.1894L21.9414 30.5138L23.0133 24.9926L27.7797 23.6011Z"
                          fill="#F5841F"></path>
                        <path
                          d="M12.2373 23.6011L16.9873 24.9926L18.0591 30.5137L17.1029 31.1893L12.3723 27.5035L12.2373 23.6011Z"
                          fill="#F5841F"></path>
                        <path
                          d="M10.4717 32.6338L16.5236 35.5013L16.4979 34.2768L17.0043 33.8323H22.994L23.5187 34.2753L23.48 35.4989L29.4935 32.641L26.5673 35.0591L23.0289 37.4894H16.9558L13.4197 35.0492L10.4717 32.6338Z"
                          fill="#C0AC9D"></path>
                        <path
                          d="M22.2191 30.231L23.0748 30.8354L23.5763 34.8361L22.8506 34.2234H17.1513L16.4395 34.8485L16.9244 30.8357L17.7804 30.231H22.2191Z"
                          fill="#161616"></path>
                        <path
                          d="M37.9395 0.351562L39.9998 6.53242L38.7131 12.7819L39.6293 13.4887L38.3895 14.4346L39.3213 15.1542L38.0875 16.2779L38.8449 16.8264L36.8347 19.1742L28.5894 16.7735L28.5179 16.7352L22.5762 11.723L37.9395 0.351562Z"
                          fill="#763E1A"></path>
                        <path
                          d="M2.06031 0.351562L17.4237 11.723L11.4819 16.7352L11.4105 16.7735L3.16512 19.1742L1.15488 16.8264L1.91176 16.2783L0.678517 15.1542L1.60852 14.4354L0.350209 13.4868L1.30098 12.7795L0 6.53265L2.06031 0.351562Z"
                          fill="#763E1A"></path>
                        <path
                          d="M28.1861 16.2485L36.9226 18.7921L39.7609 27.5398L32.2728 27.5398L27.1133 27.6049L30.8655 20.2912L28.1861 16.2485Z"
                          fill="#F5841F"></path>
                        <path
                          d="M11.8139 16.2485L9.13399 20.2912L12.8867 27.6049L7.72971 27.5398H0.254883L3.07728 18.7922L11.8139 16.2485Z"
                          fill="#F5841F"></path>
                        <path
                          d="M25.5283 5.17383L23.0847 11.7736L22.5661 20.6894L22.3677 23.4839L22.352 30.6225H17.6471L17.6318 23.4973L17.4327 20.6869L16.9139 11.7736L14.4707 5.17383H25.5283Z"
                          fill="#F5841F"></path>
                      </svg>
                      <span class="flex-1 ml-3 whitespace-nowrap">MetaMask</span>
                    </a>
                  </li>
                  <li @click="onSafepalConnect">
                    <a href="#"
                      class="flex items-center justify-center p-3 text-base font-bold text-gray-900 bg-gray-600 rounded hover:bg-gray-100 group hover:shadow">
                      <svg viewBox="-40 -40 480 480" width="20px" color="text" xmlns="http://www.w3.org/2000/svg"
                        class="h4">
                        <path
                          d="M175.358 0C163.184 -1.12679e-06 151.509 4.83616 142.901 13.4445L7.68217 148.666C2.56067 153.787 -4.19303e-05 160.5 5.14944e-10 167.213C4.19313e-05 173.925 2.56083 180.638 7.68232 185.76L96.2953 274.373V117.495C96.2953 105.788 105.712 96.2969 117.419 96.2969C166.881 96.2969 287.278 96.2969 303.701 96.2969L399.996 0.00136472L175.358 0Z"
                          fill="#4A21EF"></path>
                        <path
                          d="M96.2995 303.703H282.507C294.214 303.703 303.705 294.212 303.705 282.504V125.626L392.318 214.24C397.439 219.362 400 226.074 400 232.787C400 239.5 397.439 246.212 392.318 251.334L257.099 386.555C248.491 395.163 236.816 400 224.642 400L0.00420026 399.998L96.2995 303.703Z"
                          fill="#4A21EF"></path>
                      </svg>
                      <span class="flex-1 ml-3 whitespace-nowrap">SafePal</span>
                    </a>
                  </li>
                  <li @click="onWalletconnet">
                    <a href="#"
                      class="flex items-center justify-center p-3 text-base font-bold text-gray-900 bg-gray-600 rounded hover:bg-gray-100 group hover:shadow">
                      <svg viewBox="0 0 40 40" width="20px" color="text" xmlns="http://www.w3.org/2000/svg"
                        class="sc-bdnxRM gEmPqi">
                        <path
                          d="M8.68096 12.4756C14.9323 6.39698 25.0677 6.39698 31.3191 12.4756L32.0714 13.2071C32.384 13.511 32.384 14.0038 32.0714 14.3077L29.4978 16.8103C29.3415 16.9622 29.0881 16.9622 28.9318 16.8103L27.8965 15.8036C23.5354 11.563 16.4647 11.563 12.1036 15.8036L10.9948 16.8817C10.8385 17.0336 10.5851 17.0336 10.4288 16.8817L7.85517 14.3791C7.54261 14.0752 7.54261 13.5824 7.85517 13.2785L8.68096 12.4756ZM36.6417 17.6511L38.9322 19.8783C39.2448 20.1823 39.2448 20.675 38.9322 20.979L28.6039 31.022C28.2913 31.3259 27.7846 31.3259 27.472 31.022C27.472 31.022 27.472 31.022 27.472 31.022L20.1416 23.8942C20.0634 23.8182 19.9367 23.8182 19.8586 23.8942C19.8586 23.8942 19.8586 23.8942 19.8586 23.8942L12.5283 31.022C12.2157 31.3259 11.709 31.3259 11.3964 31.022C11.3964 31.022 11.3964 31.022 11.3964 31.022L1.06775 20.9788C0.755186 20.6749 0.755186 20.1821 1.06775 19.8782L3.35833 17.6509C3.6709 17.347 4.17767 17.347 4.49024 17.6509L11.8208 24.7789C11.8989 24.8549 12.0256 24.8549 12.1038 24.7789C12.1038 24.7789 12.1038 24.7789 12.1038 24.7789L19.4339 17.6509C19.7465 17.347 20.2533 17.347 20.5658 17.6509C20.5658 17.6509 20.5658 17.6509 20.5658 17.6509L27.8964 24.7789C27.9745 24.8549 28.1012 24.8549 28.1794 24.7789L35.5098 17.6511C35.8223 17.3471 36.3291 17.3471 36.6417 17.6511Z"
                          fill="#3389FB"></path>
                      </svg>
                      <span class="flex-1 ml-3 whitespace-nowrap">WalletConnect</span>
                    </a>
                  </li>
                </ul>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import UseWallet from '../utils/wallet'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
const { walletGlobal, connectWithEther, connectWalletconnect } = UseWallet()

export default {
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  },
  props: ['showWallet'],
  computed: {
    ...mapGetters(['account', 'farms']),
  },
  methods: {
    ...mapActions(['updateAccount', 'updateSinger']),
    onClose() {
      this.$emit('close')
    },
    async onConnect() {
      try {
        let address = await connectWithEther()
        this.updateAccount(address)
      } catch (error) {
        console.log('onConnectWallet', error)
      }
      this.$emit('close')
    },
    async onSafepalConnect() {
      await this.onConnect()
    },
    async onWalletconnet() {
      try {
        let address = await connectWalletconnect()
        this.updateAccount(address)
      } catch (error) {
        console.log('onConnectWallet', error)
      }
      this.$emit('close')
    },
  },
}
</script>

<style></style>
