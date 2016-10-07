<template>
    <form class="Form">
        <div class="Form__group">
            <div class="Form__field">
                <label for="identifier">Identifier:</label>
                <input
                    id="identifier"
                    autocomplete="off"
                    type="text"
                    class="Form__field"
                    placeholder="Apt. 9"
                    v-model="residence.identifier">
            </div>
        </div>
        <div class="Form__group">
            <div class="Form__field">
                <button class="Button" type="submit"><slot>Update</slot></button>
            </div>
        </div>
    </form>
</template>

<script>
    /**
     * Residence modification form.
     * @type {Object}
     */

    export default {
        props: ['residence']
    };
</script>
