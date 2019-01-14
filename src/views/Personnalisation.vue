<template>
  <!--<img src="../assets/img/logo_white.png" id="loading_img" alt="Chargement" class="loading__image"/>-->
  <div class="personnalisation">
    <div class="personnalisation__card">
      <div class="personnalisation__card--input">
        <input type="text" name="nom" id="nom" v-model="nom" :class="{ 'not-empty' : nom.length > 0 }">
        <i>
          <Robot/>
        </i>
        <label for="nom">Nom</label>
      </div>
      <div class="personnalisation__card--select" @click="openPalette">
        <div class="personnalisation__card--select_color" :style="{ 'background-color': colors.hex }">
          <p v-if="!colors.hex">COULEUR</p>
        </div>
      </div>
      <div class="personnalisation__card--palette">
        <transition name="fadeDown">
          <compact-picker v-model="colors" v-if="palette"/>
        </transition>
      </div>
      <button class="personnalisation__card--button">VALIDER</button>
    </div>
  </div>
</template>

<script>
  import Robot from "vue-material-design-icons/Robot"
  import { Compact } from 'vue-color'

  export default {
    name: 'Personnalisation',
    data: () => ({
      nom: '',
      colors: [],
      palette: false
    }),
    methods: {
      openPalette () {
        this.palette = !this.palette
      }
    },
    watch: {
      "colors.hex": function () {
        this.palette = false
      }
    },
    components: {
      Robot,
      'compact-picker': Compact
    }
  }
</script>
