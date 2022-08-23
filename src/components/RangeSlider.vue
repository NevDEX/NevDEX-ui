<template>
  <div class="slider" @click="barClick">
    <div class="">
      <div class="relative">
        <input style="z-index: -1; width: 100%" id="small-range" type="range" value="0" class="mb-4 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm" />
        <span style="left: 21%; top: 35%; z-index: -10" class="h-2 w-2 bg-gray-600 rounded-lg absolute"></span>
        <span style="left: 47%; top: 35%; z-index: -10" class="h-2 w-2 bg-gray-600 rounded-lg absolute"></span>
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
