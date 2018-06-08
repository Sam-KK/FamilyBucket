<template>
<div class="header">
    <div class="container">
        <div class="avatar">
            <img :src="seller.avatar" width="64" height="64" alt="">
        </div>
        <div class="content">
            <div class="title">
                <span class="brand"></span>
                <h3 class="name">{{ seller.name }}</h3>
            </div>
            <div class="description">
                {{ seller.description }} / {{seller.deliveryTime}}分钟送达
            </div>
            <div class="supports" v-if="seller.supports">
                <span class="icon"></span>
                <span class="text">
                    {{ seller.supports[0].description }}
                </span>
            </div>
        </div>
        <div class="count-wrap" v-if="seller.supports" @click="eventShowDetail">
            <span class="count">
                {{ seller.supports.length }}个
            </span>
            <i class="iconfont icon-previewright"></i>
        </div>
    </div>
    <div class="bulletin" @click="eventShowDetail">
        <span class="icon"></span>
        <span class="text">
            {{ seller.bulletin }}
        </span>
        <i class="iconfont icon-previewright"></i>
    </div>
    <div class="background">
        <img :src="seller.avatar" width="100%" height="100%" alt="">
    </div>
    <div class="header-detail" v-show="showDetail">
        <div class="detail-container clearfix">
            <div class="content">
                <h1 class="name">{{ seller.name }}</h1>
                <div class="star-box">
                    <v-star :size="48" :score="seller.score"></v-star>
                </div>
                <div class="title">
                    <div class="line"></div>
                    <div class="text">优惠信息</div>
                    <div class="line"></div>
                </div>
                <ul class="supports">
                    <li v-for="item in seller.supports" :key="item.type">
                        <span class="icon" :class="classMap[item.type]"></span>
                        <span class="text">{{ item.description }}</span>
                    </li>
                </ul>
                <div class="title">
                    <div class="line"></div>
                    <div class="text">商家公告</div>
                    <div class="line"></div>
                </div>
                <div class="detail-bulletin">
                    <p>{{ seller.bulletin }}</p>
                </div>
            </div>
        </div>
        <div class="detail-footer" @click="eventHideDetail">
            <i class="iconfont icon-close"></i>
        </div>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import star from '@/components/star/star'
export default {
    name: 'homeHeader',
    props: {
        seller: {
            type: Object
        }
    },
    components: {
        'v-star': star
    },
    data() {
        return {
            showDetail: false
        }
    },
    created() {
        // 主要看这个classMap
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
        eventShowDetail() {
            this.showDetail = !this.showDetail
        },
        eventHideDetail() {
            this.showDetail = !this.showDetail
        }
    }
}
</script>

<style lang="less" scoped>
    @import "~styles/mixins.less";
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
    .header {
        position: relative;
        overflow: hidden;
        color: #fff;
        background: rgba(7, 17, 27, .5);
        .container {
            position: relative;
            padding: 24px 14px 18px;
            font-size: 0;
            .avatar,
            .content {
                display: inline-block;
                vertical-align: top;
            }
            .content {
                margin-left: 16px;
                .title {
                    margin-top: 2px;
                    font-size: 0;
                    .brand,
                    .name {
                        display: inline-block;
                        vertical-align: middle
                    }
                    .brand {
                        width: 30px;
                        height: 18px;
                        .bg-img('brand');
                    }
                    .name {
                        margin-left: 6px;
                        font-size: 16px;
                    }
                }
                .description {
                    margin-top: 8px;
                    font-size: 12px;
                    font-weight: 200;
                }
                .supports {
                    margin-top: 10px;
                    .icon,
                    .text {
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .text {
                        font-size: 10px;
                        line-height: 12px;
                        font-weight: 200;
                    }
                }
            }
            .count-wrap {
                position: absolute;
                right: 14px;
                bottom: 18px;
                padding: 0 8px;
                height: 24px;
                line-height: 24px;
                border-radius: 12px;
                background: rgba(0, 0, 0, .2);
                .count {
                    font-size: 10px;
                }
                .iconfont {
                    font-size: 12px;
                }
            }
        }
        .bulletin {
            display: flex;
            align-items: center;
            position: relative;
            padding: 0 14px;
            height: 28px;
            line-height: 28px;
            white-space: normal;
            overflow: hidden;
            text-overflow: ellipsis;
            background: rgba(7, 17, 27, .2);
            .icon,
            .text {
                display: inline-block;
                vertical-align: middle;
            }
            .icon {
                margin-right: 4px;
                width: 22px;
                height: 12px;
                .bg-img('bulletin');
            }
            .text {
                flex: 1;
                font-size: 10px;
                line-height: 28px;
                .ellipsis();
            }
            .iconfont {
                font-size: 10px;
            }
        }
        .background {
            z-index: -1;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            filter: blur(10px);
        }
        .header-detail {
            z-index: 99;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background: rgba(7, 17, 27, .8);
            .detail-container {
                width: 100%;
                min-height: 100%;
                .content {
                    padding: 64px 9%;
                    .name {
                        font-size: 16px;
                        color: #fff;
                        font-weight: 700;
                        text-align: center;
                    }
                    .star-box {
                        margin-top: 16px;
                        text-align: center;
                    }
                    .title {
                        display: flex;
                        margin: 28px auto 24px auto;
                        .line {
                            position: relative;
                            top: -6px;
                            flex: 1;
                            border-bottom: 1px solid rgba(255, 255, 255, .2);
                        }
                        .text {
                            padding: 0 12px;
                            font-size: 14px;
                            font-weight: bold;
                        }
                    }
                    .supports {
                        padding: 0 4%;
                        li {
                            margin-bottom: 12px;
                            font-size: 0;
                            &:last-child {
                                margin-bottom: 0;
                            }
                            span {
                                display: inline-block;
                                vertical-align: middle;
                            }
                            .icon {
                                margin-right: 6px;
                                width: 16px;
                                height: 16px;
                                &.decrease {
                                    .bg-img('decrease_1');
                                }
                                &.discount {
                                    .bg-img('discount_1');
                                }
                                &.special {
                                    .bg-img('special_1');
                                }
                                &.invoice {
                                    .bg-img('invoice_1');
                                }
                                &.guarantee {
                                    .bg-img('guarantee_1');
                                }
                            }
                            .text {
                                font-size: 12px;
                                font-weight: 200;
                                line-height: 12px;
                            }
                        }
                    }
                    .detail-bulletin {
                        padding: 0 4%;
                        p {
                            font-size: 12px;
                            line-height: 24px;
                            font-weight: 200;
                        }
                    }
                }
            }
            .detail-footer {
                margin-top: -64px;
                /*height: 64px;*/
                text-align: center;
                .iconfont {
                    display: inline-block;
                    padding: 10px;
                    font-size: 24px;
                }
            }
        }
    }
</style>
