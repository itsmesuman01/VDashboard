<template>
<div class="home-container">
    <Header />
    <div class="main-content">
        <Sidebar />
        <div class="content">
            <div v-if="showrole === 0">
                <table v-if="hasPermission('role.read')">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in roles" :key="item.id">
                            <td>{{ item.id }}</td>
                            <td>{{ item.name }}</td>
                            <td>
                                <button :disabled="!hasPermission('role.update') || loading" @click="editRecord(item.id)">Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-else>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Create</th>
                            <th>Read</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(permType, index) in permissionCategories" :key="index">
                            <td></td>
                            <td>{{ permType.name }}</td>
                            <td><input type="checkbox" :checked="permType.create" @change="updatePermission(permType.name, 'create', $event)" /></td>
                            <td><input type="checkbox" :checked="permType.read" @change="updatePermission(permType.name, 'read', $event)" /></td>
                            <td><input type="checkbox" :checked="permType.update" @change="updatePermission(permType.name, 'update', $event)" /></td>
                            <td><input type="checkbox" :checked="permType.delete" @change="updatePermission(permType.name, 'delete', $event)" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <Footer />
</div>
</template>

  
<script>
import Header from './layout/Header.vue';
import Sidebar from './layout/Sidebar.vue';
import Footer from './layout/Footer.vue';
import { fetchData } from '../cacheService';

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
            allPermissions: [],
            specificPermissions: [],
            permissionCategories: [],
        };
    },
    async mounted() {
        const token = localStorage.getItem('access_token');

        if (!token) {
            this.$router.push({ name: 'Login' });
            return;
        }

        const apiUrl = `${process.env.VUE_APP_API_URL}auth/role`;

        try {
            const response = await fetchData(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            this.roles = response.records || [];
        } catch (error) {
            console.warn(error);
            alert(error.message || 'An error occurred.');
            if (error.status === 401) {
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

            const apiUrl = `${process.env.VUE_APP_API_URL}auth/role/edit?id=${id}`;
            try {
                const response = await fetchData(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });

                this.allPermissions = response.records.allpermissions || [];
                this.specificPermissions = response.records.specificpermissions || [];

                this.permissionCategories = this.organizePermissions(this.allPermissions, this.specificPermissions);

                this.showrole = 1;
            } catch (error) {
                console.warn(error);
            } finally {
                this.loading = false;
            }
        },
        organizePermissions(allPermissions, specificPermissions) {
            const categories = {};

            allPermissions.forEach(perm => {
                const [name, action] = perm.name.split('.');
                if (!categories[name]) {
                    categories[name] = { name, create: false, read: false, update: false, delete: false };
                }
                if (specificPermissions.some(p => p.name === perm.name)) {
                    categories[name][action] = true;
                }
            });

            return Object.values(categories);
        },
        updatePermission(name, action, event) {
            const isChecked = event.target.checked;
            const permissionName = `${name}.${action}`;
            if (isChecked) {
                if (!this.specificPermissions.some(p => p.name === permissionName)) {
                    this.specificPermissions.push({ name: permissionName });
                }
            } else {
                this.specificPermissions = this.specificPermissions.filter(p => p.name !== permissionName);
            }
        },
    },
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
