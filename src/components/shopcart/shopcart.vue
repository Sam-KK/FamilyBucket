<template>
    <div>
        <div class="shop-cart">
            <div class="container">
                <div class="cart-left" @click="toggleList">
                    <div class="logo-wrap" :class="{ 'highlight': totalCount > 0 }">
                        <div class="logo">
                            <i class="icon icon-cart"></i>
                        </div>
                        <div class="num" v-show="totalCount > 0">{{ totalCount }}</div>
                    </div>
                    <ul class="price-wrap">
                        <li class="price" :class="{ 'highlight': totalCount > 0 }">¥{{ totalPrice }}</li>
                        <li class="desc">另需配送费¥{{ deliveryPrice }}元 </li>
                    </ul>
                </div>
                <div class="cart-right">
                    <div class="pay" :class="payClass">
                        {{ payText }}
                    </div>
                </div>
            </div>

            <!-- 购物车列表 -->
            <transition name="fold">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-head">
                        <h6 class="list-title">购物车</h6>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-content" ref="listContent">
                        <ul>
                            <li class="list-food" v-for="(food, index) in selectFoods" :key="index">
                                <div class="food-name">{{ food.name }}</div>
                                <div class="food-price">¥{{ food.price }}</div>
                                <div class="cart-control">
                                    <v-control :food="food"></v-control>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>

        <!--购物车详情页的遮罩并且动画处理-->
        <transition name="fade">
            <div class="list-mask" @click="hideList" v-show="listShow"></div>
        </transition>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import cartControl from '@/components/cartcontrol/cartcontrol'
export default {
    name: 'shopcart',
    components: {
        'v-control': cartControl
    },
    props: {
        // 接受 goods 组件传递的 food
        selectFoods: {
            type: Array,
            default() {
                return []
            }
        },
        deliveryPrice: {
            type: Number,
            default: 4
        },
        minPrice: {
            type: Number,
            default: 20
        }
    },
    data() {
        return {
            fold: true
        }
    },
    computed: {
        // 计算总价 依赖于 selectFoods
        totalPrice() {
            let total = 0
            this.selectFoods.forEach((food) => {
                total += food.price * food.count
            })
            return total
        },
        // 计算总数量 依赖于 selectFoods
        totalCount() {
            let count = 0
            this.selectFoods.forEach((food) => {
                count += food.count
            })
            return count
        },
        // 去结算 依赖于 totalPrice
        payText() {
            if (this.totalPrice === 0) {
                return `¥${this.minPrice}起送`
            } else if (this.totalPrice < this.minPrice) {
                let diff = this.minPrice - this.totalPrice
                return `还差¥${diff}起送`
            } else {
                return `去结算`
            }
        },
        // 去结算样式 依赖于 totalPrice
        payClass() {
            if (this.totalPrice < this.minPrice) {
                return 'not-enough'
            } else {
                return 'enough'
            }
        },
        // 购物车是否展示内部列表处理
        listShow() {
            if (!this.totalCount) {
                return false
            }
            let show = !this.fold
            if (show) {
                this._initScroll()
            }
            return show
        }
    },
    methods: {
        _initScroll() {
            this.$nextTick(() => {
                if (!this.listScroll) {
                    this.listScroll = new BScroll(this.$refs.listContent, {
                        click: true,
                        probeType: 3
                    })
                } else {
                    this.listScroll.refresh()
                }
            })
        },
        // 封装一个方法来控制购物车列表的显示
        toggleList() {
            if (!this.totalCount) {
                return
            }

            // 切换状态的处理
            this.fold = !this.fold
        },
        // 遮罩隐藏
        hideList() {
            // 切换状态的处理
            this.fold = !this.fold
        },
        // 清空购物车
        empty() {
            this.selectFoods.forEach((food) => {
                food.count = 0
            })
        }
    }
}
</script>

<style type="text/less" lang="less" scoped>
    .shop-cart {
        z-index: 50;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 48px;
        .container {
            display: flex;
            background: #141d27;
            .cart-left {
                flex: 1;
                .logo-wrap {
                    position: relative;
                    display: inline-block;
                    border-radius: 50%;
                    box-sizing: border-box;
                    vertical-align: top;
                    padding: 6px;
                    top: -10px;
                    margin-left: 6px;
                    width: 56px;
                    height: 56px;
                    background: #141d27;
                    &.highlight {
                        .logo {
                            background: rgb(0, 160, 282);
                            .icon {
                                background: url("shopcart-highlight.png") no-repeat;
                                -webkit-background-size: 100% 100%;
                                background-size: 100% 100%;
                            }
                        }
                    }
                    .logo {
                        border-radius: 50%;
                        width: 100%;
                        height: 100%;
                        line-height: 44px;
                        vertical-align: middle;
                        text-align: center;
                        background: #2b343c;
                        .icon {
                            display: inline-block;
                            vertical-align: middle;
                            width: 24px;
                            height: 24px;
                            background: url("shopcart.png") no-repeat;
                            -webkit-background-size: 100% 100%;
                            background-size: 100% 100%;
                        }
                    }
                    .num {
                        position: absolute;
                        top: 0;
                        right: 0;
                        height: 16px;
                        line-height: 16px;
                        padding: 0 10px;
                        border-radius: 10px;
                        font-size: 10px;
                        color: #fff;
                        background: #f01414;
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
                    }
                }
                .price-wrap {
                    flex: 1;
                    display: inline-block;
                    vertical-align: top;
                    margin-top: 12px;
                    font-size: 0;
                    color: rgba(255, 255, 255, 0.4);
                    overflow: hidden;
                    li {
                        display: inline-block;
                        vertical-align: top;
                        line-height: 24px;
                        &.price {
                            padding-right: 10px;
                            border-right: 1px solid rgba(255, 255, 255, 0.1);
                            font-size: 16px;
                            font-weight: bold;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            &.highlight {
                                color: #fff;
                            }
                        }
                        &.desc {
                            margin-left: 10px;
                            overflow: hidden;
                            font-size: 12px;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
            }
            .cart-right {
                flex: 0 0 106px;
                width: 106px;
                .pay {
                    height: 48px;
                    line-height: 48px;
                    text-align: center;
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 12px;
                    background: #2b333b;
                    &.enough {
                        background: #00b43c;
                        color: #fff;
                    }
                }
            }
        }

        .shopcart-list {
            position: absolute;
            left: 0;
            top: 0;
            z-index: -1;
            width: 100%;
            transform: translate3d(0, -100%, 0);
            &.fold-enter-active, &.fold-leave-active {
                transition: all 0.5s;
            }
            &.fold-enter, &.fold-leave-active {
                transform: translate3d(0, 0, 0);
            }
            .list-head {
                display: flex;
                justify-content: space-between;
                height: 40px;
                line-height: 40px;
                padding: 0 18px;
                background: rgb(243, 245, 247);
                border-bottom: 1px solid rgba(7,17,27,0.1);
                .list-title {
                    font-size: 14px;
                    color: rgb(7, 17, 27);
                }
                .empty {
                    font-size: 12px;
                    color: rgb(0, 160, 220);
                }
            }
            .list-content {
                padding: 0 18px;
                max-height: 218px;
                overflow: hidden;
                background: rgb(255, 255, 255);
                .list-food {
                    display: flex;
                    align-items: center;
                    padding: 6px 0;
                    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
                    box-sizing: border-box;
                    &:last-child {
                        border: none;
                    }
                    .food-price {
                        flex: 1;
                        margin-right: 12px;
                        font-size: 14px;
                        font-weight: 700;
                        color: rgb(240, 20, 20);
                        text-align: right;
                    }
                }
            }
        }
    }

    .list-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 40;
        backdrop-filter: blur(10px); //遮罩虚化
        opacity: 1;
        background: rgba(7, 17, 27, 0.6);
        &.fade-enter-active, &.fade-leave-active {
            transition: all 0.5s;
        }
        &.fade-enter, &.fade-leave-active {
            opacity: 0;
            background: rgba(7, 17, 27, 0);
        }
    }
</style>
