<template>
  <div>
    <Loading/>
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
