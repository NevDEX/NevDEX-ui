<template>
  <div>
    <button class="btn">{{ text }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['text'],
}
</script>

<style scoped>
/* button {
  border-radius: 4rem;
  padding: 0.6rem 2rem;
  border: none;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
} */

.blue {
  background-color: #2d69fd;
}

.blue:hover {
  background: #3cb0fd;
  background-image: -webkit-linear-gradient(top, #3cb0fd, #3498db);
  background-image: -moz-linear-gradient(top, #3cb0fd, #3498db);
  background-image: -ms-linear-gradient(top, #3cb0fd, #3498db);
  background-image: -o-linear-gradient(top, #3cb0fd, #3498db);
  background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
  text-decoration: none;
}

.btn {
  font-family: Arial;
  color: #ffffff;
  font-size: 17px;
  background: transparent;
  padding: 10px 20px 10px 20px;
  border: solid #adb0b1 1px;
  text-decoration: none;
}

.btn:hover {
  background: #3cb0fd;
  background-image: -webkit-linear-gradient(top, #3cb0fd, #3498db);
  background-image: -moz-linear-gradient(top, #3cb0fd, #3498db);
  background-image: -ms-linear-gradient(top, #3cb0fd, #3498db);
  background-image: -o-linear-gradient(top, #3cb0fd, #3498db);
  background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
  text-decoration: none;
}
</style>

 