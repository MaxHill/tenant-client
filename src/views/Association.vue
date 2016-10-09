<template>
    <div>

        <loader v-if="loading"></loader>

        <div class="Container Page" v-if="!loading">
            <association-form
                    @submit.prevent="updateAssociation"
                    :association="association">
            </association-form>
            <ul>
                <li>Name {{ association.name }}</li>
                <li>
                    Billing
                    <ul>
                        <li>Subscribe</li>
                        <li>Change card</li>
                    </ul>
                </li>
            </ul>
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
                console.log('Association', 'Time to update');
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