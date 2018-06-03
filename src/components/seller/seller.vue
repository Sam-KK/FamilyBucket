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
                <p class="text">{{ seller.bulletin }}</p>
                <ul class="supports">
                    <li v-for="item in seller.supports" :key="item.type">
                        <span class="icon" :class="classMap[item.type]"></span>
                        <span class="text">{{ item.description }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
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
    }
}
</script>

<style lang="less" scoped>
.seller {
    .seller-container {
        .overview {
            padding: 18px;
            .title {}
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
            .tit {
                margin-bottom: 8px;
                line-height: 14px;
                color: rgb(7, 17, 27);
                font-size: 14px;
            }
            .text {
                padding: 0 12px 16px 12px;
                line-height: 24px;
                font-size: 12px;
                color: rgb(240, 20, 20);
            }
        }
    }
}
</style>
