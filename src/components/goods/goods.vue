<template>
    <div class="goods">
        <div class="menu" ref="menu">
            <ul>
                <li v-for="(item, index) in goods" :key="index">
                    <div class="inner">
                        <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
                        {{ item.name }}
                    </div>
                </li>
            </ul>
        </div>

        <div class="foods" ref="foods">
            <ul>
                <li v-for="(item, index) in goods" class="food-list" :key="index">
                    <h3 class="foods-title">{{ item.name }}</h3>
                    <ul>
                        <li v-for="(food, index) in item.foods" class="food-item" :key="index">
                            <div class="img">
                                <img :src="food.icon" width="56" height="56" alt="">
                            </div>
                            <div class="content">
                                <h3 class="name">{{ food.name }}</h3>
                                <p v-if="food.description" class="desc">{{ food.description }}</p>
                                <div class="extra">
                                    <span class="count">月售{{ food.sellCount }}份</span>
                                    <span class="rate"> 好评率{{ food.rating }}%</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import BScroll from 'better-scroll'
export default {
    name: 'goods',
    data() {
        return {
            goods: []
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    mounted() {
        axios.get('/api/data.json').then((res) => {
            this.goods = res.data.goods
            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.menu, {})
                this.scroll = new BScroll(this.$refs.foods, {})
            })
        })
    }
}
</script>

<style type="text/less" lang="less" scoped>
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
    .goods {
        display: flex;
        position: absolute;
        width: 100%;
        top: 174px;
        bottom: 46px;
        overflow: hidden;
        .menu {
            position: relative;
            flex: 0 0 80px;
            width: 80px;
            background: #f3f5f7;
            li {
                position: relative;
                display: table;
                width: 100%;
                height: 60px;
                line-height: 14px;
                .inner {
                    display: table-cell;
                    padding: 0 12px;
                    width: 56px;
                    vertical-align: middle;
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                    .icon {
                        display: inline-block;
                        width: 12px;
                        height: 12px;
                        &.decrease {
                            .bg-img('decrease_3');
                        }
                        &.discount {
                            .bg-img('discount_3');
                        }
                        &.guarantee {
                            .bg-img('guarantee_3');
                        }
                        &.invoice {
                            .bg-img('invoice_3');
                        }
                        &.special {
                            .bg-img('special_3');
                        }
                    }
                }
            }
        }

        .foods {
            flex: 1;
            .foods-title {
                padding-left: 14px;
                font-size: 12px;
                color: rgb(147, 153, 159);
                height: 26px;
                line-height: 26px;
                border-left: 1px solid #d9dde1;
                background: #f3f5f7;
            }
            .food-item {
                position: relative;
                display: flex;
                margin: 18px;
                padding-bottom: 18px;
                border-bottom: 1px solid rgba(7,17,27,0.1);
                &:last-child {
                    border-bottom: none;
                }
                .img {
                    flex: 56px 0 0;
                    margin-right: 10px;
                }
                .content {
                    flex: 1;
                    .name {
                        margin: 2px 0 8px 0;
                        font-size: 14px;
                        color: rgb(7, 17, 27);
                        line-height: 20px;
                    }
                    .desc,
                    .extra {
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                    }
                    .desc {
                        margin-bottom: 8px;
                    }
                    .extra {
                        .count {
                            margin-right: 8px;
                        }
                    }
                }
            }
        }
    }
</style>
