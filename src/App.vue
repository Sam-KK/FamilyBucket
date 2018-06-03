<template>
    <div id="app">
        <v-header :seller="seller"></v-header>

        <v-nav></v-nav>

        <router-view :seller="seller"></router-view>
    </div>
</template>

<script>
import axios from 'axios'
import header from './components/header/header'
import nav from './components/nav/nav'
export default {
    name: 'App',
    data() {
        return {
            seller: {}
        }
    },
    components: {
        'v-header': header,
        'v-nav': nav
    },
    mounted() {
        axios.get('/api/data.json').then((res) => {
            this.seller = res.data.seller
            console.log(this.seller)
        })
    }
}
</script>

<style lang="less" scoped>
</style>
