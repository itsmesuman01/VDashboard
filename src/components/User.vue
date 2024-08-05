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
                    <th>Action</th>
                </tr>
                <tr v-for="item in users" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.email }}</td>
                    <td>
                        <router-link :to="'/' + item.id">Update</router-link>
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
import Header from './layout/Header.vue'
import Sidebar from './layout/Sidebar.vue'
import Footer from './layout/Footer.vue'
import axios from 'axios'
export default {
    name: 'HomePage',
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

        try {
            const response = await axios.get(`${process.env.VUE_APP_API_URL}auth/user`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const { records } = response.data;
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

<style scoped>
.home-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

header {
    background-color: #f8f9fa;
    padding: 20px;
    text-align: center;
    border-bottom: 1px solid #ddd;
}

.main-content {
    display: flex;
    flex: 1;
    background-color: #e9ecef;
}

.sidebar {
    width: 250px;
    background-color: #343a40;
    color: #fff;
    padding: 20px;
}

.content {
    flex: 1;
    padding: 20px;
}

footer {
    background-color: yellow;
    padding: 10px;
    text-align: center;
    border-top: 1px solid #ddd;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 16px;
    text-align: left;
}

th,
td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
}

thead {
    background-color: #f4f4f4;
}

th {
    background-color: #e0530d;
    color: #fff;
}

tr:hover {
    background-color: white;
}

caption {
    font-size: 1.5em;
    margin: 10px 0;
}
</style>
