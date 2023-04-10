<template>
  <span :class="rowStyle" :style="{ width: 100 - row.sizePercent + '%' }">{{ $format(row.size, 4) }}</span>
  <span class="absolute right-0.5">{{ row.price }}</span>
</template>
<script>
export default {
  props: ['row', 'side'],
  data() {
    return {
      id: 0,
      rowStyle: 'ml-0 bg-gray-900 h-5 text-white text-left text-xs items-center flex red-flash',
    }
  },
  mounted() {
    this.id = setTimeout(() => (this.rowStyle = 'ml-0 bg-gray-900 h-5 text-white text-left text-xs items-center flex'), 250)

    if (this.side == 'buy') {
      this.rowStyle = 'ml-0 bg-gray-900 h-5 text-white text-left text-xs items-center flex green-flash'
    } else {
      this.rowStyle = 'ml-0 bg-gray-900 h-5 text-white text-left text-xs items-center flex red-flash'
    }
  },
  beforeUnmount() {
    clearTimeout(this.id)
  },
  methods: {
    update() {
      this.rowStyle = `ml-0 bg-gray-900 h-5 text-white text-left text-xs items-center flex red-flash`
      this.id = setTimeout(() => (this.rowStyle = 'ml-0 bg-gray-900 h-5 text-white text-left text-xs items-center flex'), 250)
    },
  },
}
</script>

<style scoped>
@keyframes red-flash {
  from {
    background-color: rgba(243, 170, 170, 0.473);
  }
  to {
    background-color: transparent;
  }
}

.red-flash {
  -moz-animation: red-flash 0.25s ease 0s 1 alternate;
  -webkit-animation: red-flash 0.25s ease 0s 1 alternate;
  animation: red-flash 0.25s ease 0s 1 alternate;
}

@keyframes green-flash {
  from {
    background-color: rgb(34, 197, 94);
  }
  to {
    background-color: transparent;
  }
}

.green-flash {
  -moz-animation: green-flash 0.25s ease 0s 1 alternate;
  -webkit-animation: green-flash 0.25s ease 0s 1 alternate;
  animation: green-flash 0.25s ease 0s 1 alternate;
}
</style>
