<template>
    <transition name="move">
        <div class="food-detail" v-show="detailFlag">
            <div class="banner">
                <img class="banner-img" :src="food.image" width="100%" height="100%" alt="">
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'foodDetail',
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return {
            detailFlag: false
        }
    },
    methods: {
        showFoodDetail() {
            this.detailFlag = true
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
        transform: translate3d(0, 0, 0);
        &.move-enter-active, &.move-leave-active {
            transition: all 0.3s linear;
        }
        &.move-enter, &.move-leave-to  {
            transform: translate3d(100%, 0 , 0);
        }
        .banner {
            position: relative;
            overflow: hidden;
            height: 0;
            padding-bottom: 100%;
            .banner-img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
