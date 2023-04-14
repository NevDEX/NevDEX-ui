<template>
  <div class="mt-1 mb-2 flex justify-center w-full">
    <div class="slider" @click="barClick">
      <div class="mx-0">
        <div class="relative">
          <input style="z-index: -1; width: 100%" type="range" value="0" class="mb-4 h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer" id="slider" @mouseup="emitPercent" @click="click" @mouseenter="showPercent = true" @mousemove="updatePercent($refs.value)" ref="input" @mouseleave="showPercent = false" />
          <div class="w-full" v-if="showPercent">
            <div ref="sel" id="selectBtn" class="-top-3 h-1 w-8 text-center rounded-sm bg-transparent absolute text-blue-600 text-xs m-auto cursor-none">{{ percent }}%</div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-4 text-gray-300 text-center text-sm space-x-3">
        <div class="bg-slate-800">25%</div>
        <div class="bg-slate-800">50%</div>
        <div class="bg-slate-800">75%</div>
        <div class="bg-slate-800">100%</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      percent: 0,
      showPercent: false,
    }
  },
  mounted() {},
  methods: {
    click() {
      this.updatePercent()
      this.emitPercent()
    },
    updatePercent() {
      this.percent = this.$refs.input.value
      this.$refs.sel.style.left = this.$refs.input.value - 2 + '%'
      if (this.percent > 50) {
        this.$refs.sel.style.left = this.$refs.input.value - 7 + '%'
      }
    },
    emitPercent() {
      this.$emit('sliderPercentUpdate', this.percent)
    },
  },
}
</script>

<style scoped>
.slider {
  z-index: 1;
  width: 100%;
  padding: 10px 0;
}
</style>
