<template>
    <div class="Container Page">
        <loader v-if="loading"></loader>
        <div v-if="!loading" class="Cards">
            <div class="Cards__card" v-for="residence in residences">
                <h5 class="Cards__title">{{ residence.identifier }}</h5>
                <a
                    v-link="{ name: 'residence-edit', params: { id: residence.id }}"
                    class="Cards__button Button Button--small">Edit</a>
            </div>
        </div>
    </div>
</template>

<script>
    import ResidenceRepository from '../../repository/Residence';
    import Loader from '../../components/Loader';

    /**
     * List all residences.
     * @type {Object}
     */
    export default {
        data() {
            return {
                loading: false,
                residenceRepository: new ResidenceRepository(),
                residences: []
            };
        },
        components: {Loader},
        ready() {
            this.loading = true;
            this.residenceRepository.get().then(residences => {
                this.loading = false;
                this.residences = residences.data.data;
            });
        }
    };
</script>
