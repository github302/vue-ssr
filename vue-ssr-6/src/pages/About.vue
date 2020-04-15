<template>
    <div>
        <p>About page</p>
        <p>Counter: {{ counter }}</p>
        <p><button @click="$store.commit('INCREMENT')">+</button></p>
        <router-link to="/">Home page</router-link>
    </div>
</template>
<script>
export default {
    preFetch({ store, route }) {
        store.commit('INCREMENT');
        console.log('about preFetch');
    },
    data() {
        return {
            msg: ''
        }
    },
    computed: {
        counter(st) {
            return this.$store.state.counter;
        }
        
    }
}
</script>