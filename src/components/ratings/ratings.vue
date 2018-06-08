<template>
    <div class="ratings" ref="ratings">
        <div class="container">
            <div class="overview">
                <div class="left">
                    <h1 class="score">{{ seller.score }}</h1>
                    <div class="title">综合评分</div>
                    <div class="rank">
                        高于周边商家{{ seller.rankRate }}%
                    </div>
                </div>
                <div class="right">
                    <div class="items">
                        <div class="line-block tit">服务态度</div>
                        <div class="line-block star-wrap">
                            <v-star :score="seller.serviceScore" :size="36"></v-star>
                        </div>
                        <div class="line-block score">{{ seller.serviceScore }}</div>
                    </div>
                    <div class="items">
                        <div class="line-block tit">商品评分</div>
                        <div class="line-block star-wrap">
                            <v-star :score="seller.foodScore" :size="36"></v-star>
                        </div>
                        <div class="line-block score">{{ seller.foodScore }}</div>
                    </div>
                    <div class="items">
                        <div class="line-block tit">送达时间</div>
                        <div class="line-block delivery">{{ seller.deliveryTime }}分钟</div>
                    </div>
                </div>
            </div>
            <v-split></v-split>
            <div class="ratings-wrap">
                <v-select :selectType="selectType"
                          :onlyContent="onlyContent"
                          :ratings="ratings">
                </v-select>
                <ul class="ratings-list">
                    <li class="items" v-for="(item, index) in ratings" :key="index">
                        <div class="avatar">
                            <img :src="item.avatar" width="28" height="28" alt="">
                        </div>
                        <div class="content">
                            <div class="time">{{ item.rateTime | formatDate }}</div>
                            <h1 class="username">{{ item.username }}</h1>
                            <div class="ratings-star">
                                <v-star :size="24" :score="item.score"></v-star>
                                <span class="delivery" v-show="item.deliveryTime">{{ item.deliveryTime }}分钟送达</span>
                            </div>
                            <p class="text">{{ item.text }}</p>
                            <div class="recommend" v-show="item.recommend && item.recommend.length">
                                <i class="iconfont" :class="{'icon-ai45': item.rateType === 0, 'icon-thumbdown': item.rateType === 1}"></i>
                                <span class="recommend-text" v-for="(text, index) in item.recommend" :key="index">{{ text }}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import { formatDate } from '@/assets/js/time'
import split from '@/components/split/split'
import star from '@/components/star/star'
import ratingSelect from '@/components/ratingselect/ratingselect'

const ALL = 2

export default {
    name: 'ratings',
    components: {
        'v-star': star,
        'v-select': ratingSelect,
        'v-split': split
    },
    props: {
        seller: {
            type: Object
        }
    },
    data() {
        return {
            ratings: [],
            selectType: ALL,
            onlyContent: true
        }
    },
    mounted() {
        axios.get('/api/data.json').then((res) => {
            this.ratings = res.data.ratings
            this.$nextTick(() => {
                this.ratingsScroll = new BScroll(this.$refs.ratings, {
                    click: true
                })
            })
        })
    },
    filters: {
        formatDate(time) {
            let date = new Date(time)
            return formatDate(date, 'YYYY-MM-dd hh:mm')
        }
    }
}
</script>

<style lang="less" scoped>
.ratings {
    position: absolute;
    top: 174px;
    left: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .overview {
        display: flex;
        justify-content: center;
        padding: 18px 8px;
        .left {
            text-align: center;
            .score {
                margin-bottom: 6px;
                font-size: 24px;
                color: rgb(255, 153, 0);
                line-height: 28px;
            }
            .title {
                margin-bottom: 8px;
                font-size: 12px;
                color: rgb(7, 17, 27);
                line-height: 12px;
            }
            .rank {
                font-size: 10px;
                color: rgb(147, 153, 159);
                line-height: 1;
            }
        }
        .right {
            margin-left: 12px;
            padding-left: 12px;
            border-left: 1px solid rgba(7,17,27,0.1);
            .items {
                margin-bottom: 8px;
                font-size: 0;
                &:last-child {
                    margin-bottom: 0;
                }
                .line-block {
                    display: inline-block;
                    vertical-align: middle;
                }
                .tit {
                    font-size: 12px;
                    color: rgb(7, 17, 27);
                    line-height: 18px;
                }
                .star-wrap {
                    margin: 0 12px;
                }
                .score {
                    font-size: 12px;
                    color: rgb(255, 153, 0);
                }
                .delivery {
                    margin-left: 12px;
                    font-size: 12px;
                    color: rgb(147, 153, 159);
                    line-height: 18px;
                }
            }
        }
    }
    .ratings-wrap {
        .ratings-list {
            .items {
                position: relative;
                display: flex;
                padding: 18px;
                border-bottom: 1px solid #07111b1a;
                &:last-child {
                    border: none;
                }
                .avatar {
                    flex: 0 0 28px;
                    width: 28px;
                    margin-right: 12px;
                    img {
                        display: block;
                        border-radius: 50%;
                    }
                }
                .content {
                    position: relative;
                    flex: 1;
                    .time {
                        position: absolute;
                        top: 0;
                        right: 0;
                        font-size: 10px;
                        color: rgb(147, 153, 159);
                        line-height: 12px;
                    }
                    .username {
                        margin-bottom: 4px;
                        font-size: 10px;
                        color: rgb(7, 17, 27);
                        line-height: 12px;
                    }
                    .ratings-star {
                        margin-bottom: 6px;
                        .star {
                            display: inline-block;
                            vertical-align: middle;
                        }
                        .delivery {
                            margin-left: 6px;
                            display: inline-block;
                            vertical-align: middle;
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                            font-weight: 200;
                        }
                    }
                    .text {
                        margin-bottom: 8px;
                        font-size: 12px;
                        color: rgb(7, 17, 27);
                        line-height: 18px;
                    }
                    .recommend {
                        font-size: 0;
                        .iconfont {
                            margin-right: 8px;
                            font-size: 14px;
                            &.icon-ai45 {
                                color: rgb(0, 160, 220);
                            }
                            &.icon-thumbdown {
                                color: rgb(183, 187, 191);
                            }
                        }
                        .recommend-text {
                            display: inline-block;
                            padding: 2px 6px;
                            margin: 0 8px 4px 0;
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                            border: 1px solid rgba(7, 17, 27, .1);
                            background: #fff;
                        }
                    }
                }
            }
        }
    }
}
</style>
