<template>
    <div class="containerapp">
        <Sidebar />
        <div class="maincontent flex-1 bg-gray-50">
            <div class="header mb-4">
                <Header />
            </div>
            <div class="section bg-white rounded-lg shadow-md p-6">
                <h1 class="text-2xl font-bold text-center text-tomato mb-6">
                    {{ (this.$route.query.id == null) ? 'CREATE' : 'UPDATE' }} BANNER
                </h1>
                <div class="register flex flex-col items-center">
                    <img :src="imagePreview" alt="Banner Image" class="w-[450px] h-[200px] object-cover mb-4 rounded" />
                    <form @submit.prevent="submitForm" class="w-full max-w-md">
                        <input class="block w-full p-2 mb-4 border border-gray-300 rounded" type="file"
                            @change="uploadFile" />
                        <input v-model="form.name" type="text" placeholder="Enter Name" required
                            class="block w-full p-2 mb-4 border border-gray-300 rounded" />
                        <select v-model="form.is_active"
                            class="block w-full p-2 mb-4 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none">
                            <option value="" disabled v-if="!isEdit">Select</option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                        <button type="submit" :disabled="loading"
                            class="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition">
                            {{ (this.$route.query.id == null) ? 'CREATE' : 'UPDATE' }}
                        </button>
                    </form>
                </div>
            </div>
            <div class="footer mt-4">
                <Footer />
            </div>
        </div>
    </div>
</template>

<script>
import {
    Header,
    Sidebar,
    Footer
} from '../../components/layout';
import axios from 'axios';
import {
    fetchData
} from '../../cacheService';

export default {
    name: 'BannerAddPage',
    components: {
        Header,
        Sidebar,
        Footer,
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

            const { records } = response;
            this.roles = records;
        } catch (error) {
            console.warn(error);
        } finally {
            this.loading = false;
        }
    },
    data() {
        return {
            form: {
                image: this.$route.query.image || '',
                name: this.$route.query.name || '',
                is_active: this.$route.query.is_active || ''
            },
            roles: [],
            loading: false,
            envImageUrl: process.env.VUE_APP_API_IMAGE_URL,
            defaultImageUrl: require('@/assets/images/defaultimage.png'),
            imagePreview: this.$route.query.image ? `${process.env.VUE_APP_API_IMAGE_URL}${this.$route.query.image}` : require('@/assets/images/defaultimage.png'),
            isEdit: !!this.$route.query.id
        };
    },
    methods: {
        async submitForm() {
            if (!this.form.name) {
                alert('Please fill out all fields.');
                return;
            }

            this.loading = true;

            const token = localStorage.getItem('access_token');
            const formData = new FormData();

            const id = this.$route.query.id;
            formData.append('id', id ? parseInt(id) : 0);
            formData.append('name', this.form.name);
            formData.append('is_active', this.form.is_active || 0);

            // Only append image if it has been selected
            if (this.form.image instanceof File) {
                formData.append('image', this.form.image);
            }

            try {
                const response = await axios.post(`${process.env.VUE_APP_API_URL}auth/banner`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                alert(response.data.message);
                this.$router.push({ name: 'Banner' });
            } catch (error) {
                console.warn(error);
            } finally {
                this.loading = false;
            }
        },
        uploadFile(event) {
            const file = event.target.files[0];
            this.form.image = file;

            // Create a FileReader to read the file and update imagePreview
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreview = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                // Reset imagePreview if no file is selected
                this.imagePreview = this.defaultImageUrl;
            }
        }
    }
}
</script>

<style scoped>
h1 {
    color: tomato;
    margin: 50px 0px 50px 0px;
}
</style>
