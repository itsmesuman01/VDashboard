<template>
<div class="pagination">
    <Pagination v-model="page" :records="total" :per-page="limit" @paginate="myCallback" />
</div>
</template>

<script>
import Pagination from 'v-pagination-3';
import { mapState } from 'vuex';

export default {
    name: 'PaginationComponent',
    components: {
        Pagination,
    },
    data() {
        return {
            page: 1,
            loading: true,
            find: ''
        };
    },
    computed: {
        ...mapState({
            skip: state => state.main.skip,
            limit: state => state.main.limit,
            total: state => state.main.total,
        }),
    },
    methods: {
        async myCallback() {
            console.log('Page:', this.page);
            console.log('Limit:', this.limit);
            console.log('Total:', this.total);

            const skip = (this.page - 1) * this.limit;
            const apiUrl = `${process.env.VUE_APP_API_URL}auth/user?find=${this.find}&skip=${skip}&limit=${this.limit}`;
            this.$store.commit('main/SET_SKIP', skip);
            try {
                this.loading = true;
                this.$store.commit('CLEAR_CACHE');
                await this.$store.dispatch('main/fetchResource', apiUrl);
            } catch (error) {
                console.warn(error);
            } finally {
                this.loading = false;
            }
        }
    }

}
</script>
