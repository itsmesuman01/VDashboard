<template>
    <div class="containerapp">
        <Sidebar />
        <div class="maincontent">
            <div class="header">
                <Header />
            </div>
            <SubHeader :title="title" @search="updateSearch" @paginate="updatePaginate" @limit="updateLimit" />
            <div class="section">
                <div class="table-container">
                    <table v-if="hasPermission('banner.read')">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in banners" :key="item.id">
                                <td class="text-center">{{ index + 1 }}</td>
                                <td class="image-cell">
                                    <img :src="item.image ? `${apiImageUrl}${item.image}` : defaultImageUrl"
                                        alt="Banner Image" class="image-cell-td" />
                                </td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.is_active ? 'Active' : 'Inactive' }}</td>
                                <td>
                                    <router-link class='button-link'
                                        :to="{ name: 'BannerAdd', query: { id: item.id, image: item.image, name: item.name, is_active: item.is_active } }">Edit</router-link>&nbsp;
                                    <button :disabled="!hasPermission('banner.delete') || loading"
                                        @click="openDeleteDialog(item.id)">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>Showing {{ banners.length }} of {{ (this.skip === 0) ? this.total : banners.length }} records
                    </div>
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
import axios from 'axios';
import { mapState } from 'vuex';

export default {
    name: 'BannerPage',
    components: {
        Header,
        SubHeader,
        Sidebar,
        Footer,
        DialogBox
    },
    data() {
        return {
            apiUrl: process.env.VUE_APP_API_URL,
            apiImageUrl: process.env.VUE_APP_API_IMAGE_URL,
            title: 'banner',
            loading: true,
            defaultImageUrl: require('@/assets/images/defaultimage.webp'),
            searchValue: '',
            isDialogOpen: false,
            selectedId: null
        };
    },
    computed: {
        ...mapState({
            skip: state => state.banner.skip,
            limit: state => state.limit,
            banners: state => state.banner.banners,
            total: state => state.banner.total,
        })
    },
    async mounted() {
        await this.fetchBanners();
    },
    methods: {
        hasPermission(permissionName) {
            return this.$hasPermission(permissionName);
        },
        async fetchBanners() {
            const token = localStorage.getItem('access_token');

            if (!token) {
                this.$router.push({ name: 'Login' });
                return;
            }

            const find = this.searchValue || '';
            const skip = this.skip || 0;
            const limit = this.limit || 10;

            try {
                await this.$store.dispatch('banner/fetchResource', `${this.apiUrl}auth/banner?find=${find}&skip=${skip}&limit=${limit}`);
            } catch (error) {
                this.$showToast("FAIL", error);
            } finally {
                this.loading = false;
            }
        },
        updateSearch(value) {
            this.searchValue = value;
            this.fetchBanners();
        },
        updatePaginate(value) {
            this.$store.commit('banner/SET_SKIP', value);
            this.fetchBanners();
        },
        updateLimit(value) {
            this.$store.commit('SET_LIMIT', value);
            this.fetchBanners();
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
                await axios.delete(`${process.env.VUE_APP_API_URL}auth/banner`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'application/json'
                    },
                    data: { id }
                });

                this.banners = this.banners.filter(banner => banner.id !== id);
                return this.$showToast('PASS', 'Successfully Deleted');
            } catch (error) {
                this.$showToast("FAIL", error);
            } finally {
                this.loading = false;
                this.closeDialog();
            }
        }
    }
};
</script>
