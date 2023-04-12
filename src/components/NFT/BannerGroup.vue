<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <img src="/src/assets/nft/marketplace1.png">
            </div>
            <div class="swiper-slide">
                <img src="/src/assets/nft/marketplace2.png">
            </div>
            <div class="swiper-slide">
                <img src="/src/assets/nft/marketplace3.png">
            </div>
        </div>
    </div>
</template>
<script>
import Banner from "./Banner.vue"
export default {
    components: { Banner },
    mounted() {
        var mySwiper = new Swiper('.swiper-container', {
            loop: true,
            effect: 'coverflow',
            slidesPerView: 2,
            centeredSlides: true,
            coverflowEffect: {
                rotate: 0,
                stretch: 60,
                depth: 140,
                modifier: 2
            }
        })
    },
}
</script>
<style  scoped>
.swiper-container {
    width: 550px;
    height: 360px;
}

.swiper-slide img {
    width: 100%;
    height: 100%;
}
</style>