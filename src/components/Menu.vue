<template>
    <nav class="Menu" :class="{'Menu--closed': !vissible}">
        <div class="Container Menu__container">
            <div class="Menu__section Menu__profile">
                <a v-if="user.authenticated" @click="close()" v-link="users/me">
                    <img class="Menu__avatar" v-bind:src="user.data.avatar" alt="avatar">
                </a>
            </div>
            <div @click="close()" class="Menu__section Menu__logo">
                <a v-link="{ path: '/' }">
                    <svg width="30" height="30">
                        <use xlink:href='#logo'>
                    </svg>
                </a>
            </div>
            <div class="Menu__section Menu__toggler">
                <div @click="toggle()"class="Menu__toggleButton">
                    <svg width="30" height="30">
                        <use xlink:href='#menu'>
                    </svg>
                </div>
            </div>
            <div class="Menu__section Menu__links">
                <div v-if="user.authenticated">
                    <a class="Menu__link" @click="close()" v-link="{ path: '/dashboard' }">Dashboard</a>
                    <a class="Menu__link" @click="close()" v-link="{ path: '/settings' }">Settings</a>
                </div>
                <div v-if="!user.authenticated">
                    <a class="Menu__link" @click="close()" v-link="{ path: '/login' }">Login</a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import Auth from '../Auth';
/**
 * The Menu component.
 * @type {Object}
 */
export default {
    data() {
        return {
            vissible: false,
            user: Auth.user
        };
    },
    methods: {
        toggle() {
            this.vissible = !this.vissible;
        },
        close() {
            this.vissible = false;
        }
    }
};
</script>
