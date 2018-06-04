<template>
    <div class="shop-cart">
        <div class="container">
            <div class="cart-left">
                <div class="logo-wrap">
                    <div class="logo">
                        <i class="icon icon-cart"></i>
                    </div>
                    <div class="num">1</div>
                </div>
                <ul class="price-wrap">
                    <li class="price">￥0</li>
                    <li class="desc">另需配送费￥{{ deliveryPrice }}元 </li>
                </ul>
            </div>
            <div class="cart-right">
                <div class="pay">
                    234235
                </div>
            </div>
        </div>

        <!-- 购物车列表 -->
        <transition name="fold">
            <div class="shopcart-list">
                <div class="list-head">
                    <h6 class="list-title">购物车</h6>
                    <span class="empty">清空</span>
                </div>
                <div class="list-content">
                    <ul>
                        <li class="list-food">
                            <div class="food-name"></div>
                            <div class="food-price"></div>
                            <div class="cart-control">
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'shopcart',
    props: {
        // 接受 goods 组件传递的 food
        selectFoods: {
            type: Array,
            default() {
                return []
            }
        },
        deliveryPrice: {
            type: Number
        },
        minPrice: {
            type: Number
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
                max-height: 217px;
                overflow: hidden;
                background: rgb(255, 255, 255);
                .list-food {
                    display: flex;
                    align-items: center;
                    padding: 12px 0;
                    box-sizing: border-box;
                    .food-price {
                        flex: 1;
                        font-size: 14px;
                        font-weight: 700;
                        color: rgb(240, 20, 20);
                        text-align: right;
                    }
                }
            }
        }
    }
</style>
