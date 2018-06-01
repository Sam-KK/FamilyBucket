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
        <div class="count-wrap" v-if="seller.supports">
            <span class="count">
                {{ seller.supports.length }}个
            </span>
        </div>
    </div>
    <div class="bulletin">
        <span class="icon"></span>
        <span class="text">
            {{ seller.bulletin }}
        </span>
        <span>12</span>
    </div>
</div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'homeHeader',
    props: {
        seller: {
            type: Object
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
        }
    }
</style>
