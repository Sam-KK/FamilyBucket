<template>
<ul class="star" :class="starType">
    <li v-for="(itemClass, index) in starClass" :class="itemClass" class="star-item" :key="index"></li>
</ul>
</template>

<script>
// 设置常量
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
    name: 'star',
    props: {
        size: {
            type: Number
        },
        score: { // 传入的score变量
            type: Number
        }
    },
    computed: {
        starType() {
            return 'star-' + this.size
        },
        starClass() {
            let result = [] // 返回的是一个数组,用来遍历输出星星
            let score = Math.floor(this.score * 2) / 2

            // 判断是否有小数  有小数（半星）
            let hasDecimal = score % 2 !== 0

            // 整数星星
            let integer = Math.floor(score)

            // 整数星星使用on
            for (let i = 0; i < integer; i++) {
                result.push(CLS_ON)
            }

            // 非整数星星使用half
            if (hasDecimal) {
                result.push(CLS_HALF)
            }

            // 余下的用无星星补全,使用off
            while (result.length < LENGTH) {
                result.push(CLS_OFF)
            }
            return result
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
.star {
    font-size: 0;
    .star-item {
        display: inline-block;
        vertical-align: middle;
    }
    &.star-48 {
        .star-item {
            margin-right: 22px;
            width: 20px;
            height: 20px;
            &:last-child {
                margin-right: 0;
            }
            &.on {
                .bg-img('star48_on');
            }
            &.half {
                .bg-img('star48_half');
            }
            &.off {
                .bg-img('star48_off');
            }
        }
    }
    &.star-36 {
        .star-item {
            margin-right: 6px;
            width: 15px;
            height: 15px;
            &:last-child {
                margin-right: 0;
            }
            &.on {
                .bg-img('star36_on');
            }
            &.half {
                .bg-img('star36_half');
            }
            &.off {
                .bg-img('star36_off');
            }
        }
    }
    &.star-24 {
        .star-item {
            margin-right: 3px;
            width: 10px;
            height: 10px;
            &:last-child {
                margin-right: 0;
            }
            &.on {
                .bg-img('star36_on');
            }
            &.half {
                .bg-img('star36_half');
            }
            &.off {
                .bg-img('star36_off');
            }
        }
    }
}
</style>
