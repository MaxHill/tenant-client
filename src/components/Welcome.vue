<template>
    <div class="Welcome">
        <h1 class="Welcome__title">{{ msg }}</h1>
        <nav class="Welcome__links">
            <a
                v-for="link in links"
                class="Welcome__link"
                href="{{ link.url }}"
            >{{ link.name }}</a>
        </nav>
    </div>
</template>

<script>
    import Bus from '../Bus';

    export default {
        data() {
            return {};
        },
        ready() {
            Bus.$emit('test');
        }
    };
</script>
