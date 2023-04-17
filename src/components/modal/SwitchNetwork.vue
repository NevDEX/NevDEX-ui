<template >
    <TransitionRoot appear :show="show" as="template">
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
                                <div class="text-white">Swith Network</div>
                                <button type="button"
                                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded text-sm p-1.5 ml-auto inline-flex items-center"
                                    data-modal-toggle="crypto-modal" @click="onClose">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </button>
                            </DialogTitle>
                            <div class="p-6">
                                <ul class="my-4 space-y-3">
                                    <li @click="onSelectNetwork(71401)">
                                        <a href="#"
                                            class="flex items-center justify-center p-3 text-base font-bold text-gray-900 bg-gray-600 rounded hover:bg-gray-100 group hover:shadow">
                                            <img class="h-[1.5rem]" src="http://www.godwoken.com/images/footer-logo.png"
                                                alt="logo" data-v-edb47f11="">
                                            <span class="flex-1 ml-3 whitespace-nowrap">Godwoken Testnet v1</span>
                                        </a>
                                    </li>
                                    <li @click="onSelectNetwork(1666700000)">
                                        <a href="#"
                                            class="flex items-center justify-center p-3 text-base font-bold text-gray-900 bg-gray-600 rounded hover:bg-gray-100 group hover:shadow">
                                            <img class="h-[1.5rem]" src="https://cryptologos.cc/logos/harmony-one-logo.png"
                                                alt="logo" data-v-edb47f11="">
                                            <span class="flex-1 ml-3 whitespace-nowrap">Harmony Testnet</span>
                                        </a>
                                    </li>
                                    <!-- <li @click="onWalletconnet">
                                        <a href="#"
                                            class="flex items-center justify-center p-3 text-base font-bold text-gray-900 bg-gray-600 rounded hover:bg-gray-100 group hover:shadow">

                                            <span class="flex-1 ml-3 whitespace-nowrap">WalletConnect</span>
                                        </a>
                                    </li> -->
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
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
export default {
    components: {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
        DialogTitle,
    },
    props: ['show'],
    methods: {
        onClose() {
            console.log('onClose')
            this.$emit('close')
        },
        onSelectNetwork(chainId) {

            this.$emit('close')
        }
    },
}
</script>
<style scoped></style>