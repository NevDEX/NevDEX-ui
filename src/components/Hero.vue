<template>
  <div class="flex flex-col text-center mass-header z-10 bg">
    <video autoPlay loop muted id="video" v-if="!_isMobile()">
      <source src="../assets/header-bg.mp4" type="video/mp4" />
    </video>
    <div class="z-10 flex flex-col md:p-0 p-5 bg">
      <span class="text-gray-50 font-bold md:text-5xl text-3xl md:mt-40 mt-20">
        Trade on NevDEX Faster, Cheaper <br />
        and more Stable.
      </span>
      <span class="text-gray-400 text-xl md:mt-10 mt-20">
        NevDEX brings the speed and convenience of centralized exchanges to DeFi <br />
        while remaining fully trustless and transparent.
      </span>
      <div class="flex justify-center items-start">
        <button class="text-gray-50 md:mt-36 mt-36 px-10 py-5 font-bold bg-gray-800 hover:bg-gray-500 rounded-md" @click="$router.push('/trade')">Trade Now</button>
      </div>
      <div class="flex justify-center text-gray-200 text-xl items-center mt-2">
        <div class="text-left text-[17px] text-gray-500">Powered by</div>
        <div class="flex flex-row items-center"><img class="h-[3.5rem]" src="../assets/godwoken.png" alt="logo" /> <span class="-ml-2">Godwoken</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMobile: false,
    }
  },
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag
    },
  },

  mounted: function () {
    this.isMobile = this._isMobile()
  },
}
</script>

<style scoped>
#video {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
  top: 0px;
}

.mass-header {
  width: 100%;
}

.mass-header:before {
  display: block;
  content: '';
  background: rgb(17 24 39);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.85;
}
</style>
