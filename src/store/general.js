export default {
    state: {
        processing: false,
        error: null,
    },
    mutations: {
        setProcessing(state, payload) {
            state.processing = payload;
        },
        setError(state, payload) {
            state.error = payload;
        },
        cleanError(state) {
            state.error = null;
        },
    },
    getters: {
        getProcessing: state => state.processing,
        getError: state => state.error,
    }
};
