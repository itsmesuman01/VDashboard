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
                                <button :disabled="!hasPermission('role.update') || loading" @click="editRecord(item.id)">
                                    Edit
                                </button>
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
                            <td>
                                <input type="checkbox" :checked="permType.create" @change="updatePermission(permType.name, 'create', $event)" />
                            </td>
                            <td>
                                <input type="checkbox" :checked="permType.read" @change="updatePermission(permType.name, 'read', $event)" />
                            </td>
                            <td>
                                <input type="checkbox" :checked="permType.update" @change="updatePermission(permType.name, 'update', $event)" />
                            </td>
                            <td>
                                <input type="checkbox" :checked="permType.delete" @change="updatePermission(permType.name, 'delete', $event)" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button @click="submitPermissions(currentRoleId)" :disabled="loading">
                    Save Permissions
                </button>
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
import axios from 'axios';

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
            currentRoleId: null,
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
            const response = await axios.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            this.roles = response.data.records || [];
        } catch (error) {
            console.warn(error);
            alert(error.message || 'An error occurred.');
            if (error.response && error.response.status === 401) {
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
            this.currentRoleId = id;

            const apiUrl = `${process.env.VUE_APP_API_URL}auth/role/edit?id=${id}`;
            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });

                this.allPermissions = response.data.records.allpermissions || [];
                this.specificPermissions = response.data.records.specificpermissions || [];

                this.permissionCategories = this.organizePermissions(
                    this.allPermissions,
                    this.specificPermissions
                );

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
        async submitPermissions(roleId) {
            this.loading = true;
            // Prepare the permissions to be sent
            const storePermissionsIds = this.specificPermissions.map(perm => {
                const permission = this.allPermissions.find(p => p.name === perm.name);
                return permission ? permission.id : null;
            }).filter(id => id !== null);

            try {
                await axios.post(`${process.env.VUE_APP_API_URL}auth/role`, {
                    role_id: roleId,
                    store_permissions_id: storePermissionsIds,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                });
                alert('Permissions updated successfully');
            } catch (error) {
                console.warn(error);
                alert(error.message || 'An error occurred while updating permissions.');
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>
