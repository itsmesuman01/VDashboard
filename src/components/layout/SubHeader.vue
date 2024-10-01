<template>
    <div class="flex items-center justify-between h-auto overflow-hidden">
        <div class="flex">
            <div class="p-2">
                <select required
                    class="block w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                    @change="onPaginate">
                    <option value="">Show entries</option>
                    <option v-for="(item, index) in dropdownPagination" :key="index" :value="item">
                        {{ item }}
                    </option>
                </select>
            </div>
            <div class="p-2">
                <input type="text" placeholder="Search ..." @input="onSearch"
                    class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 m-0">
            </div>
        </div>
        <div class="p-2">
            <router-link class="bg-[#006aff] border-0 w-[50px] h-[25px] rounded-[10px] inline-block no-underline"
                :to="`/${title}-add`">
                <h1 class="text-white">+</h1>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'SubHeader',
    props: {
        title: String
    },
    data() {
        return {
            timeout: null,
            dropdownPagination: [],
            find: ''
        };
    },
    mounted() {
        this.updateDropdownPagination();
    },
    computed: {
        ...mapState({
            // total: state => state.user.total,
            total() {
                return this.$store.state[this.title].total;
            }
        })
    },
    watch: {
        total: 'updateDropdownPagination'
    },
    methods: {
        updateDropdownPagination() {
            this.dropdownPagination = [];
            let max = Math.ceil(this.total / 10) * 10;
            for (let i = 10; i <= max; i += 10) {
                this.dropdownPagination.push(i);
            }
        },
        onPaginate(event) {
            const paginate = parseInt(event.target.value);
            this.$emit('paginate', paginate - 10);
        },
        onSearch(event) {
            const searchTerm = event.target.value;
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.$emit('search', searchTerm);
            }, 500);
        }
    }
}
</script>
