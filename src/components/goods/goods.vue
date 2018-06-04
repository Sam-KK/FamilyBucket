<template>
    <div class="goods">
        <!-- menu control -->
        <div class="menu" ref="menuWrapper">
            <ul>
                <li v-for="(item, index) in goods"
                    :class="{'current': currentIndex === index}"
                    @click="selectMenu(index, $event)"
                    ref="menuItem" :key="index">
                    <div class="inner">
                        <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>
                        {{ item.name }}
                    </div>
                </li>
            </ul>
        </div>

        <!-- foodList control -->
        <div class="foods" ref="foodsWrapper">
            <ul>
                <li v-for="(item, index) in goods" class="food-list" :key="index" ref="foodList">
                    <h3 class="foods-title">{{ item.name }}</h3>
                    <ul>
                        <!-- food 传给 shopCart 组件 -->
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
                                <div class="price">
                                    <span class="now">￥{{ food.price }}</span>
                                    <span class="old" v-if="food.oldPrice">￥{{ food.oldPrice }}</span>
                                </div>
                                <div class="control-wrap">
                                    <!-- 把当前的 food 传递给cartControl 组件 -->
                                    <v-control :food="food"></v-control>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        <!-- shopCart control -->
        <!-- 接收 food 传给 selectFoods -->
        <v-cart :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></v-cart>
    </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import BScroll from 'better-scroll'
import cartControl from '@/components/cartcontrol/cartcontrol'
import shopCart from '@/components/shopcart/shopcart'
export default {
    name: 'goods',
    props: {
        seller: {
            type: Object
        }
    },
    components: {
        'v-cart': shopCart,
        'v-control': cartControl
    },
    data() {
        return {
            goods: [],
            foodListHeight: [], // 用来储存foodList区域的各个区块的高度(clientHeight)
            scrollY: 0 // 用来存储foods区域的滚动的Y坐标
        }
    },
    computed: {
        // 计算到达哪个区域的区间的时候的对应的索引值
        currentIndex() {
            for (let i = 0, len = this.foodListHeight.length; i < len; i++) {
                // 当前menu子块的高度
                let currentHeight = this.foodListHeight[i]

                // 下一个menu子块的高度
                let nextCurrentHeight = this.foodListHeight[i + 1]

                // 滚动到底部的时候,height2为undefined,需要考虑这种情况
                // 需要确定是在两个menu子块的高度区间

                if (!nextCurrentHeight || (this.scrollY >= currentHeight && this.scrollY < nextCurrentHeight)) {
                    this.menuFollowScroll(i)
                    return i
                }
            }
            return 0
        },
        // 选中的 food 传给 shopCart 组件
        // 自动将所有的goods.food添加一个count属性,方便做数量运算
        selectFoods() {
            let foods = []
            this.goods.forEach((good) => {
                good.foods.forEach((food) => {
                    if (food.count) {
                        foods.push(food)
                    }
                })
            })
            return foods
        }
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    mounted() {
        axios.get('/api/data.json').then((res) => {
            this.goods = res.data.goods
            // 使用$nextTick来等待异步完成之后更新dom
            this.$nextTick(() => {
                this._initScroll() // 绑定滚动dom

                // 计算foodsList区域的各个区域的高度
                this._getFoodsListHeight()
            })
        })
    },
    methods: {
        // 初始化scroll区域
        _initScroll() {
            this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                // 结合BScroll的接口使用,是否将click事件传递,默认被拦截了
                click: true
            })
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                click: true,
                // 结合BScroll的接口使用,3实时派发scroll事件
                probeType: 3
            })

            this.foodsScroll.on('scroll', (position) => {
                // 滚动坐标会出现负的,并且是小数,所以需要处理一下
                this.scrollY = Math.abs(Math.round(position.y))
            })
        },
        // 计算foods内部块的高度
        _getFoodsListHeight() {
            // 获取每一个foodList的dom对象
            let foodList = this.$refs.foodList
            let height = 0

            // 初始化第一个高度为0
            this.foodListHeight.push(height)

            for (let i = 0; i < foodList.length; i++) {
                let item = foodList[i]
                height += item.clientHeight

                this.foodListHeight.push(height)
                console.log(this.foodListHeight)
            }
        },
        menuFollowScroll(index) {
            let menuItem = this.$refs.menuItem
            let el = menuItem[index]
            this.menuScroll.scrollToElement(el, 300, 0, -100)
        },
        // 点击 menu foodList 跳到相对应区域
        selectMenu(index, event) {
            // 忽略掉BScroll的事件
            if (!event._constructed) {
                return
            }
            let foodList = this.$refs.foodList
            let el = foodList[index]
            this.foodsScroll.scrollToElement(el, 300)
        }
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
                &.current {
                    background: #fff;
                }
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
                    margin-bottom: 0;
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
                    .price {
                        line-height: 30px;
                        font-weight: bold;
                        font-size: 0;
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
                        z-index: 10;
                        position: absolute;
                        bottom: 12px;
                        right: 0;
                    }
                }
            }
        }
    }
</style>
