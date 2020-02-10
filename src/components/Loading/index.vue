<template>
  <div class="loading">
  </div>
</template>

<style scoped>
.loading {
  margin: 100px auto;
  width: 50px;
  height: 50px;
  border: 3px solid #6E8B3D;
  border-bottom: #aaa 3px solid;
  border-radius: 50%;
  animation: load 1.1s infinite linear;
  -webkit-animation: load 1.1s infinite linear;
  -moz-animation: load 1.1s infinite linear;
  -o-animation: load 1.1s infinite linear;
}
@keyframes load {
  from {
    transform: rotate(0deg);
    -ms-transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
    -ms-transform: rotate(360deg);
  }
}
@-webkit-keyframes load {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
@-moz-keyframes load {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}
@-o-keyframes load {
  from {
    -o-transform: rotate(0deg);
  }
  to {
    -o-transform: rotate(360deg);
  }
}
</style>