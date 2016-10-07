<template>
    <div>
        <backlink link="user-list"></backlink>
        <loader v-if="loading"></loader>
        <div class="Container EditUserPage Page Page--narrow" v-if="!loading">
            <img
                class="rounded"
                v-bind:src="user.avatar"
                v-bind:alt="user.name">
            <user-form
                :user="user"
                :residences="residences"
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
    import ResidenceRepository from '../../repository/Residence';
    import Backlink from '../../components/Backlink';
    import UserForm from '../../components/forms/User';
    import Loader from '../../components/Loader';

    export default {
        data() {
            return {
                loading: false,
                user: {
                    name: '',
                    email: '',
                    password: '',
                    residence: {data: {id: '', identifier: ''}},
                    avatar: 'https://api.adorable.io/avatars/70/kurtgerm'
                },
                userRepository: new UserRepository(),
                residenceRepository: new ResidenceRepository()
            };
        },
        computed: {
            requestData() {
                let requestData = this.user;
                requestData.residence = this.user.residence.data.id;
                return requestData;
            }
        },
        components: {Backlink, UserForm, Loader},
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
            },
            loadResidences() {
                this.loading = true;
                return this.residenceRepository
                    .get()
                    .then(residences => {
                        this.residences = residences.data.data;
                        this.loading = false;
                    });
            }
        },
        ready() {
            this.loadResidences();
        }
    };
</script>
