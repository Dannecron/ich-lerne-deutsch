import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import { EventBus, EVENTS } from '@/utils';

export default {
    state: {
        user: {
            isAuthenticated: false,
            uid: null,
            email: null,
            name: null,
        },
        unSubscribeAuth: null,
    },
    mutations: {
        setUser(state, { uid, email }) {
            state.user.isAuthenticated = true;
            state.user.uid = uid;
            state.user.email = email;
        },
        unSetUser(state) {
            state.user.isAuthenticated = false;
            state.user.uid = null;
        },
        setUserName(state, name) {
            Vue.set(state.user, 'name', name);
        },
        setUserEmail(state, email) {
            Vue.set(state.user, 'email', email);
        },
        setUnSubscribeAuth(state, func) {
            state.unSubscribeAuth = func;
        },
    },
    actions: {
        initAuth({ commit, dispatch, state }) {
            return new Promise((resolve) => {
                if (state.unSubscribeAuth) {
                    state.unSubscribeAuth();
                }

                const unSubscribe = firebase.auth()
                    .onAuthStateChanged((user) => {
                        dispatch('stateChanged', user);
                        resolve(user);
                    });

                commit('setUnSubscribeAuth', unSubscribe);
            })
        },
        async signUp({ commit }, payload) {
            await commit('setProcessing', true);
            commit('clearError');

            const { email, password, name } = payload;
            await firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    firebase.auth().currentUser
                        .updateProfile({
                            displayName: name,
                        })
                        .then(() => commit('setUserName', name));
                })
                .catch(function(error) {
                    const { message } = error;
                    commit('setError', message);
                });

            await commit('setProcessing', false);
        },
        async signIn({ commit }, payload) {
            await commit('setProcessing', true);
            commit('clearError');

            const { email, password } = payload;
            await firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                })
                .catch(function(error) {
                    const { message } = error;
                    commit('setError', message);
                });

            await commit('setProcessing', false);
        },
        signOut() {
            firebase.auth().signOut();
        },
        stateChanged({ commit, dispatch }, payload) {
            if (payload) {
                commit('setUser', payload);
                commit('setUserName', payload.displayName);
                dispatch('loadUserData', payload.uid);
            } else {
                commit('unSetUser');
            }
        },
        async changeUserProfileData({ commit }, payload) {
            const { email, password } = payload;
            const credential = firebase.auth.EmailAuthProvider.credential(email, password);

            await commit('setProcessing', true);
            commit('clearError');

            await firebase.auth().currentUser.reauthenticateAndRetrieveDataWithCredential(credential)
                .then(() => {
                    const { changeType } = payload;
                    const reauthenticatedUser = firebase.auth().currentUser;

                    if (changeType === 'changeName') {
                        const { newName } = payload;
                        return reauthenticatedUser.updateProfile({
                            displayName: newName,
                        })
                            .then(() => commit('setUserName', newName))
                    }

                    if (changeType === 'changeEmail') {
                        const { newEmail } = payload;
                        return reauthenticatedUser.updateEmail(newEmail)
                            .then(() => commit('setUserEmail', newEmail))
                    }

                    if (changeType === 'changePassword') {
                        const { newPassword } = payload;
                        return reauthenticatedUser.updatePassword(newPassword);
                    }

                    throw Error('invalid change type');
                })
                .catch((e) => {
                    window.console.error(e);
                    const { message } = e;
                    commit('setError', message);
                });

            await commit('setProcessing', false);
            await EventBus.notify(EVENTS.USER.PROFILE_CHANGED);
        },
    },
    getters: {
        isUserAuthenticated: state => state.user.isAuthenticated,
        userId: state => state.user.uid,
        userName: state => state.user.name,
        userEmail: state => state.user.email,
    },
};
