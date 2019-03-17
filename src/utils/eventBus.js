import Vue from 'vue';

export const EVENTS = {
    USER: {
        DATA_LOADED: 'user-data-loaded',
        PROFILE_CHANGED: 'user-profile-data-changed',
        WORD_UPDATED: 'user-data-word-updated',
    },
};

export const EventBus = new Vue({
    methods: {
        notify(eventName, eventPayload) {
            this.$emit(eventName, eventPayload);
        },
    },
});

export const setUpEventBus = () => {
    Object.defineProperties(Vue.prototype, {
        $bus: {
            get: function() {
                return EventBus;
            },
        },
    });
};
