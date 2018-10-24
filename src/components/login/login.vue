<template>
    <div class="login-form">
        <form>
            <div class="login-title">登录</div>
            <div class="form-group" :class="{'error': errorState.accountError}">
                <label class="form-label">手机号码</label>
                <div class="form-input">
                    <input type="text" class="form-control" placeholder="请输入手机号码" v-model="model.account" @blur="accountBlur">
                </div>
                <div class="error-tip" v-show="errorState.accountError">{{ errorModel.accountErrorMsg }}</div>
            </div>
            <div class="form-group" :class="{'error': errorState.passwordError}">
                <label class="form-label">密码</label>
                <div class="form-input">
                    <input type="text" class="form-control" placeholder="密码" v-model="model.password" @blur="passwordBlur">
                </div>
                <div class="error-tip" v-show="errorState.passwordError">{{ errorModel.passwordErrorMsg }}</div>
            </div>
            <div class="form-group">
                <button class="btn">登录</button>
            </div>
        </form>
    </div>
</template>

<script>
// import axios from 'axios'
export default {
    name: 'login',
    data() {
        return {
            model: {
                account: '',
                password: ''
            },
            errorState: {
                accountError: false,
                passwordError: false
            },
            errorModel: {
                accountErrorMsg: '',
                passwordErrorMsg: ''
            }
        }
    },
    computed: {
        browseEnv() {
            let deviceWidth = document.documentElement.clientWidth
            return deviceWidth > 1024 ? 'PC' : 'H5'
        }
    },
    methods: {
        accountBlur() {
            let currentAccount = this.model.account
            let reg = /^[1][3,4,5,7,8][0-9]{9}$/
            if (currentAccount === '') {
                this.errorState.accountError = true
                this.errorModel.accountErrorMsg = '请输入手机号码'
            } else if (!reg.test(currentAccount)) {
                this.errorState.accountError = true
                this.errorModel.accountErrorMsg = '请输入正确的手机号码'
            } else {
                // let params = {
                //     mobile: this.model.account,
                //     tenantCode: this.tenantCode
                // }
                // this.axios('', params).then((res) => {
                //     if (res.ok === true) {
                //         this.errorState.accountError = false
                //         this.errorModel.accountErrorMsg = ''
                //     } else {
                //         this.errorState.accountError = true
                //         this.errorModel.accountErrorMsg = '该手机号码未注册'
                //     }
                // })
                this.errorState.accountError = false
                this.errorModel.accountErrorMsg = ''
            }
        },
        passwordBlur() {
            let currentValue = this.model.password
            let reg = /^[0-9a-z_]{6,16}$/i
            if (currentValue === '') {
                this.errorState.passwordError = true
                this.errorModel.passwordErrorMsg = '请输入密码'
            } else if (!reg.test(currentValue)) {
                this.errorState.passwordError = true
                this.errorModel.passwordErrorMsg = '请输入正确的密码'
            } else {
                this.errorState.passwordError = false
                this.errorModel.passwordErrorMsg = ''
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>
