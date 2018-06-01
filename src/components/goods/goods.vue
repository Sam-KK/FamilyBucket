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

        <div class="foods">
            <ul>
                <li v-for="(item, index) in goods" :key="index">
                    <h3 class="foods-title">{{ item.name }}</h3>
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
            })
            console.log(this.goods)
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
        }
    }
</style>
