<template>
  <Layout
    v-bind="{
      currentPage: 'Settings',
      pageOptions: mobileHeaderUiOptions
    }"
  >
    <v-layout id="settingsPage">
      <div class="headerOfSetting">
        SETTINGS
      </div>

      <v-container class="settingsList">
        <nuxt-link class="settingsItem" :to="{ name: 'profile' }">
          <div class="settingsInfo">
            <v-icon>fas fa-pen</v-icon>
            Me
          </div>
          <div class="metadata">{{ profileInfo.name }}</div>
        </nuxt-link>

        <nuxt-link class="settingsItem" :to="{ name: 'settings-email' }">
          <div class="settingsInfo">
            <v-icon>fas fa-envelope</v-icon>
            Email
          </div>
          <div class="metadata">All</div>
        </nuxt-link>

        <div class="settingsItem">
          <div class="settingsInfo">
            <v-icon>fas fa-user</v-icon>
            Account
          </div>
          <div class="metadata">{{ userEmail }}</div>
        </div>
        <!-- <div class="settingsItem">
					<div class="settingsInfo">
						<v-icon>fas fa-lock</v-icon>
						Privacy
					</div>
					<div class="metadata">Only me</div>
				</div>
				<div class="settingsItem">
					<div class="settingsInfo">
						<v-icon>fas fa-question-circle</v-icon>Help
					</div>
					<div class="metadata">Questions?</div>
				</div> -->
        <div class="settingsItem" @click="signout()">
          <div class="settingsInfo"><v-icon>fas fa-ban</v-icon>Sign Out</div>
          <div class="metadata">Sign Out Now</div>
        </div>
      </v-container>
    </v-layout>
  </Layout>
</template>

<script>
import { graphqlOperation } from '@aws-amplify/api'
import userInfo from '~/graphql/query/userInfo'
import Layout from '@/components/layout/Layout'

export default {
  components: { Layout },
  async asyncData({ app, route, store }) {
    const profileUserId = store.getters['cognito/userSub']

    const { data } = await app.$amplifyApi.graphql(
      graphqlOperation(userInfo, { userId: profileUserId })
    )

    return {
      profileInfo: data.userInfo.userInfo
    }
  },
  data() {
    return {
      profileInfo: null,
      mobileHeaderUiOptions: {
        pageTitle: 'SETTINGS',
        leftButtonType: 'back'
      }
    }
  },
  computed: {
    userEmail() {
      return this.$store.state.cognito.user.username
    }
  },
  methods: {
    signout() {
      this.$store.dispatch('cognito/signOut')

      // Redirect user to home page after logout
      this.$router.push({
        name: 'index'
      })
    }
  }
}
</script>

<style lang="scss">
#settingsPage {
  padding-top: 50px;
  background: white;
  min-height: 100vh;
  padding-bottom: 2vh;
  display: block;
  width: 100%;
  overflow-x: hidden;

  padding-right: 3%;
  padding-left: 2%;

  .headerOfSetting {
    text-align: center;
    font-size: 25px;

    @media #{$small-screen} {
      display: none;
    }
  }

  @media #{$small-screen} {
    padding-top: 0vh;
  }

  .pageHeader {
    // border: 1px solid red;
    padding: 25px 15px;
    width: 100%;

    .mobileHeader {
      .text {
        text-align: center;
        margin-top: 2px;
        font-size: 14px;
        font-weight: 600;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.57;
        letter-spacing: 0.42px;
        text-align: center;
        color: #18141c;
      }
      i {
        color: #c0b7c5 !important;
        font-size: 15px;
      }
    }
  }

  .settingsList {
    max-width: 700px;
    // border: 1px solid red;
    margin-top: 5vh;
    padding: 0px !important;
    @media #{$mobile} {
      margin-top: 2vh;
    }

    .settingsItem {
      border: 1px solid #e4e4e4;
      margin: 17px 15px 17px 15px;
      padding: 15px;
      display: flex;
      font-size: 13px !important;
      text-decoration: none;
      cursor: pointer;

      a {
        text-decoration: none;
      }

      .settingsInfo {
        flex: 1;
        font-size: 13px !important;
        color: $primary-color;
        i {
          color: $primary-color;
          font-size: 13px !important;
          margin-right: 15px;
        }
      }

      .metadata {
        flex: 1;
        text-align: right;
        color: #c0b7c5;
        font-size: 12px;
      }
    }
  }
}
</style>
