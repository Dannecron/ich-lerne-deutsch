<template>
    <div>
        <v-card>
            <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">
                    <v-icon>person</v-icon>
                    {{ userName }}
                </h3>
                <h3 class="headline mb-0">
                    <v-icon>email</v-icon>
                    {{ userEmail }}
                </h3>
            </div>
            </v-card-title>

            <v-card-actions>
                <v-spacer></v-spacer>
            <v-btn flat color="orange" @click.stop="dialog = true">Изменить</v-btn>
            </v-card-actions>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="550px">
            <v-card>
                <v-card-title class="headline">Изменить данные?</v-card-title>
                <v-card-text>
                    <v-alert
                        type="warning"
                        class="mb-2"
                        :value="getError"
                    >
                        {{ getError }}
                    </v-alert>

                    <v-form id="edit-profile-form" v-model="isValid" @submit.prevent="changeUserData">
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
                            type="password"
                            required
                            :rules="passwordRules"
                        >
                        </v-text-field>

                        <h3>Какие данные нужно изменить?</h3>
                        <v-radio-group v-model="changeType" row>
                            <v-radio label="Имя" value="changeName"></v-radio>
                            <v-radio label="Email" value="changeEmail"></v-radio>
                            <v-radio label="Пароль" value="changePassword"></v-radio>
                        </v-radio-group>

                        <v-text-field
                            v-if="changeType === 'changeName'"
                            prepend-icon="person"
                            v-model="newName"
                            name="newName"
                            type="text"
                            label="Новое имя"
                            required
                            :rules="nameRules"
                        >
                        </v-text-field>

                        <v-text-field
                            v-if="changeType === 'changeEmail'"
                            prepend-icon="email"
                            v-model="newEmail"
                            name="newLogin"
                            type="email"
                            label="Новый email"
                            required
                            :rules="emailRules"
                        >
                        </v-text-field>

                        <v-text-field
                            v-if="changeType === 'changePassword'"
                            prepend-icon="lock"
                            v-model="newPassword"
                            name="newPassword"
                            type="password"
                            label="Новый пароль"
                            required
                            :rules="passwordRules"
                        >
                        </v-text-field>
                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click="dialog = false">Отмена</v-btn>
                    <v-btn
                        type="submit"
                        color="green darken-1"
                        form="edit-profile-form"
                        flat
                        :disabled="getProcessing || !isValid"
                    >
                        Изменить
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { emailRules, passwordRules, nameRules, EVENTS } from "@/utils";

export default {
    data: () => ({
        email: null,
        password: null,
        newEmail: null,
        newPassword: null,
        newName: null,

        changeType: 'changeName',
        dialog: false,
        isValid: false,

        emailRules,
        passwordRules,
        nameRules,
    }),
    computed: {
        ...mapGetters(['userName', 'userEmail', 'getProcessing', 'getError']),
    },
    methods: {
        changeUserData() {
            const {
                email,
                password,
                newEmail,
                newPassword,
                newName,
                changeType,
            } = this;

            this.$store.dispatch('changeUserProfileData', {
                email,
                password,
                newEmail,
                newPassword,
                newName,
                changeType,
            });
        },
    },
    created() {
        this.$bus.$on(EVENTS.USER.DATA_CHANGED, () => {
            this.dialog = false;
        });
    },
    beforeDestroy() {
        this.$bus.$off(EVENTS.USER.DATA_CHANGED);
    },
};
</script>
