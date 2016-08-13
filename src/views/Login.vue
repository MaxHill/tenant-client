<template>
    <div class="container">
        <ul>
            <li v-for="error in errors">{{ error.title }}</li>
        </ul>
        <form @submit.prevent="login()">
            <div>
                <label for="email">Email:</label><br>
                <input type="text" v-model="credentials.email">
            </div>
            <div>
                <label for="password">Password:</label><br>
                <input type="password" v-model="credentials.password">
            </div>

            <button
                type="submit"
                class="btn btn-success"
                :disabled="loading"
            >
                {{ loading ? 'Authenticating..' : 'Login'; }}
            </button>
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
