<template>
    <div>
        <p>About page</p>
        <p>Counter: {{ counter }}</p>
        <p><button @click="$store.commit('INCREMENT')">+</button></p>
        <component :is="components"></component>
        <router-link to="/">Home page</router-link>
    </div>
</template>
<script>
import DefaultComp from './Default.vue';
export default {
    preFetch({ store, route }) {
        store.commit('INCREMENT');
        console.log('about preFetch');
    },
    data() {
        return {
            msg: '',
            components: DefaultComp,
        }
    },
    computed: {
        counter(st) {
            return this.$store.state.counter;
        },
    },
    beforeCreate(){
        console.log("About beforeCreate");
    },
    created(){
        console.log("About created");
    },
    
    mounted() {
        if (!window['$loadEvent']) {
            window['$loadEvent'] = new LoadEvent();    
        }
        window['$loadEvent'].on("scriptLoaded", () => {
            this.components = window.mallCloud.components.goodsDetail__v2shuai || DefaultComp;
        })
        console.log("About mount");
    }
}
</script>