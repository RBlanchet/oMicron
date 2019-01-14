<template>
<div>
  <swiper :options="swiperOption" class="swiper-box">
    <swiper-slide class="swiper-item"> <img src="../assets/logo_white.png"> Bienvue sur votre omicron</swiper-slide>
    <swiper-slide class="swiper-item"> <img src="../assets/engrenage.png"> Commençons la configuration !</swiper-slide>
    <swiper-slide class="swiper-item"> <img src="../assets/power.png"> Commencer par allumer le robot </swiper-slide>
    <swiper-slide class="swiper-item"> <img src="../assets/wifi.png"> A présent connecter vous au wifi du robot </swiper-slide>
    <swiper-slide class="swiper-item"> 
      <img id="img-tools" src="../assets/tools.png"> Et maintenant un peu de personnalisation
        <button v-on:click="clickPersonnalisation" type="button" class="btn-slider"> GO</button>
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
        /**
         * TODO
         * ne plus afficher le tuto
         */
        this.$router.push('/test')
      }
    }
  }
</script>

<style lang="scss">
  @import "../style/main";
</style>
