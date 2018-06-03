<template>
    <div class="seller" rel="seller">
        <div class="seller-container">
            <!--overview部分-->
            <div class="overview">
                <div class="head">
                    <h1 class="title">{{ seller.name }}</h1>
                    <div class="desc">
                        <div class="star-wrap">
                            <v-star :size="36" :score="4"></v-star>
                        </div>
                        <span class="seller-desc">
                            ({{ seller.ratingCount }})
                        </span>
                        <span class="seller-desc">月售{{ seller.sellCount }}单</span>
                    </div>
                </div>
                <!--列表处理remark内容-->
                <ul class="remark">
                    <!--使用一个block块包裹内容-->
                    <li class="block">
                        <!--标题用h2标签-->
                        <h2>起送价</h2>
                        <!--用content块包裹内容-->
                        <div class="content">
                            <!--用span代表特殊字体-->
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2>平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
            </div>

            <v-split></v-split>

            <div class="seller-module">
                <h4 class="tit">公告与活动</h4>
                <p class="notice-text">{{ seller.bulletin }}</p>
                <ul class="supports">
                    <li v-for="item in seller.supports" class="support-item" :key="item.type">
                        <span class="icon" :class="classMap[item.type]"></span>
                        <span class="text">{{ item.description }}</span>
                    </li>
                </ul>
            </div>

            <v-split></v-split>

            <div class="seller-module pics">
                <div class="tit">商家实景</div>
                <div class="pic-wrap" ref="picWrapper">
                    <ul class="pic-list" ref="piclist">
                        <li v-for="(pic, index) in seller.pics" class="pic-item" :key="index">
                            <img :src="pic" width="120" height="90" alt="">
                        </li>
                    </ul>
                </div>
            </div>

            <v-split></v-split>

            <div class="seller-module">
                <div class="tit">商家信息</div>
                <ul class="supports">
                    <li v-for="(info, index) in seller.infos" class="support-item" :key="index">
                        <span class="text">{{ info }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import split from '@/components/split/split'
import star from '@/components/star/star'
export default {
    name: 'seller',
    props: {
        seller: {
            type: Object
        }
    },
    components: {
        'v-star': star,
        'v-split': split
    },
    created() {
        // 主要看这个classMap
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    mounted() {
        this.$nextTick(() => {
            this._initPicScroll()
        })
    },
    methods: {
        _initPicScroll() {
            if (this.seller.pics) {
                let picWidth = 120
                let margin = 6
                let allWidth = (picWidth + margin) * this.seller.pics.length - margin
                console.log(allWidth)
                this.$refs.piclist.style.width = allWidth + 'px'

                // 异步绑定滚动
                this.$nextTick(() => {
                    if (!this.picScroll) {
                        this.picScroll = new BScroll(this.$refs.picWrapper, {
                            scrollX: true, // bscroll的横向滚动属性
                            eventPassthrough: 'vertical' // bscroll的过滤垂直滚动
                        })
                    } else {
                        this.picScroll.refresh()
                    }
                })
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
    .seller {
        .seller-container {
            .overview {
                padding: 18px;
                .title {
                    margin-bottom: 8px;
                    font-size: 14px;
                    line-height: 14px;
                    color: rgb(7, 17, 27);
                }
                .desc {
                    font-size: 0;
                    .star-wrap,
                    .seller-desc {
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .star-wrap {
                        margin-right: 8px;
                    }
                    .seller-desc {
                        margin-right: 12px;
                        font-size: 10px;
                        color: rgb(77, 85, 93);
                        line-height: 18px;
                    }
                }
                .remark {
                    display: flex;
                    padding-top: 18px;
                    .block {
                        flex: 1;
                        text-align: center;
                        border-right: 1px solid rgba(7,17,27,0.1);
                        &:last-child {
                            border: none;
                        }
                        h2 {
                            margin-bottom: 4px;
                            line-height: 10px;
                            font-size: 10px;
                            color: rgb(147, 153, 159);
                        }
                        .content {
                            line-height: 24px;
                            font-size: 10px;
                            color: rgb(7, 17, 27);
                            .stress {
                                font-size: 24px;
                            }
                        }
                    }
                }
            }

            .seller-module {
                padding: 18px 18px 0 18px;
                &.pics {
                    padding-bottom: 18px;
                }
                .tit {
                    margin-bottom: 8px;
                    line-height: 14px;
                    color: rgb(7, 17, 27);
                    font-size: 14px;
                }
                .notice-text {
                    padding: 0 12px 16px 12px;
                    line-height: 24px;
                    font-size: 12px;
                    color: rgb(240, 20, 20);
                }
                .supports {
                    .support-item {
                        padding: 16px 12px;
                        font-size: 0;
                        border-top: 1px solid rgba(7, 17, 27, .1);
                        span {
                            display: inline-block;
                            vertical-align: middle;
                            &.text {
                                font-size: 12px;
                                color: rgb(7, 17, 27);
                                line-height: 16px;
                            }
                        }
                        .icon {
                            margin-right: 6px;
                            width: 16px;
                            height: 16px;
                            vertical-align: middle;
                            &.decrease {
                                .bg-img('decrease_4');
                            }
                            &.discount {
                                .bg-img('discount_4');
                            }
                            &.special {
                                .bg-img('special_4');
                            }
                            &.invoice {
                                .bg-img('invoice_4');
                            }
                            &.guarantee {
                                .bg-img('guarantee_4');
                            }
                        }
                    }
                }

                .pic-wrap {
                    overflow: hidden;
                    width: 100%;
                    white-space: nowrap;
                    .pic-list {
                        font-size: 0;
                        .pic-item {
                            display: inline-block;
                            margin-right: 6px;
                            width: 120px;
                            height: 90px;
                            &:last-child {
                                margin-right: 0;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
