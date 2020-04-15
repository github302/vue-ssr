<template>
    <div>
        <p>Home Page</p>
        <p>The Visited URL is {{ url }}</p>
        <p>
            <button @click="sayHello">hello</button>
        </p>
        <router-link to="/about">About Page</router-link>
    </div>
</template>
<script>
export default {
    preFetch({ store, route}){
        console.log("Home preFetch");
    },
    data() {
        return {
            url: this.$route.path,
        }
    },
    methods: {
        sayHello() {
            window.alert('Hello')
        }
    },
}
</script>