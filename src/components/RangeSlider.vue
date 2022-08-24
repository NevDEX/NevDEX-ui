<template>
  <div class="slider" @click="barClick">
    <div class="">
      <div class="relative">
        <input style="z-index: -1; width: 100%;" type="range" value="0" class="mb-4 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm" id="slider" />
        <div id="selector">
          <div id="selectBtn" class="-top-3 h-4 w-8 text-center rounded-sm bg-transparent absolute left-0 text-blue-600 text-xs m-auto cursor-none">{{ percent }}%</div>
        </div>

        <span style="left: 25%; top: 35%; z-index: -10;" class="h-2 w-2 bg-gray-600 rounded-lg absolute"></span>
        <span style="left: 50%; top: 35%; z-index: -10;" class="h-2 w-2 bg-gray-600 rounded-lg absolute"></span>
        <span style="left: 74%; top: 35%; z-index: -10;" class="h-2 w-2 bg-gray-600 rounded-lg absolute"></span>
        <span style="right: 0.3px; top: 35%; z-index: -10;" class="h-2 w-2 bg-gray-600 rounded-lg absolute"></span>
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
  methods: {},
}
</script>

<style scoped>
.slider {
  z-index: 1;
  width: 100%;
  padding: 10px 0;
}

.slider-bar {
  width: 100%;
  height: 6px;
  position: relative;
  display: block;
  border-radius: 15px;
  background-color: #212131;
}
</style>
