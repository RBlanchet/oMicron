<template>
  <div>
    <img src="../assets/img/logo_white.png" alt="Logo" class="personnalisation__image"/>
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
        <button class="personnalisation__card--button" @click="validerForm" value="VALIDER">
          <transition name="fade" mode="out-in">
              <img src="../assets/img/logo_no_name.png" id="loading_img" style="width: 30%" class="animated" v-if="loading">
              <p v-else>VALIDER</p>
          </transition>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Robot from "vue-material-design-icons/Robot"
  import { Compact } from 'vue-color'

  export default {
    name: 'Personnalisation',
    data: () => ({
      nom: localStorage.nom ? localStorage.nom : '',
      colors: {
        hex: localStorage.color ? localStorage.color : [],
      },
      palette: false,
      loading: false
    }),
    methods: {
      openPalette () {
        this.palette = !this.palette
      },
      validerForm () {
        this.loading = true

        localStorage.color = this.colors.hex
        localStorage.nom = this.nom

        setTimeout(() => {
          this.$router.push('/')
        }, 2500)
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
