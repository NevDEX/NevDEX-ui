<template>
    <div class="flex flex-row m-auto max-w-[1280px] h-screen ">
        <div class="absolute inset-x-0 md:top-10 min-h-0 pl-20 flex overflow-hidden z-0 h-full my-auto"><span
                class="block bg-[#ef233c] w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96"></span><span
                class="block bg-[#04868b] w-72 h-72 -ml-20   rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96"></span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 px-4 md:px-0 w-full">

            <div class="text-white h-full items-center justify-center flex flex-col m-auto">
                <div class="text-5xl font-semibold md:text-4xl xl:text-5xl text-neutral-100 flex flex-col space-y-2 w-full">
                    <span> The leading</span>
                    <span> NFT Marketplace</span>
                    <span> on Nervos Godwoken</span>
                </div>
                <p class="text-base xl:text-lg text-gray-400 w-full">Mint & Trade the most outstanding NTFs in all
                    topics of
                    life with $NDX
                </p>
                <div class="flex justify-items-start w-full mt-4 space-x-6">
                    <Button text="Create" @click="onClick(section.buttonText)"></Button>
                    <Button text="Explore" @click="onClick(section.buttonText)"></Button>
                </div>
            </div>


            <div class="my-auto w-full">
                <BannerGroup />
                <div class="h-[5px] mt-3 flex justify-center space-x-3">
                    <span class="bg-gray-600 h-full w-5 rounded block"></span>
                    <span class="bg-gray-600 h-full w-5 rounded block"></span>
                    <span class="bg-gray-600 h-full w-5 rounded block"></span>
                    <span class="bg-gray-600 h-full w-5 rounded block"></span>
                    <span class="bg-gray-600 h-full w-5 rounded block"></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style></style>