<template>
    <div>
        <submenu :links="links"></submenu>
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
                    {name: 'Residence', icon: 'logo', path: '/settings/residences'},
                    {name: 'Users', icon: 'logo', path: '/settings/users'}
                ]
            };
        },
        components: {Submenu}
    };
</script>
