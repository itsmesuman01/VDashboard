<template>
<div class="container">
    <div class="sidebar">
        <Sidebar />
    </div>
    <div class="maincontent">
        <div class="header">
            <Header />
        </div>
        <SubHeader :title='title' />
        <div class="section">
            <table v-if="hasPermission('user.read')">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in users" :key="item.id">
                        <td class="image-cell">
                            <img :src="item.image ? `${envImageUrl}${item.image}` : defaultImageUrl" alt="User Image" class="user-image" />
                        </td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.roles.name }}</td>
                        <td>
                            <router-link class='button-link' :to="{ name: 'UserAdd', query: { id: item.id, image: item.image, name: item.name, password: item.password, email: item.email, role: item.roles.name } }">Edit</router-link>&nbsp;
                            <button :disabled="!hasPermission('user.delete') || loading" v-on:click="deleteRecord(item.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="footer">
            <Footer />
        </div>
    </div>
</div>
</template>

<script>
import {
    Header,
    SubHeader,
    Sidebar,
    Footer
} from '../../components/layout';
import axios from 'axios'
import {
    fetchData
} from '../../cacheService'

export default {
    name: 'UserPage',
    components: {
        Header,
        SubHeader,
        Sidebar,
        Footer,
    },
    data() {
        return {
            title: 'user',
            users: [],
            loading: true,
            envImageUrl: process.env.VUE_APP_API_IMAGE_URL,
            defaultImageUrl: require('@/assets/images/defaultimage.webp')
        };
    },
    async mounted() {
        console.log(process.env.VUE_APP_API_IMAGE_URL)
        const token = localStorage.getItem('access_token');

        if (!token) {
            this.$router.push({
                name: 'Login'
            });
            return;
        }

        const apiUrl = `${process.env.VUE_APP_API_URL}auth/user`;

        try {
            const response = await fetchData(apiUrl, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const {
                records
            } = response;
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

<style scoped>
table {
    margin: 0px 0;
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.image-cell {
    width: 75px;
    height: 75px;
    overflow: hidden;
}

.user-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
