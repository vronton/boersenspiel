<template>
  <nav class="navbar" style="background-color: #3578FF;">
  <div class="container-fluid">
    <a class="navbar-brand"> <b>trade</b>lou</a>
    <button class="navbar-toggler" style="color: white; border: 0px" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" ></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" style="color: white;" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
      </ul>
      
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #ffff;
}
.navbar-toggler-icon {
  color: white; /* Setzt die Farbe des Toggler-Icons auf weiß */
}
.navbar-toggler-icon {
  background-image: url('C:\Users\Dublin\Börsenspiel\boersenspiel\icons8-menü-50.png');
}
</style>
