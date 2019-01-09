<template>
<div>
  <swiper :options="swiperOption" class="swiper-box">
    <swiper-slide class="swiper-item"> <img src="../assets/omicron.svg"> Bienvue sur votre omicron </swiper-slide>
    <swiper-slide class="swiper-item"> <img src="../assets/engrenage.jpg"> Commençons la configuration !</swiper-slide>
    <swiper-slide class="swiper-item"> <img src="../assets/power.jpg"> Commencer par allumer le robot </swiper-slide>
    <swiper-slide class="swiper-item"> <img src="../assets/wifi.jpg"> A présent connecter vous au wifi du robot </swiper-slide>
    <swiper-slide class="swiper-item"> <img src="../assets/tools.png"> Et maintenant un peu de persnnalisation </swiper-slide>
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
    }
  }
</script>

<style lang="scss">
  @import "../style/main";
</style>
