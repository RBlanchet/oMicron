<template>
  <div>
    <div :class="{'fadeOutUp': !loading}">
      <Loading/>
    </div>
    <div class="listing">
      <div class="listing__welcome" :class="{ 'listing__welcome-hide': !listingWelcome, 'fadeInDown': listing, 'fadeOutUp': !listingWelcomeFade }">
        <h1>Bienvenue !</h1>
        <p>
          Sur votre interface Omicron, voici la lise de vos Robots.
        </p>
      </div>
      <div class="listing__card-content" :class="{ 'fadeInLeft': listing }">
        <div class="listing__card">
          <div class="listing__card-header">
            <div class="listing__card-image" :style="{ 'background-color': color }" :class="{'listing__card-image_expand': cardExpand}" @click="selectRobot"></div>
            <div class="listing__card-description">
              <h2>{{ nom }}</h2>
              <p>Cliquez pour commencer</p>
            </div>
            <div class="listing__card-status">
              <div class="on"></div>
            </div>
          </div>
          <div class="listing__card--joystick" :class="{'listing__card--joystick_expand': cardExpand}">
            <transition name="fade">
              <Joystick v-if="joystickExpand" style="animation-duration: 0.5s"/>
            </transition>
          </div>
          <transition name="fadeDown">
            <button class="listing__card--button" @click="personnaliser" v-if="joystickExpand">
              PERSONNALISER
            </button>
          </transition>
        </div>
      </div>
    </div>
    <transition name="fadeRight">
      <div class="listing__close" v-if="close">
        <button @click="closeCard">X</button>
      </div>
    </transition>
  </div>
</template>

<script>
  import Joystick from "@/components/Joystick.vue"
  import Loading from "@/components/Loading.vue"

  export default {
    name: "Index",
    data() {
      return {
        listingWelcome: true,
        cardExpand: false,
        joystickExpand: false,
        loading: true,
        listing: false,
        listingWelcomeFade: true,
        close: false,
        nom: localStorage.nom ? localStorage.nom : "Mon robot",
        color: localStorage.color ? localStorage.color : "#333",
      }
    },
    components: {
      Loading,
      Joystick
    },
    methods: {
      /**
       * Stock dans le store la config
       *
       * @param ip
       */
      initialisationConfig () {
        return new Promise(resolve => {
          this.$store.dispatch('Config/attribuerConfig')
          resolve(true)
        })
      },
      selectRobot() {
        if (this.listingWelcome) {
          this.listingWelcome = false
          this.listingWelcomeFade = false
          setTimeout(() => {
            this.cardExpand = true
            setTimeout(() => {
              this.close = true
              this.joystickExpand = true
            }, 600)
          }, 600)
        }
      },
      closeCard() {
        this.close = false
        this.joystickExpand = false
        setTimeout(() => {
          this.cardExpand = false
          setTimeout(() => {
            this.listingWelcome = true
            setTimeout(() => {
              this.listingWelcomeFade = true
            }, 500)
          }, 600)
        }, 600)
      },
      personnaliser () {
        this.$router.push('/personnalisation')
      }
    },
    mounted () {
      if (!localStorage.tuto) {
        this.$router.push('/tuto')
      }
      this.initialisationConfig()
        .then(r => {
          setTimeout(() => {
            this.loading = false
            this.listing = true
          }, 2500)
        })
    }
  }
</script>
