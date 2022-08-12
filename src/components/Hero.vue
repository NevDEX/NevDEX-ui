<template>
  <div class="flex flex-col text-center mass-header z-10  h-screen relative">
    <video autoPlay loop muted id="video">
      <source src="../assets/header-bg.mp4" type="video/mp4" />
    </video>
    <div class="z-10 flex flex-col">
      <span class="text-gray-50 font-bold text-5xl mt-40"> Trade on NevDEX Faster, Cheaper </span>
      <span class="text-gray-50 font-bold text-5xl"> and more Stable. </span>
      <span class="text-gray-400 hover: text-xl mt-10"> NevDEX brings the speed and convenience of centralized exchanges to DeFi </span>
      <span class="text-gray-400 text-xl"> while remaining fully trustless and transparent. </span>
      <div class="flex justify-center items-start">
        <router-link to="trade"> <button class="text-gray-50 mt-40 px-10 py-5 bg-gray-800 font-bold hover:bg-gray-500 rounded-md">Trade Now</button></router-link>
      </div>
      <div class="flex justify-center text-gray-200 mt-10 text-xl items-center">
        <span>Powered by Nervos Godwoken </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
#video {
  position: absolute;
  width: 100%;
  height: 94.5%;
  object-fit: cover;
  z-index: -1;
}

.mass-header {
  width: 100%;
}

.mass-header:before {
  display: block;
  content: '';
  /* background: #0b1013; */
  background: rgb(17 24 39);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.85;
}
</style>