<template>
    <form class="Form">
        <div class="Form__group">
            <div class="Form__field">
                <label for="name">Name:</label>
                <input
                    id="name"
                    autocomplete="off"
                    type="text"
                    class="Form__field"
                    placeholder="Super awesome brf"
                    v-model="association.name">
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
     * User modification form.
     * @type {Object}
     */

    export default {
        props: ['association']
    };
</script>
