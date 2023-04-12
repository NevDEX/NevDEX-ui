<template>
    <div class="h-full">
        <!-- <h2 class="title">
            <img src="./images/logo.gif" alt="">

        </h2> -->

        <img class="h-full" :src="imgArr[index]" alt="" />
        <!-- left arrow -->
        <!-- <a href="javascript:void(0)" v-if="index != 0" @click="prev" class="left">
            <img src="./images/prev.png" alt="" />
        </a> -->
        <!-- right arrow -->
        <!-- <a href="javascript:void(0)" v-show="index < imgArr.length - 1" @click="next" class="right">
            <img src="./images/next.png" alt="" />
        </a> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgArr: [
                "/src/assets/nft/marketplace1.png",
                "/src/assets/nft/marketplace2.png",
                "/src/assets/nft/marketplace3.png",
                "/src/assets/nft/marketplace4.png",
                "/src/assets/nft/marketplace5.png",
                "/src/assets/nft/marketplace6.png",
            ],
            index: 0
        }
    },
    methods: {
        fun() {
            setInterval(this.play, 800)
        },
        prev() {
            this.index--;
        },
        play() {
            this.index++;
            if (this.index == this.imgArr.length) {
                this.index = 0;
            }
        }
    },
    mounted() {
        this.fun()
    }
}
</script>

<style></style>