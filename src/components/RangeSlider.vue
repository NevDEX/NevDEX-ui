<template>
  <div class="slider" @click="barClick">
    <div class="">
      <div class="relative">
        <input style="z-index: -1; width: 100%" min="1" max="5" step="1" type="range" value="0" class="mb-4 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm" />
        <span style="left: 25%; top: 35%; z-index: -10" class="h-2 w-2 bg-gray-600 rounded-lg absolute"></span>
        <span style="left: 49%; top: 35%; z-index: -10" class="h-2 w-2 bg-gray-600 rounded-lg absolute"></span>
        <span style="left: 73%; top: 35%; z-index: -10" class="h-2 w-2 bg-gray-600 rounded-lg absolute"></span>
        <span style="right: 0.3px; top: 35%; z-index: -10" class="h-2 w-2 bg-gray-600 rounded-lg absolute"></span>
      </div>
    </div>
    <div class="w-full flex justify-between text-xs">
      <span class="text-white">0%</span>
      <span class="text-white">25%</span>
      <span class="text-white">50%</span>
      <span class="text-white">75%</span>
      <span class="text-white">100%</span>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
   
    }
  },
}
</script>

<style scoped>
.slider {
  z-index: 1;
  width: 140%;
}
</style>
