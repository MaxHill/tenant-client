<template>
    <div>
        <backlink link="user-list"></backlink>
        <loader v-if="loading"></loader>
        <div class="Container EditUserPage Page" v-if="!loading">
            <img
                class="EditUserPage__avatar"
                v-bind:src="user.avatar"
                v-bind:alt="user.name">
            <user-form
                :user="user"
                @submit.prevent="create">Create</user-form>
        </div>
    </div>
</template>

<script>
    /**
     * The user-edit view.
     * @type {Object}
     */
    import UserRepository from '../../repository/User';
    import Backlink from '../../components/Backlink';
    import UserForm from '../../components/forms/User';

    export default {
        data() {
            return {
                user: {
                    name: '',
                    email: '',
                    password: '',
                    residence: {data: {id: '', identifier: ''}},
                    avatar: 'https://api.adorable.io/avatars/70/kurtgerm'
                },
                userRepository: new UserRepository()
            };
        },
        computed: {
            requestData() {
                let requestData = this.user;
                requestData.residence = this.user.residence.data.id;
                return requestData;
            }
        },
        components: {
            Backlink,
            UserForm
        },
        methods: {
            create() {
                this.userRepository
                    .create(this.requestData)
                    .then(user => {
                        this.$router.go({
                            name: 'user-edit',
                            params: {
                                id: user.data.data.id
                            }
                        });
                    });
            }
        }
    };
</script>
