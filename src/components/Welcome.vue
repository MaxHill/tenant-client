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
    import Bus from '../bus';
    import Repository from '../repository/repository';

    export default {
        data() {
            return {};
        },
        ready() {
            let repo = new Repository();
            console.log(repo.resource);
            Bus.$emit('test');
        }
    };
</script>
