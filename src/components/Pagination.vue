<template>
    <Pagination v-model="page" :records="total" :per-page="limit" @paginate="myCallback" />
</template>

<script>
import Pagination from 'v-pagination-3';
import { mapState } from 'vuex';

export default {
    name: 'PaginationComponent',
    components: {
        Pagination,
    },
    props: {
        sendProp: String,
    },
    data() {
        return {
            apiUrl: process.env.VUE_APP_API_URL,
            page: 1,
            loading: true,
            find: ''
        };
    },
    computed: {
        ...mapState({
            skip: state => state.skip,
            limit: state => state.limit,
            total: state => state.total,
        }),
    },
    methods: {
        async myCallback(page) {
            this.page = page;
            const skip = (this.page - 1) * this.limit;
            try {
                this.loading = true;
                this.$store.commit('CLEAR_CACHE');
                await this.$store.dispatch('fetchResource', `${this.apiUrl}auth/${this.sendProp}?find=${this.find}&skip=${skip}&limit=${this.limit}`);
            } catch (error) {
                this.$showToast('FAIL', error);
            } finally {
                this.loading = false;
            }
        }
    }

}
</script>

<style>
.VuePagination {
    margin-top: 2rem !important;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
}

.VuePagination li {
    margin: 0 5px;
    display: inline-block;
}

.VuePagination button {
    background-color: #4b90f1;
}
</style>
