<template>
    <div id="app">
        <menu></menu>
        <router-view></router-view>

        <notifications></notifications>
        <!-- Don't let the icon sprite take up space -->
        <div style="display:none">
            {{{ icons }}}
        </div>
    </div>
</template>

<style lang="scss" src="assets/sass/app.scss"></style>

<script>
import Menu from './components/Menu';
import Notifications from './components/Notifications';

export default {
    data() {
        return {icons: require('assets/images/icons.svg')};
    },
    components: {Menu, Notifications}
};
</script>


