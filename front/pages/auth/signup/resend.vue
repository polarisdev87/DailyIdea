<template>
  <v-form>
    <v-container>
      <v-layout row>
        <v-flex>
          <p class="dash-trailing">Get Started With A Free Account.</p>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex>
          <p>Resend Confirmation Email TODO TEXT.</p>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex>
          <v-text-field v-model="email" label="Your Email Address" />
        </v-flex>
      </v-layout>
      <v-btn @click="resend">Resend Confirmation Email</v-btn>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    email: ''
  }),
  methods: {
    async resend() {
      await this.$store.dispatch('cognito/resendConfirmation', {
        username: this.email
      })
    }
  }
}
</script>
