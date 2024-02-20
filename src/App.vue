<template>
  <Navbar msg="Welcome to Your Vue.js App" class="custom-margin"/>

  
  <div class="container text-left">
    <div class="row">
      <div class="col">
      </div>
    <router-view></router-view>
      <div class="col ">
      </div>
    </div>
  </div>

  
</template>

<script>
import Navbar from './components/Navbar.vue'


export default {
  name: 'App',
  components: {
    Navbar
}
}
</script>

<style>
html, body, #app {
  font-family: Arial, Helvetica, sans-serif;
  font-size: small;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left ;
  color: #2c3e50;
  margin-top: 0px;
  background-color: #faf8f8;
  height: 100%;
  margin: 0;
  padding: 0;
  
}

.custom-margin {
  margin-bottom: 5rem;
}

</style>
