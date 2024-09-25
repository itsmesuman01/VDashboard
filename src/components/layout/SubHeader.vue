<template>
    <div class="head-sub">
        <div class="space-sub">
            <router-link class="button-link-scoped" :to="`/${title}-add`">
                <h1>+</h1>
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

<style scoped>
h1 {
    color: white;
}

.head-sub {
    background-color: white;
    display: flex;
    align-items: center;
    height: auto;
    overflow: hidden;
}

.head-sub .space-sub {
    margin: 5px 10px 0px auto;
}

.head-sub .space-sub .button-link-scoped {
    background-color: #006aff;
    border: 0px solid white;
    width: 50px;
    border-radius: 10px;
    display: inline-block;
    text-decoration: none;
}
</style>
