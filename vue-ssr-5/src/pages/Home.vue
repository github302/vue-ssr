<template>
    <div>
        <p>Home page</p>
        <p>The Visited URL is {{ url }}</p>
        <p><button @click="sayHello">Hello</button></p>
        <router-link to="/about">About page </router-link>
    </div>
</template>
<script>
export default {
    data() {
        return {
            url: this.$route.path,
        }
    },
    methods: {
        sayHello() {
            window.alert('Hello!');
        }
    }
}
</script>