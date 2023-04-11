<template>
    <div>
        <button class="blue">{{ text }}</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
           
        }
    },
    props:["text"],
}
</script>

<style  scoped>
button {
    border-radius: 4rem;
    padding: 0.6rem 2rem;
    border: none;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
}

.blue {
    background-color: #2d69fd;
}
</style>

 