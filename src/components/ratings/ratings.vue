<template>
    <div class="ratings">
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
                    <div class="tit">服务态度</div>
                    <div class="star-wrap">
                        <v-star :score="seller.serviceScore" :size="36"></v-star>
                    </div>
                    <div class="score">{{ seller.serviceScore }}</div>
                </div>
                <div class="items">
                    <div class="tit">商品评分</div>
                    <div class="star-wrap">
                        <v-star :score="seller.foodScore" :size="36"></v-star>
                    </div>
                    <div class="score">{{ seller.foodScore }}</div>
                </div>
                <div class="items">
                    <div class="tit">送达时间</div>
                    <div class="delivery">{{ seller.deliveryTime }}分钟</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import star from '@/components/star/star'
export default {
    name: 'ratings',
    components: {
        'v-star': star
    },
    props: {
        seller: {
            type: Object
        }
    }
}
</script>

<style lang="less" scoped>
.ratings {
    .overview {
        display: flex;
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
                line-height: 10px;
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
                div {
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
}
</style>
