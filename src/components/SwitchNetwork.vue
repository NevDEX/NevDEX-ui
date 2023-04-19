<template>
  <div v-if="show" class="flex justify-end items-center text-white cursor-pointer mr-3 font-bold" @click="onSwitchNetwork">Swith Network</div>

  <SwitchNetwork :show="showModal" @close="showModal = false" />
</template>
<script>
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
    SwitchNetwork,
  },
  computed: {},
  created() {},
  watch: {
    $route(to, from) {
      this.show = true
      if (to.fullPath === '/') {
        this.show = false
      }
    },
  },
  methods: {
    onSwitchNetwork() {
      console.log('onSwitchNetwork')
      this.showModal = true
    },
  },
}
</script>
<style scoped></style>
