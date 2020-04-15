<template>
    <div>
        <p>About page</p>
        <p>Counter: {{ counter }}</p>
        <p><button @click="$store.commit('INCREMENT')">+</button></p>
        <goods-detail />
        <router-link to="/">Home page</router-link>
    </div>
</template>
<script>
import { loadScript } from '../common/utils';
import DefaultComp from './Default.vue';

export default {
    preFetch({ store, route }) {
        store.commit('INCREMENT');
        console.log('about preFetch');
    },
    components: {
       'goods-detail': (resolve) => {
           if (typeof window !== 'undefined') {
               if (window.isvScript) {
                    console.log("window.isvScript ", window.isvScript);
                    loadScript(window.isvScript).then(() => {
                        resolve(window.mallCloud.components.goodsDetail__v2shuai);
                    });
               } else {
                   resolve(DefaultComp);
               }
           } else {
               resolve({
                   render: h => h('div')
            
           }
        }
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
        console.log("About mount");
    }
}
</script>