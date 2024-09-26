<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <div class="bg-white rounded-lg shadow-lg p-8 w-96">
            <img class="mx-auto mb-6" src="../../assets/logo.png" alt="Logo" />
            <h1 class="text-2xl font-semibold text-center mb-6">LOGIN</h1>
            <div class="login">
                <form @submit.prevent="submitForm">
                    <input v-model="form.email" type="email" placeholder="Enter Email" required
                        class="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500" />
                    <input v-model="form.password" type="password" placeholder="Enter Password" required
                        class="block w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500" />
                    <button type="submit" :disabled="loading"
                        class="w-full p-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200">
                        LOGIN
                    </button>
                    <p class="mt-4 text-center">
                        <router-link class="text-blue-500 hover:underline" to="/register">REGISTRATION</router-link>
                    </p>
                    <p class="text-center">
                        <router-link class="text-blue-500 hover:underline" to="/verifyemail">FORGET
                            PASSWORD</router-link>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LoginPage',
    mounted() {
        this.$mountTo(this.$router);
    },
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            loading: false,
        };
    },
    methods: {
        async submitForm() {
            if (!this.form.email || !this.form.password) {
                alert('Please fill out all fields.');
                return;
            }

            this.loading = true;

            await axios.post(`${process.env.VUE_APP_API_URL}login`, {
                email: this.form.email,
                password: this.form.password
            })
                .then(response => {
                    const { access_token, user, message } = response.data;
                    const permissions = JSON.stringify(user.roles.permissions);
                    localStorage.setItem('access_token', access_token);
                    localStorage.setItem('permissions', permissions);
                    alert(message);
                    this.$router.push({
                        name: 'Home'
                    })
                })
                .catch(error => {
                    console.warn(error)
                    alert(error.response.data.message);
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
}
</script>
