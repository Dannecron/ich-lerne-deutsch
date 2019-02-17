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

                <v-form>
                    <v-text-field 
                        prepend-icon="person"
                        v-model="email"
                        name="login"
                        label="Email"
                        type="email"
                        required
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
                    >
                    </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click.prevent="signUp" :disabled="isProcessing">Зарегистрироваться</v-btn>
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
