<template>
    <div class="containerapp">
        <Sidebar />
        <div class="maincontent">
            <div class="header">
                <Header />
            </div>
            <SubHeader :title='title' />
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
                                <td class="text-center"> {{ index + 1 }}</td>
                                <td class="image-cell">
                                    <img :src="item.image ? `${envImageUrl}${item.image}` : defaultImageUrl"
                                        alt="Banner Image" class="image-cell-td" />
                                </td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.is_active ? 'Active' : 'Inactive' }}</td>
                                <td>
                                    <router-link class='button-link'
                                        :to="{ name: 'BannerAdd', query: { id: item.id, image: item.image, name: item.name, is_active: item.is_active } }">Edit</router-link>&nbsp;
                                    <button :disabled="!hasPermission('banner.delete') || loading"
                                        v-on:click="deleteRecord(item.id)">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Pagination sendProp="banner" />
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
    mapState
} from 'vuex';
import Pagination from '@/components/Pagination.vue';

export default {
    name: 'BannerPage',
    components: {
        Header,
        SubHeader,
        Sidebar,
        Footer,
        Pagination
    },
    data() {
        return {
            title: 'banner',
            loading: true,
            envImageUrl: process.env.VUE_APP_API_IMAGE_URL,
            defaultImageUrl: require('@/assets/images/defaultimage.webp')
        };
    },
    computed: {
        ...mapState({
            find: state => state.main.find,
            perPage: state => state.main.perPage,
            page: state => state.main.page,
            banners: state => state.main.banners,
        }),
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

        const find = this.find || ''
        const perPage = this.perPage || 10
        const page = this.page || 1

        const apiUrl = `${process.env.VUE_APP_API_URL}auth/banner?find=${find}&perPage=${perPage}&page=${page}`;
        try {
            await this.$store.dispatch('main/fetchResource', apiUrl);

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
                await axios.delete(`${process.env.VUE_APP_API_URL}auth/banner`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        id: id
                    }
                });

                this.banners = this.banners.filter(banner => banner.id !== id);
            } catch (error) {
                console.warn(error);
            } finally {
                this.loading = false;
            }
        },
    }
};
</script>
