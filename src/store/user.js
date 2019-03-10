import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
    state: {
        user: {
            isAuthentificated: false,
            uid: null,
            email: null,
            name: null,
        },
    },
    mutations: {
        setUser(state, { uid, email }) {
            state.user.isAuthentificated = true;
            state.user.uid = uid;
            state.user.email = email;
        },
        unSetUser(state) {
            state.user.isAuthentificated = false;
            state.user.uid = null;
        },
        setUserName(state, name) {
            Vue.set(state.user, 'name', name);
        },
        setUserEmail(state, email) {
            Vue.set(state.user, 'email', email);
        }
    },
    actions: {
        signUp({ commit }, payload) {
            commit('setProcessing', true);
            commit('clearError');

            const { email, password, name } = payload;
            firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    firebase.auth().currentUser
                        .updateProfile({
                            displayName: name,
                        })
                        .then(() => commit('setUserName', name));
                    commit('setProcessing', false);
                })
                .catch(function(error) {
                    const { message } = error;
                    commit('setProcessing', false);
                    commit('setError', message);
                });
        },
        signIn({ commit }, payload) {
            commit('setProcessing', true);
            commit('clearError');

            const { email, password } = payload;
            firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    commit('setProcessing', false);
                })
                .catch(function(error) {
                    const { message } = error;
                    commit('setProcessing', false);
                    commit('setError', message);
                });
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
        changeUserProfileData({ commit }, payload) {
            const { email, password } = payload;
            const credential = firebase.auth.EmailAuthProvider.credential(email, password);

            commit('setProcessing', true);
            commit('clearError');

            firebase.auth().currentUser.reauthenticateAndRetrieveDataWithCredential(credential)
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
                .then(() => commit('setProcessing', false))
                .catch((e) => {
                    window.console.error(e);

                    const { message } = e;
                    commit('setProcessing', false);
                    commit('setError', message);
                });
        },
    },
    getters: {
        isUserAuthentificated: state => state.user.isAuthentificated,
        userId: state => state.user.uid,
        userName: state => state.user.name,
        userEmail: state => state.user.email,
    },
};
