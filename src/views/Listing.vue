<template>
  <div class="listing">
    <div class="listing__welcome animated fadeInDown" :class="{'fadeOutUp listing__welcome-hide': !listingWelcome}">
      <h1>Bienvenue !</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nec semper risus. Fusce ut ex in neque viverra posuere. Quisque vitae eros id sem maximus egestas
      </p>
    </div>
    <div class="listing__card-content">
      <div class="listing__card">
        <div class="listing__card-header">
          <img src="https://via.placeholder.com/150" alt="logo robot" class="listing__card-image" :class="{'listing__card-image_expand': cardExpand}" @click="selectRobot"/>
          <div class="listing__card-description">
            <h2>Mon Robot On</h2>
            <p>Lorem ipsum dolor sit amet</p>
          </div>
          <div class="listing__card-status">
            <div class="on"></div>
          </div>
        </div>
        <div class="listing__card--joystick" :class="{'listing__card--joystick_expand': cardExpand}">
          <transition name="fade">
            <Joystick v-if="joystickExpand"/>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Joystick from "@/components/Joystick.vue"

  export default {
    name: "Index",
    data() {
      return {
        listingWelcome: true,
        cardExpand: false,
        joystickExpand: false
      }
    },
    components: {
      Joystick
    },
    methods: {
      /**
       * Stock dans le store la config
       *
       * @param ip
       */
      initialisationConfig () {
        this.$store.dispatch('Config/attribuerConfig')
      },
      selectRobot() {
        if (this.listingWelcome) {
          this.listingWelcome = false
          setTimeout(() => {
            this.cardExpand = true
            setTimeout(() => {
              this.joystickExpand = true
            }, 1200)
          }, 1200)
        } else {
          this.joystickExpand = false
          setTimeout(() => {
            this.cardExpand = false
            setTimeout(() => {
              this.listingWelcome = true
            }, 1200)
          }, 1200)
        }

      }
    },
    mounted () {
      this.initialisationConfig()
    }
  }
</script>
