<template>
    <div class="containerapp">
        <Sidebar />
        <div class="maincontent">
            <div class="header">
                <Header />
            </div>
            <SubHeader :title="title" @search="updateSearch" />
            <div class="section">
                <div class="table-container">
                    <table v-if="hasPermission('user.read')">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in users" :key="item.id">
                                <td class="text-center">{{ index + 1 }}</td>
                                <td class="image-cell">
                                    <img :src="item.image ? `${envImageUrl}${item.image}` : defaultImageUrl"
                                        alt="User Image" class="image-cell-td" />
                                </td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.email }}</td>
                                <td>{{ item.roles.name }}</td>
                                <td>
                                    <router-link class='button-link'
                                        :to="{ name: 'UserAdd', query: { id: item.id, image: item.image, name: item.name, password: item.password, email: item.email, role: item.roles.id } }">Edit
                                    </router-link>&nbsp;
                                    <button :disabled="!hasPermission('user.delete') || loading"
                                        v-on:click="deleteRecord(item.id)">Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Pagination sendProp="user" />
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
    mapState,
    mapMutations,
    mapGetters
} from 'vuex';
import Pagination from '@/components/Pagination.vue';

export default {
    name: 'UserPage',
    components: {
        Header,
        SubHeader,
        Sidebar,
        Footer,
        Pagination
    },
    data() {
        return {
            title: 'user',
            loading: true,
            envImageUrl: process.env.VUE_APP_API_IMAGE_URL,
            defaultImageUrl: require('@/assets/images/defaultimage.webp'),
            page: 1,
            searchValue: ''
        };
    },
    computed: {
        ...mapState({
            find: state => state.main.find,
            skip: state => state.main.skip,
            limit: state => state.main.limit,
            users: state => state.main.users,
            total: state => state.main.total,
        }),
        ...mapGetters('main', ['getCache']),
        // filteredUsers() {
        //     return this.users.filter(user => user.name.toLowerCase().includes(this.searchValue.toLowerCase()));
        // }
    },
    async mounted() {
        this.fetchUsers();
    },
    methods: {
        ...mapMutations('main', ['CLEAR_CACHE']),
        hasPermission(permissionName) {
            return this.$hasPermission(permissionName);
        },
        async fetchUsers() {
            const token = localStorage.getItem('access_token');

            if (!token) {
                this.$router.push({ name: 'Login' });
                return;
            }

            const find = this.searchValue || '';
            const skip = this.skip || 0;
            const limit = this.limit || 10;

            const apiUrl = `${process.env.VUE_APP_API_URL}auth/user?find=${find}&skip=${skip}&limit=${limit}`;
            try {
                await this.$store.dispatch('main/fetchResource', apiUrl);
            } catch (error) {
                console.warn(error);
            } finally {
                this.loading = false;
            }
        },
        updateSearch(value) {
            this.searchValue = value;
            this.fetchUsers();
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
                    data: { id: id }
                });

                this.users = this.users.filter(user => user.id !== id);
                return this.$showToast('PASS', 'Successfully Deleted');
            } catch (error) {
                console.warn(error);
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>
