<template>
  <h1 class="text-gray-200 text-3xl font-bold my-10 mx-10  ">More from this collection</h1>
  <swiper :pagination="{
    type: 'progressbar',
  }" :navigation="true" :modules="modules" class="flex flex-row mx-10 bg-gray-900">
    <swiper-slide class=" bg-gray-900  ">
      <div class="mt-6 lg:mt-8 mb-20  bg-gray-900">
        <div class="grid gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 bg-gray-900">
          <div
            class="grid gap-2 sm:gap-x-4 sm:gap-y-10  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 col-start-1 col-end-6 row-start-1 bg-gray-900">
            <div v-for="(nft, index) in nfts" :key="index" class=" ">
              <div
                class="nc-CardNFT cursor-pointer relative flex flex-col group !border-0 [ nc-box-has-hover nc-dark-box-bg-has-hover ] h-[24rem] w-[17rem] ">
                <div class="relative flex-shrink-0 z-20" @click="onItemClick">
                  <div class="relative">
                    <div class=" ">
                      <div
                        class="nc-NcImage flex aspect-w-11 aspect-h-12 w-full h-0 rounded-3xl overflow-hidden z-10 border-2 border-transparent dark:border-neutral-900 nft-content "
                        data-nc-id="NcImage"><img src="https://ipfs.bluemove.net/uploads/sui-crypto-lady/images/749.png"
                          class="object-cover w-full h-full group-hover:scale-[1.03] transition-transform duration-300 ease-in-out will-change-transform"
                          alt="nc-imgs"></div>
                    </div>
                    <div
                      class="hidden sm:block absolute right-0 left-0 bottom-0 top-0 m-auto w-fit h-fit transition-all duration-[400ms] z-20 opacity-0 group-hover:opacity-100 translate-y-44 group-hover:translate-y-0">
                      <button
                        class="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium px-4 py-3 sm:px-6  text-white bg-gradient-to-br from-purple-600 to-purple-600 via-blue-500 bg-[length:300%] !bg-left hover:!bg-right !transition-[background-position] !duration-[300ms] ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 !h-12 max-w-[150px] !text-sm !p-2 !px-3 flex items-center gap-2 justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 dark:focus:ring-offset-0"><svg
                          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                          stroke="currentColor" class="w-4 h-4">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"></path>
                        </svg>Quick Buy</button>
                    </div>
                  </div><button
                    class="bg-black/50 px-3.5 h-10 flex items-center justify-center rounded-full text-white absolute top-3 right-3 z-20 !h-9"><svg
                      class="w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                        stroke="currentColor" fill="none" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round">
                      </path>
                    </svg><span class="ml-2 text-sm">0</span></button>
                </div>
                <div class="p-4 py-5 space-y-3" @click="onChartClick">
                  <h2 class="text-xs sm:text-base font-medium h-[30px] sm:h-[45px] line-clamp-2 break-words text-gray-200 text-left">#SCL749</h2>
                  <div class="w-full border-b border-neutral-700"></div>
                  <div class="flex justify-between items-end ">
                    <div class="pt-3">
                      <div
                        class="flex items-baseline border-2 border-suicolor rounded-lg relative py-2 px-2.5 text-sm sm:text-base font-semibold ">
                        <span
                          class="bg-gray-900 block absolute font-normal bottom-full translate-y-3 p-1 -mx-1 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400   dark:bg-neutral-900 dark:group-hover:bg-neutral-800 group-hover:bg-gray-900">Price</span>
                        <div
                          class="!leading-none flex gap-1 justify-center items-end mt-[6px] sm:mt-[4px]  text-suicolor">
                          <!-- <div class="nc-NcImage " data-nc-id="NcImage"><img
                              src="/static/media/sui-logo.5ffb9a0fdbc85585c037d04c8f674090.svg" class="w-3 h-4"
                              alt="nc-imgs"></div> -->
                          <p class="text-xs sm:text-sm 2xl:text-base sm:h-[19px] text-gray-200">240 NDX</p>
                        </div>
                      </div>
                    </div>
                    <div
                      class="hidden sm:flex  items-center text-sm text-neutral-500 dark:text-neutral-400 hover:scale-105 transition-all duration-100 z-20">
                      <p class="bg-white border-[7px] rounded-full w-12 h-12 p-1 z-10 border-neutral-700"><img
                          alt="cart-icon" src="../../assets/nft/cart_nomal.svg" class="w-6 h-6"></p>
                      <!-- <p class="p-2 pt-2.5 text-white text-xs rounded-2xl -ml-[25px] z-0 pl-[25px] bg-neutral-700">Bulk
                        Buy</p> -->
                    </div>
                    <p
                      class="block sm:hidden hover:scale-110 hover:border-blue-500 bg-white border-[7px] rounded-full w-10 h-10 p-1 z-20 border-neutral-700">
                      <img alt="cart-icon" src="../../assets/nft/cart_nomal.svg" class="w-4 h-4">
                    </p>
                  </div>
                </div>

                <a class="absolute inset-0 z-10" href="/collection/market-item/60475"></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide class="bg-gray-300 h-80 w-60">Slide 3</swiper-slide>
    <swiper-slide class="bg-gray-300 h-80 w-60">Slide 4</swiper-slide>
    <swiper-slide class="bg-gray-300 h-80 w-60">Slide 5</swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'


import { Pagination, Navigation } from 'swiper'
export default {
  components: { Pagination, Navigation, Swiper, SwiperSlide },
  data() {
    return {
      modules: [Pagination, Navigation],
      nfts: [
        {
          image: '/src/assets/nft/marketplace1.png',
          name: 'SUIHEROES #447',
        },
        {
          image: '/src/assets/nft/marketplace2.png',
          name: 'SUIHEROES #448',
        },
        {
          image: '/src/assets/nft/marketplace3.png',
          name: 'SUIHEROES #449',
        },
        {
          image: '/src/assets/nft/marketplace4.png',
          name: 'SUIHEROES #450',
        },
        {
          image: '/src/assets/nft/marketplace4.png',
          name: 'SUIHEROES #450',
        },
      ],
    }
  },
  methods: {},

  setup() {
    return {
      modules: [Pagination, Navigation],
    }
  },
}
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 30%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: transparent;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
