<template>
<div class="container">
    <div class="sidebar">
        <Sidebar />
    </div>
    <div class="maincontent">
        <div class="header">
            <Header />
        </div>
        <div class="section">
            <h1>{{ (this.$route.query.id == null) ? 'CREATE' : 'UPDATE' }} BANNER</h1>
            <div class="register">
                <form @submit.prevent="submitForm">
                    <img :src="imagePreview" alt="Banner Image" class="banner-image" />
                    <input class="input-file" type="file" @change="uploadFile" />
                    <input v-model="form.name" type="text" placeholder="Enter Name" required />
                    <!-- <select class="dropdown" v-model="form.selectedRole" required>
                        <option disabled value="">Select Role</option>
                        <option v-for="item in roles" :key="item.id" :value="item.id">
                            {{ item.name }}
                        </option>
                    </select> -->
                    <br><br>
                    <button type="submit" :disabled="loading">{{ (this.$route.query.id == null) ? 'CREATE' : 'UPDATE' }}</button>
                </form>
            </div>
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
                // email: this.$route.query.email || '',
                // password: '',
                // selectedRole: (typeof this.$route.query.role === 'string') ? this.$route.query.role : ''
            },
            roles: [],
            loading: false,
            envImageUrl: process.env.VUE_APP_API_IMAGE_URL,
            defaultImageUrl: require('@/assets/images/defaultimage.webp'),
            imagePreview: this.$route.query.image ? `${process.env.VUE_APP_API_IMAGE_URL}${this.$route.query.image}` : require('@/assets/images/defaultimage.webp')
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
            // formData.append('email', this.form.email);
            // formData.append('password', this.form.password);
            // formData.append('role_id', this.form.selectedRole);

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

.banner-image {
    width: 298px;
    height: 200px;
    object-fit: cover;
}
</style>
