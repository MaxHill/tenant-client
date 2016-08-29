<template>
    <div>
        <submenu :links="links"></submenu>
        <p>Settings view<p>
        <router-view></router-view>
    </div>
</template>

<script>
    import Submenu from '../components/Submenu';
    /**
     * The Settings view.
     * @type {Object}
     */

    export default {
        data() {
            return {
                links: [
                    {name: 'Association', icon: 'logo', path: '/settings'},
                    {name: 'Residence', icon: 'logo', path: '/settings/residence'},
                    {name: 'Users', icon: 'logo', path: '/settings/users'}
                ]
            };
        },
        components: {
            Submenu
        },
        methods: {
            // Methods
        }
    };
</script>
