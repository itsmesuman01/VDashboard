<template>
<div class="home-container">
    <Header />
    <div class="main-content">
        <Sidebar />
        <div class="content">
            <div v-if="showrole === 0">
                <table v-if="hasPermission('role.read')">
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                    <tr v-for="item in roles" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>
                            <button :disabled="!hasPermission('role.update') || loading" v-on:click="editRecord(item.id)">Edit</button>
                        </td>
                    </tr>
                </table>
            </div>
            <div v-else>
                <table>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Create</th>
                        <th>Read</th>
                        <th>Update</th>
                        <th>Delete</th>
                        <th>Action</th>
                    </tr>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Create</td>
                        <td>Read</td>
                        <td>Update</td>
                        <td>Delete</td>
                        <td>Action</td>
                    </tr>
                </table>
            </div>
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
            roles: [],
            loading: true,
            showrole: 0,
            permissions: []
        };
    },
    async mounted() {
        const token = localStorage.getItem('access_token');

        if (!token) {
            this.$router.push({ name: 'Login' });
            return;
        }

        try {
            const response = await axios.get(`${process.env.VUE_APP_API_URL}auth/role`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const { records } = response.data;
            this.roles = records;
        } catch (error) {
            console.warn(error);
            alert(error.response?.data?.message || 'An error occurred.');
            if (error.response?.status === 401) {
                this.$router.push({ name: 'Login' });
            }
        } finally {
            this.loading = false;
        }
    },
    methods: {
        hasPermission(permissionName) {
            return this.$hasPermission(permissionName);
        },
        async editRecord(id) {
            this.loading = true;

            await axios.get(`${process.env.VUE_APP_API_URL}auth/role/edit`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                    params: {
                        id: id
                    }
                }).then(response => {
                    const { permission } = response.data.records
                    // alert(JSON.stringify(permission, null, 2));
                    this.permissions = permission
                    this.showrole = 1
                })
                .catch(error => {
                    console.warn(error)
                })
                .finally(() => {
                    this.loading = false;
                });
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
