<template>
  <div class="flex border-black border-b border-t w-full">
    <div class="w-1/4 2xl:w-1/5 mt-0.5">
      <DropDown class="" @selectMarket="updateSelectMarket" />
    </div>
    <div class="w-full">
      <Volume :baseToken="BTC" class="" />
    </div>
  </div>
</template>

<script>
import DropDown from './DropDown.vue'
import Volume from './Volume.vue'
export default {
  components: { DropDown, Volume },
}
</script>

<style></style>
