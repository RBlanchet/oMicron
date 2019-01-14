<template>
<div>
  <swiper :options="swiperOption" class="swiper-box">
    <swiper-slide class="swiper-item"> <img src="../assets/logo_white.png"> Bienvue sur votre omicron </swiper-slide>
    <swiper-slide class="swiper-item"> <img src="../assets/engrenage.png"> Commençons la configuration !</swiper-slide>
    <swiper-slide class="swiper-item"> <img src="../assets/power.png"> Commencer par allumer le robot </swiper-slide>
    <swiper-slide class="swiper-item"> <img src="../assets/wifi.png"> A présent connecter vous au wifi du robot </swiper-slide>
    <swiper-slide class="swiper-item">
        <img id="img-tools" src="../assets/tools.png"> Vous pouvez personnaliser votre robot
        <button v-on:click="clickPersonnalisation" type="button" class="btn-slider"> PERSONNALISER </button>
        <button v-on:click="clickPlusTard" type="button" class="btn-slider-plustard btn-slider"> PLUS TARD </button>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>

</div>

</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    name: "Tuto",
    components: {
      swiper,
      swiperSlide
    },
    data() {
       return {
        swiperOption: {
          direction: 'horizontal',
          slidesPerView: 1,
          spaceBetween: 30,
          mousewheel: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
      }
    },
    methods: {
      clickPersonnalisation() {
        localStorage.tuto = true
        this.$router.push('/personnalisation')
      },
      clickPlusTard() {
        localStorage.tuto = true
        this.$router.push('/')
      }
    }
  }
</script>
