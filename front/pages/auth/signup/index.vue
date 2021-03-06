<template>
  <div id="signupPage">
    <!-- Grid -->
    <v-layout class="mainTable" row>
      <!-- Desktop Only - Left Side Image Container -->
      <v-flex class="leftSideImageContainer" hidden-sm-and-down>
        <img class="bigTreeImage" src="~/assets/images/bigTree.png" />
        <img
          class="imgPersonWithPhone"
          src="~/assets/images/person_with_phone.png"
        />
      </v-flex>

      <!-- Register Div -->
      <v-flex class="registerDiv">
        <img class="logoIcon" src="~/assets/images/signup/dark_gray_lamp.png" />
        <br />
        <img class="logoText" src="~/assets/images/logo_text.png" />

        <!-- Register Form -->
        <form @submit.prevent="signup">
          <!-- Email Input Box -->
          <v-text-field
            v-model="name"
            v-validate="'required|max:100'"
            :error-messages="errors.collect('name')"
            data-vv-name="name"
            class="inputBox name"
            single-line
            flat
            label="Enter name"
            prepend-inner-icon="fas fa-user"
          ></v-text-field>

          <!-- Email Input Box -->
          <v-text-field
            v-model="email"
            v-validate="'required|email'"
            class="inputBox email"
            :error-messages="errors.collect('email')"
            data-vv-name="email"
            single-line
            flat
            label="Enter email"
            prepend-inner-icon="email"
          ></v-text-field>

          <!-- Email Already Exists Message -->
          <div v-if="emailExistsMsg != ''" class="emailExistsMsg">
            {{ emailExistsMsg }}
            <div>
              <v-btn to="/auth/login" text small color="#827C85"
                >Login instead?</v-btn
              >
            </div>
          </div>

          <!-- Continue Button -->
          <v-btn
            type="submit"
            large
            class="continueBtn"
            :loading="registerInProgress"
            @click="signup"
            >Continue</v-btn
          >
        </form>

        <!-- Login div at bottom -->
        <div class="accountExists">
          <div class="existsTitle">
            Already have an account?
            <nuxt-link class="loginBtn" text to="/auth/login">Login</nuxt-link>
          </div>
        </div>
      </v-flex>

      <!-- Desktop Only - Right Side Image Container -->
      <v-flex class="rightSideImageContainer" hidden-sm-and-down>
        <img class="smallTreeImage" src="~/assets/images/smallTree.png" />
        <img
          class="imgPersonWithPhone"
          src="~/assets/images/signup/lady_with_phone.png"
        />
      </v-flex>
    </v-layout>

    <!-- Fixed Footer -->
    <v-layout
      hidden-sm-and-down
      class="fixedFooter"
      :style="{
        'background-image':
          'url(' + require('~/assets/images/signup/footer_background.png') + ')'
      }"
    ></v-layout>
  </div>
</template>

<script>
import nanoid from 'nanoid'
import { getErrorMessage } from '~/utils'
export default {
  data: () => ({
    email: '',
    name: '',
    emailExistsMsg: '',
    registerInProgress: false
  }),
  $_veeValidate: {
    validator: 'new'
  },
  mounted() {
    this.$validator.localize('en', this.dictionary)
  },
  methods: {
    async signup() {
      try {
        this.emailExistsMsg = ''

        // Validate input fields
        const result = await this.$validator.validateAll()
        if (!result) {
          return
        }

        this.registerInProgress = true

        await this.$store.dispatch('cognito/registerUser', {
          username: this.email,
          password: nanoid(),
          attributes: {
            name: this.name
          }
        })
        await this.$amplifyApi.post('RequestLogin', '', {
          body: { email: this.email }
        })

        // Redirect to registeration success page
        this.$router.push({
          name: 'auth-signup-success',
          params: { email: this.email }
        })
      } catch (e) {
        // Handle email already registered
        if (e.code && e.code === 'UsernameExistsException') {
          this.registerInProgress = false
          this.emailExistsMsg = 'Sorry, email mentioned already exist.'
          return
        }

        this.$snotify.error(getErrorMessage(e), 'Error', {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true
        })
      }
    }
  }
}
</script>

<style lang="scss">
#signupPage {
  // border: 1px solid red;
  height: 100vh;
  overflow: hidden;
  background: white;
  overflow: hidden;

  .backBtn {
    color: $primary-color;
    position: fixed;
    top: 0;
    left: 0;
    margin: 5px 3px;
    z-index: 5000;

    i {
      font-size: 16px;
    }
  }

  .mainTable {
    margin: 0px;
    height: 100vh;
    z-index: 100;

    .leftSideImageContainer {
      position: relative;
      z-index: 10;

      .bigTreeImage {
        height: 75vh;
        position: absolute;
        left: -3%;
        top: 20vh;
      }

      .imgPersonWithPhone {
        height: 75vh;
        position: absolute;
        right: 10%;
        bottom: 3vh;
      }
    }

    .rightSideImageContainer {
      position: relative;
      z-index: 100;

      .smallTreeImage {
        height: 90vh;
        position: absolute;
        left: 58%;
        bottom: 6vh;
      }

      .imgPersonWithPhone {
        height: 72vh;
        position: absolute;
        left: 20%;
        bottom: 3vh;
      }
    }

    .registerDiv {
      // border: 1px solid red;
      text-align: center;
      padding-top: 15vh;
      z-index: 10;
      height: 100vh;
      overflow-x: auto;

      @media #{$small-screen} {
        padding-top: 10vh;
      }

      .logoIcon {
        width: 70px;
      }

      .logoText {
        width: 200px;
        margin-bottom: 7vh !important;
      }

      .inputBox {
        width: 70%;
        margin: auto;
        max-width: 420px;
        margin-top: 0.5vh !important;

        .v-input__prepend-inner {
          padding-right: 15px;
          font-size: 12px;

          i {
            font-size: 18px;
          }
        }
      }

      .emailExistsMsg {
        width: 70%;
        margin: auto;
        max-width: 420px;
        color: #c8c7c7;
      }

      .continueBtn {
        border-radius: 4px;
        margin-top: 5vh;
        width: 70%;
        max-width: 420px;

        letter-spacing: 1px;
      }

      .accountExists {
        margin-top: 6vh;

        .existsTitle {
          font-size: 14px;
          line-height: 1.57;
          color: #c8c7c7;

          .loginBtn {
            text-decoration: none;
          }
        }
      }

      @media #{$small-screen} {
        position: fixed;
        bottom: 0px;
        width: 100%;

        .logoIcon {
          height: 20vh !important;
          width: auto;
        }

        .logoText {
          width: 200px;
        }

        .inputBox,
        .continueBtn {
          width: 80%;
          max-width: none;
        }

        .accountExists {
          position: fixed;
          bottom: 0;
          width: 100%;

          .loginBtn {
            display: block;
            width: 100%;
            border-radius: 0px;
            padding: 20px !important;
            background-color: $primary-color !important;
            color: white !important;
            margin-top: 3px;
            text-transform: uppercase !important;
          }
        }
      }
    }
  }

  .fixedFooter {
    height: 30vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 0;
    // border: 1px solid red;

    background-size: cover;
    // background-position-y: 30px;
  }
}
</style>
