<template>
    <div>
        <backlink link="residence-list"></backlink>
        <loader v-if="loading"></loader>
        <div class="Container Page Page--narrow" v-if="!loading">
        <residence-form
            :residence="residence"
            @submit.prevent="update()">Update</residence-form>
        </div>
    </div>
</template>

<script>
    /**
     * The residence-edit view.
     * @type {Object}
     */
    import ResidenceRepository from '../../repository/Residence';
    import Loader from '../../components/Loader';
    import Backlink from '../../components/Backlink';
    import ResidenceForm from '../../components/forms/Residence';

    export default {
        data() {
            return {
                id: this.$route.params.id,
                residence: false,
                loading: true,
                residenceRepository: new ResidenceRepository()
            };
        },
        components: {Loader, Backlink, ResidenceForm},
        methods: {
            loadResidence() {
                this.loading = true;
                return this.residenceRepository
                    .get(this.id)
                    .then(residence => {
                        this.residence = residence.data.data;
                        this.loading = false;
                    });
            },
            update() {
                this.residenceRepository.update(this.residence);
            }
        },
        ready() {
            this.loadResidence();
        }
    };
</script>
