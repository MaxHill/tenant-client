<template>
    <div id="app">
        <menu></menu>
        <router-view></router-view>
        <!-- Don't let the icon sprite take up space -->
        <div style="display:none">
            {{{ icons }}}
        </div>
    </div>
</template>

<style lang="scss" src="assets/sass/app.scss"></style>

<script>
import Menu from './components/Menu';
import Bus from './Bus';

export default {
    data() {
        return {icons: require('assets/images/icons.svg')};
    },
    components: {Menu},
    ready() {
        Bus.$on('Notification_error', data => {
            console.log('test', data);
        });
    }
};
</script>


