import firebase from 'firebase';

export default {
    state: {
        user: {
            isAuthentificated: false,
            uid: null,
        },
    },
    mutations: {
        setUser(state, payload) {
            state.user.isAuthentificated = true;
            state.user.uid = payload;
        },
        unSetUser(state) {
            state.user.isAuthentificated = false;
            state.user.uid = null;
        }
    },
    actions: {
        signUp({ commit }, payload) {
            commit('setProcessing', true);
            commit('clearError');

            const { email, password } = payload;
            firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
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
        stateChanged({ commit }, payload) {
            if (payload) {
                commit('setUser', payload.uid);
            } else {
                commit('unSetUser');
            }
        }
    },
    getters: {
        isUserAuthentificated: state => state.user.isAuthentificated,
    },
};
