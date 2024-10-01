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
            page: 1,
            loading: true,
            find: ''
        };
    },
    computed: {
        ...mapState({
            skip: state => state.source.skip,
            limit: state => state.source.limit,
            total: state => state.source.total,
        }),
    },
    methods: {
        async myCallback(page) {
            this.page = page;
            console.log('Page:', this.page);
            console.log('Limit:', this.limit);
            console.log('Total:', this.total);

            const skip = (this.page - 1) * this.limit;
            const apiUrl = `${process.env.VUE_APP_API_URL}auth/${this.sendProp}?find=${this.find}&skip=${skip}&limit=${this.limit}`;
            try {
                this.loading = true;
                this.$store.commit('source/CLEAR_CACHE');
                await this.$store.dispatch('source/fetchResource', apiUrl);
            } catch (error) {
                console.warn(error);
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
