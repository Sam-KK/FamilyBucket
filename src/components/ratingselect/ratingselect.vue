<template>
    <div class="rating-select">
        <ul class="rating-type">
            <li class="block satisfied" :class="{'active': selectType === 2}" @click="select(2, $event)">{{ desc.all }} <span class="count">{{ ratings.length }}</span></li>
            <li class="block satisfied" :class="{'active': selectType === 0}" @click="select(0, $event)">{{ desc.satisfied }}</li>
            <li class="block dissatisfied" :class="{'active': selectType === 1}" @click="select(1, $event)">{{ desc.dissatisfied }}</li>
        </ul>
        <div class="rating-switch">
            <i class="iconfont icon-check"></i>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
const SATISFIED = 0
const DISSATISFIED = 1
const ALL = 2
export default {
    name: 'ratingselect',
    props: {
        ratings: {
            type: Array,
            default() {
                return []
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default() {
                return {
                    all: '全部',
                    satisfied: '满意',
                    dissatisfied: '不满意'
                }
            }
        }
    },
    methods: {
        select(type, event) {
            this.$emit('emitSelect', type)
        }
    }
}
</script>

<style type="text/less" lang="less" scoped>
    .rating-type {
        padding: 18px 0;
        margin: 0 18px;
        position: relative;
        font-size: 0;
        border-bottom: 1px solid #07111b1a;
        .block {
            display: inline-block;
            padding: 8px 12px;
            margin-right: 8px;
            line-height: 16px;
            border-radius: 1px;
            font-size: 12px;
            color: #4d555d;
            &.satisfied {
                background: rgba(0, 160, 220, .2);
                &.active {
                    background: #00a0dc;
                    color: #fff;
                }
            }
            &.dissatisfied {
                background: #4d555d33;
                &.active {
                    color: #fff;
                    background: #4d555d;
                }
            }
        }
    }
    .rating-switch {
        padding: 12px 18px;
        line-height: 24px;
        border-bottom: 1px solid #07111b1a;
        color: #93999f;
        font-size: 0;
        .iconfont,.text {
            display: inline-block;
            vertical-align: middle;
        }
        .iconfont {
            font-size: 24px;
            color: rgb(147, 153, 159);
        }
        .text {
            font-size: 12px;
            color: rgb(147, 153, 159);
        }
    }
</style>
