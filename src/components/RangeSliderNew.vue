<template>
  <div class="slider">
    <div class="slider__wrapper">
      <div v-if="showPercent" :style="{ left: position }" class="slider__label">{{ sliderLabel }}%</div>
      <div class="slider__track" :class="{ 'slider__track--rectangular': !raising }"></div>
      <input style="" ref="slider" v-model="sliderValue" :max="sliderMax" class="slider__input" type="range" :min="sliderMin" :step="step" @input="update" @change="change" @click="click" @mouseenter="showPercent = true" @mouseleave="showPercent = false" />
      <div class="">
        <span style="transform: translateX(-5%); left: 0%; top: 34.5%;" class="h-2 w-2 bg-gray-600 rounded-lg absolute"></span>
        <span style="transform: translateX(-10%); left: 25%; top: 34.5%;" class="h-2 w-2 bg-gray-600 rounded-lg absolute"></span>
        <span style="transform: translateX(-20%); left: 50%; top: 34.5%;" class="h-2 w-2 bg-gray-600 rounded-lg absolute"></span>
        <span style="transform: translateX(-50%); left: 75%; top: 34.5%;" class="h-2 w-2 bg-gray-600 rounded-lg absolute"></span>
        <span style="right: 0px; top: 34.5%;" class="h-2 w-2 bg-gray-600 rounded-lg absolute"></span>
      </div>
    </div>

    <div class="w-full flex justify-between text-xs">
      <span class="text-white" style="transform: translateX(-0%); left: 0%;">0%</span>
      <span class="text-white" style="transform: translateX(30%); left: 25%;">25%</span>
      <span class="text-white" style="transform: translateX(50%); left: 50%;">50%</span>
      <span class="text-white" style="transform: translateX(70%); left: 75%;">75%</span>
      <span class="text-white" style="transform: translateX(0%); left: 100%;">100%</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
    values: {
      type: Array,
      required: false,
      default: () => [],
    },
    min: {
      type: String,
      required: false,
      default: '0',
    },
    max: {
      type: String,
      required: false,
      default: '100',
    },
    step: {
      type: String,
      required: false,
      default: '1',
    },
    hideLabel: {
      type: Boolean,
      required: false,
      default: false,
    },
    raising: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      sliderWidth: 0,
      sliderValues: [],
      sliderValue: 0,
      sliderMax: null,
      sliderMin: null,
      showPercent: false,
    }
  },
  computed: {
    sliderLabel() {
      // If using custom values, the custom label is returned, otherwise the value is also the label
      return this.sliderValues.length ? this.sliderValues[this.sliderValue - 1].label : this.sliderValue
    },
    sliderOutputValue() {
      // If using custom values, the custom value is returned, otherwise just the default value
      return this.sliderValues.length ? this.sliderValues[this.sliderValue - 1].value : this.sliderValue
    },
    position() {
      const val = this.sliderValue
      // Measure width of slider element. Adjust by 20 to account for thumbsize
      const width = this.sliderWidth - 20

      // Calculate percentage between left and right of input
      const percent = (val - this.sliderMin) / (this.sliderMax - this.sliderMin)

      // Janky value to get pointer to line up better
      const offset = -2

      let position = width * percent + offset

      if (position < 0) {
        position = 0
      }
      console.log('position', position)
      return `${position}px`
    },
  },
  mounted() {
    this.changeValues()
    this.$nextTick(() => {
      this.resizeHandler()
    })

    this.sliderValue = 0
  },
  methods: {
    changeValues() {
      // Set local values, depending on use of custom or default
      if (this.values.length) {
        this.sliderValues = this.values
        this.sliderMin = '1'
        this.sliderMax = this.sliderValues.length

        // Find the corresponding custom value, and set the local sliderValue
        let index = 0
        this.values.map((item, i) => {
          if (item.value === this.value) {
            index = i
          }
          return true
        })
        this.sliderValue = index + 1
      } else {
        // In case of using default slider methods
        this.sliderMin = this.min
        this.sliderMax = this.max
        this.sliderValue = this.value
      }
      this.update()
    },
    update() {
      this.$emit('input', this.sliderOutputValue)
    },
    change() {
      this.$emit('change', this.sliderOutputValue)
    },
    click(event) {
      if (this.sliderValue == undefined) {
        this.sliderValue = event.target.value
        this.$emit('input', this.sliderOutputValue)
      }
    },
    resizeHandler() {
      this.sliderWidth = this.$refs.slider.clientWidth
    },
  },
  created() {
    window.addEventListener('resize', this.resizeHandler)
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  watch: {
    values: {
      immediate: true,
      handler() {
        this.changeValues()
      },
    },
    value: {
      immediate: true,
      handler() {
        this.changeValues()
      },
    },
  },
}
</script>

<style scoped>
.slider {
  position: relative;
  margin-top: 10px;
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.slider__label {
  position: absolute;
  top: -25px;
  background: white;
  color: #333;
  font-weight: bold;
  padding: 2px 5px;
  font-size: 12px;
  text-align: center;
  transform: translateX(-50%);
  margin-left: 1em;
  box-shadow: 0 10px 20px -5px rgba(45, 45, 45, 0.25);
  min-width: 30px;
  white-space: nowrap;
}
.slider__label:after {
  content: '';
  position: absolute;
  bottom: -10px;
  height: 0;
  width: 0;
  left: 0;
  right: 0;
  margin: auto;
  border: 5px solid transparent;
  border-top-color: white;
}
.slider__wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.slider__track {
  width: 100%;
  position: absolute;
  z-index: 0;
  height: 3px;
  background: #999;
}
.slider__track--rectangular {
  height: 3px;
}
.slider__track-top,
.slider__track-bottom {
  content: '';
  width: 100%;
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
}
.slider__track-top {
  top: -6px;
  border-width: 0 0 6px 500px;
  border-color: transparent transparent #999 transparent;
}
.slider__track-bottom {
  top: 3px;
  border-width: 0 500px 6px 0;
  border-color: transparent #999 transparent transparent;
}
.slider__input {
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
  background: none;
  padding: 0;
  z-index: 1;
  position: relative;
}
.slider__input:focus {
  outline: none;
}
.slider__input::-webkit-slider-runnable-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-radius: 0;
  border: none;
}
.slider__input::-webkit-slider-thumb {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -3px;
  background: rgb(37, 99, 235);
}
.slider__input::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #eee;
  cursor: pointer;
  border: none;
}
.slider__input::-ms-thumb {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: #eee;
  cursor: pointer;
}
.slider__input:focus::-webkit-slider-runnable-track {
  background: transparent;
}
.slider__input::-moz-range-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-radius: 0;
}
.slider__input::-ms-track {
  width: 100%;
  height: 10px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  border-width: 10px 0;
  border-radius: 0;
  color: transparent;
}
.slider__input::-ms-fill-lower {
  background: transparent;
  border: none;
  border-radius: 0;
}
.slider__input::-ms-fill-upper {
  background: transparent;
  border: none;
  border-radius: 0;
}
</style>
