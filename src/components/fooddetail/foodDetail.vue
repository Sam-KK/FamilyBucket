<template>
    <transition name="move">
        <div class="food-detail" v-show="detailFlag" ref="foodDetailWrap">
            <div class="container">
                <div class="banner">
                    <img class="banner-img" :src="food.image" width="100%" height="100%" alt="">
                    <div class="back" @click="hideDetail">
                        <i class="iconfont icon-return"></i>
                    </div>
                </div>

                <div class="food-module info">
                    <h1 class="title">{{ food.name }}</h1>
                    <div class="extra">
                        <span class="count">月售229份</span>
                        <span class="rate"> 好评率100%</span>
                    </div>
                    <div class="price">
                        <span class="now">¥{{ food.price }}</span>
                        <span class="old" v-show="food.oldPrice">¥{{ food.oldPrice }}</span>
                    </div>
                    <div class="control-wrap">
                        <v-control :food="food"></v-control>
                    </div>
                    <transition name="fade">
                        <div class="buy" v-show="!food.count || food.count === 0" @click="addCart">
                            加入购物车
                        </div>
                    </transition>
                </div>

                <split v-show="food.info"></split>

                <div class="food-module message" v-show="food.info">
                    <h1 class="title">商品介绍</h1>
                    <p class="text">{{ food.info }}</p>
                </div>

                <split></split>

                <div class="food-module message">
                    <h1 class="title">商品评价</h1>
                    <div class="select-wrap">
                        <v-select @emitSelect="parentRatingSelect" :ratings="food.ratings"
                                  :selectType="selectType"
                                  :onlyContent="onlyContent"
                                  :desc="desc">
                        </v-select>
                    </div>
                    <div class="rating-wrapper">
                        <ul>
                            <li class="rating-items" v-for="(ratings, index) in food.ratings" :key="index">
                                <div class="user">
                                    <span class="username">{{ ratings.username }}</span>
                                    <img class="avatar" :src="ratings.avatar" width="12" height="12" alt="">
                                </div>
                                <div class="time">{{ratings.rateTime | formatDate }}</div>
                                <div class="desc" v-show="ratings.text">
                                    <i class="iconfont" :class="{'icon-ai45': ratings.rateType === 0, 'icon-thumbdown': ratings.rateType === 1}"></i>
                                    <span class="ratings-text">{{ ratings.text }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
import { formatDate } from '@/assets/js/time'
import split from '@/components/split/split'
import cartControl from '@/components/cartcontrol/cartcontrol'
import BScroll from 'better-scroll'
import ratingSelect from '@/components/ratingselect/ratingselect'

const ALL = 2

export default {
    name: 'foodDetail',
    props: {
        food: {
            type: Object
        }
    },
    components: {
        split,
        'v-control': cartControl,
        'v-select': ratingSelect
    },
    data() {
        return {
            detailFlag: false,
            selectType: ALL,
            onlyContent: true,
            desc: {
                all: '全部',
                satisfied: '推荐',
                dissatisfied: '吐槽'
            }
        }
    },
    methods: {
        showFoodDetail() {
            this.detailFlag = true
            this.$nextTick(() => {
                if (!this.showFoodDetailScroll) {
                    this.showFoodDetailScroll = new BScroll(this.$refs.foodDetailWrap, {
                        click: true
                    })
                } else {
                    this.showFoodDetailScroll.refresh()
                }
            })
        },
        hideDetail() {
            this.detailFlag = false
        },
        addCart() {
            Vue.set(this.food, 'count', 1)
        },
        parentRatingSelect(type) {
            this.selectType = type
            this.$nextTick(() => {
                this.showFoodDetailScroll.refresh()
            })
        }
    },
    filters: {
        formatDate(time) {
            let date = new Date(time)
            return formatDate(date, 'YYYY-MM-dd hh:mm')
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
            .back {
                position: absolute;
                top: 0;
                left: 0;
                padding: 8px;
                color: #fff;
                font-size: 0;
                .iconfont {
                    display: inline-block;
                    font-size: 22px;
                }
            }
            .banner-img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
        }

        .food-module {
            position: relative;
            padding: 18px;
            .title {
                margin-bottom: 8px;
                font-size: 14px;
                color: rgb(7, 17, 27);
                line-height: 14px;
            }
        }
        .info {
            .title {
                font-weight: bold;
            }
            .extra {
                margin-bottom: 18px;
                font-size: 10px;
                color: rgb(147, 153, 159);
                .count {
                    margin-right: 8px;
                }
            }
            .price {
                font-weight: 700;
                line-height: 24px;
                .now {
                    margin-right: 8px;
                    font-size: 14px;
                    color: rgb(240, 20, 20);
                }
                .old {
                    text-decoration: line-through;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
            }
            .control-wrap {
                position: absolute;
                right: 12px;
                bottom: 12px;
            }
            .buy {
                position: absolute;
                right: 18px;
                bottom: 18px;
                opacity: 1;
                color: #fff;
                height: 24px;
                line-height: 24px;
                padding: 0 12px;
                box-sizing: border-box;
                border-radius: 12px;
                font-size: 10px;
                background: rgb(0, 160, 220);
                &.fade-enter-active, &.fade-leave-active {
                    transition: all 0.2s;
                }
                &.fade-enter, &.fade-leave-active {
                    opacity: 0;
                    z-index: -1;
                }
            }
        }
        .message {
            .text {
                padding: 0 8px;
                font-size: 12px;
                color: rgb(77, 85, 93);
                line-height: 24px;
            }
            .select-wrap {
                margin: 0 -18px;
            }
            .rating-wrapper {
                .rating-items {
                    position: relative;
                    padding: 16px 0;
                    .user {
                        position: absolute;
                        right: 0;
                        top: 16px;
                        line-height: 12px;
                        font-size: 0;
                        .username {
                            display: inline-block;
                            margin-right: 6px;
                            vertical-align: middle;
                            font-size: 10px;
                            color: #93999f;
                        }
                        .avatar {
                            display: inline-block;
                            vertical-align: middle;
                            width: 12px;
                            height: 12px;
                            border-radius: 50%;
                        }
                    }
                    .time {
                        margin-bottom: 6px;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                        line-height: 12px;
                    }
                    .desc {
                        .iconfont {
                            display: inline-block;
                            vertical-align: middle;
                            font-size: 12px;
                            line-height: 16px;
                            &.icon-ai45 {
                                color: #00a0dc;
                            }
                            &.icon-thumbdown {
                                color: #93999f;
                            }
                        }
                        .ratings-text {
                            display: inline-block;
                            vertical-align: middle;
                            font-size: 12px;
                            color: rgb(7, 17, 27);
                            line-height: 16px;
                        }
                    }
                }
            }
        }
    }
</style>
