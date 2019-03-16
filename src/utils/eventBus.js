import Vue from 'vue';

export const EVENTS = {
    USER: {
        DATA_CHANGED: 'user-profile-data-changed',
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
}