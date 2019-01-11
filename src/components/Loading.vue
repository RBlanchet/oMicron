<template>
  <div class="loading">
    <LoadingIcon class="loading__image"/>
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
