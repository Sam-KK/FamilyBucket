<template>
    <div class="login-form">
        <form>
            <div class="login-title">注册</div>
            <div class="form-group">
                <label class="form-label">手机号码</label>
                <div class="form-input">
                    <input type="text" class="form-control" placeholder="请输入手机号码">
                </div>
                <div class="error-tip"></div>
            </div>
            <div class="form-group">
                <label class="form-label">图形验证码</label>
                <div class="form-input">
                    <input type="text" class="form-control img-pr" placeholder="请输入右侧图形验证码">
                    <div class="img-code-box">
                        <img src="./genVerificationCode.jpg" width="70" height="33" alt="">
                    </div>
                </div>
                <div class="error-tip"></div>
            </div>
            <div class="form-group">
                <label class="form-label">手机验证码</label>
                <div class="form-input">
                    <input type="text" class="form-control code-pr" placeholder="请输入短信验证码">
                    <button class="git-code">获取验证码</button>
                </div>
                <div class="error-tip"></div>
            </div>
            <div class="form-group">
                <label class="form-label">密码</label>
                <div class="form-input">
                    <input type="text" class="form-control" placeholder="密码">
                </div>
                <div class="error-tip"></div>
            </div>
            <div class="form-group">
                <label class="form-label">确认密码</label>
                <div class="form-input">
                    <input type="text" class="form-control" placeholder="请输入确认密码">
                </div>
                <div class="error-tip"></div>
            </div>
            <div class="form-group">
                <button class="btn">注册</button>
            </div>
        </form>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'register'
}
</script>

<style type="text/less" lang="less" scoped>

</style>
