<template>
    <div class="head-sub bg-white flex items-center h-auto overflow-hidden">
        <div class="mt-[5px] mr-[10px] mb-0 ml-auto">
            <router-link class="bg-[#006aff] border-0 w-[50px] rounded-[10px] inline-block no-underline"
                :to="`/${title}-add`">
                <h1 class="text-white">+</h1>
            </router-link>
            <div id="toastbar"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SubHeaderPage',
    methods: {},
    props: {
        title: String
    }
}
</script>
