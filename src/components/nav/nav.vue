<template>
<ul class="nav">
    <router-link tag="li" to="/goods">
        <a href="">商品</a>
    </router-link>
    <router-link tag="li" to="/ratings">
        <a href="">商品</a>
    </router-link>
    <router-link tag="li" to="/seller">
        <a href="">商品</a>
    </router-link>
</ul>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'homeNav'
}
</script>

<style type="text/less" lang="less" scoped>
    .nav {
        position: relative;
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        &:after {
            position: absolute;
            bottom: 0;
            left: 0;
            content: '';
            width: 100%;
            height: 1px;
            background: rgba(7, 17, 27, .1);
        }
        li {
            flex: 1;
            text-align: center;
            a {
                display: block;
                color: #666;
                font-size: 14px;
            }
            &.router-link-active {
                a {
                    color: #35bd22;
                }
            }
        }
    }
</style>
