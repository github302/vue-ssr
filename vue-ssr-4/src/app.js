import Vue from 'vue';
import App from './App.vue';

export function createApp(){
    const app = new Vue(App);

    return { app } ;
}