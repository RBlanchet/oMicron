<template>
  <div class="colorisation">
  
    <form novalidate class="md-layout" @submit.prevent="validateUser" >
      <md-card class="md-layout-item md-size-50 md-small-size-100"  style="height: 100vh;" >

        <img class="img" src="./assets/logo_white.png">
        <md-card-header>
          <div class="md-title"><strong class='str'>O</strong>MICR<strong class='str'>O</strong>N</div>
        </md-card-header>
        
        <md-card class="cardForm">
        
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('name')">
                  <label for="first-name">Nom</label>
                  <md-input name="first-name" id="first-name" autocomplete="given-name" v-model="form.name" :disabled="sending" />
                  <span class="md-error" v-if="!$v.form.name.required">Veuillez renseigner un nom d'utilisateur</span>
                </md-field>
              </div>
            </div>

               
            <md-field :class="getValidationClass('color')">
              <label for="color">Couleur</label>
                <md-select name="color" id="color" v-model="form.color" md-dense :disabled="sending">
                  <md-option value="M">bleu</md-option>
                  <md-option value="F">rouge</md-option>
                </md-select>
              <span class="md-error">Veuillez choisir une couleur</span>
            </md-field>

          </md-card-content>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />

          <md-button type="submit" class="but" :disabled="sending">Ajouter votre Omicron</md-button>
          

        </md-card>
      </md-card>
      <md-snackbar :md-active.sync="userSaved"> {{ lastUser }} à été créé avec succes!</md-snackbar>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'

  export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
      form: {
        name: null,
        color: null,
      },
      userSaved: false,
      sending: false,
      lastUser: null
    }),
    validations: {
      form: {
        name: {
          required,
          minLength: minLength(3)
        },
        color: {
          required
        }
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.name = null
        this.form.color = null
      },
      saveUser () {
        this.sending = true

        // Instead of this timeout, here you can call your API
        window.setTimeout(() => {
          this.lastUser = `${this.form.name}`
          this.userSaved = true
          this.sending = false
          this.clearForm()
        }, 1500)
      },
      validateUser () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveUser()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

  input[type=text] {
    margin-left: -1em;
  }
  .colorisation{
    background-color: #425ee5e6;
    font-size: 10vh;
  }
  .cardForm{
    margin-left: 7.5%;
    padding-left: 10px;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
    width:85%;
  }
  .md-input{   
    border: 2px solid grey;
    border-radius: 5px;
  }
  .img{
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 25%;  
  }
  .md-title{
    margin-top: 4%;
    text-align: center;
    font-size: 2.5vh;
  }
  .md-select{
    border: 2px solid grey;
    background-color: white;
    border-radius: 5px;
  }
  .str{
    color: #52C8FA;
  }
  .md-progress-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
  }
  .but{
    margin-left: 22.5%;
    box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
    border-radius: 15px;
    background-color: white;
    margin-top: 7.5%;
    text-align: center;
  }
</style>
