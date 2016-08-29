<template>
    <nav class="Submenu">
        <div class="Submenu__container Container">
            <a v-for="link in links" v-link="{path: link.path}" class="Submenu__link">
                <svg class="Submenu__icon">
                    <use xlink:href='#{{ link.icon }}'>
                </svg>
                <div class="Submenu__text">{{ link.name }}</div>
            </a>
        </div>
    </nav>
</template>

<script>
    /**
     * The SubMenu component.
     * @type {Object}
     */

    export default {
        props: ['links']
    };
</script>
