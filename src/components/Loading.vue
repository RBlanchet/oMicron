<template>
  <div class="loading">
    <div>
      <img src="../assets/img/logo_white.png" id="loading_img" alt="Chargement" class="loading__image"/>
    </div>
  </div>
</template>

<script>
  import LoadingIcon from '../assets/img/logo.svg';

  export default {
    name: "Loading",
    components: {
      LoadingIcon
    }
  }
</script>
