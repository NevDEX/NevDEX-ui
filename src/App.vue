<template>
  <div class="flex flex-col h-screen">
    <Navbar />
    <div class="flex-1 mt-12">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  components: {
    Navbar,
  },
}
</script>
