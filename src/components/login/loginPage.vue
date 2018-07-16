<template>
    <div>
        <div class="login-wrap clearfix">
            <div class="left">
                <v-login></v-login>
            </div>
            <div class="right">
                <v-register></v-register>
            </div>
        </div>
        <div class="mask"></div>
    </div>
</template>

<script type="text/ecmascript-6">
import login from '@/components/login/login'
import register from '@/components/login/register'
export default {
    name: 'loginPage',
    components: {
        'v-login': login,
        'v-register': register
    }
}
</script>

<style type="text/less" lang="less" scoped>
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);
    }
    .login-wrap {
        z-index: 1;
        position: absolute;
        left: 50%;
        margin-left: -510px;
        padding: 60px;
        width: 900px;
        font-size: 0;
        background: #fff;
        &:before {
            position: absolute;
            left: 50%;
            top: 60px;
            content: "";
            bottom: 60px;
            width: 1px;
            background: #e1e1e1;
        }
        .left,
        .right {
            float: left;
            padding-right: 60px;
            padding-left: 60px;
            width: 50%;
            box-sizing: border-box;
        }
    }
    .login-form {
        margin: 0 auto;
        width: 100%;
        .login-title {
            margin-bottom: 20px;
            color: #333;
            font-size: 16px;
            font-weight: bold;
        }
        .form-group {
            margin-bottom: 20px;
            &:last-child {
                margin-bottom: 0;
            }
            .form-label {
                display: block;
                margin-bottom: 8px;
                font-size: 12px;
            }
            .form-input {
                position: relative;
                .form-control {
                    padding: 6px 12px;
                    width: 100%;
                    border: 1px solid #e1e1e1;
                    box-sizing: border-box;
                    outline: none;
                    box-shadow: none;
                    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
                    &:focus {
                        border-color: #000;
                    }
                    &.img-pr {
                        padding-right: 80px;
                    }
                    &.code-pr {
                        padding-right: 102px;
                    }
                }
                .img-code-box {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 70px;
                    height: 33px;
                    img {
                        display: block;
                        cursor: pointer;
                    }
                }
                .git-code {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 92px;
                    height: 33px;
                    border: 1px solid #000;
                    background: #fff;
                    outline: none;
                    box-shadow: none;
                    cursor: pointer;
                }
            }
            .error-tip {
                margin-top: 6px;
                font-size: 12px;
            }
            .btn {
                display: block;
                width: 100%;
                height: 36px;
                border: 1px solid #ef5f96;
                background-color: #ef5f96;
                color: #fff;
                outline: none;
                box-shadow: none;
            }
            &.error {
                .form-label,
                .error-tip {
                    color: #ef5f96;
                }
                .form-input {
                    .form-control {
                        color: #ef5f96;
                        border-color: #ef5f96;
                    }
                }
            }
        }
    }
</style>
