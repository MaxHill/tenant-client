<template>
    <div class="Container">
        <p>Some sort of user listing...</p>
        <loader v-if="loading"></loader>
        <ul>
            <li v-for="user in users">{{ user.name }}</li>
        </ul>
    </div>
</template>

<script>
    import UserRepository from '../repository/User';
    import Loader from '../components/Loader';

    /**
     * The Users view.
     * @type {Object}
     */
    export default {
        data() {
            return {
                loading: false,
                userRepository: new UserRepository(),
                users: []
            };
        },
        components: {
            Loader
        },
        methods: {
            // Methods
        },
        ready() {
            this.loading = true;
            this.userRepository.get().then(users => {
                this.loading = false;
                this.users = users.data.data;
            });
        }
    };
</script>
