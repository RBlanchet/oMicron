<template>
  <div class="listing">
    <div class="listing__welcome">
      <h1>Bienvenueeeee !</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec semper risus. Fusce ut ex in neque viverra posuere. Quisque vitae eros id sem maximus egestas
      </p>
    </div>
    <div class="listing__card-content">
      <div class="listing__card">
        <img src="https://via.placeholder.com/150" alt="logo robot" class="listing__card-image"/>
        <div class="listing__card-description">
          <h2>Mon Robot On</h2>
          <p>Lorem ipsum dolor sit amet</p>
        </div>
        <div class="listing__card-status">
          <div class="on"></div>
        </div>
      </div>
      <div class="listing__card">
        <img src="https://via.placeholder.com/150" alt="logo robot" class="listing__card-image"/>
        <div class="listing__card-description">
          <h2>Mon Robot Off</h2>
          <p>Lorem ipsum dolor sit amet</p>
        </div>
        <div class="listing__card-status">
          <div class="off"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Loading from "@/components/Loading.vue"

  export default {
    name: "Index",
    components: {
      Loading
    },
    methods: {
      /**
       * Stock dans le store la config
       *
       * @param ip
       */
      initialisationConfig () {
        this.$store.dispatch('Config/attribuerConfig')
      }
    },
    mounted () {
      this.initialisationConfig()
    }
  }
</script>

<style lang="scss">
  @import "../style/main";
</style>
