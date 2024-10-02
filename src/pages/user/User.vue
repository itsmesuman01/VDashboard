<template>
    <div class="containerapp">
        <Sidebar />
        <div class="maincontent">
            <div class="header">
                <Header />
            </div>
            <SubHeader :title="title" @search="updateSearch" @paginate="updatePaginate" />
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
                                        @click="openDeleteDialog(item.id)">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>Showing {{ users.length }} of {{ (this.skip === 0) ? this.total : users.length }} records</div>
                </div>
            </div>
            <div class="footer">
                <Footer />
            </div>
        </div>
        <DialogBox v-if="isDialogOpen" @confirm="deleteRecord(selectedId)" @cancel="closeDialog" />
    </div>
</template>

<script>
import { Header, SubHeader, Sidebar, Footer } from '../../components/layout';
import { DialogBox } from '../../components';
import axios from 'axios'
import { mapState } from 'vuex';

export default {
    name: 'UserPage',
    components: {
        Header,
        SubHeader,
        Sidebar,
        Footer,
        DialogBox
    },
    data() {
        return {
            title: 'user',
            loading: true,
            envImageUrl: process.env.VUE_APP_API_IMAGE_URL,
            defaultImageUrl: require('@/assets/images/defaultimage.webp'),
            searchValue: '',
            isDialogOpen: false,
            selectedId: null
        };
    },
    computed: {
        ...mapState({
            skip: state => state.user.skip,
            limit: state => state.source.limit,
            users: state => state.user.users,
            total: state => state.user.total,
        })
    },
    async mounted() {
        await this.fetchUsers();
    },
    methods: {
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
                await this.$store.dispatch('user/fetchResource', apiUrl);
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
        updatePaginate(value) {
            this.$store.commit('user/SET_SKIP', value);
            this.fetchUsers();
        },
        openDeleteDialog(id) {
            this.selectedId = id;
            this.isDialogOpen = true;
        },
        closeDialog() {
            this.isDialogOpen = false;
            this.selectedId = null;
        },
        async deleteRecord(id) {
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
                this.closeDialog();
            }
        }
    }
};
</script>
