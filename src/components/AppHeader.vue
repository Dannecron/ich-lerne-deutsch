<template>
    <div>
        <v-navigation-drawer absolute temporary app v-model="drawer" class="hidden-md-and-up">
            <v-list>
                <v-list-tile v-for="(item, i) in menuItems"
                    :key="`drawer-item-${i}`"
                    @click.prevent="changeLocation(item.route)"
                >
                    <v-list-tile-action>
                        <v-icon left v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                            <v-list-tile-title v-text="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

                <v-list-tile @click.prevent="signOut" v-if="isUserAuthenticated">
                    <v-list-tile-action>
                        <v-icon left v-html="'exit_to_app'"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        Выйти
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app dark class="primary">
            <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
            <router-link to="/" tag="span" style="cursor: pointer;">
                <v-toolbar-title v-text="'Ich Lerne Deutsch'"></v-toolbar-title>
            </router-link>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn v-for="(item, i) in menuItems" flat :key="`menuitem-${i}`" :to="item.route">
                    <v-icon left v-html="item.icon"></v-icon>
                    {{ item.title }}
                </v-btn>
                <v-btn flat @click.prevent="signOut" v-if="isUserAuthenticated">
                    <v-icon left v-html="'exit_to_app'"></v-icon>
                    Выйти
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </div>
</template>

<script>
export default {
    data() {
        return {
            drawer: false,
        };
    },
    methods: {
        signOut() {
            this.$confirm('Вы точно хотите выйти?').then(res => {
                if (res) {
                    this.$store.dispatch('signOut')
                        .then(() => this.changeLocation({ name: 'home' }));
                }
            });
        },
        changeLocation(to) {
            this.$router.push(to);
        },
    },
    computed: {
        isUserAuthenticated() {
            return this.$store.getters.isUserAuthenticated;
        },
        menuItems() {
            if (this.isUserAuthenticated) {
                return [
                    {
                        icon: 'visibility',
                        title: 'Статьи',
                        route: '/articles',
                    },
                    {
                        icon: 'extension',
                        title: 'Учить слова',
                        route: '/words',
                    },
                    {
                        icon: 'account_circle',
                        title: 'Мой профиль',
                        route: '/profile',
                    },
                ];
            }

            return [
                {
                    icon: 'visibility',
                    title: 'Статьи',
                    route: '/articles',
                },
                {
                    icon: 'input',
                    title: 'Войти',
                    route: '/sign_in',
                },
                {
                    icon: 'lock_open',
                    title: 'Регистрация',
                    route: '/sign_up',
                },
            ];
        },
    },
};
</script>

