<template>
    <div class="Container LoginPage">
        <ul class="FormError">
            <li
                class="FormError__error"
                v-for="error in errors"
                transition="FormError__transition"
                >{{ error.title }}</li>
        </ul>
        <form class="Form" @submit.prevent="login()">
            <div class="Form__group">
                <div class="Form__field">
                    <label for="email">Email:</label><br>
                    <input
                        type="text"
                        v-model="credentials.email"
                        placeholder="John@example.com">
                </div>
            </div>
            <div class="Form__group">
                <div class="Form__field">
                    <label for="password">Password:</label><br>
                    <input
                        type="password"
                        v-model="credentials.password"
                        placeholder="SuperSecretPassword">
                </div>
            </div>

            <div class="Form__group">
                <div class="Form__field">
                    <button
                        type="submit"
                        class="Button Button--block"
                        :disabled="loading">
                        {{ loading ? 'Authenticating..' : 'Login'; }}
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import Auth from '../Auth';

    /**
     * The Login view.
     * @type {Object}
     */
    export default {
        data() {
            return {
                credentials: {
                    email: '',
                    password: ''
                },
                errors: [],
                loading: false
            };
        },
        methods: {
            login() {
                if (this.loading) {
                    return;
                }

                this.loading = true;

                Auth.login(this.credentials)
                    .then(() => {
                        this.loading = false;
                        this.$route.router.go({name: 'dashboard'});
                    }, errors => {
                        this.loading = false;
                        this.errors = errors.data.errors;
                    });
            }
        }
    };
</script>
