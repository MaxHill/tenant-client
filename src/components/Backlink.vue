<template>
    <div class="Backlink">
        <div class="Container">
            <a class="Backlink__link" v-link="{name: link}">
                <svg class="Backlink__icon">
                    <use xlink:href='#chevron-left'>
                </svg>
                <span class="Backlink__text"><slot>Back</slot></span>
            </a>
        </div>
    </div>
</template>

<script>
    /**
     * The back-link component.
     * @type {Object}
     */

    export default {
        props: ['link']
    };
</script>
