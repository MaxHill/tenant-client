<template>
    <div>
        <backlink link="residence-list"></backlink>
        <div class="Container Page Page--narrow">
            <residence-form
                :residence="residence"
                @submit.prevent="create">Create</residence-form>
        </div>
    </div>
</template>

<script>
    /**
     * The user-edit view.
     * @type {Object}
     */
    import ResidenceRepository from '../../repository/Residence';
    import Backlink from '../../components/Backlink';
    import ResidenceForm from '../../components/forms/Residence';
    import Loader from '../../components/Loader';

    export default {
        data() {
            return {
                residence: {identifier: ''},
                residenceRepository: new ResidenceRepository()
            };
        },
        components: {
            Backlink,
            ResidenceForm,
            Loader
        },
        methods: {
            create() {
                this.residenceRepository
                    .create(this.residence)
                        .then(residence => {
                            this.$router.go({
                                name: 'residence-edit',
                                params: {id: residence.data.data.id}
                            });
                        });
            }
        }
    };
</script>
