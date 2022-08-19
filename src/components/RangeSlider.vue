<template>
  <div class="w-full" @click="barClick">
    <div class="relative">
      <input style="width: 100%; z-index: 10;" min="0" max="100" step="1" type="range" value="0" class="mb-4 h-1 bg-gray-600 rounded-lg cursor-pointer range-sm" id="slider" />
      <div id="selector">
        <div id="selectBtn" class="-top-6 h-4 w-8 text-center rounded-sm bg-gray-800 absolute left-0 text-blue-600 text-xs m-auto cursor-none">
          {{ percent }}%
          <div class="h-3 w-3 bg-gray-500 absolute top-[34px] z-50 rounded-md"></div>
        </div>
      </div>

      <span style="left: 25%; top: 35%; z-index: 40;" class="h-2 w-2 bg-gray-600 rounded-lg absolute -z-10"></span>
      <span style="left: 49%; top: 35%; z-index: 40;" class="h-2 w-2 bg-gray-600 rounded-lg absolute -z-10"></span>
      <span style="left: 73%; top: 35%; z-index: 40;" class="h-2 w-2 bg-gray-600 rounded-lg absolute -z-10"></span>
      <span style="right: 0.3px; top: 35%; z-index: 40;" class="h-2 w-2 bg-gray-600 rounded-lg absolute -z-10"></span>
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
      percent: 0,
    }
  },
  mounted() {
    var slider = document.getElementById('slider')
    var selector = document.getElementById('selectBtn')
    let that = this
    slider.oninput = function () {
      selector.style.left = this.value - 2 + '%'
      that.percent = this.value
    }
  },
}
</script>

<style scoped>
#slider {
  -webkit-appearance: none;
}

#slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 48px;
  height: 48px;
  cursor: pointer;
}
</style>
