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
                    placeholder="John Doe"
                    v-model="user.name">
            </div>
        </div>
        <div class="Form__group">
            <div class="Form__field">
                <label for="email">Email:</label>
                <input
                    id="email"
                    autocomplete="off"
                    type="email"
                    class="Form__field"
                    placeholder="john.doe@example.com"
                    v-model="user.email">
            </div>
        </div>
        <div class="Form__group">
            <div class="Form__field">
                <label for="password">Password:</label>
                <input
                    id="password"
                    autocomplete="off"
                    type="password"
                    class="Form__field"
                    placeholder="SuperSecretPassword1234"
                    v-model="user.password">
            </div>
        </div>
        <div class="Form__group">
            <div class="Form__field">
                <label for="residence">Residence:</label>
                <input
                    id="residence"
                    autocomplete="off"
                    type="number"
                    class="Form__field"
                    placeholder="Recidence"
                    v-model="user.residence.data.id">
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
        props: ['user']
    };
</script>
