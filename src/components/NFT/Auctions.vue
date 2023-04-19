<template>
    <div class="container mx-auto text-white p-20 pb-40">
        <div class="title">
            <div class="h-20">
                <h2 class="text-center text-[4rem] py-20 bzxyHv">Auctions</h2>
            </div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped>
.bzxyHv {
    line-height: 1;
    position: relative;
    margin: 0.1rem .5rem 1rem;
    font-size: 2.5rem;
    display: block;
    text-decoration: none;
    color: inherit;
    font-weight: 900;
    text-align: left;
    width: fit-content;
    transition: color 0.1s ease 0s, transform 0.1s ease 0s;
    padding: 0.2rem;
    text-shadow: -0.2rem 0.1rem 0 var(--app-theme-primary);
}

.bzxyHv::before {
    content: "";
    height: 100%;
    width: 120%;
    background-image: radial-gradient(rgba(187, 187, 195, 0.35) 0.75px, transparent 0.75px);
    background-size: calc(7.5px) calc(7.5px);
    z-index: 0;
    position: absolute;
    transform: translate(-0.75rem, 0.75rem);
}
</style>