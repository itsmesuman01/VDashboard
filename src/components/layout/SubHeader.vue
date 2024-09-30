<template>
    <div class="flex items-center justify-between h-auto overflow-hidden">
        <div class="p-2">
            <input type="text" placeholder="Search ..." @input="onSearch"
                class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 m-0">
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
export default {
    name: 'SubHeader',
    props: {
        title: String
    },
    data() {
        return {
            timeout: null
        };
    },
    methods: {
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
