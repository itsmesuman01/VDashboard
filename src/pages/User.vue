<template>
<div class="home-container">
    <Header />
    <div class="main-content">
        <Sidebar />
        <div class="content">
            <table v-if="hasPermission('user.read')">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
                <tr v-for="item in users" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.roles.name }}</td>
                    <td>
                        <router-link class='button-link' :to="'/' + item.id">Update</router-link>&nbsp;
                        <button :disabled="!hasPermission('user.delete') || loading" v-on:click="deleteRecord(item.id)">Delete</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <Footer />
</div>
</template>

<script>
import { Header, Sidebar, Footer } from '../components/layout';
import axios from 'axios'
import { fetchData } from '../cacheService'

export default {
    name: 'UserPage',
    components: {
        Header,
        Sidebar,
        Footer,
    },
    data() {
        return {
            users: [],
            loading: true
        };
    },
    async mounted() {
        const token = localStorage.getItem('access_token');

        if (!token) {
            this.$router.push({ name: 'Login' });
            return;
        }

        const apiUrl = `${process.env.VUE_APP_API_URL}auth/user`;

        try {
            const response = await fetchData(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const { records } = response;
            this.users = records;
        } catch (error) {
            console.warn(error);
        } finally {
            this.loading = false;
        }
    },
    methods: {
        hasPermission(permissionName) {
            return this.$hasPermission(permissionName);
        },
        async deleteRecord(id) {
            if (!confirm('Are you sure you want to delete this record?')) {
                return;
            }

            this.loading = true;

            try {
                await axios.delete(`${process.env.VUE_APP_API_URL}auth/user`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        id: id
                    }
                });

                this.users = this.users.filter(user => user.id !== id);
            } catch (error) {
                console.warn(error);
            } finally {
                this.loading = false;
            }
        },
    }
};
</script>
