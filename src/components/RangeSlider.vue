<template>
  <div class="mt-1 mb-2 flex justify-center w-full">
    <div class="mt-2 mb-2 flex justify-center w-full">
      <div class="slider w-full mb-2" @click="barClick">
        <div class="relative">
          <input style="z-index: -1; width: 100%" type="range" value="0" class="slider" id="range" @mouseup="emitPercent"
            @click="click" @mouseenter="showPercent = true" @mousemove="updatePercent($refs.value)" ref="input"
            @mouseleave="showPercent = false" />
          <div class="w-full" v-if="showPercent">
            <div ref="sel" id="selectBtn"
              class="-top-3.5 h-1 w-8 text-center rounded-sm bg-transparent absolute text-blue-600 text-xs m-auto cursor-none">
              {{ percent }}%</div>
          </div>
        </div>
        <div class="grid grid-cols-4 text-gray-300 text-center text-sm space-x-3 cursor-pointer mt-2">
          <div class="bg-slate-800" @click="onClickPercent(25)">25%</div>
          <div class="bg-slate-800" @click="onClickPercent(50)">50%</div>
          <div class="bg-slate-800" @click="onClickPercent(75)">75%</div>
          <div class="bg-slate-800" @click="onClickPercent(100)">100%</div>
        </div>
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
  mounted() { },
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
      this.$refs.input.style.backgroundSize = this.percent + '% 100%'
      this.$emit('sliderPercentUpdate', this.percent)
    },
    emitPercent() {
      this.$emit('sliderPercentUpdate', this.percent)
    },
    setPercent(val) {
      this.$refs.input.value = val
    },
    onClickPercent(val) {
      this.$refs.input.value = val
      this.$emit('sliderPercentUpdate', val)
      this.$refs.input.style.backgroundSize = val + '% 100%'
    },
  },
}
</script>

<style scoped>
input[type="number"] {
  width: 40px;
  padding: 4px 5px;
  border: 1px solid #bbb;
  border-radius: 3px;
}

/* input[type="range"]:focus,
input[type="number"]:focus {
  box-shadow: 0 0 3px 1px #4b81dd;
  outline: none;
} */

input[type="range"] {
  -webkit-appearance: none;
  margin-right: 15px;
  width: 200px;
  height: 6px;
  background: #3a4d83;
  border-radius: 5px;
  background-image: linear-gradient(rgba(84, 143, 221, 0.6), rgba(84, 143, 221, 0.6));
  background-size: 0% 100%;
  background-repeat: no-repeat;
}

/* Input Thumb */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: #3122a3;
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 #555;
  transition: background .3s ease-in-out;
}

input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #646362;
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 #555;
  transition: background .3s ease-in-out;
}

input[type="range"]::-ms-thumb {
  -webkit-appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  /* background: #ff4500; */
  cursor: ew-resize;
  box-shadow: 0 0 2px 0 #555;
  transition: background .3s ease-in-out;
}

input[type="range"]::-webkit-slider-thumb:hover {
  /* background: #ff0200; */
}

input[type="range"]::-moz-range-thumb:hover {
  /* background: #ff0200; */
}

input[type="range"]::-ms-thumb:hover {
  /* background: #ff0200; */
}

/* Input Track */
input[type=range]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

input[type=range]::-moz-range-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}

input[type="range"]::-ms-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}
</style>
