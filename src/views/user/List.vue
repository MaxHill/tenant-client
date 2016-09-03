<template>
    <div class="Container">
        <loader v-if="loading"></loader>
        <div v-if="!loading" class="Cards">
            <div class="Cards__card" v-for="user in users">
                <img class="Cards__image" v-bind:src="user.avatar" v-bind:alt="user.name">
                <h5 class="Cards__title">{{ user.name }}</h5>
                <p class="Cards__subtitle">{{ user.email }}</p>
                <a
                    v-link="{ name: 'user-edit', params: { id: user.id }}"
                    class="Cards__button Button Button--small">Edit</a>
            </div>
        </div>
    </div>
</template>

<script>
    import UserRepository from '../../repository/User';
    import Loader from '../../components/Loader';

    /**
     * List all users.
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
