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
    import Auth from '../Auth';

    export default {
        data() {
            return {};
        },
        ready() {
            let login = Auth.login({
                email: 'max@hilloco.se',
                password: 'secret'}
            ).then(() => {
                console.log('Welcome.vue', 'Successfull login');
            }, () => {
                console.log('Welcome.vue', 'Error login');
            });
            console.log('Welcome.vue', login);
            console.log('Welcome.vue', Auth.checkAuth());
            Bus.$emit('test');
        }
    };
</script>
