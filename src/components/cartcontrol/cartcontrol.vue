<template>
    <div class="cart-control">
        <transition name="move">
            <div class="inline-block minus" v-show="food.count>0" @click="minus($event)">
                <i class="icon icon-minus"></i>
            </div>
        </transition>
        <div class="inline-block count" v-show="food.count > 0">{{ food.count }}</div>
        <div class="inline-block plus" @click="plus($event)">
            <i class="icon icon-plus"></i>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    name: 'cartcontrol',
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        plus(event) {
            console.log('click')
            // 忽略掉BScroll的事件
            if (!event._constructed) {
                return false
            }

            if (!this.food.count) {
                // 遇到没有这个属性的,会强行添加一个
                Vue.set(this.food, 'count', 1)
            } else {
                this.food.count++
            }
        },
        minus(event) {
            // 忽略掉BScroll的事件
            if (!event._constructed) {
                return false
            }

            if (this.food.count) {
                this.food.count--
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .bg-img(@url) {
        background: url("@{url}@2x.png") no-repeat;
        background-size: 100%;
    }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
        .bg-img(@url) {
            background: url("@{url}@3x.png") no-repeat;
            background-size: 100%;
        }
    }
    .cart-control {
        font-size: 0;
        .inline-block {
            display: inline-block;
            vertical-align: top;
            padding: 6px;
        }
        .count {
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 24px;
        }
        .minus,
        .plus {
            .icon {
                display: inline-block;
                width: 24px;
                height: 24px;
                border-radius: 50%;
            }
        }
        .minus {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            transition: all 0.4s linear;
            .icon-minus {
                transition: all 0.4s linear;
                transform: rotate(0);
                background: url("minus.png") no-repeat;
                -webkit-background-size: 100%;
                background-size: 100%;
            }
            &.move-enter-active, &.move-leave-active {
                transition: all 0.4s linear;
            }
            &.move-enter, &.move-leave-active {
                opacity: 0;
                transform: translate3d(34px, 0, 0);
                .icon-minus {
                    transform: rotate(180deg);
                }
            }
        }
        .plus {
            .icon-plus {
                background: url("plus.png") no-repeat;
                -webkit-background-size: 100%;
                background-size: 100%;
            }
        }
    }
</style>
