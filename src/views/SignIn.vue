<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Вход</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                  <v-alert
                    :value="error"
                    type="warning"
                >
                    {{error}}
                </v-alert>

                <v-form id="sign-in-form" v-model="isValid" @submit.prevent="signIn">
                    <v-text-field 
                        prepend-icon="email"
                        v-model="email"
                        name="login"
                        label="Email"
                        type="email"
                        required
                        :rules="emailRules"
                    >
                    </v-text-field>

                    <v-text-field
                        prepend-icon="lock"
                        v-model="password"
                        name="password"
                        label="Пароль"
                        id="password"
                        type="password"
                        required
                        :rules="passwordRules"
                    >
                    </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" type="submit" form="sign-in-form" :disabled="isProcessing || !isValid">Войти</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
    import { emailRules, passwordRules } from '@/utils';

    export default {
        beforeMount() {
            this.$store.commit('clearError');
        },
        data: () => ({
            email: null,
            password: null,
            isValid: false,

            emailRules,
            passwordRules,
        }),
        computed: {
            error() {
                return this.$store.getters.getError;
            },
            isProcessing() {
                return this.$store.getters.getProcessing;
            },
            isUserAuthentificated() {
                return this.$store.getters.isUserAuthentificated;
            },
        },
        watch: {
            isUserAuthentificated(val) {
                if (val === true) {
                    this.$router.push('/');
                }
            },
        },
        methods: {
            signIn() {
                const { email, password } = this;
                this.$store.dispatch('signIn', { email, password });
            },
        },
    }
</script>
