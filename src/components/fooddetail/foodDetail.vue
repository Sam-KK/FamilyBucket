<template>
    <div class="food-detail">
        <div class="banner">
            <img :src="food.image" alt="">
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'foodDetail',
    props: {
        food: {
            type: Object
        }
    }
}
</script>

<style type="text/less" lang="less" scoped>
    .food-detail {
        z-index: 30;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 48px;
        width: 100%;
        background: #fff;
    }
</style>
