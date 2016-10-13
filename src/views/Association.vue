<template>
    <div>

        <loader v-if="loading"></loader>

        <div class="Container Page" v-if="!loading">
            <association-form
                    @submit.prevent="updateAssociation"
                    :association="association">
            </association-form>

            <br><br>

            <p>
                Depending on if association is subscribed. <br>
                Sign up or update card.
            </p>

        </div>

    </div>
</template>

<script>
    /**
     * The Association view.
     * @type {Object}
     */
    import AssociationRepository from '../repository/Association';
    import Loader from '../components/Loader';
    import AssociationForm from '../components/Forms/Association';

    export default {
        data() {
            return {
                loading: false,
                association: false,
                associationRepository: new AssociationRepository()
            };
        },
        components: {Loader, AssociationForm},
        methods: {
            updateAssociation() {
                this.associationRepository.update(this.association);
            }
        },
        ready() {
            this.loading = true;
            this.associationRepository.get().then(association => {
                this.association = association.data.data;
                this.loading = false;
            });
        }
    };
</script>