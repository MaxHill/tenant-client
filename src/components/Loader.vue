<template>
    <div class="Loader" transition="Loader__transition">
        {{{ loader }}}
        <p class="Loader__text">Loading</p>
    </div>
</template>

<style>

</style>

<script>
    /**
     * The Loader component.
     * @type {Object}
     */

    export default {
        data() {
            return {loader: require('assets/images/loader.svg')};
        },
        components: {
            // Sub-components
        },
        methods: {
            // Methods
        }
    };
</script>
