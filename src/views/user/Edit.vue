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
                :residences="residences"
                @submit.prevent="update()">Update</user-form>
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
    import Loader from '../../components/Loader';
    import Backlink from '../../components/Backlink';
    import UserForm from '../../components/forms/User';

    export default {
        data() {
            return {
                id: this.$route.params.id,
                user: false,
                residences: false,
                loading: true,
                userRepository: new UserRepository(),
                residenceRepository: new ResidenceRepository()
            };
        },
        computed: {
            requestData() {
                let requestData = Object.assign({}, this.user);
                requestData.residence = this.user.residence.data.id;
                return requestData;
            }
        },
        components: {Loader, Backlink, UserForm},
        methods: {
            loadUser() {
                return this.userRepository
                    .include('residence')
                    .get(this.id)
                    .then(user => {
                        this.user = user.data.data;
                    });
            },
            loadResidences() {
                return this.residenceRepository
                    .get()
                    .then(residences => {
                        this.residences = residences.data.data;
                    });
            },
            loadData() {
                this.loading = true;
                let loaders = [
                    this.loadUser(),
                    this.loadResidences()
                ];
                Promise.all(loaders).then(() => {
                    this.loading = false;
                });
            },
            update() {
                console.log('update:', this.requestData);
                this.userRepository.update(this.requestData);
            }
        },
        ready() {
            this.loadData();
        }
    };
</script>
