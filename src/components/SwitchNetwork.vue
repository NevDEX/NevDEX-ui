<template>
    <div v-if="show" class="flex justify-end items-center text-white cursor-pointer mr-3 font-bold" @click="onSwithNetwork">
        Swith Network
    </div>

    <SwitchNetwork :show="showModal" @close="showModal = false" />
</template>
<script>
import { mapGetters } from 'vuex'
import SwitchNetwork from './modal/SwitchNetwork.vue'

export default {
    name: 'SwithNetwork',
    data() {
        return {
            show: false,
            showModal: false,
        }
    },
    components: {
        SwitchNetwork
    },
    computed: {

    },
    created() { },
    watch: {
        $route(to, from) {
            this.show = true
            if (to.fullPath === '/') {
                this.show = false
            }
        },
    },
    methods: {
        onSwithNetwork() {
            console.log('onSwithNetwork')
            this.showModal = true
        }
    },
}
</script>
<style scoped></style>