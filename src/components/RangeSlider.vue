<template>
  <div class="slider" @click="barClick">
    <div class="">
      <div class="relative">
        <input style="z-index: -1; width: 100%" min="1" max="5" step="1" type="range" value="0" class="mb-4 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm" />
        <span style="left: 25%; top: 35%; z-index: -10" class="h-2 w-2 bg-gray-600 rounded-lg absolute"></span>
        <span style="left: 50%; top: 35%; z-index: -10" class="h-2 w-2 bg-gray-600 rounded-lg absolute"></span>
        <span style="left: 73%; top: 35%; z-index: -10" class="h-2 w-2 bg-gray-600 rounded-lg absolute"></span>
        <span style="right: 0.3px; top: 35%; z-index: -10" class="h-2 w-2 bg-gray-600 rounded-lg absolute"></span>
      </div>
    </div>
    <ul class="flex justify-between w-full text-xs mb-3 px-2">
      <li class="flex justify-center relative"><span class="absolute text-white">0%</span></li>
      <li class="flex justify-center relative"><span class="absolute text-white">25%</span></li>
      <li class="flex justify-center relative"><span class="absolute text-white">50%</span></li>
      <li class="flex justify-center relative"><span class="absolute text-white">75%</span></li>
      <li class="flex justify-center relative"><span class="absolute text-white">100%</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      position: 0,
      dragging: false,
      width: null,
      offset: null,
      displayProgress: 'none',
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      // this.width = this.$refs.elem.offsetWidth
      // this.offset = this.$refs.elem.getBoundingClientRect().left
      // this.bindListener()
    })
  },
  methods: {
    bindListener() {
      document.addEventListener('mousemove', this.drag)
      document.addEventListener('mouseup', this.dragEnd)
    },
    getPosition(ev) {
      return ev.clientX - this.offset
    },
    setPosition(pos) {
      this.position = pos - 1
    },
    barClick(ev) {
      var pos = this.getPosition(ev)
      this.setPosition(pos)
      console.log('barClick pos:', pos, pos / this.width)
      this.displayProgress = ''
      if (pos / this.width < 0.025) {
        this.displayProgress = 'none'
      }
    },
    dragStart(a, b) {
      console.log('dragStart', a, b)
      this.dragging = true
    },
    drag(ev) {
      if (!this.dragging) {
        return
      }
      var pos = this.getPosition(ev)
      if (pos > 0 && pos < this.width) {
        console.log('drag set pos')
        this.setPosition(pos)
      }
    },
    dragEnd() {
      if (!this.dragging) {
        return
      }
      console.log('dragEnd', this.position)
      this.dragging = false
    },
    onRangePointClick(percent, ev) {
      console.log('onRangePointClick', percent, ev)
      this.displayProgress = ''
      if (percent == 0) {
        this.setPosition(0.01)
        this.displayProgress = 'none'
        return
      }
      this.setPosition((this.width * percent) / 100)
    },
  },
}
</script>

<style scoped>
.slider {
  z-index: 1;
  width: 140%;
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
