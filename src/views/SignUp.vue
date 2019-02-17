<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Регистрация</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                  <v-alert
                    :value="error"
                    type="warning"
                >
                    {{error}}
                </v-alert>

                <v-form id="sign-up-form" v-model="isValid" @submit.prevent="signUp">
                    <v-text-field 
                        prepend-icon="person"
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
                <v-btn type="submit" color="primary" form="sign-up-form" :disabled="isProcessing || !isValid">Зарегистрироваться</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
    export default {
        data() {
            return {
                email: null,
                password: null,
                isValid: false,
                emailRules: [
                    (value) => !!value || 'Пожалуйста, введите email',
                    (value) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Неправильный email',
                ],
                passwordRules: [
                    (value) => !!value || 'Пожалуйста введите пароль',
                    (value) => (value && value.length >= 6) || 'Пароль слишком короткий - минимум 6 символов',
                ],
            };
        },
        computed: {
            error() {
                return this.$store.getters.getError;
            },
            isProcessing() {
                return this.$store.getters.getProcessing;
            },
            isUserAuthentificated() {
                return this.$store.getters.isUserAuthentificated;
            }
        },
        watch: {
            isUserAuthentificated(val) {
                if (val === true) {
                    this.$router.push('/');
                }
            },
        },
        methods: {
            signUp() {
                const { email, password } = this;
                this.$store.dispatch('signUp', { email, password });
            },
        },
    }
</script>
