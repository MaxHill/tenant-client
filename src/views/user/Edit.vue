<template>
    <div>
        <backlink link="user-list"></backlink>
        <loader v-if="loading"></loader>
        <div class="Container EditUserPage" v-if="!loading">
            <div class="EditUserPage__section EditUserPage__static">
                <img
                    class="EditUserPage__avatar"
                    v-bind:src="user.avatar"
                    v-bind:alt="user.name">
                <h2 class="EditUserPage__name">{{ user.name }}</h2>
            </div>
            <div class="EditUserPage__section">
                <form class="Form" @submit.prevent="update">
                    <div class="Form__group">
                        <div class="Form__field">
                            <label for="name">Name:</label>
                            <input
                                id="name"
                                type="text"
                                class="Form__field"
                                placeholder="Name"
                                v-model="user.name">
                        </div>
                    </div>
                    <div class="Form__group">
                        <div class="Form__field">
                            <label for="email">Email:</label>
                            <input
                                id="email"
                                type="email"
                                class="Form__field"
                                placeholder="Email"
                                v-model="user.email">
                        </div>
                    </div>
                    <div class="Form__group">
                        <div class="Form__field">
                            <button class="Button" type="submit">Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    /**
     * The user-edit view.
     * @type {Object}
     */
    import UserRepository from '../../repository/User';
    import Loader from '../../components/Loader';
    import Backlink from '../../components/Backlink';

    export default {
        data() {
            return {
                id: this.$route.params.id,
                user: false,
                loading: false,
                userRepository: new UserRepository()
            };
        },
        components: {
            Loader,
            Backlink
        },
        methods: {
            loadUser() {
                this.loading = true;
                this.userRepository.get(this.id).then(user => {
                    this.user = user.data.data;
                    this.loading = false;
                });
            },
            update() {
                this.userRepository.update(this.user).then(() => {
                    console.log('Updated');
                });
            }
        },
        ready() {
            this.loadUser();
        }
    };
</script>
